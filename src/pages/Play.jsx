import "./../assets/css/play.css"
import _GameFramework from '../assets/js/game_framework/builder/game_framework'
import { useContext, useEffect, useRef, useState } from "react"
import {GlobalContext} from "./../GlobalProvider"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Play(){
    const {setShowMenu} = useContext(GlobalContext)
    const {setShowFooter} = useContext(GlobalContext)
    const cameraRef = useRef();

    // ##### INI PAGE
    useEffect(()=>{
        setShowMenu(false)
        setShowFooter(false)
        resetPlayAreaSize()
        setEvents();
        setGameMenuWidth()
        GameStart();
        setUseFrameRate(GameFramework.Runtime.FRAME_RATE)
        setUseGravity(GameFramework.Character.gravity)
    },[])
    
    
    // ##### CONTROLLS
    const [useFrameRate, setUseFrameRate] = useState(0)
    const handleFrameRate = (e) => {
        setUseFrameRate(e.target.value);
        GameFramework.Runtime.setFrameRate(e.target.value);
    };
    const [useGravity, setUseGravity] = useState(0)
    const handleGravity = (e) => {
        setUseGravity(e.target.value);
        GameFramework.Character.gravity = parseFloat(e.target.value);
    };

    function resetPlayAreaSize(){
        if (cameraRef.current) {
            cameraRef.current.style.width = GAME_W + "px";
            cameraRef.current.style.height = GAME_H + "px";
        }
    }

    function setEvents(){
        // Retira seleção do site
        window.addEventListener('contextmenu', function() {window.getSelection().removeAllRanges()});
        
        // Adicionando listener para redimensionar a tela
        window.addEventListener('resize', function(){location.reload()});
    }

    function setGameMenuWidth(){
        let gameMenu = document.getElementById('gameMenu')
        gameMenu.style.width = GAME_W
    }

    function GameStart(){
         // CONST
         const startElem = document.getElementById('start')
         const cameraElem = document.getElementById('camera')
         const canvasElem = document.getElementById('canvas')
         const ctx = canvasElem.getContext('2d');
         const level = 1;
         
         // GAME
         const setup = {startElem:startElem, cameraElem:cameraElem, canvasElem:canvasElem, ctx:ctx, level:level};
         GameFramework = new _GameFramework(setup);
         GameFramework.start();
    }

    return (
        <>
            <div id="gameMenu" className="absolute top-0 h-10 pt-5 flex justify-start items-center">
                <span data-tip="Home"><Link to='/'><FontAwesomeIcon icon={'circle-chevron-left'} /> Voltar</Link></span>
                <span className="px-1 relative" data-tip="Frame Rate">
                    <FontAwesomeIcon icon={'wave-square'} className="absolute top-3 right-6"/>
                    <input value={useFrameRate} onChange={handleFrameRate} type="text" className="w-20"/>
                </span>
                <span className="px-1 relative" data-tip="Gravidade">
                    <FontAwesomeIcon icon={'person-falling-burst'} className="absolute top-3 right-6"/>
                    <input value={useGravity} onChange={handleGravity} type="text" className="w-20"/>
                </span>
            </div>
            <div ref={cameraRef} id="camera">
                <div id="start">Clique para iniciar</div>
                <canvas id="canvas"></canvas>
            </div>
        </>
    )
} 

