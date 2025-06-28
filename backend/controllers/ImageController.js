import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

const removeBg=async(req,res)=>{
    try {
        //console.log("clerkId:",req.body.clerkId);

        const clerkId = req.auth?.userId || req.user?.clerkId; 

        const user=await userModel.findOne({clerkId})
            

        if(!user)
        {   
            return res.json({success:false,message:"User Not Found"})
        }
        if(user.creditBal===0)
        {
            return res.json({success:false,message:"Insufficient Credit"})
            
        }
        const imagePath=req.file.path
        const imageFile=fs.createReadStream(imagePath)

        const formData=new FormData()
        formData.append('image_file',imageFile)

        const {data}=await axios.post('https://clipdrop-api.co/remove-background/v1',formData,{headers:{
            'x-api-key':process.env.CLIPDROP_API,
        },
        responseType:'arraybuffer'
    })

    const base64Image=Buffer.from(data,'binary').toString('base64')
    const result=`data:${req.file.mimetype};base64,${base64Image}`

    await userModel.findByIdAndUpdate(user._id,{creditBal:user.creditBal-1})

    res.json({success:true,result,creditBal:user.creditBal-1,message:"Background Removed"}) 

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}

export {removeBg}