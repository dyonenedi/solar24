import React, { createContext, useState } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
  const [GModalOpened, setGModalOpened] = useState(false)

  return (
    <GlobalContext.Provider value={{ GModalOpened, setGModalOpened }}>
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider }