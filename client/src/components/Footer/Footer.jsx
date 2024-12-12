import React from 'react'
import "./footer.css"
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer">
        <p>Rohan Sangle &copy; 2024.</p>
        <p>All rights reserved.</p>
        <p>Terms and conditions apply.</p>
        <a href="https://github.com/RohanSangle/sw-config-generator" target="_blank" rel="noopener noreferrer">
          <FaGithub color='white' size={20} />
        </a>
        <a href="https://www.linkedin.com/in/rohan-sangle/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin color='white' size={20} />
        </a>
        <a href="https://x.com/Rohan_Sangle02" target="_blank" rel="noopener noreferrer">
          <FaXTwitter color='white' size={20} />
        </a>
    </div>
  )
}

export default Footer