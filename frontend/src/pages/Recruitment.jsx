import React, { useState, useEffect } from 'react'
import { SignedOut, SignInButton, SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import Stepper, { Step } from '../components/ui/Components/Stepper/Stepper';
import { submitApplication, checkIfSubmitted } from '../lib/api.js';
import OpeningPost from '@/components/OpeningPost';
import Position from '@/components/Position';

function Recruitment() {
  const { user } = useUser();
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [usn, setUsn] = useState('');
  const [gender, setGender] = useState('');
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');

  // ✅ Check if user already submitted
  useEffect(() => {
    if (user) {
      checkIfSubmitted(user.id).then((submitted) => {
        setAlreadySubmitted(submitted);
      });
    }
  }, [user]);

  return (
    <div>
      {/* ✅ When user is not signed in */}
      <SignedOut>
        <div className=" sm:h-[100vh] h-[70vh] w-full bg-[#f9fafb] relative">
          {/* Background Grid */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #d1d5db 1px, transparent 1px),
                linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            }}
          />

          {/* Header */}
          <div className="flex relative z-10 justify-between items-center px-4 py-4 sm:px-8 md:px-14">
            <img
              src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995"
              className="w-10 sm:w-12"
              alt="logo"
            />
            <div className="text-xl font-bold text-black sm:text-2xl">2025</div>
          </div>

          {/* Hero Content */}
          <div className="flex relative z-10 justify-center items-center px-6 sm:px-14 h-[50vh] sm:h-[90vh] text-center sm:text-left">
            <div>
              <SignInButton>
                <button className="px-4 py-2 rounded-full border-2 text-[#111111] mb-4 sm:mb-6">
                  Join Our Team
                </button>
              </SignInButton>

              <p className="font-medium text-[#111111] text-4xl sm:text-8xl">E-CELL SMVIT</p>
              <p className="font-black text-[#111111] text-6xl sm:text-[12rem] leading-[1]">Recruiting!</p>
              <p className="text-[#545554] text-base sm:text-2xl font-medium w-full sm:w-2/3 mt-6 sm:mt-10 mx-auto sm:mx-0">
                Are you ready to take charge, innovate, and create impact on campus? 
                E-Cell SMVIT is recruiting enthusiastic minds like YOU!
              </p>
            </div>
          </div>
        </div>
        <OpeningPost />
        <Position />
      </SignedOut>

      {/* ✅ When user is signed in */}
      <SignedIn>
        <div className="flex justify-between items-center p-4">
          <img
            src="https://ik.imagekit.io/es6xialea/logowithoutname_FRoJAY4ve?updatedAt=1755297005039"
            alt=""
            className="w-12"
          />
          <UserButton />
        </div>

        {/* ✅ If user already submitted */}
        {alreadySubmitted ? (
          <div className="p-10 text-center text-white">
            <h1 className="text-3xl font-bold text-green-400">
              ✅ You have already submitted your application.
            </h1>
            <p className="mt-4 text-gray-300">
              Our team will contact you soon. Thank you for applying!
            </p>
          </div>
        ) : (
          <div>
            <div className="p-4 text-4xl font-bold text-white">
              <h1>
                Welcome <span className="text-[#5227FF]">{user?.firstName}</span> <br />
                to E-Cell Smvit Recruitment 2025
              </h1>
            </div>

            <div className="text-white">
              <Stepper
                initialStep={1}
                onStepChange={(step) => {
                  console.log(step);
                }}
                onFinalStepCompleted={async () => {
                  try {
                    await submitApplication({
                      name,
                      year,
                      usn,
                      gender,
                      q1,
                      q2,
                      q3,
                      q4,
                      filledByUser: user?.id, // ✅ Clerk User ID
                    });
                    alert("Application submitted successfully!");
                    setAlreadySubmitted(true);
                  } catch (error) {
                    alert("Error submitting form. Check console.");
                  }
                }}
                backButtonText="Previous"
                nextButtonText="Next"
              >
                {/* ✅ STEP 1 */}
                <Step>
                  <h2 className="text-2xl font-bold text-[#5227FF]">Why E-CELL SMVIT?</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor neque vel veritatis 
                    mollitia officiis quae! Maxime eius totam obcaecati atque nostrum soluta harum quos 
                    repellendus quis itaque temporibus neque, culpa inventore dolore cumque error expedita 
                    autem quod rerum at?
                  </p>
                </Step>

                {/* ✅ STEP 2 */}
                <Step>
                  <h2 className="text-2xl font-bold text-[#5227FF] mb-4 text-center">Team Roles</h2>
                  <div className="grid grid-cols-1 gap-6 justify-items-center w-full sm:grid-cols-2 md:grid-cols-3 md:gap-8">
                    <ul className="p-4 w-full max-w-xs">
                      <li className="font-bold text-[#5227FF] mb-2">Operational Manager</li>
                      <li className="text-white">- Arranging Logistics and Permissions</li>
                      <li className="text-white">- Documenting operations and events</li>
                    </ul>
                    <ul className="p-4 w-full max-w-xs">
                      <li className="font-bold text-[#5227FF] mb-2">Events & PR Manager</li>
                      <li className="text-white">- Conducting Events</li>
                      <li className="text-white">- Gathering and Influencing People</li>
                    </ul>
                    <ul className="p-4 w-full max-w-xs">
                      <li className="font-bold text-[#5227FF] mb-2">Corporate Relations Manager</li>
                      <li className="text-white">- Arranging Sponsorships</li>
                      <li className="text-white">- Making funding sources from companies</li>
                    </ul>
                  </div>
                </Step>

                {/* ✅ STEP 3 (FORM) */}
                <Step>
                  <h2 className="text-2xl font-bold text-[#5227FF] mb-4 text-center">Application Form</h2>
                  <form className="flex flex-col gap-4" autoComplete="off">
                    <div className="flex flex-col gap-4 md:flex-row md:gap-4">
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-white">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="px-3 py-2 w-full text-white bg-gray-800 rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-white">Year</label>
                        <select
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="px-3 py-2 w-full text-white bg-gray-800 rounded"
                        >
                          <option value="">Select Year</option>
                          <option value="2nd">2nd</option>
                          <option value="3rd">3rd</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row md:gap-4">
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-white">USN</label>
                        <input
                          type="text"
                          value={usn}
                          onChange={(e) => setUsn(e.target.value)}
                          placeholder="Your USN"
                          className="px-3 py-2 w-full text-white bg-gray-800 rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-white">Gender</label>
                        <div className="flex gap-4">
                          <label className="flex gap-1 items-center text-white">
                            <input
                              type="radio"
                              value="male"
                              checked={gender === "male"}
                              onChange={() => setGender("male")}
                            />
                            Male
                          </label>
                          <label className="flex gap-1 items-center text-white">
                            <input
                              type="radio"
                              value="female"
                              checked={gender === "female"}
                              onChange={() => setGender("female")}
                            />
                            Female
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Questions */}
                    <textarea
                      value={q1}
                      onChange={(e) => setQ1(e.target.value)}
                      placeholder="Why do you want to join E-Cell?"
                      className="px-3 py-2 w-full text-white bg-gray-800 rounded"
                    />
                    <textarea
                      value={q2}
                      onChange={(e) => setQ2(e.target.value)}
                      placeholder="Any prior experience?"
                      className="px-3 py-2 w-full text-white bg-gray-800 rounded"
                    />
                    <textarea
                      value={q3}
                      onChange={(e) => setQ3(e.target.value)}
                      placeholder="Describe a challenge you faced in a team project"
                      className="px-3 py-2 w-full text-white bg-gray-800 rounded"
                    />
                    <textarea
                      value={q4}
                      onChange={(e) => setQ4(e.target.value)}
                      placeholder="Share an innovative idea/project"
                      className="px-3 py-2 w-full text-white bg-gray-800 rounded"
                    />
                  </form>
                </Step>

                {/* ✅ STEP 4 (REVIEW) */}
                <Step>
                  <h2 className="mb-2 text-2xl font-bold">Final Step</h2>
                  <p className="mb-4">You made it!</p>
                  <div className="mb-4">
                    <p className="text-white">Review your answers before submitting.</p>
                  </div>
                  <p className="font-bold text-green-400">Thank you for your interest in joining E-Cell!</p>
                </Step>
              </Stepper>
            </div>
          </div>
        )}
      </SignedIn>
    </div>
  )
}

export default Recruitment
