import React from 'react';
import ChromaGrid from './ChromeGrid';

function About() {
  const items = [
    {
      image: "https://ik.imagekit.io/96gea10vb/images/webp/Shashidhar.webp?updatedAt=1747321666205",
      title: "SHASHIDHAR HEGDE",
      subtitle: "Secretary",
      handle: "@shashidhar-hegde",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/shashidhar-hegde-9b4645270/"
    },
    {
      image: "https://ik.imagekit.io/96gea10vb/images/webp/Tanish.webp?updatedAt=1747321668374",
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
      image: "https://ik.imagekit.io/96gea10vb/images/webp/carol.webp?updatedAt=1747321661667",
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
      subtitle: "Corporate Relations and Tech Executive",
      handle: "@bikesh-kumar",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/bikesh-kumar-37b71428b/"
    },
  ];

  return (
    <div className="flex w-full h-auto bg-black justify-cenrter items-cente">
      <div style={{ position: 'relative' }}>
        <ChromaGrid 
          items={items}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </div>
  );
}

export default About;
