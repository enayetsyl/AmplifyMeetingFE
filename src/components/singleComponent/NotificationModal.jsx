import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { FaBell, FaTrashAlt } from 'react-icons/fa';

const notifications = [
  {
    id: 1,
    message:
      'You have been assigned a new project TCT Marathon Campaign by the admin.',
    time: 'Yesterday at 9:30 AM',
    read: false,
  },
  {
    id: 2,
    message:
      'Your Pop Culture Celebration meeting is about to start in the next 15 minutes. Please get your things ready!',
    time: 'Last Thursday at 10:30 AM',
    read: true,
  },
];

const NotificationModal = ({
  onClose,
  notifications,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  unreadCount,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute right-0 mt-2 bg-white p-4 rounded-lg w-96 shadow-lg z-10"
    >
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-3">
          <h2 className="text-xl font-bold text-[#00283B]">Notifications</h2>
          {unreadCount > 0 && (
            <span className=" w-5 h-5 bg-[#ff2b2b] text-white text-xs font-bold rounded-full text-center pt-0.5">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          className="text-sm text-custom-dark-blue-1 underline font-semibold"
          onClick={markAllAsRead}
          >
          Mark all as read
        </button>
      </div>
            { unreadCount > 0 && <p className='py-4 text-custom-gray-3 text-sm font-medium'>{`You have ${unreadCount} new notification`}</p>}

      <hr />
      <div className="mt-4 h-60 overflow-y-scroll">
        { notifications.length > 0 ? notifications.map((notification) => (
          <div
            key={notification.id}
            className={`mt-2 p-2 rounded-md mb-2 ${
              notification.read ? 'bg-white' : 'bg-white shadow-[0px_3px_6px_#00000029]'
            }`}
          >
            <div className="flex justify-center gap-2 items-start relative">
                {!notification.read && (
                    <span className="h-2 w-2 bg-custom-orange-1 rounded-lg mr-2 absolute -top-1 left-0"></span>
                )}
                <Image 
                src={notification.image}
                alt='user image'
                height={50}
                width={50}
                className='rounded-full'
                />
              <p className={`text-sm ${notification.read ? 'text-[#9c9c9c]' : 'text-custom-dark-blue-1'} font-medium`}>
                {notification.message}
              </p>
            <button
              className="text-[#f35757]"
              onClick={() => deleteNotification(notification.id)}
            >
              <FaTrashAlt />
            </button>
            </div>
            <p className="text-sm text-[#a5acb8] font-normal pl-[58px] pt-3">{notification.time}</p>
          </div> 
        )) : <div className='flex flex-col gap-2 justify-center items-center pt-14'>
            <FaBell className='text-4xl text-[#f3f4f5]'/>
            <p className='text-sm text-custom-gray-3 font-medium '>No notification yet!</p>
        </div> }
      </div>
        <hr />
      <div className="flex justify-end mt-4">
        <button className="text-sm text-custom-dark-blue-1 underline font-semibold" onClick={clearAllNotifications}>
          Clear all
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
