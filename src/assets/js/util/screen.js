class _Screen {
    constructor(Game, Camera, canvasElem){
        this.Game = Game;
        this.Camera = Camera;
        this.canvasElem = canvasElem;
        this.X_COUNT_BLOCKS = this.Game.xMapBlockCount;
        this.Y_COUNT_BLOCKS = this.Game.yMapBlockCount;
        this.w = null;
        this.h = null;
        this.x = 0;
        this.y = 0;
        this.xx = 0;
        this.yy = 0;

        this.#setScreenSize();
    }

    #setScreenSize(){
        // Transforma Screen com base no tamanho da camera
        this.w = this.Camera.BLOCK_SIZE * this.X_COUNT_BLOCKS;
        this.h = this.Camera.BLOCK_SIZE * this.Y_COUNT_BLOCKS;
        this.xx = this.x + this.w;
        this.yy = this.y + this.h;

        this.canvasElem.style.width = `${this.w}px`;
        this.canvasElem.style.height = `${this.h}px`;
        this.canvasElem.width = this.w;
        this.canvasElem.height = this.h;
        
    }
}

export default _Screen