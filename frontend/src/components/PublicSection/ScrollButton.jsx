import React from 'react';

const ScrollButton = ({ targetRef }) => {
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
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-5 py-3 bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition z-10"
    >
      ↓ Scroll Down
    </button>
  );
};

export default ScrollButton;
