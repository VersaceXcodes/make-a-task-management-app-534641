import React from 'react';

interface ToastNotificationProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ 
  message, 
  type = 'info', 
  onClose 
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 ${getTypeStyles()}`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        {onClose && (
          <button 
            onClick={onClose}
            className="ml-4 text-lg font-bold hover:opacity-75"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ToastNotification;