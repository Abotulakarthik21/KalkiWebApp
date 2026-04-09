import React from 'react'
import { boxesInfo } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const BoxesInfo = () => {
    
    const navigate = useNavigate()

  return (
    <div className='flex px-[40px] flex-wrap gap-5 items-stretch justify-between w-full h-auto md:px-[100px] py-1.5 mt-5 mb-20'>
       {
        boxesInfo.map((item,index)=>(
            <div className='mt-[20px] p-6 rounded-2xl shadow-md text-white cursor-pointer transform hover:scale-105 transition active:-translate-y-1 duration-300'
                style={{background:`linear-gradient(to right,${item.bg.from},${item.bg.to})`}} onClick={()=>navigate(item.path)}>
                    <item.Icon className='w-10 h-10 mb-4 text-white'/>

                    <h3 className='text-2xl font-bold mb-2'>{item.title}</h3>

                    <p className='text-[16px] text-gray-300 max-w-[450px]'>{item.description}</p>

                    <button className='mt-[14px] inline-block bg-white text-gray-700 font-medium px-4
                    py-2 rounded-lg shadow hover:bg-gray-200 transition cursor-pointer hover:w-full' onClick={(e)=> {e.stopPropagation(); navigate(item.path)} }>
                        Visit
                    </button>
            </div>
        ))
       }

       <div className="text-center mt-16 mb-20 mx-auto">
            <h2 className="text-2xl font-semibold">Ready to Grow with Us?</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                Join our community to enhance your communication, confidence, and leadership skills. 
                Together, we create opportunities that help you become the best version of yourself.
            </p>
            <a href="https://www.instagram.com/kalkiclub_vitap?igsh=MWl1aWt4aDlvYXA2Ng==" target="_blank" rel="noopener noreferrer">
                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition cursor-pointer">
                    Join Now
                </button>
            </a>
        </div>

    </div>
  )
}

export default BoxesInfo