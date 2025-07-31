import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';



function Footer() {
    const footerRef = useRef(null);
    const logoRef = useRef(null);
    const h1Ref = useRef(null);
    const copyrightRef = useRef(null);
    const menuRefs = useRef([]);
    const socialRefs = useRef([]);
    const contactRefs = useRef([]);


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
        const allElements = [
            ...menuRefs.current,
            ...socialRefs.current,
            ...contactRefs.current,
            h1Ref.current,
            copyrightRef.current,
            logoRef.current
        ];
        
        if (allElements.some(el => !el)) {
            return;
        }

        let observer;


        const animateFooter = () => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out", duration: 0.8 }
            });


            tl.fromTo(logoRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 0.1, duration: 1.5, ease: "power2.out" },
                "start"
            )

            .fromTo([...menuRefs.current, ...socialRefs.current, ...contactRefs.current],
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1 },
                "start+=0.3"
            )

            .fromTo(h1Ref.current,
                { y: 100, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2 },
                "start+=0.6"
            )

            .fromTo(copyrightRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1 },
                "start+=1.0"
            );
        };

        if (footerRef.current) {
            observer = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateFooter();
                            obs.disconnect();
                        }
                    });
                },
                { threshold: 0.2 }
            );
            observer.observe(footerRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <footer
            ref={footerRef}
            className="flex overflow-hidden relative flex-col justify-between w-full min-h-screen font-sans text-white bg-black select-none"
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'linear-gradient(180deg, #000000 0%, #3d26a7 100%)'
                }}
            />

            <img
                ref={logoRef}
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] md:w-[30rem] opacity-0 z-10 pointer-events-none'
                src="https://www.ecellsmvit.in/images/Ecell%20Logo%20Vector.svg"
                alt="E-Cell Background Logo"
            />

            <div className="flex relative z-20 flex-col flex-grow px-6 py-12 mx-auto w-full max-w-7xl md:px-8 md:py-16">
                <div className="grid grid-cols-1 gap-10 mb-16 w-full md:grid-cols-3 md:gap-8 md:mb-24">
                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <h4 ref={addToMenuRefs} className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">Menu</h4>
                        <nav className="flex flex-col gap-2">
                            {["Home", "Events", "Our Team"].map((text) => {
                                const sectionId = text === "Home" ? "home" : text.toLowerCase().replace(' ', '-');
                                const handleClick = (e) => {
                                    e.preventDefault();
                                    if (sectionId === "home") {
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    } else {
                                        const section = document.getElementById(sectionId);
                                        if (section) {
                                            section.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }
                                };
                                return (
                                    <a
                                        key={text}
                                        ref={addToMenuRefs}
                                        href={`#${sectionId}`}
                                        className="text-lg text-gray-200 transition-colors duration-300 hover:text-white"
                                        onClick={handleClick}
                                    >
                                        {text}
                                    </a>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <h4 ref={addToSocialRefs} className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">Socials</h4>
                        <nav className="flex flex-col gap-2">
                            {[
                                { name: "Instagram", url: "https://www.instagram.com/ecellsmvit" },
                                { name: "LinkedIn", url: "https://www.linkedin.com/company/e-cell-sirmvit" },
                                { name: "Twitter", url: "https://twitter.com/ecellsmvit" }
                            ].map((social) => (
                                <a key={social.name} ref={addToSocialRefs} href={social.url} target="_blank" rel="noopener noreferrer" className="text-lg text-gray-200 transition-colors duration-300 hover:text-white">
                                    {social.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                         <h4 ref={addToContactRefs} className="mb-4 text-sm font-bold tracking-widest text-gray-400 uppercase">Contact Us</h4>
                        <div className="flex flex-col gap-2">
                            <p ref={addToContactRefs} className="text-lg text-gray-200 transition-colors duration-300 cursor-pointer hover:text-white">
                                Email: ecellsmvit@gmail.com
                                
                            </p>
                            <p ref={addToContactRefs} className="text-lg text-gray-200 transition-colors duration-300 cursor-pointer hover:text-white">
                            For partnerships: connect.ecellsmvit@gmail.com
                                
                            </p>
                        </div>
                    </div>
                </div>

                
                <div className="flex flex-grow justify-center items-center my-10 text-center">
                    <h1 ref={h1Ref} className="text-white font-['Anton',_sans-serif] text-[18vw] md:text-[14vw] lg:text-[15rem] leading-none tracking-normal">
                        E-CELL SMVIT
                    </h1>
                </div>
                <div className="w-full">
                    <p ref={copyrightRef} className="text-sm text-center text-gray-400">
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
