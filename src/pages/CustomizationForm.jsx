import React, { useState } from 'react';
import ExitIntentPopup from './ExitIntentPopup';
import Modal from './Modal';

const CustomizationForm = () => {
  const [title, setTitle] = useState("Special Offer Just for You!");
  const [message, setMessage] = useState("Don't miss out on this amazing deal!");
  const [backgroundColor, setBackgroundColor] = useState("bg-white");
  const [popupWidth, setPopupWidth] = useState("w-96");
  const [popupPosition, setPopupPosition] = useState("top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2");
  const [showPreview, setShowPreview] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleGenerateCode = () => {
    const generatedCode = `
<!-- Add this to your HTML file -->
<div id="exitIntentPopup" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
  <div class="${backgroundColor} ${popupWidth} p-6 rounded-lg shadow-lg ${popupPosition}">
    <h2 class="text-2xl font-bold text-center text-gray-800">${title}</h2>
    <p class="mt-4 text-center text-lg text-gray-600">${message}</p>
    <div class="mt-6 flex justify-center">
      <button onclick="closePopup()" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Claim Your Offer
      </button>
    </div>
  </div>
</div>

<!-- Add this script to your page -->
<script>
  let exitShown = false;
  
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0 && !exitShown) {
      showPopup();
      exitShown = true;
    }
  });

  function showPopup() {
    document.getElementById('exitIntentPopup').classList.remove('hidden');
  }

  function closePopup() {
    document.getElementById('exitIntentPopup').classList.add('hidden');
  }
</script>`;

    setShowModal(true);
    return generatedCode;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Side: Customization Form */}
      <div className="w-1/2 p-8">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Customize Your Exit-Intent Popup</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Background Color</label>
              <select
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="bg-white">White</option>
                <option value="bg-blue-100">Light Blue</option>
                <option value="bg-green-100">Light Green</option>
                <option value="bg-yellow-100">Light Yellow</option>
                <option value="bg-red-100">Light Red</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Popup Width</label>
              <select
                value={popupWidth}
                onChange={(e) => setPopupWidth(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="w-80">Small</option>
                <option value="w-96">Medium</option>
                <option value="w-112">Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Position</label>
              <select
                value={popupPosition}
                onChange={(e) => setPopupPosition(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Center</option>
                <option value="top-10 left-10">Top Left</option>
                <option value="top-10 right-10">Top Right</option>
                <option value="bottom-10 left-10">Bottom Left</option>
                <option value="bottom-10 right-10">Bottom Right</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateCode}
            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Generate Code
          </button>
        </div>
      </div>

      {/* Right Side: Preview */}
      <div className="w-1/2 p-8 bg-gray-100">
        <div className="h-full flex items-center justify-center">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Live Preview</h2>
            {showPreview && (
              <ExitIntentPopup
                title={title}
                message={message}
                backgroundColor={backgroundColor}
                popupWidth={popupWidth}
                popupPosition={popupPosition}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal for generated code */}
      {showModal && (
        <Modal 
          code={handleGenerateCode()}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CustomizationForm;