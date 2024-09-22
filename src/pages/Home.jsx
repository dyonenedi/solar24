import {React, useEffect} from 'react'
import { Link } from "react-router-dom"
import { useModal } from '../components/ModalContext.jsx'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import InfoImg from "./../assets/img/app/bg-1.png"
import PlayImg from "./../assets/img/app/play.jpg"
import BuildImg from "./../assets/img/app/build.jpg"

export default function Home({openModalCallback}) {
    useEffect(() => {
        import('./../assets/css/home.css');
      }, []);

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
                    <p to="/play" className="hero-text animate-link">
                        Jogar
                    </p>
                </Link>
            </div>
            <div className="hero-card section-hover ">
                <Link onClick={handleModal} className="flex w-full h-full">
                    <img src={BuildImg} className="h-full absolute top-0 left-0" />
                    <p  className="hero-text animate-link">
                        Criar
                    </p>
                </Link>
            </div>
            <div className="hero-card section-hover col-span-2">
                <img src={InfoImg} className="h-full absolute top-0 left-0" />
                <p className="hero-text">AJUDA</p>
                <p className="hero-info animate-info">
                    Para "criar" e "salvar" seu progresso, por favor faça login.
                </p>
            </div>
        </div>
    )
}