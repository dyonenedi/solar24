import React, { createContext, useState } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
  const [loader, setLoader] = useState(true)
  const [showFooter, setShowFooter] = useState(true)

  return (
    <GlobalContext.Provider value={{ loader, setLoader, showFooter, setShowFooter }}>
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider}