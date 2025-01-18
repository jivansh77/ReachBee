import React from 'react';

const ExitIntentPopup = ({ 
  title, 
  message, 
  backgroundColor, 
  popupWidth, 
  popupPosition 
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className={`p-6 rounded-lg shadow-lg ${backgroundColor} ${popupWidth} ${popupPosition}`}>
        <h2 className="text-2xl font-bold text-center text-gray-800">{title}</h2>
        <p className="mt-4 text-center text-lg text-gray-600">{message}</p>
        <div className="mt-6 flex justify-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Claim Your Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;