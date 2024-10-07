import _Runtime from '../core/runtime';
import _Player from '../core/player';
import _Map from "../core/map"
import _Camera from '../core/camera';
import _Screen from '../core/screen';
import _Env from '../core/environment';
import _CollisionDetector from '../core/collisionDetector';
import _Character from '../workshop/character';


class _GameFramework {
    constructor(setup){
        // ##### HTML ELEMENTS #####
        this.startElem = setup.startElem;
        this.canvasElem = setup.canvasElem;
        this.cameraElem = setup.cameraElem;
        this.ctx = setup.ctx;

        // ##### GAME OBJS ##### 
        this.level = setup.level;
        this.Runtime = new _Runtime();
        this.Player = new _Player(); // Create player things
        this.Map = new _Map();
        this.Camera = new _Camera();
        this.Screen = new _Screen();
        this.Env = new _Env(); // Check after 
        this.CollisionDetector = new _CollisionDetector(); // Improve code
        this.Character = new _Character();
        // this.Enemies = new _Enemies(); // Add later

        // ##### GAME SETUP #####
        this.Map.setup(this.level);
        this.Camera.setup(this.cameraElem);
        this.Screen.setup(this.canvasElem, this.Camera.BLOCK_SIZE, this.Map.xBlockCount, this.Map.yBlockCount);
        this.Env.create(this.Map.blocks, this.Camera.BLOCK_SIZE);
        this.CollisionDetector.setup(this.Screen.w, this.Screen.h);
        this.Character.setup(this.Camera.w, this.Camera.h, this.Camera.BLOCK_SIZE, this.Screen.h, this.canvasElem, this.Runtime);

        // ##### GAME CONTROLS #####
        window.addEventListener('keydown', this.#keyPress.bind(this));
        this.startElem.addEventListener('mousedown', this.#mouseClick.bind(this));
        this.startElem.addEventListener('touchstart', this.#mouseClick.bind(this));
    }

    start(){
        var lastRenderTime = 0;
        const run = (currentTime)=>{
            const deltaTime = currentTime - lastRenderTime;
            if (this.Runtime.isPaused == false) {
                if (deltaTime > this.Runtime.FRAME_INTERVAL) {
                    lastRenderTime = currentTime;
                    this.ctx.clearRect(0, 0, this.Screen.w, this.Screen.h);
                    this.Env.draw(this.ctx, this.Screen.x, this.Screen.y, this.Screen.xx, this.Screen.yy); // vai ter que mudar
                    if (this.Runtime.isStared){
                        this.Character.update(this.CollisionDetector, this.Env.blocks);
                    }
                    this.Character.draw(this.ctx);
                    this.Camera.update(this.Character, this.Screen);
                    
                    if (!this.Runtime.isStared){
                        return false;
                    }
                }
            }
            
            requestAnimationFrame(run);
        }
        run();
    }

    // ##### PRIVATE #####
    #mouseClick() {
        this.startElem.style.display = "none";
        this.Runtime.isStared = true;
        this.start();
    }

    #keyPress(e){
        if (e.key === ' ') {
            this.Runtime.isPaused = !this.Runtime.isPaused;
        }
    }
}

export default _GameFramework;