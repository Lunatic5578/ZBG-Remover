import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import Zlogo from '../assets/ZLogoFull.png'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useEffect } from 'react'

const Navbar = () => {
  const {isSignedIn,user}=useUser()
  const {openSignIn}=useClerk()
  const {credit,loadCredits}=useContext(AppContext)
  const navigate=useNavigate()

  useEffect(()=>{
    if(isSignedIn){
      loadCredits()
    }
  },[isSignedIn])

  return (
    <div className='flex justify-between items-center py-5 px-10 lg:max-44 bg-white shadow-md'>
      <Link to='/'><img className='hover:scale-101 transition-all duration-700 w-32 sm:w-44' src={Zlogo} alt="" /></Link>
      {
        isSignedIn
        ? <div className='flex items-center gap-3 sm:gap-4'>
            <button onClick={()=>{navigate('/credit')}} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full justify-center hover:bg-blue-200 duration-300 cursor-pointer'>
              <img src={assets.credit_icon} width={30} alt=""/>
              <p className='text-sm font-semibold'>Credits: {credit}</p>
            </button>
            <p className='text-zinc-700 font-semibold max-sm:hidden'>{user.fullName}</p>
            <UserButton></UserButton>
          </div>
          :<button onClick={()=>openSignIn({})} className='bg-gray-800 font-semi-bold text-white flex item-center px-6 py-3 sm:px-8 sm:py-3 text-sm rounded-full gap-1 hover:bg-black transition-all duration-500 cursor-pointer'> Get Started <img src={assets.arrow_icon} alt="" /></button>
      }
    </div>
  )
}

export default Navbar
