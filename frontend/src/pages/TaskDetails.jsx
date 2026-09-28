import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import { getTaskById } from "../lib/tasksApi";
import {
  getUserSubmission,
  submitTask,
} from "../lib/submissionApi";

const TaskDetails = () => {
  const { taskId } = useParams();
  const { user } = useUser();

  const [task, setTask] = useState(null);
  const [submission, setSubmission] = useState(null);

  const [githubUrl, setGithubUrl] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadTask = async () => {
      try {
        if (!user?.id || !taskId) return;

        const taskData = await getTaskById(taskId);

        setTask(taskData);

        const existingSubmission =
          await getUserSubmission(
            taskId,
            user.id
          );

        setSubmission(existingSubmission);
      } catch (error) {
        console.error(error);

        setError("Unable to load task.");
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [taskId, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!githubUrl.trim()) {
      setError("GitHub URL is required.");
      return;
    }

    if (new Date(task.deadline) < new Date()) {
      setError("Task deadline has expired.");
      return;
    }

    try {
      setSubmitting(true);

      const result = await submitTask({
        taskId,
        userId: user.id,
        githubUrl,
        description,
      });

      setSubmission(result);

      setSuccess("Task submitted successfully!");
    } catch (error) {
      console.error(error);

      setError(
        "Unable to submit task. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Task not found.
      </div>
    );
  }

  const expired =
    new Date(task.deadline) < new Date();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold">
          {task.title}
        </h1>

        <p className="mt-4 text-gray-600">
          {task.description}
        </p>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Deadline
          </p>

          <p className="font-semibold">
            {new Date(
              task.deadline
            ).toLocaleString()}
          </p>
        </div>

        {task.attachment && (
          <a
            href={task.attachment}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 text-[#6D4DFE]"
          >
            View Task Attachment →
          </a>
        )}

        <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm">

          {submission ? (
            <div>
              <h2 className="text-xl font-semibold">
                Submission Completed
              </h2>

              <p className="mt-3 text-gray-600">
                Your GitHub repository:
              </p>

              <a
                href={submission.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#6D4DFE] break-all"
              >
                {submission.githubUrl}
              </a>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold">
                Submit Task
              </h2>

              {error && (
                <p className="mt-4 text-red-500">
                  {error}
                </p>
              )}

              {success && (
                <p className="mt-4 text-green-600">
                  {success}
                </p>
              )}

              {!expired && (
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-5"
                >

                  <div>
                    <label className="block mb-2">
                      GitHub Repository URL
                    </label>

                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) =>
                        setGithubUrl(e.target.value)
                      }
                      placeholder="https://github.com/username/repository"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      Description
                    </label>

                    <textarea
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }
                      placeholder="Tell us about your submission..."
                      rows={5}
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 rounded-xl bg-[#6D4DFE] text-white disabled:opacity-50"
                  >
                    {submitting
                      ? "Submitting..."
                      : "Submit Task"}
                  </button>

                </form>
              )}

              {expired && (
                <p className="mt-5 text-red-500">
                  This task deadline has expired.
                </p>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default TaskDetails;