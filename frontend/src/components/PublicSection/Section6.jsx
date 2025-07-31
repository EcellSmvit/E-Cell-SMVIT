import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';

const ShinyText = ({ children, className = "" }) => (
  <span
    className={`inline-block relative shiny-text ${className}`}
    style={{
      background: 'linear-gradient(90deg, #fff 20%, #6C4DFF 40%, #fff 60%)',
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'shine 2.5s linear infinite',
      fontWeight: 'inherit',
    }}
  >
    {children}
    <style>
      {`
        @keyframes shine {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}
    </style>
  </span>
);

function Section6() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const connectTextRef = useRef(null);
  const paragraphRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const setInputRef = (el, idx) => (inputRefs.current[idx] = el);

  useEffect(() => {
    let observer;

    const animateSection = () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "start"
      )
      .fromTo(
        connectTextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "<0.2"
      )
      .fromTo(
        paragraphRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "<0.2"
      )
      .fromTo(
        inputRefs.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
        "<0.3"
      )
      .fromTo(
        buttonRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 },
        "<0.2"
      );
    };

    if (sectionRef.current) {
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateSection();
              obs.disconnect();
            }
          });
        },
        {
          threshold: 0.2
        }
      );
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSent(false);

    // Basic validation
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        PUBLIC_KEY
      );
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id='contact-section'
      ref={sectionRef}
      className='w-full min-h-screen bg-gradient-to-br from-[#6C4DFF] via-black to-black flex flex-col items-center justify-center p-6 md:p-12 lg:p-20'
    >
      <h1
        ref={headingRef}
        className='p-2 mb-8 text-4xl font-extrabold tracking-wide text-center text-white drop-shadow-lg md:text-5xl lg:text-6xl'
      >
        CONTACT <span className="text-[#6C4DFF]">US</span>
      </h1>

      <div className='flex flex-col gap-12 justify-center items-center w-full max-w-7xl lg:flex-row lg:gap-24 lg:items-start'>
        <div className="flex flex-col flex-1 items-center text-center lg:items-start lg:text-left">
          <h2 ref={connectTextRef} className="mb-4 text-3xl font-bold text-white drop-shadow md:text-4xl lg:text-5xl">
            <ShinyText>Let's Connect!</ShinyText>
          </h2>
          <p ref={paragraphRef} className="mb-8 max-w-lg text-lg font-medium leading-relaxed md:text-xl lg:text-2xl text-white/80">
            Have questions, ideas, or want to collaborate with{' '}
            <span className="text-[#6C4DFF] font-semibold">
              <ShinyText>E-CELL SMVIT</ShinyText>
            </span>
            ? <br />
            Reach out to us and our team will get back to you as soon as possible.
            <br /><br />
            <span className="italic text-white/60">
              <ShinyText>We love hearing from passionate entrepreneurs, students, and partners!</ShinyText>
            </span>
          </p>
        </div>

        <div className="flex flex-1 justify-center w-full lg:w-auto">
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-5 w-full max-w-md rounded-2xl border shadow-2xl backdrop-blur-lg md:p-8 md:space-y-6 bg-white/10 border-white/20"
            autoComplete="off"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              ref={el => setInputRef(el, 0)}
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6C4DFF] font-medium transition-all duration-300 hover:border-[#6C4DFF]"
              disabled={loading}
              autoComplete="off"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              ref={el => setInputRef(el, 1)}
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6C4DFF] font-medium transition-all duration-300 hover:border-[#6C4DFF]"
              disabled={loading}
              autoComplete="off"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              ref={el => setInputRef(el, 2)}
              value={form.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6C4DFF] font-medium transition-all duration-300 hover:border-[#6C4DFF]"
              disabled={loading}
              autoComplete="off"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              ref={el => setInputRef(el, 3)}
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6C4DFF] resize-none font-medium transition-all duration-300 hover:border-[#6C4DFF]"
              disabled={loading}
              autoComplete="off"
            ></textarea>

            {error && (
              <div className="text-sm font-semibold text-red-400">{error}</div>
            )}
            {sent && (
              <div className="text-sm font-semibold text-green-400">Message sent successfully!</div>
            )}

            <button
              ref={buttonRef}
              type="submit"
              className={`w-full py-3 rounded-xl bg-[#6C4DFF] text-white font-semibold hover:bg-[#4E46E4] transition duration-300 shadow-lg tracking-wide text-lg transform hover:-translate-y-1 hover:shadow-xl ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Section6;
