import _Runtime from '../core/runtime';
import _Player from '../core/player';
import _Map from "../core/map"
import _Camera from '../core/camera';
import _Screen from '../core/screen';
import _Env from '../core/environment';
import _CollisionDetector from '../core/collisionDetector';
import _Character from '../workshop/character';

export default class _GameFramework {
    constructor(){
        this.Runtime = new _Runtime();
        this.Player = new _Player(); // Create player things
        this.Map = new _Map();
        this.Camera = new _Camera();
        this.Screen = new _Screen();
        this.Env = new _Env(); // Check after 
        this.CollisionDetector = new _CollisionDetector(); // Improve code
        this.Character = new _Character();
    }

    createObjs(Objs){
        // this.Enemies = new _Enemies(); // Add later
    }

    debug(Debug){
        // ##### GAME DEBUG #####
        Object.keys(Debug).forEach((prop)=>{
            if (this[prop] != undefined) {
                this[prop].setDebug(Debug[prop]);
            }
        })
    }

    setup(setup){
        // ##### HTML ELEMENTS #####
        this.canvasElem = setup.canvasElem;
        this.cameraElem = setup.cameraElem;
        this.ctx = setup.ctx;

        // ##### GAME SETUP #####
        this.Map.setup(setup.level);
        this.Camera.setup(this.cameraElem);
        this.Screen.setup(this.canvasElem, this.Camera.BLOCK_SIZE, this.Map.xBlockCount, this.Map.yBlockCount);
        this.Env.create(this.Map.blocks, this.Camera.BLOCK_SIZE);
        this.CollisionDetector.setup(this.Screen.w, this.Screen.h);
        this.Character.setup(this.Camera.w, this.Camera.h, this.Camera.BLOCK_SIZE, this.Screen.h);
    }

    start(){
        var lastRenderTime = 0;
        const run = (currentTime)=>{
            const deltaTime = currentTime - lastRenderTime;
            lastRenderTime = currentTime;
            if (this.Runtime.isPaused == false) {
                if (deltaTime > this.Runtime.FRAME_INTERVAL) {
                    this.ctx.clearRect(0, 0, this.Screen.w, this.Screen.h);
                    this.Env.draw(this.ctx, this.Screen.x, this.Screen.y, this.Screen.xx, this.Screen.yy); // vai ter que mudar
                    if (this.Runtime.isStarted){
                        this.Character.update(this.CollisionDetector, this.Env.blocks);
                    }
                    this.Character.draw(this.ctx);
                    this.Camera.update(this.Character, this.Screen);
                    
                    if (!this.Runtime.isStarted){
                        return false;
                    }
                }
            }
            
            this.Runtime.fps = 1000 / deltaTime;
            requestAnimationFrame(run);
        }
        run();

    }
}