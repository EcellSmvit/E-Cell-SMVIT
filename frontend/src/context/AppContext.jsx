import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Set axios defaults
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });
      if (res.data.success && res.data.user) {
        setUserData(res.data.user);
        setIsLoggedIn(true);
      } else {
        setUserData(null);
        setIsLoggedIn(false);
        toast.error(res.data.message || "Failed to fetch user");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not found. Please login again.");
      } else {
        toast.error(error.response?.data?.message || "Error fetching user");
      }
      setUserData(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/auth/is-auth`, {
          withCredentials: true,
        });
        if (res.data.success) {
          await getUserData();
        } else {
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuth();
  }, [backendUrl]);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};

export { AppContent };
export default AppContent;