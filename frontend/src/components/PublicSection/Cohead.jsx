import React from "react";
import { Linkedin } from "lucide-react";

const headsList = [
  {
    name: "Ayush Thakur",
    img: "https://ik.imagekit.io/es6xialea/P1200524.JPG?updatedAt=1754731371987",
    linkedin: "https://www.linkedin.com/in/ayush-thakur015/",
    batch: "Corporate Relations Co-Head",
  },
  {
    name: "Sarthak Tripathi",
    img: "https://ik.imagekit.io/es6xialea/SARTHAK%20TRIPATHI_NoysExme7k?updatedAt=1754730569364",
    linkedin: "https://www.linkedin.com/in/sarthak-tripathi-b11458295/",
    batch: "Operations Co-Head",
  },
  {
    name: "Anuj Kumar Dixit",
    img: "https://ik.imagekit.io/es6xialea/ANUJ%20KUMAR%20DIXIT_aHyMWdDia?updatedAt=1754730905215",
    linkedin: "https://www.linkedin.com/in/anuj-kumar-dixit-668437280/",
    batch: "Events & Marketing Co-Head",
  },
  {
    name: "Mariam Shuaib",
    img: "https://ik.imagekit.io/96gea10vb/NewTeamImage4_XdCP9rn0Z?updatedAt=1751669076681",
    linkedin: "https://www.linkedin.com/in/mariam-shuaib-003362328/",
    batch: "Events & Marketing Co-Head",
  },
  {
    name: "Shashwat Ranjan",
    img: "https://ik.imagekit.io/96gea10vb/images/webp/ShashwatR.webp?updatedAt=1747321667103",
    linkedin: "https://www.linkedin.com/in/shashwat-ranjan-140908227/",
    batch: "Design & Media Co-Head",
  }
];

function HeadCard({ name, img, linkedin, batch }) {
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");
  return (
    <div className="relative w-[220px] h-[300px] rounded-xl overflow-hidden shadow-lg bg-[#18181b] flex flex-col justify-end 
      group m-3 transition-transform duration-300 hover:scale-105 hover:shadow-[0_6px_28px_rgba(109,77,254,0.15)]">
      <img
        src={img}
        alt={name}
        className="object-cover object-top absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.01) 55%, rgba(0,0,0,0.9) 100%)"
        }}
      />
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="absolute bottom-[78px] right-4 z-10 text-white hover:text-[#0A66C2] transition"
      >
        <Linkedin size={22} />
      </a>
      <div className="relative z-10 px-4 pb-4">
        <div className="mb-1">
          <span className="block text-lg font-bold leading-tight text-white">
            {firstName}
          </span>
          {lastName && (
            <span className="block text-lg font-bold leading-tight text-white">
              {lastName}
            </span>
          )}
        </div>
        <div className="mb-0.5 text-xs text-white">
          <span className="font-semibold">{batch}</span>
        </div>
      </div>
    </div>
  );
}

function Cohead() {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-black">
      <div className="flex flex-row gap-2 items-center mt-8 mb-8">
        <h1 className="mb-2 text-5xl font-black text-white sm:text-6xl">OUR</h1>
        <h2 className="bg-[#6D4DFE] px-6 py-2 rounded-lg text-white text-5xl font-black sm:text-6xl">CO-HEADS</h2>
      </div>
      <div className="flex flex-wrap gap-3 justify-center items-center">
        {headsList.map((head, idx) => (
          <HeadCard
            key={head.name + "-" + idx}
            name={head.name}
            img={head.img}
            linkedin={head.linkedin}
            batch={head.batch}
          />
        ))}
      </div>
    </div>
  );
}

export default Cohead;
