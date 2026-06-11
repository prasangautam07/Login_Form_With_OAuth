import React, { useEffect,createContext, useContext, useState } from "react";
import { getSession } from "./api/authapi";
export const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] =useState(true);
  useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await getSession();
          setUser(res?.data?.user || null);
        } catch (err) {
          setUser(null);
        }finally{
          setLoading(false);
        }
      };
      fetchUser();
    }, []);
  return (
    <UserContext.Provider value={{ user, setUser,loading }}>
      {children}
    </UserContext.Provider>
  );
};
