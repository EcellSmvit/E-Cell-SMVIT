import React from "react";
import { cn } from "../lib/utils.js";
import { DotPattern } from "../components/magicui/dot-pattern.jsx";
import { Linkedin } from "lucide-react"



const TeamCard = ({ image, name, role, url }) => (
  <div className="flex relative z-20 flex-col justify-center items-center p-6 w-full max-w-xs text-white rounded-xl shadow-lg transition-transform transform bg-card hover:scale-105 hover:shadow-2xl">
    <img
      src={image}
      alt={name}
      className="object-cover mb-4 w-64 h-80 rounded-xl"
      style={{ objectPosition: "center" }}
    />
    <h3 className="text-xl font-bold">{name}</h3>
    <p className="mb-4 text-muted-foreground text-white/80">{role}</p>
    {url && (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`LinkedIn profile of ${name}`}
        className="text-white transition-colors hover:text-primary"
      >
        <Linkedin className="w-6 h-6" />
      </a>
    )}
  </div>
);

const teamStructure = [
  {
    title: "Corporate Relations",
    members: [
      {
        name: "Tanish Raj",
        role: "Director, Corporate Relations",
        image: "https://ik.imagekit.io/es6xialea/TANISH%20RAJ_TMGOU9Rzo?updatedAt=1754729813985",
        url: "https://www.linkedin.com/in/tanish-raj-598617224/"
      },
      {
        name: "Satvik Gupta",
        role: "Head, Corporate Relations",
        image: "https://ik.imagekit.io/es6xialea/SATVIK%20GUPTA_V5fYEhb1R?updatedAt=1754730346851",
        url: "https://www.linkedin.com/in/satvik--gupta/"
      },
      {
        name: "Ayush Thakur",
        role: "Co-head, Corporate Relations",
        image:
          "https://ik.imagekit.io/es6xialea/P1200524.JPG?updatedAt=1754731371987",
        url: "https://www.linkedin.com/in/ayush-thakur015/"
      },
      {
        name: "Bhavishya C D",
        role: "Executive, Corporate Relations",
        image:
          "https://ik.imagekit.io/es6xialea/WhatsApp%20Image%202025-11-14%20at%2023.01.54_513bbd8f.jpg?updatedAt=1763141731667",
        url: "https://www.linkedin.com/in/bhavishya-c-d-b03738391/"
      },
      {
        name: "Nandini Sharma ",
        role: "Executive, Corporate Relations",
        image:
          "https://ik.imagekit.io/es6xialea/IMG_20251106_171747%20-%20Nandini%20Sharma.jpg?updatedAt=1763141366466",
        url: "https://www.linkedin.com/in/nandinisharma-doc/"
      },
      {
        name: "Helika D'Souza",
        role: "Executive, Corporate Relations",
        image:
          "https://ik.imagekit.io/es6xialea/photo%20-%20Helika%20D'Souza_page-0001.jpg?updatedAt=1763141642125",
        url: "https://www.linkedin.com/in/helika-d-souza-4a0901381/"
      },
      {
        name: "Riya Mehta",
        role: "Executive, Corporate Relations",
        image:
          "https://ik.imagekit.io/es6xialea/image%20-%20Riya.jpg?updatedAt=1763141909967",
        url: "https://www.linkedin.com/in/riya-mehta-59b66a319/"
      }
    ]
  },
  {
    title: "Events & Marketing",
    members: [
      {
        name: "Hansikha V",
        role: "Director, Events & Marketing",
        image: "https://ik.imagekit.io/es6xialea/DirectorEvents_xx?dummy=1",
        url: "https://www.linkedin.com/in/hansikha-venkatesh/"
      },
      {
        name: "Bhoomi Nayak",
        role: "Head, Events & Marketing",
        image:"https://ik.imagekit.io/96gea10vb/images/webp/bhoomi.webp?updatedAt=1747321659931",
        url: "https://www.linkedin.com/in/bhoomi-nayak-943083305/"
      },
      {
        name: "ANUJ DIXIT",
        role: "Co-head, Events & Marketing",
        image:
          "https://ik.imagekit.io/es6xialea/ANUJ%20KUMAR%20DIXIT_aHyMWdDia?updatedAt=1754730905215",
        url: "https://www.linkedin.com/in/anuj-kumar-dixit-668437280/"
      },
      {
        name: "Mariam Shuaib",
        role: "Co-head, Events & Marketing",
        image:"https://ik.imagekit.io/96gea10vb/NewTeamImage4_XdCP9rn0Z?updatedAt=1751669076681",
        url: "https://www.linkedin.com/in/mariam-shuaib-003362328/"
      },
      {
        name: "Yashi Jaiswal",
        role: "Executive, Events & Marketing",
        image: "https://ik.imagekit.io/es6xialea/IMG-20251113-WA0011(1)%20-%20Yashi%20Jaiswal.jpg?updatedAt=1763142380256",
        url: "https://www.linkedin.com/in/yashi-jaiswal-7a2bb7360/"
      },
    
    ]
  },
  {
    title: "Operations",
    members: [
      {
        name: "Kanishk chaudhary",
        role: "Director, Operations",
        image: "https://ik.imagekit.io/es6xialea/KANISHK%20CHAUDHARY_0qGgdIniO?updatedAt=1754729675615",
        url: "https://www.linkedin.com/in/kanishk-chaudhary-917731278/"
      },
      {
        name: "Anant Srivastava",
        role: "Head, Operations",
        image: "https://ik.imagekit.io/es6xialea/ANANT%20SRIVASTAVA_Iu1HINsCv?updatedAt=1754731226619",
        url: "https://www.linkedin.com/in/anant-srivastava-709174293/"
      },
      {
        name: "Sarthak Tripathi",
        role: "Co-head, Operations",
        image:
          "https://ik.imagekit.io/es6xialea/SARTHAK%20TRIPATHI_NoysExme7k?updatedAt=1754730569364",
        url: "https://www.linkedin.com/in/sarthak-tripathi-b11458295/"
      },
      {
        name: "Neha V",
        role: "Executive, Operations",
        image:
          "https://ik.imagekit.io/es6xialea/IMG_20251112_181300%20-%20Neha%20Venkat.jpg?updatedAt=1763143182832",
        url: "https://www.linkedin.com/in/neha-v-7a01aa290/"
      },
      {
        name: "Kripa Chhajer",
        role: "Executive, Operations",
        image:
          "https://ik.imagekit.io/es6xialea/1000092845_1_%20-%20Kripa%20Chhajer.jpg?updatedAt=1763143357893",
        url: "https://www.linkedin.com/in/kripa-chhajer-57585b33b/"
      },
      {
        name: "Krishnaditya Prakash",
        role: "Executive, Operations",
        image:
          "https://ik.imagekit.io/es6xialea/WhatsApp%20Image%202025-11-13%20at%207.58.19%20PM%20-%20Krishnaditya%20Prakash.jpeg?updatedAt=1763143500125",
        url: "https://www.linkedin.com/in/krishnaditya-prakash-868a83277/"
      }
    ]
  },
  {
    title: "Tech",
    members: [
      {
        name: "Bikesh Kumar",
        role: "Head, Tech",
        image: "https://ik.imagekit.io/es6xialea/Bikesh_-y-WYu2bvh?updatedAt=1754730133391",
        url: "https://www.linkedin.com/in/bikesh-kumar-37b71428b/"
      },
      {
        name: "Srujan Raj",
        role: "Executive, Tech",
        image: "https://ik.imagekit.io/es6xialea/IMG_4636%20-%20Srujan%20Raj.JPG?updatedAt=1763143977606",
        url: "https://www.linkedin.com/in/nramsrujanraj/"
      },
    ]
  },
  {
    title: "Design & Media",
    members: [
      {
        name: "Carol D'silva",
        role: "Director, Design & Media",
        image: "https://ik.imagekit.io/es6xialea/CAROL%20DSILVA_w_vU-4aXI?updatedAt=1754729990685",
        url: "https://www.linkedin.com/in/caroldsillva/"
      },
      {
        name: "Shashwat Shaurya",
        role: "Head, Design & Media",
        image: "https://ik.imagekit.io/96gea10vb/images/webp/shashwatS.webp?updatedAt=1747321667249",
        url: "https://www.linkedin.com/in/shashwat-shaurya-0828a5207/"
      },
      {
        name: "Shashwat Ranjan",
        role: "Co-head, Design & Media",
        image:
          "https://ik.imagekit.io/96gea10vb/images/webp/ShashwatR.webp?updatedAt=1747321667103",
        url: "https://www.linkedin.com/in/shashwat-ranjan-140908227/"
      },
      {
        name: "Divyansh Singh",
        role: "Executive, Design & Media",
        image:
          "https://ik.imagekit.io/es6xialea/SAVE_20251108_243313%20-%20Divyansh%20Singh.jpg?updatedAt=1763145512654",
        url: "https://www.linkedin.com/in/divyansh-singh-694ab5277/"
      },
      {
        name: "Sharanamma Patil",
        role: "Executive, Design & Media",
        image:
          "https://ik.imagekit.io/es6xialea/IMG_5369%20-%20Sharanamma%20Patil.jpeg?updatedAt=1763145697059",
        url: "https://www.linkedin.com/in/sharanamma-patil-18a03134a/"
      }
    ]
  }
];


