import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function Loding() {
  const divRefs = useRef([]);
  const logoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [hideDivs, setHideDivs] = useState(false);

  useEffect(() => {
    if (progress < 100) {
      const timeout = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 15);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setLoadingComplete(true), 400);
    }
  }, [progress]);

  useEffect(() => {
    gsap.to(logoRef.current, {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
    });
  }, []);

  useEffect(() => {
    if (loadingComplete) {
      gsap.to(divRefs.current, {
        y: "-100%",
        // opacity: 0,
        rotate: 3,
        duration: 1,
        ease: "line",
        stagger: 0.1,
        onComplete: () => setHideDivs(true),
      });
    }
  }, [loadingComplete]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        // background: "#0e0e0e",
        position: "relative",
        overflow: "hidden",
        flexDirection: "row",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {!loadingComplete && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <img
            ref={logoRef}
            src="https://www.ecellsmvit.in/images/ecellwhite.png"
            alt="Ecell Logo"
            style={{
              width: "160px",
              filter: "drop-shadow(0 0 20px rgba(109, 77, 254, 0.3))",
              marginBottom: "20px",
            }}
          />
          <p className="text-4xl font-black text-white">IGNITE INNOVATE AND INSPIRE</p>
        </div>
      )}

      {!loadingComplete && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            right: 40,
            fontSize: "4rem",
            fontWeight: "bold",
            color: "#FFFFFF",
            fontFamily: "monospace",
            zIndex: 20,
            pointerEvents: "none",
            opacity: 0.85,
          }}
        >
          {progress}%
        </div>
      )}

      {!loadingComplete && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "10vw",
            width: "80vw",
            height: "40px",
            background: "#1a1a1a",
            borderRadius: "0px",
            overflow: "hidden",
            zIndex: 20,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#fff",
              transition: "width 0.2s ease-in-out",
            }}
          />
        </div>
      )}

      {!hideDivs &&
        [...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (divRefs.current[i] = el)}
            style={{
              flex: 1,
              height: "100%",
              background: "linear-gradient(0deg, #6D4DFE, #000)",
              borderRight: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none",
              transition: "all 0.3s ease",
              zIndex: 1,
            }}
          />
        ))}
    </div>
  );
}

export default Loding;
