import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';



const PORT =process.env.PORT || 3000;
const app= express()
await connectDB()

app.use(express.json())


app.use(cors())

app.get('/',(req,res)=>{
    res.send("API working")
})
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.get("/ping", (req, res) => {
  res.status(200).json({ success: true, message: "Backend is alive" });
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

