import React from 'react';
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-blue-800 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-xl text-white text-center md:text-start mb-4 md:mb-0">
            &copy; {date} - All rights reserved by Tanushri Das
          </p>
          <div className="flex space-x-3">
            <a
              className="text-2xl text-white"
              href="https://www.linkedin.com/in/tanushri-das-06a520194/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              className="text-2xl text-white"
              href="https://www.facebook.com/tanushri.das01?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              className="text-2xl text-white"
              href="https://www.youtube.com/watch?v=ZvggB9FT4gM&ab_channel=MuseumofFineArts%2CBoston"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
