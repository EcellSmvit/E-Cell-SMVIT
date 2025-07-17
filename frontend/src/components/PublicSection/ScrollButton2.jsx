import React from 'react';

const ScrollButton2 = ({ targetRef }) => {
  const handleScroll = () => {
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="absolute top-24 left-1/2 transform -translate-x-1/2 px-5 py-3 bg-white/20 text-black rounded-full shadow-lg hover:bg-white/30 transition z-10 backdrop-blur-md border border-white/30"
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      ↓ Scroll Down
    </button>
  );
};

export default ScrollButton2;
