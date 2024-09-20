import React from 'react'
import { Link } from "react-router-dom"
import { useModal } from '../components/ModalContext.jsx'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import InfoImg from "./../assets/img/app/bg-1.png"
import PlayImg from "./../assets/img/app/play.jpg"
import BuildImg from "./../assets/img/app/build.jpg"

import './../assets/css/home.css'

export default function Home({openModalCallback}) {
    const {openModal} = useModal()
    const handleModal = (event) => {
        event.preventDefault()
        openModal("Essa funcionalidade ainda não está pronta. Aguarde! Em breve vamos liberá-la.")
    };
 
    return (
        <div className="hero-container">
            <div className="hero-card section-hover ">
                <Link to="/play" className="flex w-full h-full">
                    <img src={PlayImg} className="h-full absolute top-0 left-0" />
                    <p to="/play" className="absolute text-teal-300 ff-text f-shadow marker:top-1/3 left-1/2 -translate-x-1/2 uppercase link">
                        Jogar
                    </p>
                </Link>
            </div>
            <div className="hero-card section-hover ">
                <Link onClick={handleModal} className="flex w-full h-full">
                    <img src={BuildImg} className="h-full absolute top-0 left-0" />
                    <p  className="absolute text-teal-300  ff-text f-shadow top-1/3 left-1/2 -translate-x-1/2 uppercase link">
                        Criar
                    </p>
                </Link>
            </div>
            <div className="hero-card section-hover col-span-2">
                <img src={InfoImg} className="h-full absolute top-0 left-0" />
                <p className="pt-10 mt-3 text-teal-300 ff-text f-shadow ">AJUDA</p>
                <p className="absolute text-teal-300  ff-text f-shadow top-2 lef-2 uppercase text-lg p-5">
                    Para "criar" e "salvar" seu progresso, por favor faça login.
                </p>
            </div>
        </div>
    )
}