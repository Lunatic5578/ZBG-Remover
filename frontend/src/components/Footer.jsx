
import Zlogo from '../assets/ZLogoFull.png'
import github from '../assets/github_icon.png'
import linkedin from '../assets/linkedIn_icon.png'

const Footer = () => {
  return (
    <div className='bg-white flex items-center justify-between gap-4 px-5 lg:px-44 py-5'>
     <img src={Zlogo} className='w-32 sm:w-44' alt="" />
     <p className='text-gray-500 text-centerflex-1 pl-4 text-sm max-sm:hidden cursor-default'>Copyright @Zeedan.dev | All rights reserved</p>
     <div className='flex gap-4'>
      <a className='hover:scale-105 transition-all duration-200 cursor-pointer' target='_blank' href="https://github.com/Lunatic5578"><img width={30} src={github} alt="" /></a>
      <a className='hover:scale-105 transition-all duration-200 cursor-pointer' target='_blank' href="https://www.linkedin.com/in/zeedan-mohsin-8132a4249/"><img width={30} src={linkedin} alt="" /></a>
     </div>
    </div>
  )
}

export default Footer
