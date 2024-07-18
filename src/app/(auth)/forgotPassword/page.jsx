import ForgotPasswordUI from '@/components/authComponent/ForgotPasswordUI'
import Logo from '@/components/shared/Logo'

const page = () => {
  return (
    <div>
    <div className="flex justify-center items-center pt-5 lg:hidden">
      <Logo />
    </div>
    <div className="pt-5 pl-10 lg:block hidden">
      {' '}
      <Logo />
    </div>
    <ForgotPasswordUI />
  </div>
  )
}

export default page