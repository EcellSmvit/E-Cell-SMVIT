import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLogin, setIsLogin] = useState(false)
    const [userData, setUserData] = useState(null);



    //+++++++++Create a fun that give the user data +++++++++
    const getUserData = async () => {
      console.log("👀 Browser cookies:", document.cookie);
    
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/data`, {
          withCredentials: true,
        });
        console.log("✅ User Data Fetched:", data);
        setUserData(data.user);
      } catch (error) {
        console.error("❌ getUserData Error:", error.response?.data || error.message);
      }
    };
    
    

    const getAuthStatus = async () => {
        try {
          const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
          console.log('✅ Auth status response:', data);
      
          if (data.success) {
            setIsLogin(true);
            getUserData();
          } else {
            console.log('⚠️ Not logged in (auth check failed):', data.message);
          }
        } catch (error) {
          console.error('❌ Auth status request failed:', error.response?.data || error.message);
        }
      };
      

    useEffect(()=>{
        getAuthStatus()
    }, [])
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const value ={
        backendUrl, 
        isLogin, 
        setIsLogin, 
        userData,
        setUserData, 
        getUserData
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}