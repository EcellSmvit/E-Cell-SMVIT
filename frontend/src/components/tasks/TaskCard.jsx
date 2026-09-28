import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const deadline = new Date(task.deadline);

  const isExpired = deadline < new Date();

  return (
    <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            {task.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {task.description}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            isExpired
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {isExpired ? "Expired" : "Active"}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-sm text-gray-500">
          Deadline
        </p>

        <p className="font-medium">
          {deadline.toLocaleString()}
        </p>
      </div>

      <button
        onClick={() => navigate(`/tasks/${task.$id}`)}
        className="mt-5 px-5 py-2.5 rounded-xl bg-[#6D4DFE] text-white"
      >
        View Task
      </button>
    </div>
  );
};

export default TaskCard;