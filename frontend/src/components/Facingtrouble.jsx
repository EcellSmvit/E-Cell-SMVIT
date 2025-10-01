import React from 'react'
import { Mail, Phone } from 'lucide-react';

function Facingtrouble() {
  return (
    <div className="w-full min-h-[60vh] bg-[#111111] text-white flex flex-col items-center justify-center gap-8 py-10 px-4">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="p-2 text-4xl font-medium sm:text-6xl md:text-8xl">Need Help?</h1>
        <h2 className="max-w-2xl text-base sm:text-xl md:text-2xl">
          If you have any queries or face technical issues while filling out the form, feel free to reach out to us:
        </h2>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center w-full sm:flex-row sm:gap-8">
        <a
          href="mailto:ecellsmvit@gmail.com"
          className="flex gap-2 justify-center items-center p-3 w-full text-base text-black bg-white rounded-full transition sm:p-4 sm:text-xl md:text-2xl sm:w-auto hover:bg-gray-200"
        >
          <Mail /> ecellsmvit@gmail.com
        </a>
        <a
          href="tel:+917903897660"
          className="flex gap-2 justify-center items-center p-3 w-full text-base text-black bg-white rounded-full transition sm:p-4 sm:text-xl md:text-2xl sm:w-auto hover:bg-gray-200"
        >
          <Phone /> +91 7903897660
        </a>
      </div>
    </div>
  );
}

export default Facingtrouble