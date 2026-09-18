import React from "react";
import { ArrowUpRight } from "lucide-react";

const achievements = [
  {
    college: "PES University",
    image:
      "https://ik.imagekit.io/es6xialea/487782795_18001331555755800_2649017220836369752_n.jpg?updatedAt=1759407240168",
    achievement:
      "Won at PES University after a year of refining our idea through top competitions.",
  },
  {
    college: "St. Joseph’s University",
    image:
      "https://ik.imagekit.io/es6xialea/464947116_954803186504429_1205681400167409888_n.jpg?updatedAt=1759407239300",
    achievement:
      "Our E-Cell team pitched at Startup Mela, gaining valuable feedback, networking, and new opportunities.",
  },
  {
    college: "IIT BHU Zonal",
    image:
      "https://ik.imagekit.io/es6xialea/471641380_1106158534336365_3590991265440568888_n.jpg?updatedAt=1759407238788",
    achievement:
      "Bikesh Kumar's startup ShareWallet qualified for the IIT BHU Zonal Startup Junction! 🎉",
  },
  {
    college: "IIT Delhi",
    image:
      "https://ik.imagekit.io/es6xialea/476474970_17995201607755800_2261355812064883726_n.jpg?updatedAt=1759407238518",
    achievement:
      "Bikesh Kumar and ShareWallet reached the finals of The Blueprint 2025 at IIT Delhi, showcasing our innovation on a national stage.",
  },
  {
    college: "Zero1Fest by Zerodha",
    image:
      "https://ik.imagekit.io/es6xialea/486751885_18000995240755800_8964409542536192481_n.jpg?updatedAt=1759407238437",
    achievement:
      "Gained insights and networked with founders and innovators at Zero1Fest by Zerodha.",
  },
  {
    college: "IIT Roorkee",
    image:
      "https://ik.imagekit.io/es6xialea/484034497_17999063084755800_6444996082616552088_n.jpg?updatedAt=1759407238187",
    achievement:
      "Anuj reached the finals at IIT Roorkee’s National Social Summit Case Study Competition.",
  },
  {
    college: "IIT Bombay",
    image:
      "https://ik.imagekit.io/es6xialea/476749668_17995442279755800_8724498080096934882_n.jpg?updatedAt=1759407238155",
    achievement:
      "Finalists at IIT Bombay's National Entrepreneurship Challenge 2025, ranking 38th out of 1500+ E-Cells.",
  },
  {
    college: "IIT Bombay",
    image:
      "https://ik.imagekit.io/es6xialea/476971099_17995442297755800_2833424896387556065_n.jpg?updatedAt=1759407238459",
    achievement:
      "Shashwat, Sarthak & Anant won the IPL Auction at the summit! 🏆",
  },
];

function AchievmentRecru() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F5EF] px-5 py-16 text-[#111111] sm:px-10 sm:py-24">

      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#6D4CFF]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8C8A85]">
                Beyond The Campus
              </span>
            </div>
            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl md:text-7xl">
              Our{" "}
              <span className="text-[#6D4CFF]">
                Achievements
              </span>
            </h2>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#999791]">
              03 / 04
            </p>
            <p className="mt-1 text-xs text-[#77756F]">
              Ideas. Action. Impact.
            </p>
          </div>
        </div>
        <div className="mb-10 h-px w-full bg-[#DAD7CF]" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, idx) => (
            <article
              key={idx}
              className="group overflow-hidden rounded-2xl border border-[#DDDAD2] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)]"
            >
              <div className="relative h-56 overflow-hidden bg-[#ECEAE4]">

                <img
                  src={item.image}
                  alt={item.college}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
                <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[9px] font-bold">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Arrow */}
                <div className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-[#6D4CFF] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={15} />
                </div>

              </div>


              {/* Content */}
              <div className="p-5 sm:p-6">

                <div className="mb-3 flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#6D4CFF]" />

                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8C8A85]">
                    {item.college}
                  </p>

                </div>


                <p className="text-sm font-medium leading-relaxed text-[#3F3E3A]">
                  {item.achievement}
                </p>


                {/* Bottom line */}
                <div className="mt-5 h-px w-full bg-[#E7E4DC]" />

                <div className="mt-3 flex items-center justify-between">

                  <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#AAA7A0]">
                    E-Cell SMVIT
                  </span>

                  <span className="text-[9px] font-bold text-[#AAA7A0]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                </div>

              </div>

            </article>
          ))}

        </div>
        <div className="mt-10 flex flex-col justify-between gap-5 rounded-2xl bg-[#111111] p-6 text-white sm:flex-row sm:items-center sm:p-7">

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#777777]">
              The journey continues
            </p>

            <p className="mt-2 text-xl font-bold sm:text-2xl">
              Be part of what comes next.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6D4CFF]">
            <ArrowUpRight size={18} />
          </div>

        </div>

      </div>


      {/* Background Decoration */}
      <div className="pointer-events-none absolute -bottom-8 right-4 select-none text-[5rem] font-black uppercase leading-none tracking-[-0.08em] text-black/[0.025] sm:right-10 sm:text-[10rem]">
        IMPACT
      </div>

    </section>
  );
}

export default AchievmentRecru;