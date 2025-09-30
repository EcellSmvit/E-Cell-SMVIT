import React, { useState } from 'react'
import { SignedOut, SignInButton, SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import Stepper, { Step } from '../components/ui/Components/Stepper/Stepper';
import { submitApplication } from '@/lib/api';

function Recruitment() {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [usn, setUsn] = useState('');
  const [gender, setGender] = useState('');
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  return (
    <div>
      <SignedOut>
        <div className="relative w-full min-h-screen bg-[#18191D]">
          {/* Dark Dot Matrix */}
          <div className="absolute inset-0 z-0 hero-background" />
          {/* Header */}
          <div className="flex relative z-10 justify-between items-center px-4 py-4 sm:px-8 md:px-14">
            <img
              src="https://ik.imagekit.io/es6xialea/logowithoutname_FRoJAY4ve?updatedAt=1755297005039"
              className="w-10 sm:w-12"
              alt=""
            />
            <div className="text-white bg-[#6D4DFE] w-auto px-4 sm:px-6 py-2 rounded-md">
              <SignInButton />
            </div>
          </div>
          {/* Hero Content */}
          <div className="flex relative z-10 flex-col justify-center items-center px-4 mt-24 text-white sm:mt-32 md:mt-48">
            <div className="text-3xl font-medium text-center sm:text-5xl md:text-6xl">
              <h1>Welcome to</h1>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center mt-4 sm:flex-row sm:gap-8 sm:mt-6">
              <h1 className="text-4xl font-black text-center sm:text-7xl md:text-9xl sm:text-left">
                E-CELL SMVIT
              </h1>
              <img
                src="https://ik.imagekit.io/es6xialea/logowithoutname_FRoJAY4ve?updatedAt=1755297005039"
                className="p-2 w-16 sm:w-24 md:w-28"
                alt="E-CELL SMVIT Logo"
              />
            </div>
            <div className="mt-4 text-2xl font-medium text-center sm:text-4xl md:text-6xl">
              Recruitment 2025
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className='flex justify-between items-center p-4'>
          <img src="https://ik.imagekit.io/es6xialea/logowithoutname_FRoJAY4ve?updatedAt=1755297005039" alt="" className='w-12' />
          <UserButton />
        </div>
        <div>
          <div className='p-4 text-4xl font-bold text-white'>
            <h1>
              Welcome <span className='text-[#5227FF]'>{user?.firstName}</span> <br /> to E-Cell Smvit Recruitment 2025
            </h1>
          </div>
          <div className='text-white'>
            <Stepper
              initialStep={1}
              onStepChange={(step) => {
                console.log(step);
              }}
              onFinalStepCompleted={async () => {
                try {
                  await submitApplication({ name, year, usn, gender, q1, q2, q3, q4 });
                  alert("Application submitted successfully!");
                } catch (error) {
                  alert("Error submitting form. Check console.");
                }
              }}
              backButtonText="Previous"
              nextButtonText="Next"
            >
              <Step>
                <h2 className='text-2xl font-bold text-[#5227FF]'>Why E-CELL SMVIT?</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor neque vel veritatis mollitia officiis quae! Maxime eius totam obcaecati atque nostrum soluta harum quos repellendus quis itaque temporibus neque, culpa inventore dolore cumque error expedita autem quod rerum at? Excepturi, incidunt magnam. Pariatur architecto ipsa molestiae neque cumque placeat minus corrupti asperiores dolores, iste assumenda vitae esse explicabo fugiat cum nulla reiciendis eligendi culpa reprehenderit quo itaque labore ipsam. Cum iusto minima aspernatur voluptatem perferendis laudantium nulla distinctio eveniet! Nostrum sint saepe blanditiis quisquam magnam nulla ipsum quas voluptates amet, reiciendis perferendis tenetur facere, atque et natus cupiditate qui aspernatur.</p>
              </Step>
              <Step>
                <h2 className='text-2xl font-bold text-[#5227FF] mb-4 text-center'>Team Roles</h2>
                <div className='grid grid-cols-1 gap-6 justify-items-center w-full sm:grid-cols-2 md:grid-cols-3 md:gap-8'>
                  <ul className="p-4 w-full max-w-xs">
                    <li className="font-bold text-[#5227FF] mb-2">Operational Manager</li>
                    <li className="text-white">- Arranging Logistics and Permissions</li>
                    <li className="text-white">- Documenting operations and events</li>
                  </ul>
                  <ul className="p-4 w-full max-w-xs">
                    <li className="font-bold text-[#5227FF] mb-2">Events & PR Manager</li>
                    <li className="text-white">- Conducting of Events</li>
                    <li className="text-white">- Gathering and Influencing People</li>
                  </ul>
                  <ul className="p-4 w-full max-w-xs">
                    <li className="font-bold text-[#5227FF] mb-2">Corporate Relations Manager</li>
                    <li className="text-white">- Arranging Sponsorships</li>
                    <li className="text-white">- Making funding sources from companies</li>
                  </ul>
                  <ul className="p-4 w-full max-w-xs">
                    <li className="font-bold text-[#5227FF] mb-2">Marketing Manager</li>
                    <li className="text-white">- Advertising and Marketing Events</li>
                    <li className="text-white">- Influencing Students</li>
                  </ul>
                  <ul className="p-4 w-full max-w-xs">
                    <li className="font-bold text-[#5227FF] mb-2">Design Media Manager</li>
                    <li className="text-white">- Posting and planning Media</li>
                    <li className="text-white">- Social Media Growth Strategy</li>
                    <li className="text-white">- Designing Social Content</li>
                  </ul>
                </div>
              </Step>
              <Step>
                <h2 className="text-2xl font-bold text-[#5227FF] mb-4 text-center">Application Form</h2>
                <form className="flex flex-col gap-4" autoComplete="off">
                  <div className="flex flex-col gap-4 md:flex-row md:gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-semibold text-white" htmlFor="name">Name</label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="px-3 py-2 w-full text-white bg-gray-800 rounded"
                        autoComplete="off"
                        onCopy={e => e.preventDefault()}
                        onCut={e => e.preventDefault()}
                        onPaste={e => e.preventDefault()}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-semibold text-white" htmlFor="year">Year</label>
                      <select
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="px-3 py-2 w-full text-white bg-gray-800 rounded"
                        autoComplete="off"
                        onCopy={e => e.preventDefault()}
                        onCut={e => e.preventDefault()}
                        onPaste={e => e.preventDefault()}
                      >
                        <option value="">Select Year</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-semibold text-white" htmlFor="usn">USN</label>
                      <input
                        id="usn"
                        type="text"
                        value={usn}
                        onChange={(e) => setUsn(e.target.value)}
                        placeholder="Your USN"
                        className="px-3 py-2 w-full text-white bg-gray-800 rounded"
                        autoComplete="off"
                        onCopy={e => e.preventDefault()}
                        onCut={e => e.preventDefault()}
                        onPaste={e => e.preventDefault()}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-semibold text-white">Gender</label>
                      <div className="flex gap-4">
                        <label className="flex gap-1 items-center text-white">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={() => setGender("male")}
                            onCopy={e => e.preventDefault()}
                            onCut={e => e.preventDefault()}
                            onPaste={e => e.preventDefault()}
                          />
                          Male
                        </label>
                        <label className="flex gap-1 items-center text-white">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={() => setGender("female")}
                            onCopy={e => e.preventDefault()}
                            onCut={e => e.preventDefault()}
                            onPaste={e => e.preventDefault()}
                          />
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 md:flex-row md:gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-semibold text-white" htmlFor="q1">
                        Why do you want to join the E-Cell, and what do you hope to contribute to our entrepreneurial community?
                      </label>
                      <textarea
                        id="q1"
                        value={q1}
                        onChange={(e) => setQ1(e.target.value)}
                        placeholder="Your answer"
                        className="px-3 py-2 w-full text-white bg-gray-800 rounded"
                        rows={3}
                        autoComplete="off"
                        onCopy={e => e.preventDefault()}
                        onCut={e => e.preventDefault()}
                        onPaste={e => e.preventDefault()}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-semibold text-white" htmlFor="q2">
                        Do you have any prior experience in startups, entrepreneurship, or event management? Please elaborate.
                      </label>
                      <textarea
                        id="q2"
                        value={q2}
                        onChange={(e) => setQ2(e.target.value)}
                        placeholder="Your answer"
                        className="px-3 py-2 w-full text-white bg-gray-800 rounded"
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
                      <label className="block mb-1 font-semibold text-white" htmlFor="q3">
                        Describe a situation where you faced a challenge in a team project or initiative. How did you handle it, and what was the outcome?
                      </label>
                      <textarea
                        id="q3"
                        value={q3}
                        onChange={(e) => setQ3(e.target.value)}
                        placeholder="Your answer"
                        className="px-3 py-2 w-full text-white bg-gray-800 rounded"
                        rows={3}
                        autoComplete="off"
                        onCopy={e => e.preventDefault()}
                        onCut={e => e.preventDefault()}
                        onPaste={e => e.preventDefault()}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-semibold text-white" htmlFor="q4">
                        Share an innovative idea or project you have worked on. How did you execute it, and what impact did it have?
                      </label>
                      <textarea
                        id="q4"
                        value={q4}
                        onChange={(e) => setQ4(e.target.value)}
                        placeholder="Your answer"
                        className="px-3 py-2 w-full text-white bg-gray-800 rounded"
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
              <Step>
                <h2 className="mb-2 text-2xl font-bold">Final Step</h2>
                <p className="mb-4">You made it!</p>
                <div className="mb-4">
                  <p className="text-white">
                    Please review your answers before submitting your application. Make sure all information is accurate and complete.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-gray-300">
                    <li>Double-check your contact details.</li>
                    <li>Ensure your answers reflect your true experiences and aspirations.</li>
                    <li>Once you submit, you will not be able to edit your responses.</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-white">What happens next?</p>
                  <p className="text-gray-300">
                    Our team will review your application and contact you via email regarding the next steps. Keep an eye on your inbox!
                  </p>
                </div>
                <div className="mt-6">
                  <p className="font-bold text-green-400">Thank you for your interest in joining E-Cell!</p>
                </div>
              </Step>
            </Stepper>
          </div>
        </div>
      </SignedIn>
    </div>
  )
}

export default Recruitment