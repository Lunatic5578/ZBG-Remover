import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate=useNavigate()
  const {result,image,clearImages}=useContext(AppContext)

  const handleTryAnother = () => {
    clearImages();
    navigate('/'); // Assuming you're using react-router-dom
  }

  return (
    <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'>

      <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>

        <div className='flex flex-row sm:grid-cols-2 gap-8'>

          <div className='left-res flex-1'>
            <p className='font-semibold text-gray-500 mb-2'>Original</p>
            <img className='rounded-md border' src={image?URL.createObjectURL(image):''} alt="" />
          </div>

          <div className="flex-1 right-res flex flex-col">
  <p className="font-semibold text-gray-500 mb-2">Resulting Image</p>
  
  <div className="rounded-md border border-gray-200 h-full overflow-hidden relative bg-layer flex items-center justify-center">
    

    {typeof result === "string" && result.trim() !== "" ? (
      <img src={result} alt="Processed result" className="w-full h-auto object-contain" />
    
    ) : image ? (
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="border-4 border-blue-400 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
      </div>

    ) : (
      
      <p className="text-sm text-gray-400">No image selected</p>
    )}
  
  </div>
</div>


        </div>
        {result&&<div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
          <button  onClick={handleTryAnother} className='cursor-pointer font-semibold px-8 py-2 text-blue-500 text-sm border border-blue-500 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-500'>Try another image</button>
          <a className='font-semibold px-8 py-2 hover:text-blue-600 hover:bg-white text-sm border border-blue-600 rounded-full bg-blue-500 text-white transition-all duration-400' href={result} download>Download image</a>
        </div>}
      </div>
    </div>
  )
}

export default Result
