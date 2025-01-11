import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-10">
      <aside className="flex items-center">
        <img 
          src="/logo.png" 
          alt="Logo"
          className="h-12 w-auto"
        />
        <span className="text-2xl font-bold">Company</span>
      </aside>
      <nav>
        <h6 className="footer-title">Features</h6>
        <a className="link link-hover">Feature 1</a>
        <a className="link link-hover">Feature 2</a>
        <a className="link link-hover">Feature 3</a>
        <a className="link link-hover">Feature 4</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Careers</a>
        <a className="link link-hover">Press Kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of Use</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Cookie Policy</a>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="https://twitter.com/company" target="_blank" rel="noopener noreferrer" 
             className="text-xl hover:text-primary transition-colors">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com/company/company" target="_blank" rel="noopener noreferrer"
             className="text-xl hover:text-primary transition-colors">
            <FaLinkedin />
          </a>
          <a href="https://github.com/company" target="_blank" rel="noopener noreferrer"
             className="text-xl hover:text-primary transition-colors">
            <FaGithub />
          </a>
          <a href="https://instagram.com/company" target="_blank" rel="noopener noreferrer"
             className="text-xl hover:text-primary transition-colors">
            <FaInstagram />
          </a>
        </div>
        <p className="mt-4 text-sm">Follow us for updates and tips!</p>
      </nav>
    </footer>
  );
};

export default Footer;