import('./../assets/css/home.css');

import {React, useEffect, useContext} from 'react'
import { Link } from "react-router-dom"
import { GlobalContext } from './../GlobalProvider'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import InfoImg from "./../assets/img/app/bg-1.png"
import PlayImg from "./../assets/img/app/play.jpg"
import BuildImg from "./../assets/img/app/build.jpg"
import { ModalComponent, ModalState } from './../components/Modal'


export default function Home() {
    const { openModal } = ModalState();
    const { setShowMenu } = useContext(GlobalContext)
    const { setShowFooter } = useContext(GlobalContext)

    useEffect(()=>{
        setShowMenu(true)
        setShowFooter(true)
    })
 
    return (
        <div className="hero-container">
            <div className="hero-card section-hover ">
                <Link to="/play" className="flex w-full h-full">
                    <img src={PlayImg} className="h-full w-full absolute top-0 left-0" />
                    <p to="/play" className="hero-text animate-link">
                        Jogar
                    </p>
                </Link>
            </div>
            <div className="hero-card section-hover ">
                <Link onClick={(e) => openModal(e, "modal-build")} className="flex w-full h-full">
                    <img src={BuildImg} className="h-full w-full absolute top-0 left-0" />
                    <p  className="hero-text animate-link">
                        Criar
                    </p>
                </Link>
            </div>
            <div className="hero-card section-hover col-span-2">
                <img src={InfoImg} className="h-full w-full absolute top-0 left-0" />
                <p className="hero-text">AJUDA</p>
                <p className="hero-info animate-info">
                    Para "criar" e "salvar" seu progresso, por favor faça login.
                </p>
            </div>

            <ModalComponent id="modal-build">
                <p className='text-xl p-20'>Essa funcionalidade ainda não está pronta. Aguarde! Em breve vamos liberá-la.</p>
            </ModalComponent>
        </div>
    )
}