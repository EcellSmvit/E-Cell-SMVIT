import React from 'react'

function AboutMobile() {
    return (
        <div
          className="w-screen min-h-auto flex bg-gradient-to-b from-[#6C4DFF] via-[#1f1c4d] to-black flex-col items-center justify-start gap-6 p-4"
          
        >
          {/* About Section */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6 w-full max-w-md flex flex-col items-center">
            <h2 className="text-xl font-bold text-white mb-2 tracking-wide">About Us</h2>
            <p className="text-white text-justify font-medium text-sm">
              We are a passionate team dedicated to fostering innovation, entrepreneurship, and growth. Our community brings together like-minded individuals to collaborate, learn, and create impactful solutions for the future.
            </p>
          </div>
    
          {/* Mission Section */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6 w-full max-w-md flex flex-col items-center">
            <h2 className="text-xl font-bold text-white mb-2 tracking-wide">Our Mission</h2>
            <p className="text-white text-justify font-medium text-sm">
              Our mission is to empower aspiring entrepreneurs and innovators by providing resources, mentorship, and a supportive environment. We strive to inspire creativity and drive positive change in our community and beyond.
            </p>
          </div>
        </div>
      );
}

export default AboutMobile