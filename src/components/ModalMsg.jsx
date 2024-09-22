import { Link } from "react-router-dom"
import { useModal } from './ModalContext'
import { React} from 'react'
import './../assets/css/modalMsg.css'

const ModalMsg = () => {
    const {modalState, closeModal} = useModal()
    
    return (
        <div className={`modal-container ${modalState.show ? "inline" : "hidden"}`}>
            <div className="modal-bg" onClick={closeModal}>
            </div>

            <div className="modal-box">
                <div className="modal-text-box">
                    <p className="p-20 text-xl">{modalState.text}</p>
                </div>
                <div className="modal-footer">
                    <Link className="btn-lg btn-inverse" onClick={closeModal}>Ok</Link>
                </div>
            </div>
        </div>
    )
}

export default ModalMsg