import express from 'express'
import { clerkWebhooks, paymentGateway, userCredits, verifyRazorpay } from '../controllers/UserController.js'
import authUser from '../middlewares/auth.js'

const userRouter=express.Router()

userRouter.post('/webhooks',clerkWebhooks)
userRouter.get('/credits',authUser,userCredits)
userRouter.post('/pay-razor',authUser,paymentGateway)
userRouter.post('/verify-razor',verifyRazorpay)

export default userRouter