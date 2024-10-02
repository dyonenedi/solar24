import "./../assets/css/play.css"
import Game from "./../assets/js/game.js"
import { useContext, useEffect, useRef } from "react"
import {GlobalContext} from "./../GlobalProvider"

export default function Play(){
    var wScreen = 0;
    var hScreen = 0;
    const {setShowFooter} = useContext(GlobalContext)
    const refPlayScreen = useRef();
    const refPlayArea = useRef();

    useEffect(()=>{
        setShowFooter(false)
        resetPlayAreaSize()
        Game()

        // Adicionando listener para redimensionar a tela
        window.addEventListener('resize', handleResize);

        // Limpando o listener quando o componente desmontar
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    },[])

    function handleResize() {
        location.reload()
    }
    
    function resetPlayAreaSize(){
        const wRef = 400;
        const hRef = 200;
        const hMenu = 70;

        // Ajust new rectangle area less menu
        hScreen = window.innerHeight - hMenu;
        // Improve calcs by changing to pair
        hScreen = makeEvenAfterFirst(hScreen)
        // Get equivalent height by width 
        wScreen = hScreen * wRef / hRef;

        // Validate it's gona fit in screen
        if (wScreen > window.innerWidth) {
            wScreen = hScreen * wRef / hRef;
            hScreen = (window.innerWidth * hRef / wRef) - hMenu;
        }

        if (refPlayScreen.current) {
            refPlayScreen.current.style.width = wScreen + "px";
            refPlayScreen.current.style.height = hScreen + "px";
        }

        // transforma no tamanho do canvas
        const wCanvas = wScreen * 10 / 6;
        const hCanvas = hScreen * 5 / 3;

        if (refPlayArea.current){
            refPlayArea.current.width = wCanvas;
            refPlayArea.current.height = hCanvas;
            refPlayArea.current.style.top = -(hCanvas / 5 * 2) + "px";
        }
    }

    function makeEvenAfterFirst(number) {
        // Converte para array de caracteres
        let digits = number.toString().split('');
    
        // Percorre a partir do segundo dígito
        for (let i = 1; i < digits.length; i++) {
            // Se o dígito não for par, substitui por '0'
            if (parseInt(digits[i]) % 2 !== 0) {
                digits[i] = '0';
            }
        }
    
        // Converte o array para um número
        return parseInt(digits.join(''));
    }

    return (
        <div ref={refPlayScreen} className="play-screen" id="screen">
            <canvas ref={refPlayArea} className="play-area" id="canvas"></canvas>
        </div>
    )
} 

