
export default class Runtime{
    #FRAME_RATE= 60;
    #FRAME_INTERVAL = 1000 / this.#FRAME_RATE;
    #isStarted = false;
    #isPaused = false;
    #fps = 0;

    setFramerate(frameRate=60){
        this.#FRAME_RATE = parseFloat(frameRate);
        this.#FRAME_INTERVAL = 1000 / this.#FRAME_RATE;
    }

    //#region GETS & SETS
    get FRAME_RATE(){
        return this.#FRAME_RATE;
    }
    set FRAME_RATE(value){
        this.setFramerate(value)
    }
    get isStarted(){
        return this.#isStarted;
    }
    set isStarted(value){
        this.#isStarted = (value);
    }
    get isPaused(){
        return this.#isPaused;
    }
    set isPaused(value){
        this.#isPaused = (value);
    }
    get FRAME_INTERVAL(){
        return this.#FRAME_INTERVAL;
    }
    get fps(){
        return this.#fps;
    }
    set fps(value){
        this.#fps = parseFloat(value).toFixed(1);
    }
    //#endregion
}