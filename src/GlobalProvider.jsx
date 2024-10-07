import React, { createContext, useState } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
  const [loader, setLoader] = useState(true)
  const [showFooter, setShowFooter] = useState(true)
  const [showMenu, setShowMenu] = useState(true)

  return (
    <GlobalContext.Provider value={{ loader, setLoader, showFooter, setShowFooter, showMenu, setShowMenu }}>
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider}