
export default class _Runtime{
    #DEBUG = false;
    #FRAME_RATE= 60;
    #FRAME_INTERVAL = 1000 / this.#FRAME_RATE;
    #isStarted = false;
    #isPaused = false;
    #fps = 0;

    #setup(frameRate=60){
        this.#FRAME_RATE = frameRate;
        this.#FRAME_INTERVAL = 1000 / this.#FRAME_RATE;

        if (this.#DEBUG) {
            console.log("| RUNTIME |\nFrame Rate (fps): "+this.#FRAME_RATE+"\nStarted: "+this.#isStarted+"\nPaused: "+this.#isPaused);
        }
    }

    setDebug(debug){
        this.#DEBUG = (debug);
    }

    //#region GETS & SETS
    get FRAME_RATE(){
        return this.#FRAME_RATE;
    }
    set FRAME_RATE(value){
        this.#setup(parseFloat(value))
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
        this.#fps = (value).toFixed(1);
    }
    //#endregion
}