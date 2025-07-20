import React from 'react';

function AchievementMobile() {
  return (
    <div
      className="w-screen bg-gradient-to-b from-black via-[#1f1c4d] to-[#6C4DFF] min-h-screen flex flex-wrap justify-center items-start gap-6 p-4 overflow-y-auto"
      
    >
      <h1 className="w-full text-center text-2xl font-bold text-white mb-4 tracking-wide">ACHIEVEMENTS</h1>
      {/* Card 1 */}
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-4 flex flex-col items-center w-full sm:w-[300px] max-w-xs">
        <img
          className="w-full h-auto mb-4 rounded-xl shadow-lg"
          src="https://ik.imagekit.io/jwt52yyie/476971099_17995442297755800_2833424896387556065_n.png?updatedAt=1751375625880"
          alt="Achievement 1"
        />
        <p className="text-white text-justify font-medium text-sm sm:text-base">
        Adding to our success, Shashwat Ranjan, Satvik Gupta, and Anant Srivastav emerged as winners of the IPL Auction, a thrilling competition held during the summit! 🏆🔥
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-4 flex flex-col items-center w-full sm:w-[300px] max-w-xs">
        <img
          className="w-full h-auto mb-4 rounded-xl shadow-lg"
          src="https://ik.imagekit.io/jwt52yyie/484165290_17999063099755800_2469744340898086729_n.png?updatedAt=1751375906011"
          alt="Achievement 2"
        />
        <p className="text-white text-justify font-medium text-sm sm:text-base">
        Anuj represented us at the finals of the Case Study Competition at IIT Roorkee’s National Social Summit! Tackling the crucial topic of “Ensuring Safe & Inclusive Workplaces,” he analyzed workplace harassment issues and proposed impactful solutions.A huge shoutout to him for making it to the finals and showcasing his skills on such a big stage!
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-4 flex flex-col items-center w-full sm:w-[300px] max-w-xs">
        <img
          className="w-full h-auto mb-4 rounded-xl shadow-lg"
          src="https://ik.imagekit.io/jwt52yyie/WhatsApp%20Image%202025-07-01%20at%2018.53.39_a50fd182.png?updatedAt=1751376280226"
          alt="Achievement 3"
        />
        <p className="text-white text-justify font-medium text-sm sm:text-base">
        The Blueprint 2025 Business Plan Competition, organized by eDC IIT Delhi, brought together some of the brightest entrepreneurial minds across the country. Held as part of BECon’25, the competition featured intense regional rounds, culminating in the grand finals on February 2, 2025, at IIT Delhi.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-4 flex flex-col items-center w-full sm:w-[300px] max-w-xs">
        <img
          className="w-full h-auto mb-4 rounded-xl shadow-lg"
          src="https://ik.imagekit.io/jwt52yyie/464984466_560928352994412_508468383643153030_n.png?updatedAt=1751376431935"
          alt="Achievement 4"
        />
        <p className="text-white text-justify font-medium text-sm sm:text-base">
        Our E-Cell teams had an incredible experience at the Startup Mela hosted by St. Joseph’s University! Starting bright and early, the event was filled with opportunities for pitching, networking, and receiving insightful feedback.
        </p>
      </div>
    </div>
  );
}

export default AchievementMobile;
