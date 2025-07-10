import React from 'react';
import ChromaGrid from './ChromeGrid';

function About() {
  const items = [
    {
      image: "https://ik.imagekit.io/96gea10vb/NewTeam%20Folder_Vv_GqiSji?updatedAt=1751668659681",
      title: "SHASHIDHAR HEGDE",
      subtitle: "Secretary",
      handle: "@shashidhar-hegde",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/shashidhar-hegde-9b4645270/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/NewTeamImage2_kICuVoV6G?updatedAt=1751668825602",
      title: "TANISH RAJ",
      subtitle: "Head Of Corporate Relations",
      handle: "@tanish-raj",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/tanish-raj-598617224/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/images/webp/kanishk.webp?updatedAt=1747321661673",
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
      image: "https://ik.imagekit.io/96gea10vb/NewTeamImage3_Q-t9OzulN?updatedAt=1751668914209",
      title: "CAROL DSILVA",
      subtitle: "Head Of Design & Media",
      handle: "@caroldsillva",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/caroldsillva/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/images/webp/Bikesh.webp?updatedAt=1747321659844",
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
      image: "https://ik.imagekit.io/96gea10vb/images/webp/stavik.webp?updatedAt=1747321668434",
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
      image: "https://ik.imagekit.io/96gea10vb/images/webp/Sarthak.webp?updatedAt=1747321666221",
      title: "SARTHAK TRIPATHI",
      subtitle: "Operations Executive",
      handle: "@sarthak-tripathi",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/sarthak-tripathi-b11458295/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/NewTeamImage5_QWhyGVmKO?updatedAt=1751669182004",
      title: "ANUJ DIXIT",
      subtitle: "Events & Marketing Executive",
      handle: "@anuj-dixit",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/anuj-kumar-dixit-668437280/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/images/webp/dhruv.webp?updatedAt=1747321661417",
      title: "DHRUV KUMAR",
      subtitle: "Events & Marketing Executive",
      handle: "@dhruv-kumar",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/dhruv-kumar-589a33314/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/NewTeamImage6_JXFJM82pj?updatedAt=1751669231610",
      title: "ANANT SRIVASTAVA",
      subtitle: "Corporate Relations Executive",
      handle: "@anant-srivastava",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/anant-srivastava-709174293/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/images/webp/Ashish.webp?updatedAt=1747321657369",
      title: "BIKESH KUMAR",
      subtitle: "Corporate Relations Executive",
      handle: "@bikesh-kumar",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/bikesh-kumar-37b71428b/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/images/webp/shashwatS.webp?updatedAt=1747321667249",
      title: "BIKESH KUMAR",
      subtitle: "Corporate Relations Executive",
      handle: "@bikesh-kumar",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/bikesh-kumar-37b71428b/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/images/webp/ShashwatR.webp?updatedAt=1747321667103",
      title: "BIKESH KUMAR",
      subtitle: "Corporate Relations Executive",
      handle: "@bikesh-kumar",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/bikesh-kumar-37b71428b/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/NewTeamImage7_W3oI3NhNh?updatedAt=1751669417474",
      title: "BIKESH KUMAR",
      subtitle: "Corporate Relations Executive",
      handle: "@bikesh-kumar",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/bikesh-kumar-37b71428b/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/NewTeamImage8_hsKp8XbWO?updatedAt=1751669911879",
      title: "BIKESH KUMAR",
      subtitle: "Corporate Relations Executive",
      handle: "@bikesh-kumar",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/bikesh-kumar-37b71428b/"
    },
  ];

  return (
    <div className="flex w-full h-auto text-white bg-gradient-to-bl from-black via-black to-[#6C4DFF] justify-center items-center p-8">
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
