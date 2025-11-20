import React, { useState } from 'react';

const questions = [
  {
    q: "What is StarPitch 3.0?",
    a: "StarPitch 3.0 is a business pitching competition where teams showcase their innovative ideas to a panel of judges and stand a chance to win exciting prizes."
  },
  {
    q: "Who can participate?",
    a: "The event is open to all undergraduate students from any faculty or discipline."
  },
  {
    q: "How do I register?",
    a: "You can register through the Registration section of this website. Click on 'Registration' in the navigation bar and follow the instructions."
  },
  {
    q: "Is there a registration fee?",
    a: "No, participation in StarPitch 3.0 is completely free."
  },
  {
    q: "Can I participate as an individual?",
    a: "You must form a team of 2 to 4 participants to enter the competition."
  },
  {
    q: "What are the prizes?",
    a: "Exciting prizes and certificates await the winning teams."
  }
];

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center gap-8 relative z-10 pointer-events-none px-6">
      <h1 className="font-black text-4xl md:text-5xl text-white pointer-events-auto mb-3">FAQ</h1>
      <div className="w-full max-w-4xl flex flex-col gap-4 pointer-events-auto">
        {questions.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20"
          >
            <button
              className="w-full text-left flex justify-between items-center px-8 py-4 text-lg text-white font-semibold focus:outline-none"
              onClick={() => toggleIndex(idx)}
            >
              <span>{item.q}</span>
              <svg
                className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${openIndex === idx ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            {openIndex === idx && (
              <div className="px-8 pb-4 text-white text-base transition-all duration-300">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq