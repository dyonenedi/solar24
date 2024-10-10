import _Player from './game_framework/workshop/player';
import _Runtime from './game_framework/core/runtime';
import _Map from "./game_framework/core/map"
import _Camera from './game_framework/core/camera';
import _Screen from './game_framework/core/screen';
import _Character from './game_framework/workshop/character';

export default class _GameController {
    constructor(){
        this.Runtime = new _Runtime();
        this.Map = new _Map();
        this.Camera = new _Camera();
        this.Screen = new _Screen();
        this.Character = new _Character(); // WORKSHOP
        this.Player = new _Player(); // WORKSHOP
    }

    setup(Setup={}){
        // ##### HTML ELEMENTS #####
        this.canvasElem = Setup.canvasElem;
        this.cameraElem = Setup.cameraElem;
        this.ctx = Setup.canvasElem.getContext('2d');
        this.level = Setup.level;
        this.maps = Setup.maps;

        // ##### GAME SETUP #####
        this.Map.setMaps(this.maps);
        this.Map.setLevel(this.level);
        this.Camera.setSize(this.cameraElem);
        this.Screen.setup(this.canvasElem, this.Camera.BLOCK_SIZE, this.Map.xBlockCount, this.Map.yBlockCount);
        this.Map.setupBlocks(this.Screen.blockSize);
        this.Character.setup(this.Screen, this.Map.blocks, this.Camera);
        this.Player.setLevel(this.level);
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
        this.Map.draw(this.ctx, this.Screen.x, this.Screen.y, this.Screen.xx, this.Screen.yy); // vai ter que mudar
        if (this.Runtime.isStarted){
            // CHARACTER ALGORITHM 
            this.Character.resetJumpClick();
            this.Character.update();
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