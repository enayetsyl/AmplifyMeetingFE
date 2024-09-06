import HeadingBlue25px from '@/components/shared/HeadingBlue25px'
import ima from '../../../public/join-meeting.png'
import Image from 'next/image'


const page = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <HeadingBlue25px children="THANK YOU FOR USING AMPLIFY RESEARCH VIRTUAL FACILITY SERVICES" />
      <Image src={ima} alt="leave meeting" className='w-[800px] h-[500px] -m-20 -z-10' />
    </div>
  )
}

export default page