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
      <h2>Dashboard</h2>
      <div>
        <h3>Profile Information</h3>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>

        <h3>Account Activity</h3>
        <p>
          <span>Joined: </span>
          {userData.createdAt
            ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "N/A"}
        </p>
        <p>
          <span>Last Login: </span>
          {userData.lastLogin
            ? new Date(userData.lastLogin).toLocaleString("en-US")
            : "N/A"}
        </p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
