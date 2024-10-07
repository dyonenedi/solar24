class _Screen {
    constructor(){
        this.canvasElem = null;
        this.X_COUNT_BLOCKS = null;
        this.Y_COUNT_BLOCKS = null;
        this.w = null;
        this.h = null;
        this.x = 0;
        this.y = 0;
        this.xx = 0;
        this.yy = 0;
    }

    setup(canvasElem, blockSize, xMapBlockCount, yMapBlockCount){
        this.canvasElem = canvasElem;
        this.X_COUNT_BLOCKS = xMapBlockCount;
        this.Y_COUNT_BLOCKS = yMapBlockCount;

        // Transforma Screen com base no tamanho da camera
        this.w = blockSize * this.X_COUNT_BLOCKS;
        this.h = blockSize * this.Y_COUNT_BLOCKS;
        this.xx = this.x + this.w;
        this.yy = this.y + this.h;

        this.canvasElem.style.width = `${this.w}px`;
        this.canvasElem.style.height = `${this.h}px`;
        this.canvasElem.width = this.w;
        this.canvasElem.height = this.h;
        
    }
}

export default _Screen