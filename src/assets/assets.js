import { BadgeCheck, Calendar, Users2 } from 'lucide-react'

export const boxesInfo = [
    {
        title:"Event Section",
        description: "Our events bring students together through workshops, competitions, and celebrations that inspire learning, creativity, and personal growth",
        Icon: Calendar,
        bg: { from: '#3588F2', to: '#0BB0D7' },
        path:'/kalki/events'
    },
    {
        title:"Team Members",
        description: "Meet the passionate individuals who drive our club forward, working together to inspire growth and leadership",
        Icon: Users2,
        bg: { from: '#B153EA', to: '#E549A3' },
        path:'/kalki/teamMems'
    },
    {
        title:"Certificate Verification",
        description: "Easily verify certificates issued by the club to ensure authenticity and recognize achievements",
        Icon: BadgeCheck,
        bg: { from: '#5C6AF1', to: '#427DF5' },
        path:'/kalki/certification'
    }
]

