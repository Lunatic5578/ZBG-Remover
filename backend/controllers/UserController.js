import {Webhook} from'svix'
import userModel from '../models/userModel.js'
import razorpay from 'razorpay'
import transactionModel from '../models/transactionModel.js'

const clerkWebhooks=async(req,res)=>{
    try {
        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers['svix-id'],
            "svix-timestamp":req.headers['svix-timestamps'],
            "svix-signature":req.headers['svix-signature']
        })
        
     
    const {data,type}=req.body

    switch (type) {
        case "user.created":{
            const userData={
                clerkId:data.id,
                email:data.email_addresses[0].email_address,
                firstName:data.first_name,
                lastName:data.last_name,
                photo:data.image_url,
            }
            await userModel.create(userData)
            //res.json({success:true,message:"User created"})
            break;
        }
        case "user.updated":{
            const userData={
                email:data.email_addresses[0].email_address,
                firstName:data.first_name,
                lastName:data.last_name,
                photo:data.image_url,
            }
            await userModel.findOneAndUpdate({clerkId:data.id},userData)
            //res.json({success:true,message:"User updated"})
            break;
        }
        case "user.deleted":{
            await userModel.findOneAndDelete({clerkId:data.id})
            //res.json({success:true,message:"User deleted"})
            break;
        }   
    
        default:
            break;
    }

    res.status(200).json({message:"Webhook handled successfully"})
    }
    catch (error) {
        console.log(error.message);
        res.json({success:false,message:"Webhook handling failed"})
    }
}


const userCredits = async (req, res) => {
  try {
    const clerkId = req.auth?.userId || req.user?.clerkId; 

    if (!clerkId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Clerk ID missing" });
    }

    const userData = await userModel.findOne({ clerkId });

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, credits: userData.creditBal });
  } catch (error) {
    console.log("userCredits error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const razorpayInstance=new razorpay({
  key_id:process.env.RAZORPAY_ID,
  key_secret:process.env.RAZORPAY_KEY,
})

const paymentGateway=async(req,res)=>{
  try {
    const clerkId = req.auth?.userId || req.user?.clerkId; 
    const {planId}=req.body
    console.log("pid:",planId);
    
    const userData=await userModel.findOne({clerkId})
    if(!userData||!planId)
    {
      return res.json({success:false,message:"Invalid credentials"})
    }
    let credits,plan,amount,data
    switch (planId) {

      case 'Basic':
        plan='Basic'
        credits=10
        amount=50
        break;

      case 'Advanced':
        plan='Advanced'
        credits=50
        amount=200
        break;

      case 'Business':
        plan='Business'
        credits=500
        amount=2000
        break;  
    
      default:
        console.log("invalid planId");
        return res.json({ success: false, message: "Invalid planId" });
        
    }
    
    
    const date=Date.now()

    const transactionData={
      clerkId,
      plan,
      amount,
      credits,
      //payment,
      date
    }

    const newTransaction=await transactionModel.create(transactionData)

    const options={
      amount:amount*100,
      currency:process.env.CURREMCY,
      receipt:newTransaction._id
    }

    await razorpayInstance.orders.create(options,(error,order)=>{
      if(error)
      {
        return res.json({success:false,message:error})
      }
      res.json({success:true,order})
    })

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    
  }
}

const verifyRazorpay=async(req,res)=>{
  try {
    const {razorpay_order_id}=req.body
    const orderinfo=await razorpayInstance.orders.fetch(razorpay_order_id)

    if(orderinfo.status==='paid')
    {
      const transactionData=await transactionModel.findById(orderinfo.receipt)
      if(transactionData.payment)
      {
        return res.json({success:false,message:'Payment failed'})
      }
      const userData=await userModel.findOne({clerkId:transactionData.clerkId})
      const creditBal=userData.creditBal+transactionData.credits
      await userModel.findByIdAndUpdate(userData._id,{creditBal})

      await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})

      res.json({success:true,message:"Credit added"})
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export {clerkWebhooks,userCredits ,paymentGateway, verifyRazorpay}