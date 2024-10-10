import _Runtime from './game_framework/core/runtime';
import _Map from "./game_framework/core/map"
import _Camera from './game_framework/core/camera';
import _Screen from './game_framework/core/screen';
import _Env from './game_framework/core/environment';
import _CollisionDetector from './game_framework/core/collisionDetector';
import _Player from './game_framework/workshop/player';
import _Character from './game_framework/workshop/character';

export default class _GameFramework {
    constructor(){
        this.Player = new _Player(); // WORKSHOP
        this.Runtime = new _Runtime();
        this.Map = new _Map();
        this.Camera = new _Camera();
        this.Screen = new _Screen();
        this.Env = new _Env(); // IMPROVE
        this.CollisionDetector = new _CollisionDetector(); // IMPROVE
        this.Character = new _Character(); // WORKSHOP
    }

    setup(Setup={}){
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
        var lastRenderTime = 0;
        const run = (currentTime)=>{
            const deltaTime = currentTime - lastRenderTime;
            lastRenderTime = currentTime;
            if (this.Runtime.isPaused == false) {
                if (deltaTime > this.Runtime.FRAME_INTERVAL) {
                    this.#run();
                    
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

    #run(){
        // CLEAN SCREEN
        this.ctx.clearRect(0, 0, this.Screen.w, this.Screen.h);

        // DRAW MAP
        this.Env.draw(this.ctx, this.Screen.x, this.Screen.y, this.Screen.xx, this.Screen.yy); // vai ter que mudar
        if (this.Runtime.isStarted){
            // CHARACTER ALGORITHM 
            this.Character.resetJumpClick();
            this.Character.update(this.CollisionDetector, this.Env.blocks);
            this.Character.updateFriction();
            this.Character.setSkinDirection();

            // CHAMERA ALGORITHM 
            this.Camera.update(this.Character, this.Screen);
        }

        // DRAWING 
        this.Character.draw(this.ctx);
        this.Character.drawSkin(this.ctx);
    }
}