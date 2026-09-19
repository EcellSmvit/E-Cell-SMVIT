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
import RecruitmentHero from '@/components/RecruitmentHero';

function Recruitment() {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const isFormValid = name && teamrole && mobilenumber && usn && q1 && q2 && q3 && q4;
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
        <RecruitmentHero />
        <OpeningPost />
        <Position />
        <Facingtrouble />
        <AchievmentRecru />
        <EventsRecru />
        <FooterRecu />
      </SignedOut>

      <SignedIn>
        <div className="flex items-center justify-between border-b border-[#DDDAD2] bg-[#F7F5EF] px-4 py-4 text-black sm:px-8 md:px-12">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black">
              <img
                src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995"
                alt="E-Cell SMVIT"
                className="w-8 invert"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-black">E-Cell SMVIT</p>
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#999791]">
                Recruitment 2026
              </p>
            </div>
          </div>
          <UserButton />
        </div>
        {alreadySubmitted ? (
          <div className="flex min-h-[85vh] w-full flex-col items-center justify-center bg-[#F7F5EF] px-5 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#6D4CFF] text-2xl text-white">
              ✓
            </div>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#999791]">
              Application Received
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              Application
              <span className="text-[#6D4CFF]"> Submitted.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#77756F]">
              Our team will contact you soon. Thank you for applying to E-Cell SMVIT.
            </p>
          </div>
        ) : (
          <div className="min-h-[100vh] bg-[#F7F5EF] px-4 py-8 text-black sm:px-8 sm:py-12">
            <div className="mx-auto mb-8 max-w-6xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#6D4CFF]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#999791]">
                  E-Cell SMVIT
                </span>
              </div>
              <h1 className="text-3xl font-black uppercase leading-none tracking-[-0.04em] sm:text-5xl">
                Welcome{" "}
                <span className="text-[#6D4CFF]">
                  {user?.firstName}
                </span>
              </h1>
              <p className="mt-2 text-sm text-[#77756F]">
                Recruitment 2026 · Application Form
              </p>
            </div>
            <div className="mx-auto w-full h-full max-w-6xl rounded-2xl border border-[#DDDAD2] bg-white p-4 sm:p-8">
              <div className="text-black">
                {isSubmitting && (
                  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-[28px] bg-white p-8 text-center shadow-2xl">

                      {/* Spinner */}
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#6D4CFF]/10">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#DDDAD2] border-t-[#6D4CFF]" />
                      </div>

                      {/* Text */}
                      <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#999791]">
                        Please Wait
                      </p>

                      <h3 className="mt-2 text-xl font-black uppercase tracking-tight text-[#111111]">
                        Submitting Your Response
                      </h3>

                      <p className="mt-3 text-xs leading-5 text-[#77756F]">
                        Please don't close or refresh this page while we submit your
                        application.
                      </p>

                      {/* Progress indication */}
                      <div className="mt-6 flex items-center justify-center gap-2">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6D4CFF]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6D4CFF] [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6D4CFF] [animation-delay:300ms]" />
                      </div>

                    </div>
                  </div>
                )}
                <Stepper
                  initialStep={1}
                  onStepChange={(step) => setCurrentStep(step)}
                  onFinalStepCompleted={async () => {
                    if (!isFormValid) {
                      toast.warn("Please fill all required fields before submitting.");
                      return;
                    }
                    setIsSubmitting(true);
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
                    } catch {
                      toast.error("Error submitting form. Please try again.");
                    }
                    finally {
                      setIsSubmitting(false);
                    }
                  }}
                  nextButtonProps={{
                    disabled: isSubmitting || (currentStep === 5 ? !isFormValid : false),
                    style: currentStep === 5 && !isFormValid ? { opacity: 0.5, cursor: "not-allowed", } : {},
                  }}
                  backButtonText="Previous"
                  nextButtonText="Next"
                >
                  <Step>
                    <div className="mx-auto w-full max-w-4xl">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="mb-3 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#6D4CFF]" />

                            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#77756F]">
                              Step 01 / Why Join
                            </p>
                          </div>

                          <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#111111] sm:text-4xl">
                            Why E-Cell
                            <br />
                            <span className="text-[#6D4CFF]">SMVIT?</span>
                          </h2>
                        </div>

                        <span className="hidden rounded-full border border-[#DDDAD2] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#99968E] sm:block">
                          Read Before You Apply
                        </span>
                      </div>


                      <div className="my-7 h-px w-full bg-[#DDDAD2]" />

                      <div className="rounded-[20px] border border-[#DDDAD2] bg-[#F7F5EF] p-5 sm:p-6">
                        <p className="text-sm leading-7 text-[#55534E] sm:text-[15px]">
                          <span className="font-black text-[#111111]">
                            E-Cell SMVIT is more than just a student club.
                          </span>{" "}
                          It is a platform for innovators, entrepreneurs, and changemakers to
                          learn, build, collaborate, and turn ideas into action.
                        </p>
                        <p className="mt-4 text-sm leading-7 text-[#55534E] sm:text-[15px]">
                          As a member, you get the opportunity to work on{" "}
                          <span className="font-bold text-[#111111]">
                            real-world projects and competitions
                          </span>
                          , develop leadership and problem-solving skills, connect with{" "}
                          <span className="font-bold text-[#111111]">
                            founders and industry professionals
                          </span>
                          , and represent E-Cell at national-level events.
                        </p>
                      </div>
                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <div className="group rounded-[18px] border border-[#DDDAD2] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#6D4CFF]">
                          <div className="mb-6 flex items-center justify-between">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111111] text-[9px] font-black text-white">
                              01
                            </span>
                            <span className="text-[18px] text-[#6D4CFF]">
                              ↗
                            </span>
                          </div>
                          <h3 className="text-sm font-black uppercase tracking-tight text-[#111111]">
                            Build & Lead
                          </h3>
                          <p className="mt-2 text-xs leading-5 text-[#77756F]">
                            Gain hands-on experience through projects, initiatives, and team
                            leadership.
                          </p>
                        </div>
                        <div className="group rounded-[18px] border border-[#DDDAD2] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#6D4CFF]">
                          <div className="mb-6 flex items-center justify-between">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111111] text-[9px] font-black text-white">
                              02
                            </span>
                            <span className="text-[18px] text-[#6D4CFF]">
                              ↗
                            </span>
                          </div>
                          <h3 className="text-sm font-black uppercase tracking-tight text-[#111111]">
                            Connect
                          </h3>
                          <p className="mt-2 text-xs leading-5 text-[#77756F]">
                            Network with entrepreneurs, founders, industry leaders, and
                            like-minded students.
                          </p>
                        </div>

                        <div className="group rounded-[18px] border border-[#DDDAD2] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#6D4CFF]">
                          <div className="mb-6 flex items-center justify-between">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111111] text-[9px] font-black text-white">
                              03
                            </span>
                            <span className="text-[18px] text-[#6D4CFF]">
                              ↗
                            </span>
                          </div>
                          <h3 className="text-sm font-black uppercase tracking-tight text-[#111111]">
                            Create Impact
                          </h3>
                          <p className="mt-2 text-xs leading-5 text-[#77756F]">
                            Showcase your ideas, participate in national events, and create
                            meaningful impact.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex items-center gap-3 rounded-[18px] bg-[#111111] px-5 py-4">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6D4CFF]" />

                        <p className="text-[10px] font-semibold uppercase leading-5 tracking-[0.08em] text-white sm:text-xs">
                          Learn. Build. Connect. Lead.
                          <span className="ml-1 text-[#6D4CFF]">
                            Your journey starts here.
                          </span>
                        </p>
                      </div>
                    </div>
                  </Step>


                  <Step>

                    <div className="mx-auto max-w-5xl">

                      <p className="mb-2 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-[#6D4CFF]">
                        02 / Find Your Role
                      </p>

                      <h2 className="text-center text-2xl font-black uppercase tracking-tight sm:text-3xl">
                        Team Roles
                      </h2>

                      <div className="mx-auto mt-4 h-1 w-10 bg-[#6D4CFF]" />

                      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {[
                          [
                            "01",
                            "Operations Executive",
                            "Coordinating logistics, obtaining permissions, and managing documentation of operations and events.",
                          ],
                          [
                            "02",
                            "Events & Marketing Executive",
                            "Planning and organizing events, as well as promoting and marketing them.",
                          ],
                          [
                            "03",
                            "Corporate Relations Executive",
                            "Managing sponsorships and building funding partnerships with companies.",
                          ],
                          [
                            "04",
                            "Tech Executive",
                            "Developing and maintaining websites, and planning designs and strategies for development.",
                          ],
                          [
                            "05",
                            "Design & Media Executive",
                            "Planning and managing media posts, creating designs, and growing social media reach.",
                          ],
                        ].map(([number, title, description]) => (
                          <div
                            key={number}
                            className="rounded-xl border border-[#DDDAD2] bg-[#F7F5EF] p-5"
                          >
                            <span className="text-[9px] font-bold tracking-widest text-[#999791]">
                              {number}
                            </span>
                            <h3 className="mt-4 text-base font-black uppercase leading-tight">
                              {title}
                            </h3>
                            <div className="mt-3 h-0.5 w-8 bg-[#6D4CFF]" />
                            <p className="mt-3 text-xs leading-relaxed text-[#77756F]">
                              {description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Step>
                  <div className="mx-auto my-8 max-w-4xl overflow-hidden rounded-[24px] border border-[#DDDAD2] bg-white shadow-[0_8px_30px_rgba(17,17,17,0.04)]">
                    <div className="flex items-center justify-between border-b border-[#E5E2DA] px-5 py-5 sm:px-7">
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#6D4CFF]" />
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#111111]">
                          Before You Apply
                        </p>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AAA69D]">
                        Important
                      </span>
                    </div>
                    <div className="p-5 sm:p-7">
                      <div className="space-y-3">
                        <div className="flex gap-4 rounded-2xl border border-[#E5E2DA] bg-[#F7F5EF] p-4 transition-all duration-300 hover:border-[#C8C5BC]">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#111111] text-[9px] font-black text-white">
                            01
                          </span>
                          <p className="pt-1 text-xs leading-5 text-[#55534E]">
                            Fill in all required fields marked with{" "}
                            <span className="font-black text-[#6D4CFF]">*</span>.
                          </p>
                        </div>
                        <div className="flex gap-4 rounded-2xl border border-[#E5E2DA] bg-[#F7F5EF] p-4 transition-all duration-300 hover:border-[#C8C5BC]">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#111111] text-[9px] font-black text-white">
                            02
                          </span>
                          <p className="pt-1 text-xs leading-5 text-[#55534E]">
                            Double-check your name, USN, Team Role and Mobile Number.
                          </p>
                        </div>
                        <div className="flex gap-4 rounded-2xl border border-[#E5E2DA] bg-[#F7F5EF] p-4 transition-all duration-300 hover:border-[#C8C5BC]">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#111111] text-[9px] font-black text-white">
                            03
                          </span>
                          <p className="pt-1 text-xs leading-5 text-[#55534E]">
                            Answer all questions honestly and thoughtfully.
                          </p>

                        </div>
                        <div className="flex gap-4 rounded-2xl border border-[#E5E2DA] bg-[#F7F5EF] p-4 transition-all duration-300 hover:border-[#C8C5BC]">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#111111] text-[9px] font-black text-white">
                            04
                          </span>
                          <p className="pt-1 text-xs leading-5 text-[#55534E]">
                            Once submitted, you will not be able to edit your responses.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <a
                          href="mailto:ecell.smvit@gmail.com"
                          className="group flex items-center justify-between rounded-2xl bg-[#111111] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          <div>
                            <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[#777777]">
                              Need Help?
                            </p>
                            <p className="text-xs font-bold text-white">
                              ecellsmvit@gmail.com
                            </p>
                          </div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6D4CFF] text-xs text-white transition-transform duration-300 group-hover:rotate-45">
                            ↗
                          </span>
                        </a>
                        <a
                          href="https://wa.me/917903897660"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between rounded-2xl bg-[#111111] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          <div>
                            <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[#777777]">
                              WhatsApp
                            </p>
                            <p className="text-xs font-bold text-white">
                              +91 7903897660
                            </p>
                          </div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6D4CFF] text-xs text-white transition-transform duration-300 group-hover:rotate-45">
                            ↗
                          </span>
                        </a>
                      </div>
                    </div>
                    <div className="h-1 w-full bg-[#6D4CFF]" />
                  </div>
                  <Step>
                    <div className="w-full rounded-[30px] border border-[#DDDAD2] bg-white p-5 shadow-[0_10px_40px_rgba(17,17,17,0.04)] sm:p-8 lg:p-10">
                      <div className="mb-10 border-b border-[#E5E2DA] pb-8">
                        <div className="mb-5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-[#6D4CFF]" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#999999]">
                              E-Cell SMVIT
                            </span>
                          </div>
                          <span className="text-[10px] font-bold tracking-[0.2em] text-[#B0ADA5]">
                            04 / 05
                          </span>
                        </div>
                        <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#111111] sm:text-5xl lg:text-6xl">
                          Personal
                          <br />
                          <span className="text-[#6D4CFF]">Details</span>
                        </h2>

                        <div className="mt-6">
                          <p className="max-w-xl text-sm leading-6 text-[#77756F]">
                            Tell us a little about yourself before we get to know
                            your ideas and experiences.
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="mb-6 flex items-center gap-3">
                          <span className="text-[10px] font-black text-[#6D4CFF]">
                            01
                          </span>
                          <h3 className="text-xs font-black uppercase tracking-[0.18em]">
                            Basic Information
                          </h3>
                          <div className="h-px flex-1 bg-[#E5E2DA]" />
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor="name"
                              className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-[#333333]"
                            >
                              Name
                              <span className="ml-1 text-[#6D4CFF]">*</span>
                            </label>

                            <input
                              id="name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter your full name"
                              className="w-full rounded-2xl border border-[#DDDAD2] bg-[#F7F5EF] px-4 py-4 text-sm text-[#111111] outline-none transition-all duration-200 placeholder:text-[#AAA69D] hover:border-[#C8C5BC] focus:border-[#6D4CFF] focus:bg-white focus:ring-4 focus:ring-[#E21B12]/5"
                              autoComplete="off"
                              onCopy={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                              onPaste={(e) => e.preventDefault()}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="usn"
                              className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-[#333333]"
                            >
                              USN
                              <span className="ml-1 text-[#6D4CFF]">*</span>
                            </label>
                            <input
                              id="usn"
                              type="text"
                              value={usn}
                              onChange={(e) => setUsn(e.target.value)}
                              placeholder="Enter your USN"
                              className="w-full rounded-2xl border border-[#DDDAD2] bg-[#F7F5EF] px-4 py-4 text-sm text-[#111111] outline-none transition-all duration-200 placeholder:text-[#AAA69D] hover:border-[#C8C5BC] focus:border-[#6D4CFF] focus:bg-white focus:ring-4 focus:ring-[#E21B12]/5"
                              autoComplete="off"
                              onCopy={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                              onPaste={(e) => e.preventDefault()}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="mobilenumber"
                              className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-[#333333]"
                            >
                              Mobile Number
                              <span className="ml-1 text-[#6D4CFF]">*</span>
                            </label>
                            <input
                              id="mobilenumber"
                              type="text"
                              value={mobilenumber}
                              onChange={(e) => setMobilenumber(e.target.value)}
                              placeholder="Enter your mobile number"
                              className="w-full rounded-2xl border border-[#DDDAD2] bg-[#F7F5EF] px-4 py-4 text-sm text-[#111111] outline-none transition-all duration-200 placeholder:text-[#AAA69D] hover:border-[#C8C5BC] focus:border-[#6D4CFF] focus:bg-white focus:ring-4 focus:ring-[#E21B12]/5"
                              autoComplete="off"
                              onCopy={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                              onPaste={(e) => e.preventDefault()}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="teamrole"
                              className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-[#333333]"
                            >
                              Team Role
                              <span className="ml-1 text-[#6D4CFF]">*</span>
                            </label>

                            <select
                              id="teamrole"
                              value={teamrole}
                              onChange={(e) => setTeamrole(e.target.value)}
                              className="w-full appearance-none rounded-2xl border border-[#DDDAD2] bg-[#F7F5EF] px-4 py-4 text-sm text-[#111111] outline-none transition-all duration-200 hover:border-[#C8C5BC] focus:border-[#6D4CFF] focus:bg-white focus:ring-4 focus:ring-[#E21B12]/5"
                              autoComplete="off"
                              onCopy={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                              onPaste={(e) => e.preventDefault()}
                            >
                              <option value="">Select Team Role</option>

                              <option value="operations_executive">
                                Operations Executive
                              </option>

                              <option value="eventsandmarketing_executive">
                                Events and Marketing Executive
                              </option>

                              <option value="corporate_executive">
                                Corporate Executive
                              </option>

                              <option value="tech_executive">
                                Tech Executive
                              </option>

                              <option value="designandmedia_executive">
                                Design and Media Executive
                              </option>
                            </select>
                          </div>

                        </div>
                      </div>


                      {/* PROFESSIONAL */}
                      <div className="mt-10">

                        <div className="mb-6 flex items-center gap-3">
                          <span className="text-[10px] font-black text-[#6D4CFF]">
                            02
                          </span>

                          <h3 className="text-xs font-black uppercase tracking-[0.18em]">
                            Professional Profile
                          </h3>

                          <div className="h-px flex-1 bg-[#E5E2DA]" />
                        </div>


                        <label
                          htmlFor="linkedin"
                          className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-[#333333]"
                        >
                          LinkedIn Profile URL

                          <span className="ml-2 text-[10px] font-normal normal-case text-[#999999]">
                            Optional
                          </span>
                        </label>

                        <input
                          id="linkedin"
                          type="url"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          placeholder="https://www.linkedin.com/in/your-profile"
                          className="w-full rounded-2xl border border-[#DDDAD2] bg-[#F7F5EF] px-4 py-4 text-sm text-[#111111] outline-none transition-all duration-200 placeholder:text-[#AAA69D] hover:border-[#C8C5BC] focus:border-[#6D4CFF] focus:bg-white focus:ring-4 focus:ring-[#E21B12]/5"
                        />

                      </div>


                      {/* INFO */}
                      <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[#111111] p-5">

                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6D4CFF] text-xs font-black text-white">
                          →
                        </span>

                        <p className="text-xs leading-5 text-[#999999]">
                          Make sure your personal information is accurate before
                          moving to the next step.
                        </p>

                      </div>

                    </div>
                  </Step>
                  <Step>
                    <div className="w-full rounded-[30px] border border-[#DDDAD2] bg-white p-5 shadow-[0_10px_40px_rgba(17,17,17,0.04)] sm:p-8 lg:p-10">
                      <div className="mb-10 border-b border-[#E5E2DA] pb-8">
                        <div className="mb-5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-[#6D4CFF]" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#999999]">
                              E-Cell SMVIT
                            </span>
                          </div>
                          <span className="text-[10px] font-bold tracking-[0.2em] text-[#B0ADA5]">
                            05 / 05
                          </span>
                        </div>
                        <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[#111111] sm:text-5xl lg:text-6xl">
                          Question
                          <br />
                          <span className="text-[#6D4CFF]">& Answer</span>
                        </h2>
                        <div className="mt-6">
                          <p className="max-w-xl text-sm leading-6 text-[#77756F]">
                            This is your chance to show us how you think, create,
                            and contribute.
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="mb-6 flex items-center gap-3">
                          <span className="text-[10px] font-black text-[#6D4CFF]">
                            01
                          </span>
                          <h3 className="text-xs font-black uppercase tracking-[0.18em]">
                            Your Perspective
                          </h3>
                          <div className="h-px flex-1 bg-[#E5E2DA]" />
                        </div>
                        <div className="space-y-5">
                          <div className="rounded-[22px] border border-[#DDDAD2] bg-[#F7F5EF] p-5 sm:p-6">
                            <div className="mb-4 flex gap-4">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-xs font-black text-white">
                                01
                              </div>
                              <label
                                htmlFor="q1"
                                className="pt-1 text-sm font-bold leading-6 text-[#111111]"
                              >
                                Why do you want to join the E-Cell, and what do you
                                hope to contribute to our entrepreneurial community?

                                <span className="ml-1 text-[#6D4CFF]">
                                  *
                                </span>
                              </label>

                            </div>


                            <textarea
                              id="q1"
                              value={q1}
                              onChange={(e) => setQ1(e.target.value)}
                              placeholder="Share your motivation and what you would like to contribute..."
                              rows={5}
                              autoComplete="off"
                              className="w-full resize-y rounded-2xl border border-[#DDDAD2] bg-white px-4 py-4 text-sm leading-6 text-[#111111] outline-none transition-all placeholder:text-[#AAA69D] focus:border-[#6D4CFF] focus:ring-4 focus:ring-[#E21B12]/5"
                              onCopy={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                              onPaste={(e) => e.preventDefault()}
                            />

                          </div>
                          <div className="rounded-[22px] border border-[#DDDAD2] bg-[#F7F5EF] p-5 sm:p-6">
                            <div className="mb-4 flex gap-4">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-xs font-black text-white">
                                02
                              </div>
                              <label
                                htmlFor="q2"
                                className="pt-1 text-sm font-bold leading-6 text-[#111111]"
                              >
                                Do you have any prior experience in startups,
                                entrepreneurship, or event management? Please
                                elaborate.

                                <span className="ml-1 text-[#6D4CFF]">
                                  *
                                </span>
                              </label>

                            </div>
                            <textarea
                              id="q2"
                              value={q2}
                              onChange={(e) => setQ2(e.target.value)}
                              placeholder="Tell us about your experience..."
                              rows={5}
                              autoComplete="off"
                              className="w-full resize-y rounded-2xl border border-[#DDDAD2] bg-white px-4 py-4 text-sm leading-6 text-[#111111] outline-none transition-all placeholder:text-[#AAA69D] focus:border-[#6D4CFF] focus:ring-4 focus:ring-[#E21B12]/5"
                              onCopy={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                              onPaste={(e) => e.preventDefault()}
                            />
                          </div>
                          <div className="rounded-[22px] border border-[#DDDAD2] bg-[#F7F5EF] p-5 sm:p-6">
                            <div className="mb-4 flex gap-4">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-xs font-black text-white">
                                03
                              </div>
                              <label
                                htmlFor="q3"
                                className="pt-1 text-sm font-bold leading-6 text-[#111111]"
                              >
                                If you were given the opportunity to lead one new
                                event, workshop, or project for E-Cell, what would it
                                be and what value would it bring to the student
                                community?
                                <span className="ml-1 text-[#6D4CFF]">
                                  *
                                </span>
                              </label>
                            </div>
                            <textarea
                              id="q3"
                              value={q3}
                              onChange={(e) => setQ3(e.target.value)}
                              placeholder="Describe your idea..."
                              rows={5}
                              autoComplete="off"
                              className="w-full resize-y rounded-2xl border border-[#DDDAD2] bg-white px-4 py-4 text-sm leading-6 text-[#111111] outline-none transition-all placeholder:text-[#AAA69D] focus:border-[#6D4CFF] focus:ring-4 focus:ring-[#E21B12]/5"
                              onCopy={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                              onPaste={(e) => e.preventDefault()}
                            />

                          </div>
                          <div className="rounded-[22px] border border-[#DDDAD2] bg-[#F7F5EF] p-5 sm:p-6">
                            <div className="mb-4 flex gap-4">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-xs font-black text-white">
                                04
                              </div>
                              <label
                                htmlFor="q4"
                                className="pt-1 text-sm font-bold leading-6 text-[#111111]"
                              >
                                Describe a student-run startup you would launch to
                                solve a specific problem on our campus. What is the
                                problem, and how would your startup specifically help
                                fellow students?
                                <span className="ml-1 text-[#6D4CFF]">
                                  *
                                </span>
                              </label>
                            </div>
                            <textarea
                              id="q4"
                              value={q4}
                              onChange={(e) => setQ4(e.target.value)}
                              placeholder="Describe the problem and your startup idea..."
                              rows={5}
                              autoComplete="off"
                              className="w-full resize-y rounded-2xl border border-[#DDDAD2] bg-white px-4 py-4 text-sm leading-6 text-[#111111] outline-none transition-all placeholder:text-[#AAA69D] focus:border-[#6D4CFF] focus:ring-4 focus:ring-[#E21B12]/5"
                              onCopy={(e) => e.preventDefault()}
                              onCut={(e) => e.preventDefault()}
                              onPaste={(e) => e.preventDefault()}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 rounded-2xl bg-[#111111] p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6D4CFF] text-sm font-black text-white">
                            !
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white">
                              Final Step
                            </p>
                            <p className="mt-2 text-xs leading-5 text-[#999999]">
                              Review your answers carefully. Once submitted, your
                              responses cannot be edited.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Step>
                </Stepper>
              </div>
            </div>
          </div>
        )}
      </SignedIn>
    </div>
  )
}
export default Recruitment