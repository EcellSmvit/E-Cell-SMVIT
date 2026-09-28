import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import { getSelectedMember } from "../lib/selectedMemberApi";
import { getTasksByDepartment } from "../lib/tasksApi";

const LOGO_URL =
  "https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995";

const Tasks = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoaded) return;

    const loadTasks = async () => {
      try {
        setLoading(true);
        setError("");

        if (!user?.id) {
          setError("Please sign in to access Round 2 tasks.");
          return;
        }

        const selectedMember = await getSelectedMember(user.id);

        if (!selectedMember) {
          setError(
            "You are not selected for the recruitment task round."
          );
          return;
        }

        setMember(selectedMember);

        const departmentTasks = await getTasksByDepartment(
          selectedMember.department
        );

        setTasks(departmentTasks);
      } catch (error) {
        console.error("TASK ERROR:", error);

        setError(
          error?.message ||
            "Something went wrong while loading tasks."
        );
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [user, isLoaded]);

  /* ---------------- LOADING ---------------- */

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center">
        <div className="text-center">
          <img
            src={LOGO_URL}
            alt="E-Cell SMVIT"
            className="w-14 h-14 mx-auto object-contain animate-pulse"
          />

          <p className="mt-5 text-xs font-semibold tracking-[0.25em] uppercase text-black/50">
            Loading Tasks
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] text-black">
        <header className="px-6 md:px-10 py-6">
          <div className="max-w-7xl mx-auto flex items-center">
            <img
              src={LOGO_URL}
              alt="E-Cell SMVIT"
              className="w-12 h-12 object-contain"
            />

            <div className="ml-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#6D4DFE]" />
              <span className="text-xs tracking-[0.25em] text-black/50">
                SMVIT
              </span>
            </div>
          </div>
        </header>

        <div className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#6D4DFE] flex items-center justify-center">
              <span className="text-white text-2xl font-black">
                !
              </span>
            </div>

            <h1 className="mt-7 text-3xl md:text-4xl font-black uppercase tracking-tight">
              Unable to Load
            </h1>

            <p className="mt-4 text-black/50 leading-6">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-7 px-7 py-3 rounded-full bg-black text-white text-sm font-bold hover:bg-[#6D4DFE] transition"
            >
              TRY AGAIN ↗
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN ---------------- */

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#111]">

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
                <span className="w-2.5 h-2.5 rounded-full bg-[#6D4DFE]" />

                <span className="text-xs md:text-sm tracking-[0.25em] text-black/50">
                  SMVIT
                </span>
              </div>
            </div>

            {/* ROUND */}

            <div className="flex items-center gap-3">

              <span className="hidden sm:block text-xs tracking-[0.2em] text-black/40 uppercase">
                Recruitment
              </span>

              <div className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold tracking-wide">
                ROUND 02
              </div>

            </div>

          </div>

          <div className="mt-6 h-px bg-black/10" />

        </div>
      </header>


      {/* ================= CONTENT ================= */}

      <main className="max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-20">

        {/* TOP INFO */}

        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

          <div>

            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-black" />

              <span className="text-xs tracking-[0.3em] text-black/45 uppercase">
                Assigned Work
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-[-0.05em] uppercase leading-[0.9]">
              Your
              <br />
              <span className="text-[#6D4DFE]">
                Tasks.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-black/50 leading-7">
              Welcome{" "}
              <span className="text-black font-semibold">
                {member?.name}
              </span>
              . Review the task assigned to your department
              and submit your work before the deadline.
            </p>

          </div>


          {/* MEMBER INFO */}

          <div className="md:min-w-[270px]">

            <div className="border border-black/10 rounded-2xl bg-white/50 p-5">

              <p className="text-[10px] tracking-[0.25em] uppercase text-black/40">
                Department
              </p>

              <p className="mt-2 text-xl font-black uppercase">
                {member?.department || "—"}
              </p>

              <div className="mt-5 pt-4 border-t border-black/10 flex items-center justify-between">

                <span className="text-xs text-black/40">
                  Tasks Assigned
                </span>

                <span className="font-bold">
                  {tasks.length}
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* ================= TASK LIST ================= */}

        <section className="mt-16">

          <div className="flex items-center justify-between mb-6">

            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-black/40">
                Department Tasks
              </p>

              <h2 className="text-2xl md:text-3xl font-black uppercase mt-2">
                Complete Your Work
              </h2>
            </div>

            <div className="hidden sm:block text-xs text-black/40">
              {tasks.length}{" "}
              {tasks.length === 1 ? "TASK" : "TASKS"}
            </div>

          </div>


          {/* NO TASK */}

          {tasks.length === 0 ? (

            <div className="border border-black/10 rounded-[24px] bg-white/50 p-12 md:p-16 text-center">

              <div className="w-14 h-14 mx-auto rounded-full bg-[#6D4DFE] flex items-center justify-center">
                <span className="text-white text-xl font-black">
                  +
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-black uppercase">
                No Tasks Available
              </h3>

              <p className="mt-3 text-black/45">
                Your department does not have any tasks yet.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-5">

              {tasks.map((task, index) => {

                const isPurple = index % 3 === 1;
                const isBlack = index % 3 === 2;

                return (
                  <article
                    key={task.$id}
                    className={`
                      group
                      relative
                      rounded-[24px]
                      p-7 md:p-8
                      min-h-[330px]
                      flex
                      flex-col
                      justify-between
                      overflow-hidden
                      border
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      ${
                        isPurple
                          ? "bg-[#6D4DFE] border-[#6D4DFE] text-white"
                          : isBlack
                          ? "bg-[#111111] border-[#111111] text-white"
                          : "bg-white border-black/10 text-black"
                      }
                    `}
                  >

                    {/* DECORATIVE PURPLE DOT */}

                    <div
                      className={`
                        absolute
                        -right-12
                        -top-12
                        w-32
                        h-32
                        rounded-full
                        blur-2xl
                        opacity-30
                        ${
                          isPurple || isBlack
                            ? "bg-white"
                            : "bg-[#6D4DFE]"
                        }
                      `}
                    />


                    {/* CARD TOP */}

                    <div className="relative">

                      <div className="flex items-center justify-between">

                        <span
                          className={`
                            text-xs font-semibold tracking-[0.2em]
                            ${
                              isPurple || isBlack
                                ? "text-white/45"
                                : "text-black/35"
                            }
                          `}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className={`
                            w-10 h-10
                            rounded-full
                            border
                            flex
                            items-center
                            justify-center
                            text-lg
                            transition-transform
                            group-hover:rotate-45
                            ${
                              isPurple || isBlack
                                ? "border-white/20"
                                : "border-black/10"
                            }
                          `}
                        >
                          ↗
                        </span>

                      </div>


                      {/* DEPARTMENT */}

                      <p
                        className={`
                          mt-8
                          text-[10px]
                          font-bold
                          tracking-[0.25em]
                          uppercase
                          ${
                            isPurple
                              ? "text-white/60"
                              : isBlack
                              ? "text-white/50"
                              : "text-[#6D4DFE]"
                          }
                        `}
                      >
                        {task.department}
                      </p>


                      {/* TITLE */}

                      <h3 className="mt-3 text-3xl md:text-4xl font-black uppercase leading-[0.95] tracking-tight max-w-md">
                        {task.title}
                      </h3>


                      {/* DESCRIPTION */}

                      <p
                        className={`
                          mt-5
                          text-sm
                          leading-6
                          max-w-lg
                          line-clamp-3
                          ${
                            isPurple || isBlack
                              ? "text-white/60"
                              : "text-black/50"
                          }
                        `}
                      >
                        {task.description}
                      </p>

                    </div>


                    {/* CARD BOTTOM */}

                    <div className="relative mt-8">

                      <div className="flex items-center justify-between mb-5">

                        <span
                          className={`
                            text-[10px]
                            tracking-[0.2em]
                            uppercase
                            ${
                              isPurple || isBlack
                                ? "text-white/40"
                                : "text-black/35"
                            }
                          `}
                        >
                          Deadline
                        </span>

                        <span className="text-xs font-bold">
                          {task.deadline
                            ? new Date(
                                task.deadline
                              ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "Not specified"}
                        </span>

                      </div>


                      {/* VIEW TASK BUTTON */}

                      <button
                        onClick={() =>
                          navigate(`/tasks/${task.$id}`)
                        }
                        className={`
                          w-full
                          rounded-full
                          py-3.5
                          px-6
                          flex
                          items-center
                          justify-between
                          font-bold
                          text-xs
                          tracking-wide
                          transition-all
                          ${
                            isPurple || isBlack
                              ? "bg-white text-black hover:bg-[#F7F5EF]"
                              : "bg-black text-white hover:bg-[#6D4DFE]"
                          }
                        `}
                      >
                        <span>VIEW TASK</span>

                        <span className="text-base">
                          →
                        </span>

                      </button>

                    </div>

                  </article>
                );
              })}

            </div>

          )}

        </section>


        {/* ================= INFO STRIP ================= */}

        <section className="mt-12">

          <div className="border-t border-b border-black/10 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-center gap-3">

              <span className="w-2 h-2 rounded-full bg-[#6D4DFE]" />

              <span className="text-xs tracking-[0.2em] uppercase text-black/50">
                Entrepreneurship • Innovation • Impact
              </span>

            </div>

            <p className="text-sm text-black/40">
              Read the task carefully before submitting.
            </p>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="px-6 md:px-10 pb-8">

        <div className="max-w-7xl mx-auto border-t border-black/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">

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

          <p className="text-xs text-black/35">
            Recruitment 2026
          </p>

        </div>

      </footer>

    </div>
  );
};

export default Tasks;