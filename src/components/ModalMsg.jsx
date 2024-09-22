import { Link } from "react-router-dom"
import { useModal } from './ModalContext'
import { React} from 'react'

const ModalMsg = () => {
    const {modalState, closeModal} = useModal()
    
    return (
        <div className={`absolute top-0 left-0 w-full h-full zindex-10 ${modalState.show ? "inline" : "hidden"}`}>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-20" onClick={closeModal}>
            </div>

            <div className="fex flex-col relative top-20 left-1/2 -translate-x-1/2 w-4/5 bg-slate-900 z-30 border border-teal-300 border-opacity-60">
                <div className="min-h-40 flex justify-center items-center text-center">
                    <p className="p-20 text-xl">{modalState.text}</p>
                </div>
                <div className="flex items-center justify-center w-full p-5 border-opacity-25 border-t border-teal-300">
                    <Link className="btn-lg btn-inverse" onClick={closeModal}>Ok</Link>
                </div>
            </div>
        </div>
    )
}

export default ModalMsg