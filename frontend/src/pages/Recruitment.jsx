import React, { useState, useEffect } from 'react'
import { SignedOut, SignInButton, SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import Stepper, { Step } from '../components/ui/Components/Stepper/Stepper';
import { submitApplication, checkIfSubmitted } from '../lib/api.js';
import OpeningPost from '@/components/OpeningPost';
import Position from '@/components/Position';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Facingtrouble from '@/components/Facingtrouble';
import AchievmentRecru from '@/components/AchievmentRecru';
import FooterRecu from '@/components/FooterRecu';
import EventsRecru from '@/components/EventsRecru';

function Recruitment() {
  const { user } = useUser();
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [name, setName] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [teamrole, setTeamrole] = useState('');
  const [usn, setUsn] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const isFormValid = name && teamrole && mobilenumber && usn && linkedin && q1 && q2 && q3 && q4;
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (user) {
      checkIfSubmitted(user.id).then((submitted) => {
        setAlreadySubmitted(submitted);
      });
    }
  }, [user]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <SignedOut>
        <div className=" sm:h-[100vh] h-[70vh] w-full bg-[#f9fafb] relative">
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
          <div className="flex relative z-10 justify-between items-center px-4 py-4 sm:px-8 md:px-14">
            <img
              src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995"
              className="w-10 sm:w-12"
              alt="logo"
            />
            <div className="text-xl font-bold text-black sm:text-2xl">2025</div>
          </div>
          <div className="flex relative z-10 justify-center items-center px-6 sm:px-14 h-[50vh] sm:h-[90vh] text-center sm:text-left">
            <div>
              <p className="font-medium text-[#111111] text-4xl sm:text-8xl">E-CELL SMVIT</p>
              <p className="font-black text-[#111111] text-6xl sm:text-[12rem] leading-[1]">Recruiting!</p>
              <p className="text-[#545554] text-base sm:text-2xl font-medium w-full sm:w-2/3 mt-6 sm:mt-10 mx-auto sm:mx-0">
                Are you ready to take charge, innovate, and create impact on campus? 
                E-Cell SMVIT is recruiting enthusiastic minds like YOU!
              </p>
                <SignInButton>
                  <button className="px-4 py-2 rounded-full border-2 text-[#111111] mt-4 sm:mb-6">
                    Join Our Team
                  </button>
              </SignInButton>
            </div>
          </div>
        </div>
        <OpeningPost />
        <Position />
        <Facingtrouble/>
        <AchievmentRecru/>
        <EventsRecru/>
        <FooterRecu/>
        </SignedOut>

      <SignedIn>
        <div className="flex justify-between items-center p-4 bg-[#f9fafb] text-black">
          <img
            src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995"
            alt=""
            className="w-12"
          />
          <UserButton />
        </div>
        {alreadySubmitted ? (
          <div className="p-10 text-center bg-[#f9fafb] w-screen h-screen">
            <h1 className="text-6xl font-bold text-green-400">
              You have submitted your application.
            </h1>
            <p className="mt-4">
              Our team will contact you soon. Thank you for applying!
            </p>
          </div>
        ) : (
          <div className="bg-[#f9fafb] text-black min-h-screen sm:min-h-screen lg:min-h-screen">
            <div className="p-4 text-2xl font-bold">
              <h1>
                Welcome <span className="text-[#5227FF]">{user?.firstName}</span>{" "}
                to E-Cell Smvit Recruitment 2025
              </h1>
            </div>
            <div className="text-white">
              <Stepper
                initialStep={1}
                onStepChange={(step) => setCurrentStep(step)}
                onFinalStepCompleted={async () => {
                  if (!isFormValid) {
                    toast.warn("Please fill all required fields before submitting.");
                    return;
                  }
                  try {
                    await submitApplication({
                      name,
                      usn,
                      teamrole,
                      mobilenumber,
                      linkedin,
                      q1,
                      q2,
                      q3,
                      q4,
                      filledByUser: user?.firstName,
                      userId: user?.id,
                    });
                    toast.success("Application submitted successfully!");
                    setAlreadySubmitted(true);
                  } catch (error) {
                    toast.error("Error submitting form. Please try again.");
                  }
                }}
                nextButtonProps={{
                  disabled: currentStep === 4 ? !isFormValid : false,
                  style: currentStep === 4 && !isFormValid ? { opacity: 0.5, cursor: "not-allowed" } : {},
                }}
                backButtonText="Previous"
                nextButtonText="Next"
              >
                <Step>
                  <h2 className="text-2xl font-bold text-[#5227FF]">Why E-CELL SMVIT?</h2>
                  <p className="text-black">
                    <span className="font-bold">E-Cell SMVIT is more than just a student club</span> - it’s a launchpad for 
                    innovators, entrepreneurs, and changemakers. By joining, <span className="font-bold">you’ll gain 
                    hands-on experience in leadership, teamwork, and problem-solving</span> while 
                    working on real-world projects and competitions. From <span className="font-bold">networking with 
                    industry leaders and startup founders</span> to <span className="font-bold">showcasing your ideas at national 
                    events</span>, E-Cell gives you the platform, mentorship, and resources to turn 
                    your vision into impact. Whether you’re a developer, designer, or 
                    strategist, <span className="font-bold">E-Cell SMVIT empowers you to create, collaborate, and grow.</span>
                  </p>
                </Step>
                <Step>
                  <h2 className='text-2xl font-bold text-[#5227FF] mb-4 text-center'>Team Roles</h2>
                  <div className='grid grid-cols-1 gap-6 justify-items-center w-full sm:grid-cols-2 md:grid-cols-3 md:gap-8'>
                    <ul className="p-4 w-full max-w-xs">
                      <li className="font-bold text-[#5227FF] mb-2">Operations Executive</li>
                      <p className='text-black'>
                        Coordinating logistics, obtaining necessary permissions, and managing documentation of operations and events.
                      </p>
                    </ul>
                    <ul className="p-4 w-full max-w-xs">
                      <li className="font-bold text-[#5227FF] mb-2">Events & Marketing Executive</li>
                      <p className='text-black'>
                        Planning and organizing events, as well as promoting and marketing them.
                      </p>
                    </ul>
                    <ul className="p-4 w-full max-w-xs">
                      <li className="font-bold text-[#5227FF] mb-2">Corporate Executive</li>
                      <p className='text-black'>
                        Managing sponsorships and building funding partnerships with companies.
                      </p>
                    </ul>
                    <ul className="p-4 w-full max-w-xs">
                      <li className="font-bold text-[#5227FF] mb-2">Tech Executive</li>
                      <p className='text-black'>
                        Developing and maintaining websites, and planning designs and strategies for development.
                      </p>
                    </ul>
                    <ul className="p-4 w-full max-w-xs">
                      <li className="font-bold text-[#5227FF] mb-2">Design and Media Executive</li>
                      <p className='text-black'>
                        Planning and managing media posts, creating designs, and growing social media reach.
                      </p>
                    </ul>
                  </div>
                </Step>

                <div className="p-4 mb-6">
                  <h2 className="mb-2 text-lg font-semibold text-[#5227FF]">Instructions while filling the form</h2>
                  <ul className="space-y-1 list-disc list-inside text-black">
                    <li>Fill in all required fields marked with <span className="text-red-500">*</span>.</li>
                    <li>Double-check your name, USN,Team Role and Mobile No. for accuracy.</li>
                    <li>Answer all questions honestly and thoughtfully to reflect your true experiences and aspirations.</li>
                    <li>Once you submit the form, you will not be able to edit your responses.</li>
                    <li>
                      For any queries or issues, contact us at <a href="mailto:ecell.smvit@gmail.com" className="text-blue-600 underline">ecellsmvit@gmail.com</a> or reach out to our team on Instagram <a href="https://www.instagram.com/ecell_smvit/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">@ecellsmvit</a>.
                    </li>
                    <li>
                      If you're facing technical issues or queries, you can also WhatsApp us at <a href="https://wa.me/917903897660" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">7903897660</a>.
                    </li>
                  </ul>
                </div>
                <Step>
                  <h2 className="text-2xl font-bold text-[#5227FF] mb-4 text-center">Application Form</h2>
                  <form
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:gap-4">
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-black" htmlFor="name">
                          Name
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="px-3 py-2 w-full text-black bg-gray-200 rounded"
                          autoComplete="off"
                          onCopy={e => e.preventDefault()}
                          onCut={e => e.preventDefault()}
                          onPaste={e => e.preventDefault()}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-black" htmlFor="teamrole">
                          Team Role you want apply
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <select
                          id="teamrole"
                          value={teamrole}
                          onChange={(e) => setTeamrole(e.target.value)}
                          className="px-3 py-2 w-full text-black bg-gray-200 rounded"
                          autoComplete="off"
                          onCopy={e => e.preventDefault()}
                          onCut={e => e.preventDefault()}
                          onPaste={e => e.preventDefault()}
                        >
                          <option value="">Select Team Role</option>
                          <option value="operations_executive">Operations Executive</option>
                          <option value="eventsandmarketing_executive">Events and Marketing Executive</option>
                          <option value="corporate_executive">Corporate Executive</option>
                          <option value="tech_executive">Tech Executive</option>
                          <option value="designandmedia_executive">Design and Media Executive</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-black" htmlFor="usn">
                          USN
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          id="usn"
                          type="text"
                          value={usn}
                          onChange={(e) => setUsn(e.target.value)}
                          placeholder="Your USN"
                          className="px-3 py-2 w-full text-black bg-gray-200 rounded"
                          autoComplete="off"
                          onCopy={e => e.preventDefault()}
                          onCut={e => e.preventDefault()}
                          onPaste={e => e.preventDefault()}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-black" htmlFor="mobilenumber">
                          Mobile Number
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          id="mobilenumber"
                          type="text"
                          value={mobilenumber}
                          onChange={(e) => setMobilenumber(e.target.value)}
                          placeholder="Your mobile number"
                          className="px-3 py-2 w-full text-black bg-gray-200 rounded"
                          autoComplete="off"
                          onCopy={e => e.preventDefault()}
                          onCut={e => e.preventDefault()}
                          onPaste={e => e.preventDefault()}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:gap-4">
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-black" htmlFor="linkedin">
                          LinkedIn Profile URL
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          id="linkedin"
                          type="url"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          placeholder="https://www.linkedin.com/in/your-profile"
                          className="px-3 py-2 w-full text-black bg-gray-200 rounded"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:gap-4">
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-black" htmlFor="q1">
                          Why do you want to join the E-Cell, and what do you hope to contribute to our entrepreneurial community?
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <textarea
                          id="q1"
                          value={q1}
                          onChange={(e) => setQ1(e.target.value)}
                          placeholder="Your answer"
                          className="px-3 py-2 w-full text-black bg-gray-200 rounded"
                          rows={3}
                          autoComplete="off"
                          onCopy={e => e.preventDefault()}
                          onCut={e => e.preventDefault()}
                          onPaste={e => e.preventDefault()}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-black" htmlFor="q2">
                          Do you have any prior experience in startups, entrepreneurship, or event management? Please elaborate.
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <textarea
                          id="q2"
                          value={q2}
                          onChange={(e) => setQ2(e.target.value)}
                          placeholder="Your answer"
                          className="px-3 py-2 w-full text-black bg-gray-200 rounded"
                          rows={3}
                          autoComplete="off"
                          onCopy={e => e.preventDefault()}
                          onCut={e => e.preventDefault()}
                          onPaste={e => e.preventDefault()}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row md:gap-4">
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-black" htmlFor="q3">
                          Describe a situation where you faced a challenge in a team project or initiative. How did you handle it, and what was the outcome?
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <textarea
                          id="q3"
                          value={q3}
                          onChange={(e) => setQ3(e.target.value)}
                          placeholder="Your answer"
                          className="px-3 py-2 w-full text-black bg-gray-200 rounded"
                          rows={3}
                          autoComplete="off"
                          onCopy={e => e.preventDefault()}
                          onCut={e => e.preventDefault()}
                          onPaste={e => e.preventDefault()}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 font-semibold text-black" htmlFor="q4">
                          Share an innovative idea or project you have worked on. How did you execute it, and what impact did it have?
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <textarea
                          id="q4"
                          value={q4}
                          onChange={(e) => setQ4(e.target.value)}
                          placeholder="Your answer"
                          className="px-3 py-2 w-full text-black bg-gray-200 rounded"
                          rows={3}
                          autoComplete="off"
                          onCopy={e => e.preventDefault()}
                          onCut={e => e.preventDefault()}
                          onPaste={e => e.preventDefault()}
                        />
                      </div>
                    </div>
                  </form>
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