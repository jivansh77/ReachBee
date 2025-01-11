import React from 'react'
import { Link } from 'react-router-dom'
import {FaFileAlt, FaChartBar, FaBars, FaBrain } from 'react-icons/fa'

export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSidebar} 
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-800 text-[#69c1cb]"
      >
        {!isOpen && <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-gray-800 text-[#69c1cb] transform transition-transform duration-300 ease-in-out z-10
        lg:translate-x-0 lg:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-1 cursor-pointer">
            <img 
              src="/logo.png" 
              alt="BrainFox Logo" 
              className="h-20 w-auto mb-7"
            />
            <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#efa675] to-[#fec76f]">BrainFox</h2>
          </Link>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link to="/documents" className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition duration-150 ease-in-out text-[#69c1cb] font-semibold">
                  <FaFileAlt className="mr-3 text-[#69c1cb]" />
                  Documents
                </Link>
              </li>
              <li>
                <Link to="/Memory" className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition duration-150 ease-in-out text-[#69c1cb] font-semibold">
                  <FaBrain className="mr-3 text-[#69c1cb]" />
                  Study Tools
                </Link>
              </li>
              <li>
                <Link to="/results" className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition duration-150 ease-in-out text-[#69c1cb] font-semibold">
                  <FaChartBar className="mr-3 text-[#69c1cb]" />
                  Results
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-6">
          <h3 className="text-lg font-bold mb-2 text-white">Quick Guide</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-white">
            <li>Upload PDF files of past papers</li>
            <li>Wait for AI analysis</li>
            <li>Review topic distribution</li>
            <li>Check predicted questions</li>
          </ol>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-0"
          onClick={toggleSidebar}
        />
      )}
    </>
  )
}