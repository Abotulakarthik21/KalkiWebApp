import React from 'react'
import MemberCard from '../components/CoordinatorCard'
import MembersCard from '../components/MembersCard'

import president from '../assets/mems/president.jpg'
import raghu from '../assets/mems/raghu.jpg'
import tre from '../assets/mems/tre.jpeg'
import tech from '../assets/mems/tech.jpg'
import tech1 from '../assets/mems/tech1.jpg'
import tech4 from '../assets/mems/tech4.jpg'
import mani from '../assets/mems/mani.jpg'
import kiran from '../assets/mems/kiran.jpg'
import sid from '../assets/mems/sid.jpg'
import ind from '../assets/mems/ind.jpg'
import design from '../assets/mems/design.jpg'
import ramu1 from '../assets/mems/ramu1.jpg'
import ext from '../assets/mems/ext.jpg'
import treas from '../assets/mems/treas.jpg'
import for_man from '../assets/mems/for_man.jpg'
import him from '../assets/mems/him.jpg'
import evLead from '../assets/mems/evLead.jpg'
import pr from '../assets/mems/pacch.jpg'
import abhi from '../assets/mems/abhi.jpg'
import formsec from '../assets/mems/formsec.jpg'

import socioco from '../assets/mems/socioco.jpg'
import conlead from '../assets/mems/conlead.jpg'
import marlead from '../assets/mems/marlead.jpg'
import doclead from '../assets/mems/doclead.jpg'
import marco from '../assets/mems/marco.jpg'
import vicepre from '../assets/mems/vicepre.jpg'
import evenco from '../assets/mems/evenco.jpg'
import evenlead from '../assets/mems/evenlead.jpg'
import conco from '../assets/mems/conco.jpg'


const Members = () => {
  return (
    <div className='px-[30px] md:px-40'>
        <div className='mt-[120px] sm:mt-[150px]'>
            <h1 className='text-center text-4xl font-bold md:text-6xl mt-2 mb-6 md:mb-20'>Meet Our <span className='text-blue-800'>Team </span>👥</h1>
            <h2 className='text-center text-2xl sm:text-4xl font-bold mb-6 sm:mb-8'>Faculty <span className='text-blue-800'>Coordinator</span>🎓</h2>
            <MemberCard />

            <div className='flex justify-between items-center mb-10 mt-10 gap-8 flex-wrap'>
                <div className='flex flex-col items-center justify-between'>
                    <h1 className='flex-wrap text-center text-2xl font-bold md:text-4xl mt-2 mb-6 md:mb-20 flex items-center justify-center gap-5'>
                        <div className="flex h-[5px] w-25 bg-blue-800"></div>
                        <span className='text-blue-800'>Former </span> President 👑
                        <div className="flex h-[5px] w-25 bg-blue-800"></div>
                    </h1>
                    <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                        <MembersCard name={"D. Raghu Prasad"} role={"President"} pic={raghu} date={"2024-2025"}/>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-between'>
                    <h1 className='flex-wrap text-center text-2xl font-bold md:text-4xl mt-2 mb-6 md:mb-20 flex items-center justify-center gap-5'>
                        <div className="flex h-[5px] w-25 bg-blue-800"></div>
                        <span className='text-blue-800'>Former </span> Secretary 👩‍💼
                        <div className="flex h-[5px] w-25 bg-blue-800"></div>
                    </h1>
                    <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                        <MembersCard name={"Satwik"} role={"Secretary"} pic={formsec} date={"2024-2025"}/>
                    </div>
                </div>
            </div>

            <div className='flex justify-between items-center mb-10 mt-10 gap-8 flex-wrap'>
                <div className='flex flex-col items-center justify-between'>
                    <h1 className='flex-wrap text-center text-2xl font-bold md:text-4xl mt-2 mb-6 md:mb-20 flex items-center justify-center gap-5'>
                        <div className="flex h-[5px] w-25 bg-blue-800"></div>
                        <span className='text-blue-800'>Former </span> Treasurer 💰
                        <div className="flex h-[5px] w-25 bg-blue-800"></div>
                    </h1>
                    <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                        <MembersCard name={"CH. Mahindra"} role={"Treasurer"} pic={treas} date={"2024-2025"}/>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-between'>
                    <h1 className='flex-wrap text-center text-2xl font-bold md:text-4xl mt-2 mb-6 md:mb-20 flex items-center justify-center gap-5'>
                        <div className="flex h-[5px] w-25 bg-blue-800"></div>
                        <span className='text-blue-800'>Former </span>  Internal Manager 🛠️
                        <div className="flex h-[5px] w-25 bg-blue-800"></div>
                    </h1>
                    <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                        <MembersCard name={"PAVAN"} role={"Internal Manager"} pic={for_man} date={"2024-2025"}/>
                    </div>
                </div>
            </div>

            <div className='flex justify-between items-center mb-10 mt-10 gap-8 flex-wrap'>
                <div className='flex flex-col items-center justify-between'>
                    <h1 className='flex-wrap text-center text-2xl font-bold md:text-4xl mt-2 mb-6 md:mb-20 flex items-center justify-center gap-5'>
                        <div className="flex h-[5px] w-25 bg-blue-800"></div>
                        <span className='text-blue-800'>Former </span>  External Manager 🌐
                        <div className="flex h-[5px] w-25 bg-blue-800"></div>
                    </h1>
                    <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                        <MembersCard name={"Himesh"} role={"External manager"} pic={him} date={"2024-2025"}/>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-between'>
                    <h1 className='flex-wrap text-center text-2xl font-bold md:text-4xl mt-2 mb-6 md:mb-20 flex items-center justify-center gap-5'>
                        <div className="flex h-[5px] w-25 bg-blue-800"></div>
                        <span className='text-blue-800'>Former </span>  Event Manger 🎪
                        <div className="flex h-[5px] w-25 bg-blue-800"></div>
                    </h1>
                    <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                        <MembersCard name={"Sonika"} role={"Event Mangement Lead"} pic={evLead} date={"2024-2025"}/>
                    </div>
                </div>
            </div>

            <h1 className='text-center flex-wrap text-3xl font-bold md:text-4xl mt-2 mb-6 md:mb-20 flex items-center justify-center gap-5'>
                <div className="flex h-[5px] w-25 bg-blue-800"></div>
                Current<span className='text-blue-800'>Admin </span> Department 🏢 
                <div className="flex h-[5px] w-25 bg-blue-800"></div>
            </h1>

            <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20'>
                <MembersCard name={"B. Vinayaka Sai"} role={"President"} pic={president}/>
                <MembersCard name={"G. Tarini Krishna"} role={"Vice President"} pic={vicepre}/>
            </div>
            <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-20'>
                <MembersCard name={"B. Indra Vardhan"} role={"Managing Director"} pic={ind}/>
                <MembersCard name={"K. Dhanumjay Kiran"} role={"Secretary"} pic={kiran}/>
            </div>
            <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-20'>
                <MembersCard name={"M. Susruta Reddy"} role={"External Manager"} pic={ext}/>
                <MembersCard name={"S. Mani Charan"} role={"Internal Manager"} pic={mani}/>
            </div>
            <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-20'>
                <MembersCard name={"V. Abhishek"} role={"Treasurer"} pic={abhi}/>
                <MembersCard name={"Y. Vishnu"} role={"Treasurer"} pic={tre}/>
            </div>

            <h1 className='text-center flex-wrap text-3xl font-bold md:text-4xl mt-2 mb-6 md:mb-20 flex items-center justify-center gap-5'>
                <div className="flex h-[5px] w-25 bg-blue-800"></div>
                Current<span className='text-blue-800'>Core </span> Team 🧠 
                <div className="flex h-[5px] w-25 bg-blue-800"></div>
            </h1>
            <h1 className='text-center text-3xl font-bold md:text-3xl mt-2 mb-6 md:mb-15'><span className='text-blue-800'>Marketing </span> Department 📢</h1>
            <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-20'>
                <MembersCard name={"Aasrith Reddy"} role={"Lead"} pic={marlead}/>
                <MembersCard name={"Pranavi"} role={"Co-Lead"} pic={marco}/>
            </div>
            <h1 className='text-center text-3xl font-bold md:text-3xl mt-2 mb-6 md:mb-15'><span className='text-blue-800'>Technical </span> Department 💻</h1>
            <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                <MembersCard name={"A. Karthik"} role={"Coordinator"} pic={tech1}/>
                <MembersCard name={"A. Tarun Madhav"} role={"Coordinator"} pic={tech4}/>
            </div>
            <h1 className='text-center text-3xl font-bold md:text-3xl mt-2 mb-6 md:mb-15'><span className='text-blue-800'>Event Management </span> Department 🎉</h1>
            <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                <MembersCard name={"M D Thayyab Shaik"} role={"Lead"} pic={evenlead}/>
                <MembersCard name={"K. Bala Sreekar"} role={"Co-Lead"} pic={evenco}/>
            </div>
            <h1 className='text-center text-3xl font-bold md:text-3xl mt-2 mb-6 md:mb-15'><span className='text-blue-800'>Social Media and Editing</span> Department 🌐</h1>
            <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                <MembersCard name={"D V S N S Siddardha"} role={"Lead"} pic={sid}/>
                <MembersCard name={"Vinaya Priya Hasini"} role={"Co-Lead"} pic={socioco}/>
            </div>
            <h1 className='text-center text-3xl font-bold md:text-3xl mt-2 mb-6 md:mb-15'><span className='text-blue-800'>Content Creation and Writing</span> Department ✍️</h1>
            <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                <MembersCard name={"Mithali Bose"} role={"Lead"} pic={conlead}/>
                <MembersCard name={"Yazhini K B"} role={"Co-Lead"} pic={conco}/>
            </div>
            <h1 className='text-center text-3xl font-bold md:text-3xl mt-2 mb-6 md:mb-15'><span className='text-blue-800'>Design </span> Department 🎨</h1>
            <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                <MembersCard name={"K. Tarun Kumar"} role={"Lead"} pic={design}/>
                <MembersCard name={""} role={"Co-Lead"} pic={''}/>
            </div>
            <h1 className='text-center text-3xl font-bold md:text-3xl mt-2 mb-6 md:mb-15'><span className='text-blue-800'>PR and Outreach </span> Department 📈</h1>
            <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                <MembersCard name={"K. Ramana"} role={"Lead"} pic={ramu1}/>
                <MembersCard name={"CH. Manish Kumar"} role={"Co-Lead"} pic={pr}/>
            </div>
            <h1 className='text-center text-3xl font-bold md:text-3xl mt-2 mb-6 md:mb-15'><span className='text-blue-800'>Documentation </span> Department 📝</h1>
            <div className='flex flex-row flex-wrap justify-center sm:gap-[70px] items-center gap-5 md:gap-20 mb-15'>
                <MembersCard name={"K. Jasmitha Reddy"} role={"Lead"} pic={doclead}/>
            </div>
        </div>
    </div>
  )
}

export default Members