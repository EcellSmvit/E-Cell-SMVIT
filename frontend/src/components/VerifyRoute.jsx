// components/VerifyRoute.jsx
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import EmailVerify from "../pages/EmailVerify";

const VerifyRoute = () => {
  const { userData, getUserData, isLogin } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      if (!userData?._id) {
        await getUserData();
      }
      setLoading(false);
    };
    check();
  }, []);

  if (loading) return <div className="text-center text-white mt-10">Checking account status...</div>;

  if (userData?.isAccountVerified) {
    return <Navigate to="/dashboard" />;
  }

  return <EmailVerify />;
};

export default VerifyRoute;
