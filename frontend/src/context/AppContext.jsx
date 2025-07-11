import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const getUserData = async () => {
    try {
      console.log("Fetching user data...");
      const res = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });
      console.log("User data response:", res.data);
  
      if (res.data.success && res.data.user) {
        setUserData(res.data.user);
        setIsLoggedin(true);
      } else {
        console.warn("Failed to fetch user:", res.data.message);
        setUserData(null);
        setIsLoggedin(false);
      }
    } catch (error) {
      console.error("getUserData error:", error?.response?.data || error.message);
      setUserData(null);
      setIsLoggedin(false);
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
          setIsLoggedin(false);
          setUserData(null);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
        setIsLoggedin(false);
        setUserData(null);
      }
    };

    checkAuth();
    // eslint-disable-next-line
  }, [backendUrl]);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
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