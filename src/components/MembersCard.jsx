import React from 'react'

const MembersCard = ({name,role,pic,date}) => {
  return (
    <div className='px-5 flex flex-row flex-wrap py-5 sm:py-10 sm:px-20 border border-gray-300 
    rounded-lg shadow-md hover:shadow-lg transition-shadow duration-2000 
    hover:-translate-y-2 ease-in-out gap-5 md:gap-20 items-center justify-center mb-20'>
        <img src={pic} className='w-50 rounded-full shadow-2xl border-2 border-gray-200' />
        <div className='max-w-2xl'>
            <h1 className='text-2xl font-bold'>{name}</h1>
            <h2 className='text-xl font-bold text-blue-800'>{role}</h2>
            <h3 className='text-xl text-green-700'><span className='text-gray-800 text-xl'>Service span: </span>{date?date:"2025-2026"}</h3>
        </div>
    </div>
  )
}

export default MembersCard