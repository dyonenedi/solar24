
import React, {useContext, useEffect } from 'react'
import { Link } from "react-router-dom"

const ModalContent = ({ children, modalId }) => {
    useEffect(() => {
        import('./../assets/css/modal.css')
    }, [])

    const { closeModal } = ModalState();

    return (
        <div className={`modal-container hidden`} id={modalId}>
            <div className="modal-bg" onClick={(e) => closeModal(e, modalId)}>
            </div>

            <div className="modal-box">
                <div className="modal-text-box">
                    {children}
                </div>
                <div className="modal-footer">
                    <Link className="btn-lg btn-inverse" onClick={(e) => closeModal(e, modalId)}>Ok</Link>
                </div>
            </div>
        </div>
    )
}

export const ModalComponent = ({ children, id }) => {
    return (
        <ModalContent children={children} modalId={id} />
    )
}

export const ModalState = () => {
    const openModal = (e, modalId) => {
        e.preventDefault()
        const modal = document.getElementById(modalId)
        modal.classList.remove("hidden")
    }

    const closeModal = (e, modalId) => {
        e.preventDefault()
        const modal = document.getElementById(modalId)
        modal.classList.add("hidden")
    }

    return {
        openModal,
        closeModal,
    }
}