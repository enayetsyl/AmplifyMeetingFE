
const HorizontalBackground = ({children}) => {
  return (
    
    <div>
        <div className='flex flex-col justify-center items-center w-full min-h-screen relative'>
        <div className='flex-1 h-1/2 w-full bg-white'></div>
        <div className='flex-1 h-1/2 w-full bg-custom-gray-1'></div>
    </div>
    <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">{children}</div>
    </div>
  )
}

export default HorizontalBackground