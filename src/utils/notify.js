// utils/toastNotifications.js
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { FaExclamationTriangle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import './notify.css'

const notify = (type, title, message) => {
  const toastOptions = {
    position: 'top-right',
    duration: 5000, // 5 seconds
  };

  const commonStyles = 'bg-white p-2 flex justify-start items-start gap-2 shadow-[ 0px_3px_14px_#00000029] border-l-4';

  switch (type) {
    case 'success':
      toast.success(
        ({ id }) => (
          <div className={`${commonStyles} successBorder`}>
            <FaCheck className='text-white text-lg bg-custom-dark-blue-1 rounded-full p-1' />
            <div className='flex-1 space-y-1'>
              <h4 className='text-custom-dark-blue-1 font-semibold'>{title}</h4>
              <p className='text-custom-dark-blue-1 text-xs'>{message}</p>
            </div>
            <RxCross1 className='text-black cursor-pointer' onClick={() => toast.dismiss(id)} />
          </div>
        ),
        { ...toastOptions, icon: null }
      );
      break;
    case 'error':
      toast.error(
        ({ id }) => (
          <div className={`${commonStyles} errorBorder`}>
            <FaTimesCircle className='text-white text-lg bg-custom-red rounded-full p-1' />
            <div className='flex-1 space-y-1'>
              <h4 className='text-custom-dark-blue-1 font-semibold'>{title}</h4>
              <p className='text-custom-dark-blue-1 text-xs'>{message}</p>
            </div>
            <RxCross1 className='text-black cursor-pointer' onClick={() => toast.dismiss(id)} />
          </div>
        ),
        { ...toastOptions, icon: null }
      );
      break;
    case 'warning':
      toast(
        ({ id }) => (
          <div className={`${commonStyles} warningBorder`}>
            <FaExclamationTriangle className='text-white text-lg bg-custom-orange-2 rounded-full p-1' />
            <div className='flex-1 space-y-1'>
              <h4 className='text-custom-dark-blue-1 font-semibold'>{title}</h4>
              <p className='text-custom-dark-blue-1 text-xs'>{message}</p>
            </div>
            <RxCross1 className='text-black cursor-pointer' onClick={() => toast.dismiss(id)} />
          </div>
        ),
        { ...toastOptions, icon: null }
      );
      break;
    case 'info':
      toast(
        ({ id }) => (
          <div className={`${commonStyles} infoBorder`}>
            <FaInfoCircle className='text-white text-lg bg-custom-light-blue-1 rounded-full p-1' />
            <div className='flex-1 space-y-1'>
              <h4 className='text-custom-dark-blue-1 font-semibold'>{title}</h4>
              <p className='text-custom-dark-blue-1 text-xs'>{message}</p>
            </div>
            <RxCross1 className='text-black cursor-pointer' onClick={() => toast.dismiss(id)} />
          </div>
        ),
        { ...toastOptions, icon: null }
      );
      break;
    default:
      break;
  }
};

export default notify;
