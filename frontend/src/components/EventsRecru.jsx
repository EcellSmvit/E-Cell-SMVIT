import React from "react";
import { motion } from "framer-motion";

const events = [
  {
    name: "Starpitch 2.0",
    description:
      "StarPitch 2.0: Compete, innovate, and win cash prizes! This flagship event saw 50+ teams pitch their startup ideas to industry experts, gaining mentorship, feedback, and valuable networking opportunities.",
    image:
      "https://ik.imagekit.io/es6xialea/466920954_1317652862939208_1165416226951461315_n.jpg?updatedAt=1759420800249",
  },
  {
    name: "Idea Expo",
    description:
      "A showcase of 7 student startups, inspiring 1000+ students to innovate.",
    image:
      "https://ik.imagekit.io/es6xialea/468787892_526762070357263_7985119509233558350_n.jpg?updatedAt=1759420800200",
  },
  {
    name: "SuperOver",
    description:
      "Pitch your ad idea for a ₹3 crore Ind vs Pak match slot. Best answer wins ₹500!",
    image:
      "https://ik.imagekit.io/es6xialea/482284504_17998207142755800_2672864441992816042_n.jpg?updatedAt=1759420800236",
  },
  {
    name: "SMVIT Stock Exchange",
    description:
      "A fun stock market-themed event promoting financial literacy, thanks to @stockgro_champions and all participants.",
    image:
      "https://ik.imagekit.io/es6xialea/491534651_18003548816755800_7425644674137084509_n.jpg?updatedAt=1759420800291",
  },
  {
    name: "Crisis CTRL",
    description:
      "A high-stakes event where teams tackle real-time business crises, test their strategy, and compete to regain control.",
    image:
      "https://ik.imagekit.io/es6xialea/501817145_18007795895755800_8048588466809766982_n.jpg?updatedAt=1759420800204",
  },
];

function EventsRecru() {
  return (
    <div className="bg-[#111111] min-h-screen w-full py-20">
      {/* Heading */}
      <div className="flex justify-center items-center mb-16">
        <h1 className="text-white text-4xl sm:text-6xl font-semibold text-center tracking-tight">
          Events Conducted by{" "} E-Cell SMVIT
        </h1>
      </div>

      {/* Events Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-xl group bg-[#1c1c1c]"
          >
            {/* Background Image */}
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Text Content */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                {event.name}
              </h2>
              <p className="text-gray-200 text-sm mt-2 line-clamp-3">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default EventsRecru;
