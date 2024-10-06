import _Env from "./obj/environment"
import _Character from "./obj/character"
import _CollisionDetector from "./util/collisionDetector"
import _Screen from "./util/screen"
import _Camera from "./util/camera"
import _Game from "./util/game"

const GameStart = () => {
    // CONST
    const LEVEL = 2;    
    const startElem = document.getElementById('start')
    const cameraElem = document.getElementById('camera')
    const canvasElem = document.getElementById('canvas')
    const ctx = canvasElem.getContext('2d');
    
    // CLASSES
    var Game = new _Game();
    Game.setLevel(LEVEL);
    var Camera = new _Camera(cameraElem);
    var Screen = new _Screen(Game, Camera, canvasElem);
    var Env = new _Env(Screen);
    var CollisionDetector = new _CollisionDetector(Env);
    var Character = new _Character(Screen, CollisionDetector);

    var lastRenderTime = 0;
    const start = (currentTime)=>{
        const deltaTime = currentTime - lastRenderTime;
        if (PAUSED == false) {
            if (deltaTime > Game.FRAME_INTERVAL) {
                lastRenderTime = currentTime;
                ctx.clearRect(0, 0, Screen.w, Screen.h);

                Env.draw(ctx);
                if (STARTED)
                    Character.update();
                Character.draw(ctx);
                Camera.update(Character, Screen);
                
                if (!STARTED)
                    return false;
            }
        }
        
        requestAnimationFrame(start);
    }

    start();
    
    // ############# Comandos do jogo #############
    const mouseClick = () => {
        startElem.style.display = "none";
        STARTED = true;
        start();
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === ' '){
            PAUSED = !PAUSED;
        }
    });
    startElem.addEventListener('mousedown', (e) => {
        mouseClick(e)
    });
    startElem.addEventListener('touchstart', (e) => {
        mouseClick(e)
    });
}

export default GameStart