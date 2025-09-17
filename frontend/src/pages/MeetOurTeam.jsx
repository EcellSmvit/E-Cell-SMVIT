import React from "react";
import { cn } from "../lib/utils.js";
import { DotPattern } from "../components/magicui/dot-pattern.jsx";

// LinkedIn Lucide Icon
const LinkedInLucideIcon = (props) => (
  // Lucide's LinkedIn icon SVG (https://lucide.dev/icons/linkedin)
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <line x1="8" x2="8" y1="11" y2="16" />
    <line x1="8" x2="8" y1="8" y2="8.01" />
    <line x1="12" x2="12" y1="16" y2="11" />
    <path d="M16 16v-3a2 2 0 0 0-4 0" />
  </svg>
);

// TeamCard component
const TeamCard = ({ image, title, subtitle, url }) => (
  <div className="relative flex flex-col items-center justify-center p-6 bg-card text-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl w-full max-w-xs z-20">
    <img
      src={image}
      alt={title}
      className="w-64 h-80 rounded-xl object-cover mb-4"
      style={{ objectPosition: "center" }}
    />
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-muted-foreground mb-4 text-white/80">{subtitle}</p>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`LinkedIn profile of ${title}`}
      className="text-white hover:text-primary transition-colors"
    >
      <LinkedInLucideIcon className="w-6 h-6" />
    </a>
  </div>
);

// Team members data from About.jsx
const teamMembers = [
  {
    image: "https://ik.imagekit.io/es6xialea/Bikesh_-y-WYu2bvh?updatedAt=1754730133391",
    title: "BIKESH KUMAR",
    subtitle: "Corporate Relations Executive",
    url: "https://www.linkedin.com/in/bikesh-kumar-37b71428b/"
  },
  {
    image: "https://ik.imagekit.io/96gea10vb/NewTeamImage4_XdCP9rn0Z?updatedAt=1751669076681",
    title: "MARIAM SHUAIB",
    subtitle: "Corporate Relations Executive",
    url: "https://www.linkedin.com/in/mariam-shuaib-003362328/"
  },
  {
    image: "https://ik.imagekit.io/es6xialea/SATVIK%20GUPTA_V5fYEhb1R?updatedAt=1754730346851",
    title: "SATVIK GUPTA",
    subtitle: "Corporate Relations Executive",
    url: "https://www.linkedin.com/in/satvik--gupta/"
  },
  {
    image: "https://ik.imagekit.io/96gea10vb/images/webp/bhoomi.webp?updatedAt=1747321659931",
    title: "BHOOMI NAYAK",
    subtitle: "Operations Executive",
    url: "https://www.linkedin.com/in/bhoomi-nayak-943083305/"
  },
  {
    image: "https://ik.imagekit.io/es6xialea/SARTHAK%20TRIPATHI_NoysExme7k?updatedAt=1754730569364",
    title: "SARTHAK TRIPATHI",
    subtitle: "Operations Executive",
    url: "https://www.linkedin.com/in/sarthak-tripathi-b11458295/"
  },
  {
    image: "https://ik.imagekit.io/es6xialea/ANUJ%20KUMAR%20DIXIT_aHyMWdDia?updatedAt=1754730905215",
    title: "ANUJ DIXIT",
    subtitle: "Events & Marketing Executive",
    url: "https://www.linkedin.com/in/anuj-kumar-dixit-668437280/"
  },
  {
    image: "https://ik.imagekit.io/es6xialea/DHRUV%20KUMAR_MpsbwOCE-3?updatedAt=1754731084940",
    title: "DHRUV KUMAR",
    subtitle: "Events & Marketing Executive",
    url: "https://www.linkedin.com/in/dhruv-kumar-589a33314/"
  },
  {
    image: "https://ik.imagekit.io/es6xialea/ANANT%20SRIVASTAVA_Iu1HINsCv?updatedAt=1754731226619",
    title: "ANANT",
    subtitle: "Corporate Relations Executive",
    url: "https://www.linkedin.com/in/anant-srivastava-709174293/"
  },
  {
    image: "https://ik.imagekit.io/es6xialea/ASHISH%20NARAYAN_esUOKHDOI?updatedAt=1754734225398",
    title: "ASHISH NARAYAN",
    subtitle: "Events & PR Executive",
    url: "https://www.linkedin.com/in/ashish-narayan-1051b4299/"
  },
  {
    image: "https://ik.imagekit.io/96gea10vb/images/webp/shashwatS.webp?updatedAt=1747321667249",
    title: "SHASHWAT",
    subtitle: "Design & Media Executive",
    url: "https://www.linkedin.com/in/shashwat-shaurya-0828a5207/"
  },
  {
    image: "https://ik.imagekit.io/96gea10vb/images/webp/ShashwatR.webp?updatedAt=1747321667103",
    title: "SHASHWAT",
    subtitle: "Design & Media Executive",
    url: "https://www.linkedin.com/in/shashwat-ranjan-140908227/"
  },
  {
    image: "https://ik.imagekit.io/96gea10vb/NewTeamImage7_W3oI3NhNh?updatedAt=1751669417474",
    title: "VAIBHAV",
    subtitle: "Design & Media Executive",
    url: "https://www.linkedin.com/in/raun07/"
  },
  {
    image: "https://ik.imagekit.io/es6xialea/AYUSH%20THAKUR_tTTgGaRDn?updatedAt=1754731438531",
    title: "AYUSH THAKUR",
    subtitle: "Events and Marketing",
    url: "https://www.linkedin.com/in/ayush-thakur015/"
  }
];

function MeetOurTeam() {
  return (
    <div className="relative w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-20 md:py-28 text-white z-10">
      <div className="absolute top-6 left-6 z-30">
        <img
          src="https://ik.imagekit.io/es6xialea/logowithoutname_FRoJAY4ve?updatedAt=1755297005039"
          alt="E-Cell Logo"
          className="h-16 w-auto"
          style={{ maxWidth: "140px" }}
        />
      </div>
      <div className="container mx-auto px-4 z-20">
        <div className="text-center mb-12 z-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white z-20">
            Meet Our Team
          </h2>
          <p className="mt-4 text-lg text-white/80 z-20">
            The creative minds behind our success.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center z-20">
          {teamMembers.map((member, idx) => (
            <TeamCard
              key={member.title + idx}
              image={member.image}
              title={member.title}
              subtitle={member.subtitle}
              url={member.url}
            />
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
    </div>
  );
}

export default MeetOurTeam;