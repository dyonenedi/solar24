import React, { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({show: false, text: ''})

  const openModal = (text) => {
    setModalState({show: true, text })
  }

  const closeModal = () => {
    setModalState({show: false, text: ''})
  }

  return (
    <ModalContext.Provider value={{modalState, openModal, closeModal}}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)