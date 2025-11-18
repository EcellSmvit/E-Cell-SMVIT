import React from "react";
import { Linkedin } from "lucide-react";

const headsList = [
  {
    name: "Satvik Gupta",
    img: "https://ik.imagekit.io/es6xialea/drive-download-20251115T121438Z-1-001/Satvik.jpg?updatedAt=1763209006644",
    linkedin: "https://www.linkedin.com/in/satvik--gupta/",
    batch: "Corporate Relations Head",
  },
  {
    name: "Anant Srivastava",
    img: "https://ik.imagekit.io/es6xialea/drive-download-20251115T121438Z-1-001/Anant.jpg?updatedAt=1763209004736",
    linkedin: "https://www.linkedin.com/in/anant-srivastava-709174293/",
    batch: "Operations Head",
  },
  {
    name: "Bhoomi Nayak",
    img: "https://ik.imagekit.io/es6xialea/drive-download-20251115T121438Z-1-001/Bhoomi.jpg?updatedAt=1763209006562",
    linkedin: "https://www.linkedin.com/in/bhoomi-nayak-943083305/",
    batch: "Events & Marketing Head",
  },
  {
    name: "Shashwat Shaurya",
    img: "https://ik.imagekit.io/es6xialea/drive-download-20251115T121438Z-1-001/Shashwat%20Shaurya.jpg?updatedAt=1763209005937",
    linkedin: "https://www.linkedin.com/in/shashwat-shaurya-0828a5207/",
    batch: "Design & Media Head",
  },
  {
    name: "Bikesh Kumar",
    img: "https://ik.imagekit.io/es6xialea/Bikesh_-y-WYu2bvh?updatedAt=1754730133391",
    linkedin: "https://www.linkedin.com/in/bikesh-kumar-37b71428b/",
    batch: "Tech Head",
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

function Heads() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      <div className="flex flex-row gap-2 items-center mt-8 mb-8">
        <h1 className="mb-2 text-5xl font-black text-white sm:text-6xl">OUR</h1>
        <h2 className="bg-[#6D4DFE] px-6 py-2 rounded-lg text-white text-5xl font-black sm:text-6xl">HEADS</h2>
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

export default Heads;
