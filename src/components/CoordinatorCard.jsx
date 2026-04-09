import React from 'react'
import clubCordinator from '../assets/mems/clubCordinator.jpg'

const MemberCard = () => {
  return (
    <div className='px-5 flex flex-row flex-wrap py-5 sm:py-10 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-2000 hover:-translate-y-2 ease-in-out gap-5 md:gap-20 items-center justify-center mb-20'>
        <img src={clubCordinator} className='w-50 rounded-full shadow-2xl border-2 border-gray-200'/>
        <div className='max-w-2xl'>
            <div className='flex items-center flex-wrap flex-row mb-3'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-bold text-blue-900'>Dr. Visalakshi Annepu</h1>
                    <h2 className='text-2xl font-semibold text-gray-700'>Club Coordinator</h2>
                </div>
            </div>
            <div>
                <p className='text-blue-600 font-semibold text-[22px] mb-[10px]'>Assistant Professor Senior Grade1</p>
                <p className='text-blue-900 font-semibold text-[18px] mb-[10px]'>School of Computer Science and Engineering (SCOPE)</p>
                <p className='text-[17px] text-gray-700 font-medium'><span className='text-blue-900'>Specialisation :</span> Wireless Networks, Computer Networks, 
                    Machine Learning, Artificial Intelligence, Soft Computing Techniques</p>
            </div>
        </div>
    </div>
  )
}

export default MemberCard