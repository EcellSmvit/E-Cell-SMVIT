import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Helper component to create some scrollable space
const ScrollPlaceholder = () => (
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Scroll Down</h1>
        <p className="text-xl">The footer will animate in when it enters the viewport.</p>
        <svg className="w-10 h-10 mt-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
    </div>
);


function Footer() {
    // Refs for various elements to be animated
    const footerRef = useRef(null);
    const logoRef = useRef(null);
    const h1Ref = useRef(null);
    const copyrightRef = useRef(null);
    const menuRefs = useRef([]);
    const socialRefs = useRef([]);
    const contactRefs = useRef([]);

    // Helper functions to add elements to their respective ref arrays
    const addToMenuRefs = (el) => {
        if (el && !menuRefs.current.includes(el)) {
            menuRefs.current.push(el);
        }
    };
    const addToSocialRefs = (el) => {
        if (el && !socialRefs.current.includes(el)) {
            socialRefs.current.push(el);
        }
    };
    const addToContactRefs = (el) => {
        if (el && !contactRefs.current.includes(el)) {
            contactRefs.current.push(el);
        }
    };

    useEffect(() => {
        // Ensure all refs are populated before animating
        const allElements = [
            ...menuRefs.current,
            ...socialRefs.current,
            ...contactRefs.current,
            h1Ref.current,
            copyrightRef.current,
            logoRef.current
        ];
        
        if (allElements.some(el => !el)) {
            // If any ref is not yet set, wait for the next render
            return;
        }

        let observer;

        // The main animation function using GSAP
        const animateFooter = () => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out", duration: 0.8 }
            });

            // Start with the subtle background logo animation
            tl.fromTo(logoRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 0.1, duration: 1.5, ease: "power2.out" },
                "start"
            )
            // Animate the top section columns with a stagger effect
            .fromTo([...menuRefs.current, ...socialRefs.current, ...contactRefs.current],
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1 },
                "start+=0.3"
            )
            // Animate the large central heading
            .fromTo(h1Ref.current,
                { y: 100, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2 },
                "start+=0.6"
            )
            // Animate the copyright text at the bottom
            .fromTo(copyrightRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1 },
                "start+=1.0"
            );
        };

        // Use Intersection Observer to trigger the animation only when the footer is visible
        if (footerRef.current) {
            observer = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateFooter();
                            obs.disconnect(); // Disconnect after animating once
                        }
                    });
                },
                { threshold: 0.2 } // Trigger when 20% of the footer is visible
            );
            observer.observe(footerRef.current);
        }

        // Cleanup function to disconnect the observer when the component unmounts
        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <footer
            ref={footerRef}
            className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden text-white font-sans select-none bg-black"
        >
            {/* Background Gradient Layer */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'linear-gradient(180deg, #000000 0%, #3d26a7 100%)'
                }}
            />

            {/* Subtle Background Logo */}
            <img
                ref={logoRef}
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[35rem] opacity-0 z-10 pointer-events-none'
                src="https://www.ecellsmvit.in/images/Ecell%20Logo%20Vector.svg"
                alt="E-Cell Background Logo"
            />

            {/* Main Content Container */}
            <div className="relative z-20 flex flex-col flex-grow w-full max-w-7xl mx-auto px-6 py-12 md:px-8 md:py-16">
                {/* Top Section: Grid Layout for Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 w-full mb-16 md:mb-24">
                    {/* Column 1: Menu */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 ref={addToMenuRefs} className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Menu</h4>
                        <nav className="flex flex-col gap-2">
                            {["Home", "Events", "Our Team", "Gallery"].map((text) => (
                                <a key={text} ref={addToMenuRefs} href={`#${text.toLowerCase().replace(' ', '-')}`} className="text-lg text-gray-200 hover:text-white transition-colors duration-300">
                                    {text}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Column 2: Socials */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 ref={addToSocialRefs} className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Socials</h4>
                        <nav className="flex flex-col gap-2">
                            {[
                                { name: "Instagram", url: "https://www.instagram.com/ecellsmvit" },
                                { name: "LinkedIn", url: "https://www.linkedin.com/company/ecellsmvit" },
                                { name: "Twitter", url: "https://twitter.com/ecellsmvit" }
                            ].map((social) => (
                                <a key={social.name} ref={addToSocialRefs} href={social.url} target="_blank" rel="noopener noreferrer" className="text-lg text-gray-200 hover:text-white transition-colors duration-300">
                                    {social.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                         <h4 ref={addToContactRefs} className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Contact Us</h4>
                        <div className="flex flex-col gap-2">
                            <p ref={addToContactRefs} className="text-lg text-gray-200 hover:text-white transition-colors duration-300 cursor-pointer">
                                Contact: +91 98765 43210
                            </p>
                            <p ref={addToContactRefs} className="text-lg text-gray-200 hover:text-white transition-colors duration-300 cursor-pointer">
                                Email: ecellsmvit@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                
                <div className="flex-grow flex items-center justify-center text-center my-10">
                    <h1 ref={h1Ref} className="text-white font-['Anton',_sans-serif] text-[18vw] md:text-[14vw] lg:text-[15rem] leading-none tracking-normal">
                        E-CELL SMVIT
                    </h1>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="w-full mt-16 md:mt-24">
                    <p ref={copyrightRef} className="text-center text-gray-400 text-sm">
                        © {new Date().getFullYear()} E-Cell SMVIT. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}


export default function App() {
  return (
    <main>
      <Footer />
    </main>
  );
}
