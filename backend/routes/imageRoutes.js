import express from 'express'

import {removeBg} from '../controllers/ImageController.js'
import upload from '../middlewares/multer.js'
import authUser from '../middlewares/auth.js'

const imageRouter=express.Router()

imageRouter.post('/removebg',upload.single('image'),authUser,removeBg)

export default imageRouter