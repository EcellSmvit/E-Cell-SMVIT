import { useContext } from "react";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userData, setIsLoggedin } = useContext(AppContent);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedin(false);
    navigate("/login");
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Dashboard</h2>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Profile Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <span className="font-medium text-gray-600">Name:</span>{" "}
              <span className="text-gray-900">{userData.name || "N/A"}</span>
            </p>
            <p>
              <span className="font-medium text-gray-600">Email:</span>{" "}
              <span className="text-gray-900">{userData.email || "N/A"}</span>
            </p>
            <p>
              <span className="font-medium text-gray-600">Username:</span>{" "}
              <span className="text-gray-900">{userData.username || "N/A"}</span>
            </p>
            <p>
              <span className="font-medium text-gray-600">Mobile Number:</span>{" "}
              <span className="text-gray-900">{userData.mobileNumber || "N/A"}</span>
            </p>
            <p className="sm:col-span-2">
              <span className="font-medium text-gray-600">Date of Birth:</span>{" "}
              <span className="text-gray-900">
                {userData.dateofBirth
                  ? new Date(userData.dateofBirth).toLocaleDateString("en-US")
                  : "N/A"}
              </span>
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Account Activity</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium text-gray-600">Joined:</span>{" "}
              <span className="text-gray-900">
                {userData.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-600">Last Login:</span>{" "}
              <span className="text-gray-900">
                {userData.lastLogin
                  ? new Date(userData.lastLogin).toLocaleString("en-US")
                  : "N/A"}
              </span>
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-200"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
