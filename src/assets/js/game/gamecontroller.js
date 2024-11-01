import Character from '../solar24/entities/old_character';
import Solar24Factory from '../solar24/framework/factory/_solar24factory';

class GameController {
    Solar24Factory = {};

    constructor(Config={}){
        // ##### GAME INIT #####
        this.Soloar24Factory = new Solar24Factory(Config);
        this.Runtime = Soloar24Factory.createRuntime();
        this.Map = Soloar24Factory.createMap(Config.maps);
        this.Camera = Soloar24Factory.createCamera(Config.cameraElementId);
        this.Screen = Soloar24Factory.createScreen(Config.canvasElementId);
        this.Character = new Character();

        this.setup(Config);
    }

    setup(Config){
        // ##### GAME SETUP #####
        this.Runtime.setFramerate(Config.frame_rate);
        this.Map.setLevel(Config.level);
        this.Camera.setSize(Config.cameraElementId);
        this.Screen.setSize(this.Camera.BLOCK_SIZE, this.Map.xBlockCount, this.Map.yBlockCount);
        this.Map.setupBlocks(this.Screen.blockSize);
        this.Character.setup(this.Screen, this.Map.blocks, this.Camera);
    }

    start(){
        var lastRenderTime = 0;
        const run = (currentTime)=>{
            const deltaTime = currentTime - lastRenderTime;
            lastRenderTime = currentTime;
            if (this.Runtime.isPaused == false) {
                if (deltaTime > this.Runtime.FRAME_INTERVAL) {
                    this._run();
                    
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

    _run(){
        // CLEAN SCREEN
        this.Screen.ctx.clearRect(0, 0, this.Screen.w, this.Screen.h);

        // DRAW MAP
        this.Map.draw(this.Screen.ctx, this.Screen.x, this.Screen.y, this.Screen.xx, this.Screen.yy); // vai ter que mudar
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
        this.Character.draw(this.Screen.ctx);
        this.Character.drawSkin(this.Screen.ctx);
    }
}

export default GameController