function Footer() {
  return (
    <footer className="w-full bg-background border-t border-t-white/10 mt-24 py-6 flex flex-col items-center z-30 relative">
      <div className="max-w-3xl w-full flex flex-col items-center px-6 gap-2">
        <span className="text-sm text-white/70">
          &copy; {new Date().getFullYear()} E-Cell | All Rights Reserved
        </span>
        <span className="text-xs text-white/40">
          Designed & Built by E-Cell Team
        </span>
      </div>
    </footer>
  );
}

function MeetOurTeam() {
  return (
    <div className="overflow-hidden relative z-10 flex-col justify-center items-center py-20 w-full text-white rounded-lg bg-background md:py-28">
      <div className="absolute top-6 left-6 z-30">
        <img
          src="https://ik.imagekit.io/es6xialea/logowithoutname_FRoJAY4ve?updatedAt=1755297005039"
          alt="E-Cell Logo"
          className="w-auto h-16"
          style={{ maxWidth: "140px" }}
        />
      </div>
      <div className="container z-20 px-4 mx-auto">
        <div className="z-20 mb-12 text-center">
          <h2 className="z-20 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Meet Our Team
          </h2>
          <p className="z-20 mt-4 text-lg text-white/80">
            The creative minds behind our success.
          </p>
        </div>
        <div className="flex flex-col z-20 gap-16">
          {teamStructure.map((section, sectionIdx) => (
            <div key={section.title} className="w-full">
              <h3 className="mb-6 text-3xl font-semibold text-center text-primary tracking-tight uppercase">{section.title}</h3>
              <div className="grid grid-cols-1 gap-8 justify-items-center md:grid-cols-2 lg:grid-cols-4">
                {section.members.map((member, idx) => (
                  <TeamCard
                    key={member.name + idx}
                    name={member.name}
                    image={member.image}
                    role={member.role}
                    url={member.url}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "z-0",
          "fixed inset-0 pointer-events-none"
        )}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
      <Footer />
    </div>
  );
}

export default MeetOurTeam;