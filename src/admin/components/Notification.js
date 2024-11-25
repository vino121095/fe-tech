import React, { useState } from 'react';
import { X, Box, MessageCircle } from 'lucide-react';

const NotificationPopup = ({ notify }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Received',
      message: 'Lorem ipsum dolor sit amet consectetur. Eget gravida nisl faucibus egestas.'
    },
    {
      id: 2,
      type: 'order',
      title: 'Order Received',
      message: 'Lorem ipsum dolor sit amet consectetur. Eget gravida nisl faucibus egestas.'
    },
    {
      id: 3,
      type: 'complaint',
      title: 'Complaint',
      message: 'Lorem ipsum dolor sit amet consectetur. Eget gravida nisl faucibus egestas.'
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Received',
      message: 'Lorem ipsum dolor sit amet consectetur. Eget gravida nisl faucibus egestas.'
    },
    {
      id: 5,
      type: 'order',
      title: 'Order Received',
      message: 'Lorem ipsum dolor sit amet consectetur. Eget gravida nisl faucibus egestas.'
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'order':
        return <Box className="w-6 h-6 text-blue-500" />;
      case 'complaint':
        return <MessageCircle className="w-6 h-6 text-blue-500" />;
      default:
        return <Box className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <>
      <button 
        className="mr-4 border-0 bg-transparent p-0"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <img
          src={notify}
          alt="notify"
          className="mt-2"
        />
      </button>

      {showNotifications && (
        <div className="fixed inset-0 flex items-start justify-center z-50">
          {/* Semi-transparent background overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowNotifications(false)}
          />
          
          {/* Notification panel */}
          <div className="relative max-w-md w-full bg-white mt-16 mx-4 rounded-lg shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Notification</h2>
                <button 
                  className="text-gray-400 hover:text-gray-600 border-0 bg-transparent p-0"
                  onClick={() => setShowNotifications(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="flex items-start p-4 bg-blue-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4">
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold mb-1">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationPopup;