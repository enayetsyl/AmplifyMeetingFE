'use client'

import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext()

export function GlobalContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = {
    user, setUser
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