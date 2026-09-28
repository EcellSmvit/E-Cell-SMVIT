import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";

import { getApplicationStatus } from "../lib/api";

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

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm font-black uppercase tracking-[0.25em]">
          Checking Selection...
        </p>
      </div>
    );
  }

  return (
    <>
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center px-5">
          <div className="text-center">

            <h1 className="text-4xl font-black uppercase">
              Sign In Required
            </h1>

            <p className="mt-4 text-sm text-gray-500">
              Please sign in to check your recruitment status.
            </p>

            <SignInButton mode="modal">
              <button className="mt-7 rounded-2xl bg-[#6D4CFF] px-7 py-4 text-sm font-black uppercase text-white">
                Sign In
              </button>
            </SignInButton>

          </div>
        </div>
      </SignedOut>

      <SignedIn>
        {error ? (
          <div className="flex min-h-screen items-center justify-center px-5">
            <div className="text-center">

              <h1 className="text-3xl font-black uppercase">
                Something Went Wrong
              </h1>

              <p className="mt-4 text-sm text-gray-500">
                {error}
              </p>

            </div>
          </div>
        ) : !application ? (
          <div className="flex min-h-screen items-center justify-center px-5">
            <div className="text-center">

              <h1 className="text-3xl font-black uppercase">
                Application Not Found
              </h1>

              <p className="mt-4 text-sm text-gray-500">
                We could not find your recruitment application.
              </p>

            </div>
          </div>
        ) : application.selected === true ? (
          /* =========================
             SELECTED
          ========================== */

          <div className="flex min-h-screen items-center justify-center px-5">
            <div className="max-w-3xl text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#6D4CFF] text-4xl font-black text-white">
                ✓
              </div>

              <p className="mt-8 text-[10px] font-black uppercase tracking-[0.35em] text-[#999791]">
                Recruitment 2026 · Round 2
              </p>

              <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] sm:text-6xl">
                Congratulations,
                <br />

                <span className="text-[#6D4CFF]">
                  You Are Selected.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#77756F]">
                Congratulations{" "}
                {application.name || user?.firstName}.
                You have been selected for the second
                round of E-Cell SMVIT Recruitment 2026.
              </p>

              {application.department && (
                <div className="mx-auto mt-7 inline-flex rounded-full border border-[#DDDAD2] bg-white px-5 py-3">
                  <span className="text-xs font-black uppercase tracking-wide">
                    Department:{" "}
                    {application.department.replaceAll(
                      "_",
                      " "
                    )}
                  </span>
                </div>
              )}

              <div className="mt-10">
                <button
                  onClick={() => navigate("/tasks")}
                  className="rounded-2xl bg-[#6D4CFF] px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  View Round 2 Task →
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* =========================
             NOT SELECTED
          ========================== */

          <div className="flex min-h-screen items-center justify-center px-5">
            <div className="max-w-2xl text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-3xl font-black text-white">
                —
              </div>

              <p className="mt-8 text-[10px] font-black uppercase tracking-[0.35em] text-[#999791]">
                Recruitment 2026
              </p>

              <h1 className="mt-5 text-4xl font-black uppercase leading-[0.9] sm:text-6xl">
                Thank You
                <br />

                <span className="text-[#6D4CFF]">
                  For Applying.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#77756F]">
                Thank you for taking the time to apply
                for E-Cell SMVIT Recruitment 2026.
                Unfortunately, you have not been selected
                for Round 2.
              </p>

            </div>
          </div>
        )}
      </SignedIn>
    </>
  );
};

export default RecruitmentTask;