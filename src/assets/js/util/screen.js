class _Screen {
    constructor(w, h){
        this.X_COUNT_BLOCKS = _SCREEN_BLOCKS_X;
        this.Y_COUNT_BLOCKS = _SCREEN_BLOCKS_Y;
        this.w = w;
        this.h = h;
        this.x = 0;
        this.y = 0;
        this.xx = 0;
        this.yy = 0;
        this.bkockSize = this.w / this.X_COUNT_BLOCKS;
        this.#setScreenIni();
    }

    #setScreenIni(){
        this.x = 0;
        this.xx = this.x + this.w;
        this.y = this.bkockSize * (_LEVEL_BLOKS_Y - this.Y_COUNT_BLOCKS);
        this.yy = this.y + this.h;
    }
}

export default _Screen