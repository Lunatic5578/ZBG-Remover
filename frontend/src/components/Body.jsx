import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Body = () => {
  const {removeBg}=useContext(AppContext)

  return (
    <>
      <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-8 pb-10 px-4 lg:px-45 sm:mt-8'>
        <div className='left-header'>
          <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>Welcome to <br className='max-md:hidden'/><span className='bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent'>Z-BGRemover </span></h1>
          <p className='text-xl my-6 text-{15px} text-gray-800'>This is an AI-Powered website designed to help you to remove background from any image.</p>
          <div>
              <input onChange={e=>removeBg(e.target.files[0])} accept='image/*' type="file" id="upload1" hidden/>
              <label className='inline-flex gap-3 px-8 py-4 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-blue-500 m-auto hover:scale-105 transition-all duration-700' htmlFor="upload1">
                  <img src={assets.upload_btn_icon} alt="" />
                  <p className='font-bold text-white'>Upload Image</p>
              </label>
          </div>
        </div>
        <div className='right-header w-full max-w-medium'>
          <img src={assets.header_img} alt="" />
        </div>
      </div>
      <div className="bottom-end">
          <h1 className='cursor-default text-center font-bold text-3xl text-gray-600 my-8 px-3 text-wrap mb-12'>Remove Background With High<br/> Quality and Accuracy</h1>
      </div>
    </>
  )
}

export default Body
