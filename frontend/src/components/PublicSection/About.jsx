import React from 'react';
import ChromaGrid from './ChromeGrid';

function About() {
  const items = [
    {
      image: "https://ik.imagekit.io/es6xialea/SHASHIDHAR%20HEGDE_4FDnFhgyyl?updatedAt=1754729474107",
      title: "SHASHIDHAR HEGDE",
      subtitle: "Secretary",
      handle: "@shashidhar-hegde",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/shashidhar-hegde-9b4645270/"
    },
    {
      image: "https://ik.imagekit.io/es6xialea/TANISH%20RAJ_TMGOU9Rzo?updatedAt=1754729813985",
      title: "TANISH RAJ",
      subtitle: "Head Of Corporate Relations",
      handle: "@tanish-raj",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/tanish-raj-598617224/"
    },
    {
      image: "https://ik.imagekit.io/es6xialea/KANISHK%20CHAUDHARY_0qGgdIniO?updatedAt=1754729675615",
      title: "KANISHK CHAUDHARY",
      subtitle: "Head Of Operations",
      handle: "@kanishk-chaudhary",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/kanishk-chaudhary-917731278/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/images/webp/Hansikha.webp?updatedAt=1747321661900",
      title: "HANSIKHA V",
      subtitle: "Head Of Events & Marketing Head",
      handle: "@hansikha-venkatesh",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/hansikha-venkatesh-6733a7225/"
    },
    {
      image: "https://ik.imagekit.io/es6xialea/CAROL%20DSILVA_w_vU-4aXI?updatedAt=1754729990685",
      title: "CAROL DSILVA",
      subtitle: "Head Of Design & Media",
      handle: "@caroldsillva",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/caroldsillva/"
    },
    {
      image: "https://ik.imagekit.io/es6xialea/Bikesh_-y-WYu2bvh?updatedAt=1754730133391",
      title: "BIKESH KUMAR",
      subtitle: "Corporate Relations Executive",
      handle: "@bikesh-kumar",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/bikesh-kumar-37b71428b/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/NewTeamImage4_XdCP9rn0Z?updatedAt=1751669076681",
      title: "MARIAM SHUAIB",
      subtitle: "Corporate Relations Executive",
      handle: "@mariam-shuaib",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/mariam-shuaib-003362328/"
    },
    {
      image: "https://ik.imagekit.io/es6xialea/SATVIK%20GUPTA_V5fYEhb1R?updatedAt=1754730346851",
      title: "SATVIK GUPTA",
      subtitle: "Corporate Relations Executive",
      handle: "@satvik--gupta",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/satvik--gupta/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/images/webp/bhoomi.webp?updatedAt=1747321659931",
      title: "BHOOMI NAYAK",
      subtitle: "Operations Executive",
      handle: "@bhoomi-nayak",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/bhoomi-nayak-943083305/"
    },
    {
      image: "https://ik.imagekit.io/es6xialea/SARTHAK%20TRIPATHI_NoysExme7k?updatedAt=1754730569364",
      title: "SARTHAK TRIPATHI",
      subtitle: "Operations Executive",
      handle: "@sarthak-tripathi",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/sarthak-tripathi-b11458295/"
    },
    {
      image: "https://ik.imagekit.io/es6xialea/ANUJ%20KUMAR%20DIXIT_aHyMWdDia?updatedAt=1754730905215",
      title: "ANUJ DIXIT",
      subtitle: "Events & Marketing Executive",
      handle: "@anuj-dixit",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/anuj-kumar-dixit-668437280/"
    },
    {
      image: "https://ik.imagekit.io/es6xialea/DHRUV%20KUMAR_MpsbwOCE-3?updatedAt=1754731084940",
      title: "DHRUV KUMAR",
      subtitle: "Events & Marketing Executive",
      handle: "@dhruv-kumar",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/dhruv-kumar-589a33314/"
    },
    {
      image: "https://ik.imagekit.io/es6xialea/ANANT%20SRIVASTAVA_Iu1HINsCv?updatedAt=1754731226619",
      title: "ANANT",
      subtitle: "Corporate Relations Executive",
      handle: "@anant-srivastava",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/anant-srivastava-709174293/"
    },
    {
      image: "https://ik.imagekit.io/es6xialea/ASHISH%20NARAYAN_esUOKHDOI?updatedAt=1754734225398",
      title: "ASHISH NARAYAN",
      subtitle: "Events & PR Executive",
      handle: "@ashish-narayan",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/ashish-narayan-1051b4299/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/images/webp/shashwatS.webp?updatedAt=1747321667249",
      title: "SHASHWAT",
      subtitle: "Design & Media Executive",
      handle: "@shashwat-shaurya",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/shashwat-shaurya-0828a5207/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/images/webp/ShashwatR.webp?updatedAt=1747321667103",
      title: "SHASHWAT",
      subtitle: "Design & Media Executive",
      handle: "@shashwat-ranjan",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/shashwat-ranjan-140908227/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/NewTeamImage7_W3oI3NhNh?updatedAt=1751669417474",
      title: "VAIBHAV",
      subtitle: "Design & Media Executive",
      handle: "@vaibhav",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/raun07/"
    },
    {
      image: "https://ik.imagekit.io/es6xialea/AYUSH%20THAKUR_tTTgGaRDn?updatedAt=1754731438531",
      title: "AYUSH THAKUR",
      subtitle: "Events and Marketing",
      handle: "@ayush-thakur",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/ayush-thakur015/"
    },
  ];

  return (
    <div id='our-team' className="flex w-full h-auto text-white bg-gradient-to-bl from-black via-black to-[#6C4DFF] justify-center items-center p-8">
      <div style={{ position: 'relative' }}>
        <h1 className='text-[#ffffff] font-black text-center p-4 text-4xl'>MEET OUR <span className='text-[#6c4dff]'>TEAM</span></h1>
        <ChromaGrid 
          items={items}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
          className="gap-8"
        />
      </div>
    </div>
  );
}

export default About;
