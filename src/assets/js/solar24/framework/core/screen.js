export default class Screen {
    #DEBUG = false;
    #X_COUNT_BLOCKS = 0;
    #Y_COUNT_BLOCKS = 0;

    #canvasElem = null;
    #ctx = null;
    #blockSize = 0;
    #w = null;
    #h = null;
    #x = 0;
    #y = 0;
    #xx = 0;
    #yy = 0;

    setup(canvasElementId){
        const canvasElem = document.getElementById(canvasElementId);
        if (canvasElem instanceof HTMLCanvasElement) {
            this.#canvasElem = canvasElem;
            this.#ctx = this.#canvasElem.getContext("2d");
        } else {
            throw new Error("Parameter canvasElem must be a HTMLCanvasElement")
        }
    }

    setSize(blockSize, xMapBlockCount, yMapBlockCount){
        this.#blockSize = blockSize;
        this.#X_COUNT_BLOCKS = xMapBlockCount;
        this.#Y_COUNT_BLOCKS = yMapBlockCount;
        this.#resizeByCameraSize()
    }

    #resizeByCameraSize(){
        this.#w = this.#blockSize * this.#X_COUNT_BLOCKS;
        this.#h = this.#blockSize * this.#Y_COUNT_BLOCKS;
        this.#xx = this.#x + this.#w;
        this.#yy = this.#y + this.#h;

        this.#canvasElem.style.width = `${this.#w}px`;
        this.#canvasElem.style.height = `${this.#h}px`;
        this.#canvasElem.width = this.#w;
        this.#canvasElem.height = this.#h;
        
        if (this.#DEBUG){
            console.log("| SCREEN |\nScreen W: "+this.#w+"\n"+"Screen H: "+this.#h+"\n"+"Screen XX: "+this.#xx+"\n"+"Screen YY: "+this.#yy);
        }
    }

    setDebug(debug){
        this.#DEBUG = (debug);
    }

    //#region GETS & SETS
    get X_COUNT_BLOCKS() {
        return this.#X_COUNT_BLOCKS;
    }
    get Y_COUNT_BLOCKS() {
        return this.#Y_COUNT_BLOCKS;
    }
    get canvasElem() {
        return this.#canvasElem;
    }
    set canvasElem(value) {
        this.#canvasElem = value;
    }
    get blockSize(){
        return this.#blockSize;
    }
    get w() {
        return this.#w;
    }
    set w(value) {
        this.#w = value;
    }
    get h() {
        return this.#h;
    }
    set h(value) {
        this.#h = value;
    }
    get x() {
        return this.#x;
    }
    set x(value) {
        this.#x = value;
    }
    get y() {
        return this.#y;
    }
    set y(value) {
        this.#y = value;
    }
    get xx() {
        return this.#xx;
    }
    set xx(value) {
        this.#xx = value;
    }
    get yy() {
        return this.#yy;
    }
    set yy(value) {
        this.#yy = value;
    }
    get ctx() {
        return this.#ctx;
    }
    //#endregion
}