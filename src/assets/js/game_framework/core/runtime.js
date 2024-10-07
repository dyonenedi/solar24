
export default class _Runtime{
    constructor(){
        this.FRAME_RATE = 60;
        this.FRAME_INTERVAL = 1000 / this.FRAME_RATE;
        this.isStared = false;
        this.isPaused = false;
    }

    setFrameRate(frameRate){
        this.FRAME_RATE = parseInt(frameRate);
        this.FRAME_INTERVAL = 1000 / this.FRAME_RATE;
    }
}