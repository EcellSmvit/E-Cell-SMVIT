import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const AdminButton = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  if (!userData?.isAdmin) return null;

  return (
    <button
      onClick={() => navigate("/admin")}
      className="fixed right-5 bottom-5 z-50 px-4 py-2 text-white bg-red-600 rounded-full shadow-lg transition-all hover:bg-red-700"
    >
      Admin Panel
    </button>
  );
};

export default AdminButton;
