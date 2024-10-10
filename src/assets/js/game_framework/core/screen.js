export default class _Screen {
    #DEBUG = false;
    #canvasElem = null;
    #w = null;
    #h = null;
    #x = 0;
    #y = 0;
    #xx = 0;
    #yy = 0;
    #X_COUNT_BLOCKS = 0;
    #Y_COUNT_BLOCKS = 0;

    setSize(canvasElem, blockSize, xMapBlockCount, yMapBlockCount){
        this.#canvasElem = canvasElem;
        this.#X_COUNT_BLOCKS = xMapBlockCount;
        this.#Y_COUNT_BLOCKS = yMapBlockCount;

        // Transforma Screen com base no tamanho da camera
        this.#w = blockSize * xMapBlockCount;
        this.#h = blockSize * yMapBlockCount;
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
    get canvasElem() {
        return this.#canvasElem;
    }
    set canvasElem(value) {
        this.#canvasElem = value;
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
    get X_COUNT_BLOCKS() {
        return this.#X_COUNT_BLOCKS;
    }
    get Y_COUNT_BLOCKS() {
        return this.#Y_COUNT_BLOCKS;
    }
    //#endregion
}