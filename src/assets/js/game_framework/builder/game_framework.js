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
        this.Player = new _Player(); // Create player things
        this.Runtime = new _Runtime();
        this.Map = new _Map();
        this.Camera = new _Camera();
        this.Screen = new _Screen();
        this.Env = new _Env(); // Check after 
        this.CollisionDetector = new _CollisionDetector(); // Improve code
        this.Character = new _Character();
    }

    createObjs(Objs={}){
        // this.Enemies = new _Enemies(); // Add later
    }

    debug(Debug={}){
        // ##### GAME DEBUG #####
        if (typeof Debug == "object") {
            Object.keys(Debug).forEach((prop)=>{
                if (this[prop] != undefined && 'setDebug' in this[prop]) {
                    this[prop].setDebug(Debug[prop]);
                }
            })
        } else {
            throw new Error("Debug precisa ser um objeto");
        }
    }

    setup(Setup={}){
        this.#validateSetupObj(Setup, "object");

        // ##### HTML ELEMENTS #####
        this.canvasElem = Setup.canvasElem;
        this.cameraElem = Setup.cameraElem;
        this.ctx = Setup.canvasElem.getContext('2d');

        // ##### GAME SETUP #####
        this.Player.setup(Setup.level);
        this.Map.setup(this.Player.level);
        this.Camera.setup(this.cameraElem);
        this.Screen.setup(this.canvasElem, this.Camera.BLOCK_SIZE, this.Map.xBlockCount, this.Map.yBlockCount);
        this.Env.create(this.Map.blocks, this.Camera.BLOCK_SIZE);
        this.CollisionDetector.setup(this.Screen.w, this.Screen.h);
        this.Character.setup(this.Camera.w, this.Camera.h, this.Camera.BLOCK_SIZE, this.Screen.h);
    }

    start(){
        if (this.ctx != undefined && typeof this.ctx == "object") {
            var lastRenderTime = 0;
            const run = (currentTime)=>{
                const deltaTime = currentTime - lastRenderTime;
                lastRenderTime = currentTime;
                if (this.Runtime.isPaused == false) {
                    if (deltaTime > this.Runtime.FRAME_INTERVAL) {
                        this.ctx.clearRect(0, 0, this.Screen.w, this.Screen.h);
                        this.Env.draw(this.ctx, this.Screen.x, this.Screen.y, this.Screen.xx, this.Screen.yy); // vai ter que mudar
                        if (this.Runtime.isStarted){
                            this.Character.resetJumpClick();
                            this.Character.update(this.CollisionDetector, this.Env.blocks);
                            this.Character.updateFriction();
                            this.Character.setSkinDirection();
                        }
                        this.Character.draw(this.ctx);
                        this.Character.drawSkin(this.ctx);
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
        } else {
            throw new Error("A canvas elem is expected!");
        }
    }

    // ##### PRIVATE #####
    #validateSetupObj(Setup){
        if (typeof Setup != "object" || Setup.cameraElem == undefined || Setup.canvasElem == undefined) {
            throw new Error("Parameter setup must be an object with cameraElem and canvasElem properties!");
        } else if (!(Setup.canvasElem instanceof HTMLCanvasElement)) {
            throw new Error("Parameter canvasElem must be a Canvas Element!");
        } else if (!(Setup.cameraElem instanceof HTMLElement)){
            throw new Error("Parameter cameraElem must be a Div Element!");
        } else if (Setup.level == "undefined"){
            throw new Error("Parameter level must be seted!");
        }
    }
}