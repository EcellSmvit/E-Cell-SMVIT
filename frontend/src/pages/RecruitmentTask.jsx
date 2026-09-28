import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useUser,
} from "@clerk/clerk-react";

import { getApplicationStatus } from "../lib/api";

const LOGO_URL =
  "https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995";

const RecruitmentTask = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      if (!isLoaded) return;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getApplicationStatus(user.id);

        setApplication(data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to check your application status."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [user, isLoaded]);

  /* ================= LOADING ================= */

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center">
        <div className="text-center">

          <img
            src={LOGO_URL}
            alt="E-Cell SMVIT"
            className="w-14 h-14 mx-auto object-contain animate-pulse"
          />

          <p className="mt-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#999791]">
            Checking Selection
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-black">

      {/* ================= HEADER ================= */}

      <header className="px-6 md:px-10 py-6">

        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between">

            {/* LOGO */}

            <div className="flex items-center gap-4">

              <img
                src={LOGO_URL}
                alt="E-Cell SMVIT"
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
              />

              <div className="flex items-center gap-3">

                <span className="w-2.5 h-2.5 rounded-full bg-[#6D4CFF]" />

                <span className="text-xs tracking-[0.25em] text-black/45">
                  SMVIT
                </span>

              </div>

            </div>

            {/* ROUND */}

            <div className="px-5 py-2.5 rounded-full bg-black text-white text-[10px] font-black tracking-[0.15em]">
              RECRUITMENT 2026
            </div>

          </div>

          <div className="mt-6 h-px bg-black/10" />

        </div>

      </header>


      {/* ================= SIGNED OUT ================= */}

      <SignedOut>

        <div className="min-h-[70vh] flex items-center justify-center px-5">

          <div className="w-full max-w-lg text-center">

            <div className="mx-auto w-16 h-16 rounded-full bg-[#6D4CFF] flex items-center justify-center">

              <span className="text-white text-2xl font-black">
                !
              </span>

            </div>

            <p className="mt-7 text-[10px] font-black uppercase tracking-[0.3em] text-[#999791]">
              E-Cell SMVIT
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-[-0.04em]">
              Sign In
              <br />
              <span className="text-[#6D4CFF]">
                Required.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#77756F]">
              Please sign in to check your E-Cell SMVIT
              recruitment application status.
            </p>

            <SignInButton mode="modal">

              <button
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-5
                  rounded-full
                  bg-black
                  px-7
                  py-3.5
                  text-sm
                  font-black
                  uppercase
                  tracking-wide
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#6D4CFF]
                "
              >
                <span>
                  Sign In
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <span className="block h-[9px] w-[9px] rotate-45 border-r-2 border-t-2 border-black" />
                </span>

              </button>

            </SignInButton>

          </div>

        </div>

      </SignedOut>


      {/* ================= SIGNED IN ================= */}

      <SignedIn>

        {/* ================= ERROR ================= */}

        {error ? (

          <div className="min-h-[70vh] flex items-center justify-center px-5">

            <div className="w-full max-w-lg text-center">

              <div className="mx-auto w-16 h-16 rounded-full bg-[#6D4CFF] flex items-center justify-center">

                <span className="text-white text-2xl font-black">
                  !
                </span>

              </div>

              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.3em] text-[#999791]">
                Recruitment 2026
              </p>

              <h1 className="mt-4 text-4xl md:text-5xl font-black uppercase">
                Something
                <br />
                <span className="text-[#6D4CFF]">
                  Went Wrong.
                </span>
              </h1>

              <p className="mt-6 text-sm leading-7 text-[#77756F]">
                {error}
              </p>

            </div>

          </div>

        ) : !application ? (

          /* ================= NOT FOUND ================= */

          <div className="min-h-[70vh] flex items-center justify-center px-5">

            <div className="w-full max-w-lg text-center">

              <div className="mx-auto w-16 h-16 rounded-full border border-black/10 bg-white/60 flex items-center justify-center">

                <span className="text-2xl font-black">
                  ?
                </span>

              </div>

              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.3em] text-[#999791]">
                Recruitment 2026
              </p>

              <h1 className="mt-4 text-4xl md:text-5xl font-black uppercase">
                Application
                <br />
                <span className="text-[#6D4CFF]">
                  Not Found.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#77756F]">
                We could not find your recruitment application.
              </p>

            </div>

          </div>

        ) : application.selected === true ? (

          /* =====================================================
             SELECTED
          ====================================================== */

          <div className="min-h-[70vh] flex items-center justify-center px-5 py-12">

            <div className="w-full max-w-3xl text-center">

              {/* SUCCESS ICON */}

              <div className="mx-auto w-20 h-20 rounded-full bg-[#6D4CFF] flex items-center justify-center">

                <span className="text-3xl font-black text-white">
                  ✓
                </span>

              </div>


              {/* LABEL */}

              <div className="mt-8 flex items-center justify-center gap-3">

                <span className="w-7 h-px bg-black/20" />

                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#999791]">
                  Recruitment 2026 · Round 2
                </p>

                <span className="w-7 h-px bg-black/20" />

              </div>


              {/* HEADING */}

              <h1 className="mt-5 text-5xl md:text-7xl font-black uppercase leading-[0.88] tracking-[-0.05em]">

                Congratulations,

                <br />

                <span className="text-[#6D4CFF]">
                  You're Selected.
                </span>

              </h1>


              {/* DESCRIPTION */}

              <p className="mx-auto mt-7 max-w-xl text-sm md:text-base leading-7 text-[#77756F]">

                Congratulations{" "}
                <span className="font-bold text-black">
                  {application.name || user?.firstName}
                </span>
                . You have been selected for Round 2 of
                E-Cell SMVIT Recruitment 2026.

              </p>


              {/* DEPARTMENT */}

              {application.department && (

                <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-5 py-3">

                  <span className="w-2 h-2 rounded-full bg-[#6D4CFF]" />

                  <span className="text-xs font-black uppercase tracking-wide">

                    {application.department.replaceAll(
                      "_",
                      " "
                    )}

                  </span>

                </div>

              )}


              {/* TASK CTA */}

              <div className="mt-9">

                <button
                  onClick={() => navigate("/tasks")}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-5
                    rounded-full
                    bg-black
                    px-7
                    py-3.5
                    text-sm
                    font-black
                    uppercase
                    tracking-wide
                    text-white
                    transition-all
                    duration-300
                    hover:bg-[#6D4CFF]
                  "
                >

                  <span>
                    View Round 2 Tasks
                  </span>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      transition-transform
                      duration-300
                      group-hover:rotate-45
                    "
                  >
                    <span
                      className="
                        block
                        h-[9px]
                        w-[9px]
                        rotate-45
                        border-r-2
                        border-t-2
                        border-black
                      "
                    />
                  </span>

                </button>

              </div>


              {/* BOTTOM INFO */}

              <div className="mx-auto mt-10 max-w-md border-t border-black/10 pt-5">

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#AAA8A1]">
                  Your next step starts here
                </p>

              </div>

            </div>

          </div>

        ) : (

          /* =====================================================
             NOT SELECTED
          ====================================================== */

          <div className="min-h-[70vh] flex items-center justify-center px-5 py-12">

            <div className="w-full max-w-2xl text-center">

              {/* ICON */}

              <div className="mx-auto w-20 h-20 rounded-full bg-black flex items-center justify-center">

                <span className="text-2xl font-black text-white">
                  —
                </span>

              </div>


              {/* LABEL */}

              <div className="mt-8 flex items-center justify-center gap-3">

                <span className="w-7 h-px bg-black/20" />

                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#999791]">
                  Recruitment 2026
                </p>

                <span className="w-7 h-px bg-black/20" />

              </div>


              {/* HEADING */}

              <h1 className="mt-5 text-5xl md:text-7xl font-black uppercase leading-[0.88] tracking-[-0.05em]">

                Thank You

                <br />

                <span className="text-[#6D4CFF]">
                  For Applying.
                </span>

              </h1>


              {/* DESCRIPTION */}

              <p className="mx-auto mt-7 max-w-xl text-sm md:text-base leading-7 text-[#77756F]">

                Thank you for taking the time to apply for
                E-Cell SMVIT Recruitment 2026.

                Unfortunately, you have not been selected
                for Round 2.

              </p>


              {/* INFO */}

              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-black/10 bg-white/50 p-5">

                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#999791]">
                  Application Status
                </p>

                <p className="mt-2 text-sm font-bold">
                  Round 2 Selection Not Confirmed
                </p>

              </div>


              {/* BOTTOM TEXT */}

              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.25em] text-[#AAA8A1]">
                Entrepreneurship • Innovation • Impact
              </p>

            </div>

          </div>

        )}

      </SignedIn>


      {/* ================= FOOTER ================= */}

      <footer className="px-6 md:px-10 pb-7">

        <div className="max-w-7xl mx-auto border-t border-black/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">

          <div className="flex items-center gap-3">

            <img
              src={LOGO_URL}
              alt="E-Cell SMVIT"
              className="w-7 h-7 object-contain"
            />

            <span className="text-xs font-bold">
              E-CELL SMVIT
            </span>

          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-[#AAA8A1]">
            Recruitment 2026
          </p>

        </div>

      </footer>

    </div>
  );
};

export default RecruitmentTask;