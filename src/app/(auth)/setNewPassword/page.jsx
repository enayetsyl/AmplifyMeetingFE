import SetNewPasswordUI from '@/components/authComponent/SetNewPasswordUI'
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
    <SetNewPasswordUI />
  </div>
  )
}

export default page