import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 shadow-md">
      {/* Navbar Start - Logo & Mobile Menu */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* Mobile Menu Content */}
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        {/* Logo */}
        <Link to="/" className="cursor-pointer ml-4">
          <img 
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8"
          />
        </Link>
        <Link to="/" className="btn btn-ghost -ml-2">
          <span className="text-2xl font-bold">Company</span>
        </Link>
      </div>

      {/* Navbar Center - Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><Link to="/about" className="text-base font-semibold">About</Link></li>
          <li><Link to="/pricing" className="text-base font-semibold">Pricing</Link></li>
          <li><Link to="/features" className="text-base font-semibold">Features</Link></li>
          <li><Link to="/contact" className="text-base font-semibold">Contact</Link></li>
        </ul>
      </div>

      {/* Navbar End - Sign In Button */}
      <div className="navbar-end">
        <Link to="/signin" className="btn btn-primary">Sign In</Link>
      </div>
    </div>
  );
}
