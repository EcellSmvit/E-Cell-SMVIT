import React from 'react';
import { Phone,Mail,Instagram,Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer id='contact'
      className="w-[100vw] min-h-[50vh] flex flex-col items-center justify-center relative z-10 pointer-events-none"
      style={{
        background: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        // borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.18)'
      }}
    >
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 px-6 pt-8 pb-2">
        <div className="flex flex-col items-start gap-2 text-white pointer-events-auto">
          <div className="font-bold text-lg mb-2">CONTACT US</div>
          <div className="flex items-center gap-2 text-sm">
          <Phone />
            <span>+91 7338620007</span>
            <span className="mx-1">/</span>
            <span>+91 7903897660</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail/>
            <span>ecellsmvit@gmail.com</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2 pointer-events-auto py-2">
          <div className="flex items-center gap-4">
            <img
              src="https://ik.imagekit.io/es6xialea/logowithoutname_FRoJAY4ve?updatedAt=1755297005039"
              alt="ecell logo"
              className="h-16 object-contain"
              style={{filter: 'drop-shadow(0 1px 0.5px #0009)'}}
            />
            <img
              src="https://iic.mic.gov.in/assets/assets/images/iiclogo.png"
              alt="college logo"
              className="h-16 object-contain bg-white p-2 rounded-xl"
            />
          </div>
          <h1 className='text-white text-4xl'
          style={{ fontFamily: "'Modak', cursive" }}
          >Starpitch 3.0</h1>
          <div className="text-xs text-white/80 mt-2">© 2024 E-CELL SMVIT - All rights reserved</div>
        </div>
      </div>
      <div className="border-t border-pink-300 w-full max-w-5xl my-4"></div>
      <div className="flex gap-6 items-center justify-center pointer-events-auto mb-4">
        <a href="https://www.instagram.com/ecell_smvit/" target="_blank" rel="noopener noreferrer">
          <Instagram color="white" />
        </a>
        <a href="https://www.linkedin.com/company/e-cell-sirmvit/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
          <Linkedin color="white" />
        </a>
      </div>
      <div className="text-xs text-white/80 mb-3 pointer-events-auto">
        E-CELL SMVIT – Where aspiration meets opportunity
      </div>
    </footer>
  );
}

export default Footer;