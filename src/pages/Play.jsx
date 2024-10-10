import "./../assets/css/play.css"
import _GameFramework from '../assets/js/game'
import { useContext, useEffect, useState } from "react"
import {GlobalContext} from "./../GlobalProvider"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

var GameFramework = {};

export default function Play(){
    const {setShowMenu} = useContext(GlobalContext)
    const {setShowFooter} = useContext(GlobalContext)

    // ##### CONTROLL PAINEL VAR #####
    const [useFrameRate, setUseFrameRate] = useState(0)
    const handleFrameRate = (e) => {
        setUseFrameRate(e.target.value);
        GameFramework.Runtime.FRAME_RATE = e.target.value;
    }
    const [useGravity, setUseGravity] = useState(0)
    const handleGravity = (e) => {
        setUseGravity(e.target.value);
        GameFramework.Character.gravity = e.target.value;
    }
    const [useJumping, setUseJumping] = useState(false)
    const [useRight, setUseRight] = useState(false)
    const [useColliding, setUseColliding] = useState(false)
    const [useFps, setUseFps] = useState(0)

    // ##### INI PAGE #####
    useEffect(()=>{
        setShowMenu(false)
        setShowFooter(false)
        resetPlayAreaSize()
        setGameMenuWidth()
        GameStart();
        setEvents();
    },[])
    
    function resetPlayAreaSize(){
        document.getElementById('camera').style.width = GAME_W + "px";
        document.getElementById('camera').style.height = GAME_H + "px";
    }

    function setGameMenuWidth(){
        document.getElementById('gameMenu').style.width = GAME_W
    }

    function GameStart(){
         // CONST
         document.getElementById('start').innerHTML = "Clique para iniciar";
         const cameraElem = document.getElementById('camera')
         const canvasElem = document.getElementById('canvas')
         const level = 1;
         
         // GAME
         const Setup = {level: level, cameraElem:cameraElem, canvasElem:canvasElem};
         GameFramework = new _GameFramework();
         GameFramework.setup(Setup);
         GameFramework.start();

         setInterval(() => {
            setUseFrameRate(GameFramework.Runtime.FRAME_RATE)
            setUseGravity(GameFramework.Character.gravity)
            setUseJumping(GameFramework.Character.direction.up)
            setUseRight(GameFramework.Character.direction.right)
            setUseColliding((GameFramework.Character.isColliding.block.right ? ('right') : (GameFramework.Character.isColliding.block.left ? 'left': 'none')))
            setUseFps(GameFramework.Runtime.fps)
         }, 16.6);
    }

    function setEvents(){
        // ##### ON RESIZE #####
        window.addEventListener('resize', function(){location.reload()});
        // ##### GAME CONTROLS #####
        window.addEventListener('keydown', keyPress.bind(this));
        document.getElementById('start').addEventListener('mousedown', startDivClick.bind(this));
        document.getElementById('start').addEventListener('touchstart', startDivClick.bind(this));
        // ##### GAME CHARACTER #####
        document.getElementById('canvas').addEventListener('mousedown', canvasDivClick.bind(this));
        document.getElementById('canvas').addEventListener('touchstart', canvasDivClick.bind(this));
    }
    function startDivClick() {
        if (GameFramework.Runtime.isStarted == false) {
            document.getElementById('start').style.display = "none";
            GameFramework.Runtime.isStarted = true;
            GameFramework.start();
        }
    }
    function keyPress(e){
        if (e.key === ' ') {
            GameFramework.Runtime.isPaused = !GameFramework.Runtime.isPaused;
            if (GameFramework.Runtime.isPaused) {
                document.getElementById('start').style.display = "flex";
                document.getElementById('start').innerHTML = "Pausado";
            } else {
                document.getElementById('start').style.display = "none";
            }
        }
    }
    function canvasDivClick() {
        if (GameFramework.Runtime.isStarted && !GameFramework.Runtime.isPaused) {
            GameFramework.Character.jumpClick = Date.now();
        }
    }

    return (
        <>
            <div id="gameMenu" className="absolute top-0 h-10 pt-5 flex justify-start items-center w-full">
                <button className="btn-lg btn-game mr-2 py-2" data-tip="Home">
                    <Link to='/'>
                        <FontAwesomeIcon icon={'circle-chevron-left'} /> BACK
                    </Link>
                </button>
                <span className="relative" data-tip="Frame Rate">
                    <FontAwesomeIcon icon={'wave-square'} className="absolute top-3 right-6"/>
                    <input value={useFrameRate} onChange={handleFrameRate} type="text" className="w-20"/>
                </span>
                <span className="relative" data-tip="Gravidade">
                    <FontAwesomeIcon icon={'person-falling-burst'} className="absolute top-3 right-6"/>
                    <input value={useGravity} onChange={handleGravity} type="text" className="w-20"/>
                </span>
                <span className="relative" data-tip="Pulando?">
                    <FontAwesomeIcon icon={'person-running'} className="absolute top-3 right-6"/>
                    <input value={useJumping} disabled type="text" className="w-20"/>
                </span>
                <span className="relative" data-tip="Movendo para Direita?">
                    <FontAwesomeIcon icon={'person-walking-arrow-right'} className="absolute top-3 right-6"/>
                    <input value={useRight} disabled type="text" className="w-20"/>
                </span>
                <span className="relative" data-tip="Está colidindo no eixo X?">
                    <FontAwesomeIcon icon={'person-walking-dashed-line-arrow-right'} className="absolute top-3 right-6"/>
                    <input value={useColliding} disabled type="text" className="w-20"/>
                </span>
                <span className="relative " data-tip="FPS">
                    <FontAwesomeIcon icon={'gauge-high'} className="absolute top-3 right-6"/>
                    <input value={useFps} disabled type="text" className="w-20"/>
                </span>
                <button  className="btn btn-main btn-lg absolute right-0 py-2" data-tip="Jogar novamente">
                    <a href="/play">
                        <FontAwesomeIcon icon={'repeat'} /> Restart
                    </a>
                </button>
            </div>
            <div id="camera">
                <div id="start">Clique para iniciar</div>
                <canvas id="canvas"></canvas>
            </div>
        </>
    )
}