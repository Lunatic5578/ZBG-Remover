import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const[image,setImage]=useState(false)
    const [result,setResult]=useState(false)
    const [credit,setCredit]=useState(false)
    
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const {getToken}=useAuth()
    const navigate=useNavigate()

    const {isSignedIn}=useUser()
    const {openSignIn}=useClerk()

    const loadCredits=async()=>{
        try {
            const token=await getToken()

            const {data}=await axios.get(backendUrl+'/api/user/credits',{headers:{token}})

            if(data.success){
                setCredit(data.credits)
                //console.log(data.credits)
            }
        } catch (error) {
            //console.log(error);
            toast.error("Error Loading Credits")
            console.log("url:"+backendUrl);
            
        }
    }

    const removeBg=async(image)=>{
        try {
            //console.log(image);
            if(!isSignedIn)
            {
                return openSignIn()
            }
   
            setImage(image)
            setResult(false)
            navigate('/result')
            
            const token=await getToken()

            const formData=new FormData()

            image && formData.append('image',image)

            const {data}=await axios.post(backendUrl+'/api/image/removebg',formData,{headers:{token}})

            if(credit===0)
            {
                navigate('/credit')
            }
            if(data.success)
            {
                setResult(data.result)
                data.creditBal && setCredit(data.creditBal)
                //console.log("Sending result image:", result.slice(0, 100))
            }
            else
            {
                toast.error(data.message)
                data.creditBal  && setCredit(data.creditBal)
                
            }
            //console.log(credit);
            
            
            
        } catch (error) {
            //console.log(error);
            toast.error("Error Loading Credits")
            console.log("credit:",credit);
        }
    }

    const clearImages = () => {
        setImage(false);
        setResult(false);
    };

    const val={
        credit,setCredit,loadCredits,backendUrl,image,setImage,removeBg,result,setResult,clearImages
    }
    return(
        <AppContext.Provider value={val}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider