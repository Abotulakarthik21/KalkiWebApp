import x from '../assets/x.png'
import lin from '../assets/linkedin.png'
import logo from '../assets/logo.webp'
import mail from '../assets/mail.png'

const Footer = () => {
  return (
    <div className='bottom-0 left-0 flex items-center justify-between w-full h-12 bg-transparent border-t-1 border-gray-300 px-11'>
        <div className='flex items-center justify-between'>
            <a href="https://x.com/personalit62718?t=4-z-do0FBw16RjrqBDZ0rQ&s=09" target="_blank" rel="noopener noreferrer"><img src={x} className="w-[22px] mr-1 opacity-[0.7] cursor-pointer sm:w-6 sm:mr-2" /></a>
            <a href="https://www.linkedin.com/company/kalki-personality-development-club/" target="_blank" rel="noopener noreferrer"><img src={lin} className="w-8 opacity-[0.7] cursor-pointer" /></a>
            <a href="https://mail.google.com/mail/?view=cm&to=kalkipersonalitydevelopment@gmail.com"><img src={mail} className='ml-2 w-6 opacity-[0.7] cursor-pointer sm:w-6'/></a>
        </div>
        <div>
            <h2 className='text-gray-700 text-[14px] hidden md:block'>Personality development is not about being someone else, it’s about becoming the best version of yourself</h2>
        </div>
        <div>
            <img src={logo} className='w-10'/>
        </div>
    </div>
  )
}

export default Footer