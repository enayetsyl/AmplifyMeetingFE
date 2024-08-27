'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const GlobalContext = createContext()

export function GlobalContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from local storage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // Parse the JSON string to an object and set it in state
      setUser(JSON.parse(storedUser));
    }
  }, []);

    

  const value = {
    user, setUser, 
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
} 