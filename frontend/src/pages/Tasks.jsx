import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import TaskCard from "../components/tasks/TaskCard";

import { getSelectedMember } from "../lib/selectedMemberApi";
import { getTasksByDepartment } from "../lib/tasksApi";

const Tasks = () => {
  const { user } = useUser();

  const [member, setMember] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        if (!user?.id) return;

        setLoading(true);

        const selectedMember =
          await getSelectedMember(user.id);

        if (!selectedMember) {
          setError(
            "You are not selected for the recruitment task round."
          );

          return;
        }

        setMember(selectedMember);

        const departmentTasks =
          await getTasksByDepartment(
            selectedMember.department
          );

        setTasks(departmentTasks);
      } catch (error) {
        console.error(error);

        setError(
          "Something went wrong while loading tasks."
        );
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            Access Denied
          </h1>

          <p className="text-gray-500 mt-2">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <p className="text-gray-500">
            Welcome
          </p>

          <h1 className="text-3xl font-bold">
            {member.name}
          </h1>

          <p className="mt-2 text-[#6D4DFE] font-medium">
            Department: {member.department}
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center">
            <h2 className="text-xl font-semibold">
              No tasks available
            </h2>

            <p className="text-gray-500 mt-2">
              Your department does not have any tasks yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.$id}
                task={task}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Tasks;