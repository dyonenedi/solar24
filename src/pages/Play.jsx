import "./../assets/css/play.css"
import GameStart from "./../assets/js/game.js"
import { useContext, useEffect, useRef } from "react"
import {GlobalContext} from "./../GlobalProvider"

export default function Play(){
    var wCamera = 0;
    var hCamera = 0;
    const {setShowFooter} = useContext(GlobalContext)
    const cameraRef = useRef();

    useEffect(()=>{
        setShowFooter(false)
        resetPlayAreaSize()
        GameStart()

        window.addEventListener('contextmenu', function(e) {
            window.getSelection().removeAllRanges();
        });
        
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
        hCamera = window.innerHeight - hMenu;
        // Improve calcs by changing to pair
        hCamera = makeEvenAfterFirst(hCamera)
        // Get equivalent height by width 
        wCamera = hCamera * wRef / hRef;

        // Validate it's gona fit in screen
        if (wCamera > window.innerWidth) {
            wCamera = hCamera * wRef / hRef;
            hCamera = (window.innerWidth * hRef / wRef) - hMenu;
        }

        if (cameraRef.current) {
            cameraRef.current.style.width = wCamera + "px";
            cameraRef.current.style.height = hCamera + "px";
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
        <div ref={cameraRef} id="camera">
            <div id="start">Clique para iniciar</div>
            <canvas id="canvas"></canvas>
        </div>
    )
} 

