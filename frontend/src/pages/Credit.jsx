import React from 'react'
import {assets, plans} from '../assets/assets'
import { useContext } from 'react'
import {AppContext} from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'

//import { paymentGateway } from '../../../backend/controllers/UserController.js'

const Credit = () => {

  const {backendUrl,loadCredits}=useContext(AppContext)

  const navigate=useNavigate()

  const {getToken}=useAuth()

  const initPay=async(order)=>{

    const options={
      key:import.meta.env.VITE_RAZORPAY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Credits Payment',
      description:"Payment for credits",
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log(response);
        const token=await getToken()
        try {
          const {data}=await axios.post(backendUrl+'/api/user/verify-razor',response,{headers:{token}})
          if(data.success)
          {
            loadCredits()
            navigate('/')
            toast.success("Credit added successfully")
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }
    const rzp=new window.Razorpay(options)
    rzp.open()
  }

  const payment=async(planId)=>{
    try {
      const token =await getToken()
      const {data} = await axios.post(backendUrl+'/api/user/pay-razor',{planId},{headers:{token}})
      console.log(data);
      console.log(planId);
      
      
      if(data.success){

        initPay(data.order)
      }

    } catch (error) {
      console.log(error);
      toast.error("Error in payment: ", error.message)
    }
  }

  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-gray-600 mb-6 sm:mb-10'>Choose the plan that is right for you</h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item,index)=>{
          return(
          <div className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 hover:scale-105 transition-all duration-500 text-gray-700 text-center' key={index}>
            <img width={40} src="" alt="" />
            <p className='font-bold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>₹{item.price}</span>/{item.credits}credits
            </p>
            <button onClick={()=>{payment(item.id)}} className='cursor-pointer w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 hover:bg-black duration-500'>Purchase</button>
          </div>
        )})}
      </div>
    </div>
  )
}

export default Credit
