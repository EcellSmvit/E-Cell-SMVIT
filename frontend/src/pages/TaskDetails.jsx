import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import { getTaskById } from "../lib/tasksApi";
import {
  getUserSubmission,
  getRecruitmentApplicant,
  submitTask,
} from "../lib/submissionApi";

const LOGO_URL =
  "https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995";

const TaskDetails = () => {
  const { taskId } = useParams();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [applicant, setApplicant] = useState(null);

  const [githubUrl, setGithubUrl] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isLoaded) return;

    const loadTask = async () => {
      try {
        if (!user?.id || !taskId) return;

        setLoading(true);
        setError("");

        const taskData = await getTaskById(taskId);

        setTask(taskData);

        const [existingSubmission, applicantData] =
          await Promise.all([
            getUserSubmission(taskId, user.id),
            getRecruitmentApplicant(user.id),
          ]);

        setSubmission(existingSubmission);
        setApplicant(applicantData);
      } catch (error) {
        console.error("TASK DETAILS ERROR:", error);
        setError("Unable to load task.");
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [taskId, user, isLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!githubUrl.trim()) {
      setError("GitHub repository URL is required.");
      return;
    }

    if (!description.trim()) {
      setError("Please write a short review of your submission.");
      return;
    }

    if (
      task.deadline &&
      new Date(task.deadline) < new Date()
    ) {
      setError("Task deadline has expired.");
      return;
    }

    try {
      setSubmitting(true);

      if (!applicant) {
        setError(
          "Your recruitment application details could not be found."
        );
        return;
      }

      const result = await submitTask({
        taskId,
        userId: user.id,
        name: applicant.name || user.fullName || user.firstName || "",
        usn: applicant.usn || "",
        mobilenumber: applicant.mobilenumber || "",
        githubUrl: githubUrl.trim(),
        description: description.trim(),
      });

      setSubmission(result);

      setSuccess("Your task has been submitted successfully.");
    } catch (error) {
      console.error("SUBMISSION ERROR:", error);

      setError(
        error?.message ||
          "Unable to submit task. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

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

          <p className="mt-5 text-xs tracking-[0.25em] uppercase text-black/40">
            Loading Task
          </p>

        </div>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!task) {
    return (
      <div className="min-h-screen bg-[#F7F5EF]">

        <header className="px-6 md:px-10 py-6">
          <div className="max-w-7xl mx-auto">

            <img
              src={LOGO_URL}
              alt="E-Cell SMVIT"
              className="w-12 h-12 object-contain"
            />

            <div className="mt-6 h-px bg-black/10" />

          </div>
        </header>

        <div className="min-h-[65vh] flex items-center justify-center px-6">

          <div className="text-center">

            <h1 className="text-5xl font-black uppercase">
              Task Not Found
            </h1>

            <button
              onClick={() => navigate("/tasks")}
              className="mt-7 px-7 py-3 rounded-full bg-black text-white text-sm font-bold hover:bg-[#6D4DFE] transition"
            >
              ← BACK TO TASKS
            </button>

          </div>

        </div>
      </div>
    );
  }

  const expired =
    task.deadline &&
    new Date(task.deadline) < new Date();

  /* ================= MAIN ================= */

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#111]">

      {/* ================= HEADER ================= */}

      <header className="px-6 md:px-10 py-6">

        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <img
                src={LOGO_URL}
                alt="E-Cell SMVIT"
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
              />

              <div className="flex items-center gap-3">

                <span className="w-2.5 h-2.5 rounded-full bg-[#6D4DFE]" />

                <span className="text-xs tracking-[0.25em] text-black/45">
                  SMVIT
                </span>

              </div>

            </div>


            <button
              onClick={() => navigate("/tasks")}
              className="px-5 py-2.5 rounded-full border border-black/10 text-xs font-bold hover:bg-black hover:text-white transition"
            >
              ← BACK TO TASKS
            </button>

          </div>

          <div className="mt-6 h-px bg-black/10" />

        </div>

      </header>


      {/* ================= CONTENT ================= */}

      <main className="max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-20">

        {/* ================= TASK HEADER ================= */}

        <section>

          <div className="flex items-center gap-3 mb-6">

            <span className="w-7 h-px bg-black" />

            <span className="text-xs tracking-[0.3em] uppercase text-black/40">
              Round 02 • Task Details
            </span>

          </div>


          <div className="grid lg:grid-cols-[1fr_280px] gap-10">

            {/* TITLE */}

            <div>

              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#6D4DFE]">
                {task.department}
              </p>

              <h1 className="mt-4 text-5xl md:text-7xl font-black uppercase tracking-[-0.05em] leading-[0.9]">
                {task.title}
              </h1>

              <p className="mt-7 max-w-3xl text-black/55 leading-7 text-base md:text-lg">
                {task.description}
              </p>

            </div>


            {/* DEADLINE CARD */}

            <div className="lg:self-start">

              <div className="rounded-2xl border border-black/10 bg-white/60 p-6">

                <p className="text-[10px] tracking-[0.25em] uppercase text-black/40">
                  Submission Deadline
                </p>

                <p className="mt-3 text-xl font-black">
                  {task.deadline
                    ? new Date(
                        task.deadline
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "No deadline"}
                </p>

                {task.deadline && (
                  <p className="mt-1 text-xs text-black/40">
                    {new Date(
                      task.deadline
                    ).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}

                <div className="mt-5 pt-4 border-t border-black/10">

                  <span
                    className={`
                      inline-flex
                      px-3
                      py-1.5
                      rounded-full
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      ${
                        expired
                          ? "bg-red-100 text-red-600"
                          : "bg-[#6D4DFE]/10 text-[#6D4DFE]"
                      }
                    `}
                  >
                    {expired
                      ? "Deadline Passed"
                      : "Submission Open"}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= DOCUMENT ================= */}

        {task.attachment && (

          <section className="mt-12">

            <div className="rounded-[24px] bg-black text-white p-7 md:p-8">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                  <p className="text-[10px] tracking-[0.25em] uppercase text-white/40">
                    Task Document
                  </p>

                  <h2 className="mt-2 text-2xl font-black uppercase">
                    Read The Brief
                  </h2>

                  <p className="mt-2 text-sm text-white/45">
                    Review the complete task document before
                    starting your work.
                  </p>

                </div>


                <a
                  href={task.attachment}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center justify-between gap-8 bg-[#6D4DFE] hover:bg-[#7B5AFF] px-6 py-4 rounded-full text-sm font-bold transition"
                >
                  VIEW TASK DOCUMENT
                  <span className="text-lg">
                    →
                  </span>
                </a>

              </div>

            </div>

          </section>

        )}


        {/* ================= SUBMISSION ================= */}

        <section className="mt-12">

          <div className="flex items-end justify-between mb-6">

            <div>

              <p className="text-xs tracking-[0.25em] uppercase text-black/40">
                Your Response
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-black uppercase">
                Submit Your Work
              </h2>

            </div>

            <span className="hidden sm:block text-xs text-black/35">
              FINAL SUBMISSION
            </span>

          </div>


          {/* ================= SUBMITTED ================= */}

          {submission ? (

            <div className="rounded-[24px] bg-white border border-black/10 overflow-hidden">

              <div className="p-7 md:p-8">

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-full bg-[#6D4DFE] flex items-center justify-center text-white font-black">
                    ✓
                  </div>

                  <div>

                    <h3 className="text-xl font-black uppercase">
                      Submission Completed
                    </h3>

                    <p className="text-sm text-black/40 mt-1">
                      Your response has been recorded.
                    </p>

                  </div>

                </div>


                {/* GITHUB */}

                <div className="mt-8">

                  <p className="text-[10px] tracking-[0.2em] uppercase text-black/40">
                    GitHub Repository
                  </p>

                  <a
                    href={submission.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-[#6D4DFE] font-medium break-all hover:underline"
                  >
                    {submission.githubUrl}
                  </a>

                </div>


                {/* REVIEW */}

                {submission.description && (

                  <div className="mt-7 pt-7 border-t border-black/10">

                    <p className="text-[10px] tracking-[0.2em] uppercase text-black/40">
                      Your Review / Description
                    </p>

                    <p className="mt-3 text-black/60 leading-7 whitespace-pre-wrap">
                      {submission.description}
                    </p>

                  </div>

                )}

              </div>

            </div>

          ) : (

            /* ================= FORM ================= */

            <div className="rounded-[24px] bg-white border border-black/10 p-7 md:p-9">

              {error && (

                <div className="mb-6 rounded-xl bg-red-50 border border-red-100 px-5 py-4 text-sm text-red-600">
                  {error}
                </div>

              )}

              {success && (

                <div className="mb-6 rounded-xl bg-green-50 border border-green-100 px-5 py-4 text-sm text-green-600">
                  {success}
                </div>

              )}


              {!expired ? (

                <form
                  onSubmit={handleSubmit}
                  className="space-y-7"
                >

                  {/* GITHUB */}

                  <div>

                    <label className="block text-xs font-bold tracking-[0.15em] uppercase mb-3">
                      GitHub Repository
                    </label>

                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) =>
                        setGithubUrl(e.target.value)
                      }
                      placeholder="https://github.com/username/repository"
                      className="w-full rounded-xl border border-black/10 bg-[#F7F5EF] px-5 py-4 outline-none text-sm placeholder:text-black/25 focus:border-[#6D4DFE] transition"
                    />

                    <p className="mt-2 text-xs text-black/35">
                      Make sure your repository is accessible to
                      the recruitment team.
                    </p>

                  </div>


                  {/* REVIEW */}

                  <div>

                    <label className="block text-xs font-bold tracking-[0.15em] uppercase mb-3">
                      Review / Description
                    </label>

                    <textarea
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }
                      placeholder="Explain your approach, what you built, key decisions, and anything you want the recruitment team to know..."
                      rows={7}
                      className="w-full resize-none rounded-xl border border-black/10 bg-[#F7F5EF] px-5 py-4 outline-none text-sm leading-6 placeholder:text-black/25 focus:border-[#6D4DFE] transition"
                    />

                    <p className="mt-2 text-xs text-black/35">
                      Keep your explanation clear and concise.
                    </p>

                  </div>


                  {/* SUBMIT */}

                  <div className="pt-2">

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full md:w-auto min-w-[210px] px-7 py-4 rounded-full bg-black text-white text-sm font-bold flex items-center justify-between gap-8 hover:bg-[#6D4DFE] disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >

                      <span>
                        {submitting
                          ? "SUBMITTING..."
                          : "SUBMIT TASK"}
                      </span>

                      {!submitting && (
                        <span className="text-lg">
                          ↗
                        </span>
                      )}

                    </button>

                  </div>

                </form>

              ) : (

                <div className="py-8 text-center">

                  <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center">

                    <span className="text-red-500 text-xl font-black">
                      !
                    </span>

                  </div>

                  <h3 className="mt-5 text-xl font-black uppercase">
                    Submission Closed
                  </h3>

                  <p className="mt-2 text-sm text-black/45">
                    The deadline for this task has expired.
                  </p>

                </div>

              )}

            </div>

          )}

        </section>


        {/* ================= BOTTOM ================= */}

        <div className="mt-12 border-t border-black/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <button
            onClick={() => navigate("/tasks")}
            className="text-xs font-bold tracking-wider hover:text-[#6D4DFE] transition"
          >
            ← BACK TO ALL TASKS
          </button>

          <p className="text-xs text-black/35 tracking-wider">
            ENTREPRENEURSHIP • INNOVATION • IMPACT
          </p>

        </div>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="px-6 md:px-10 pb-8">

        <div className="max-w-6xl mx-auto border-t border-black/10 pt-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <img
              src={LOGO_URL}
              alt="E-Cell SMVIT"
              className="w-7 h-7 object-contain"
            />

            <span className="text-xs font-semibold">
              E-CELL SMVIT
            </span>

          </div>

          <span className="text-xs text-black/30">
            Recruitment 2026
          </span>

        </div>

      </footer>

    </div>
  );
};

export default TaskDetails;