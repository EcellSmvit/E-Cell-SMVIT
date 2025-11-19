import React from 'react';

function About() {
  return (
    <section className="w-full min-h-[40vh] flex flex-col items-center justify-center gap-8 sm:gap-10 px-4 sm:px-8 md:px-10 relative z-10 pointer-events-none">
      <h1 className="p-2 text-3xl font-extrabold tracking-tight text-center text-white drop-shadow-lg xs:text-4xl sm:text-5xl sm:p-4">
        About StarPitch 3.0
      </h1>
      <div className="w-full max-w-4xl">
        <p className="p-4 text-base leading-relaxed text-justify rounded-xl shadow-md backdrop-blur-lg pointer-events-auto xs:text-lg sm:text-xl md:text-2xl text-white/90 bg-white/10">
          StarPitch 3.0 is the flagship pitch competition hosted by E-CELL, designed to empower aspiring entrepreneurs and innovators to showcase their groundbreaking ideas. Whether you're forming your very first startup pitch or a seasoned team with bold plans, StarPitch welcomes creative minds from all backgrounds. With experienced mentors, generous prizes, and invaluable networking, this event is more than just a contest—it’s the launching pad for the next generation of changemakers. Join us to transform your vision into reality!
        </p>
      </div>
    </section>
  );
}

export default About;