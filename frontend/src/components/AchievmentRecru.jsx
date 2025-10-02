import React from 'react'

const achievements = [
  {
    college: "PES University",
    image: "https://ik.imagekit.io/es6xialea/487782795_18001331555755800_2649017220836369752_n.jpg?updatedAt=1759407240168",
    achievement: "Won at PES University after a year of refining our idea through top competitions."
  },
  {
    college: "St. Joseph’s University",
    image: "https://ik.imagekit.io/es6xialea/464947116_954803186504429_1205681400167409888_n.jpg?updatedAt=1759407239300",
    achievement: "Our E-Cell team pitched at Startup Mela, St. Joseph’s University, gaining valuable feedback, networking, and new opportunities."
  },
  {
    college: "IIT BHU Zonal",
    image: "https://ik.imagekit.io/es6xialea/471641380_1106158534336365_3590991265440568888_n.jpg?updatedAt=1759407238788",
    achievement: "Bikesh Kumar  startup ShareWallet qualified for the IIT BHU Zonal Startup Junction! 🎉"
  },
  {
    college: "IIT Delhi",
    image: "https://ik.imagekit.io/es6xialea/476474970_17995201607755800_2261355812064883726_n.jpg?updatedAt=1759407238518",
    achievement: "Bikesh Kumar and Share Wallet reached the finals of The Blueprint 2025 at IIT Delhi, showcasing our innovation on a national stage."
  },
  {
    college: "Zero1Fest by Zerodha",
    image: "https://ik.imagekit.io/es6xialea/486751885_18000995240755800_8964409542536192481_n.jpg?updatedAt=1759407238437",
    achievement: "Gained insights and networked at Zero1Fest by Zerodha."
  },
  {
    college: "IIT Roorkee",
    image: "https://ik.imagekit.io/es6xialea/484034497_17999063084755800_6444996082616552088_n.jpg?updatedAt=1759407238187",
    achievement: "Anuj reached the finals at IIT Roorkee’s National Social Summit Case Study Competition."
  },
  {
    college: "IIT Bombay",
    image: "https://ik.imagekit.io/es6xialea/476749668_17995442279755800_8724498080096934882_n.jpg?updatedAt=1759407238155",
    achievement: "Finalists at IIT Bombay's National Entrepreneurship Challenge 2025, ranking 38th out of 1500+ E-Cells."
  },
  {
    college: "IIT Bombay",
    image: "https://ik.imagekit.io/es6xialea/476971099_17995442297755800_2833424896387556065_n.jpg?updatedAt=1759407238459",
    achievement: "Shashwat, Sarthak & Anant won the IPL Auction at the summit! 🏆"
  },

];

function AchievmentRecru() {
  return (
    <div className="w-full flex flex-col items-center py-12 bg-[#F9FAFB]">
      <h2 className="mb-8 text-3xl font-bold text-center text-black sm:text-6xl">Our Achievements</h2>
      <div className="flex flex-wrap gap-8 justify-center w-full max-w-6xl">
        {achievements.map((member, idx) => (
          <div
            key={idx}
            className="flex overflow-hidden flex-col w-64 bg-[#111111] rounded-xl shadow-lg"
          >
            <div className="flex justify-center items-center w-full h-48 bg-[#111111]">
              <img
                src={member.image}
                alt={member.college}
                className="object-contain p-2 w-full h-full"
              />
            </div>
            <div className="flex flex-col flex-1 p-6">
              <p className="mb-2 text-sm text-gray-300">{member.college}</p>
              <p className="text-base text-white">{member.achievement}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AchievmentRecru