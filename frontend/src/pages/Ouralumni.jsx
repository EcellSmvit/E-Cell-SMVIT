import React from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Linkedin } from "lucide-react";

const alumniList = [
  {
    name: "Abhishek Thakur",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/Abhishek.webp?updatedAt=1747321655224",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/abhishek-thakur-283582223/",
  },
  {
    name: "AYUSH RATHORE",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/Ayush.webp?updatedAt=1747321660116",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/rathore10/",
  },
  {
    name: "MEHUL CHANDAK",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/mehul.webp?updatedAt=1747321663913",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/mehul-chandak-b94362196/",
  },
  {
    name: "ATHARV AGARWAL",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/atharv.webp?updatedAt=1747321658913",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/atharv-agrawal-55abb7224/",
  },
  {
    name: "CHINMAYI REDDY",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/chinmayi.webp?updatedAt=1747321661299",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/chinmayi-reddy-777724239/",
  },
  {
    name: "PURUSHUTTAM KUMAR",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/puru.webp?updatedAt=1747321664579",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/purushuttam-kumar0102/",
  },
  {
    name: "D YASWANTH KUMAR",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/YASWANTH.webp?updatedAt=1747321669776",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/d-yaswanth-kumar-2470a123a/",
  },
  {
    name: "N. RITHANYA SINGH",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/rithanya.webp?updatedAt=1747321664749",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/n-rithanya-singh-aa6b51258/",
  },
  {
    name: "KEERTHI SV",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/Keerthi.webp?updatedAt=1747321662799",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/keerthi-sv-bt-8624a625a/",
  },
  {
    name: "SAI RAKSHA",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/Sai.webp?updatedAt=1747321666486",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/sai-raksha-72ba1a22a/",
  },
  {
    name: "SNEHA S",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/Sneha.webp?updatedAt=1747321667270",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/sneha-s-a60342241/",
  },
  
  {
    name: "NIDHI H",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/Nidhi.webp?updatedAt=1747321663676",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/nidhi-harsharaj-b4262a246/",
  },
  {
    name: "KAREN FRANCINA MORAIS",
    photo: "https://ik.imagekit.io/96gea10vb/images/webp/karen.webp?updatedAt=1747321662367",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/karen-morais-569949253/",
  },
  {
    name: "VANDHANA V NAIR",
    photo: "https://www.ecellsmvit.in/images/Vandhana.jpg",
    batch: "2021-2025",
    linkedin: "https://www.linkedin.com/in/vandhana-v-nair-3a5219221/",
  },
  
];

function AlumniCard({ name, photo, batch, linkedin }) {
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  return (
    <div className="relative w-[280px] h-[380px] rounded-xl overflow-hidden shadow-lg flex flex-col justify-end p-6 m-4 group hover:scale-105 transition-transform">
      <img
        src={photo}
        alt={name}
        className="object-cover object-top absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <div className="flex absolute right-6 bottom-32 z-10 flex-col gap-4 text-white/80">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="transition hover:text-[#0A66C2]"
        >
          <Linkedin />
        </a>
      </div>
      <div className="relative z-10 mt-auto">
        <div className="mb-2">
          <span className="block text-2xl font-bold leading-tight text-white">
            {firstName}
          </span>
          {lastName && (
            <span className="block text-2xl font-bold leading-tight text-white">
              {lastName}
            </span>
          )}
        </div>
        <div className="mb-2 text-base text-white">
          <span className="font-semibold">BATCH {batch}</span>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-[#18181b] text-white py-6 mt-12 flex flex-col items-center">
      <div className="text-sm text-center">
        &copy; {new Date().getFullYear()} E-Cell SMVIT. All rights reserved.
      </div>
      <div className="flex gap-4 mt-2">
        <a
          href="https://www.linkedin.com/company/e-cell-sirmvit"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#6D4DFE] transition"
        >
          LinkedIn
        </a>
        <a
          href="https://www.ecellsmvit.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#6D4DFE] transition"
        >
          Website
        </a>
      </div>
    </footer>
  );
}

function Ouralumni() {
  return (
    
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-background">
       
      <div className="flex overflow-hidden relative flex-col justify-center items-center w-full min-h-screen rounded-lg border bg-background">
        <FlickeringGrid
          className="absolute inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
          squareSize={4}
          gridGap={6}
          color="#6D4DFE"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={800}
          width={1200}
        />
        <div className="flex relative z-10 gap-4 justify-center items-center p-4 text-5xl font-black text-white sm:text-6xl">
          <h1>MEET OUR</h1>
          <h1 className="bg-[#6D4DFE] px-6 py-2 rounded-lg">ALUMNI</h1>
        </div>
        <p className="relative z-10 px-6 mt-4 mb-10 max-w-3xl text-lg text-center text-white/80">
          Our alumni are the pillars of inspiration, carrying forward the legacy of 
          innovation, leadership, and excellence. Their journeys motivate the next 
          generation to dream bigger, achieve more, and make a meaningful impact.
        </p>

        {/* Alumni Cards */}
        <div className="flex z-10 flex-wrap gap-6 justify-center items-center max-w-6xl">
          {alumniList.map((alumni, idx) => (
            <AlumniCard
              key={alumni.name + idx}
              name={alumni.name}
              photo={alumni.photo}
              batch={alumni.batch}
              linkedin={alumni.linkedin}
            />
          ))}
        </div>

        
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Ouralumni;
