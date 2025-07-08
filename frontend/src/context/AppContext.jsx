import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Set axios defaults only once
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  // Always fetch user data after successful auth check
  const getUserData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/data`);
      if (res.data.success && res.data.user) {
        setUserData(res.data.user);
        setIsLoggedIn(true);
      } else {
        setUserData(null);
        setIsLoggedIn(false);
        toast.error(res.data.message || "Failed to fetch user");
      }
    } catch (error) {
      // If user not found, show a more specific error
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
        const res = await axios.get(`${backendUrl}/api/auth/is-auth`);
        if (res.data.success) {
          // Always fetch user data after auth check
          await getUserData();
        } else {
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuth();
    // eslint-disable-next-line
  }, []);

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
