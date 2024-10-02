class _Env {
    constructor(Screen){
        this.Screen = Screen;
        this.blockSize = this.Screen.bkockSize
        this.w = _LEVEL_BLOKS_X * this.Screen.bkockSize;
        this.h = _LEVEL_BLOKS_Y * this.Screen.bkockSize;

        this.Ground = {};
        this.#groundSetup();
    }

    // Ground write/read scenario from: LEFT to RIGHT, from: TOP to BOT.
    #groundSetup(){
        this.Ground.landColor = "#2dd4bf";
        this.Ground.bgColor = "#a8e6df";
        this.Ground.setup = [ 
            [true, true, true, false, false, false, true, true, false, false], // linha 1
            [true, true, false, false, false, false, true, false, false, false], // linha 2
            [true, true, false, false, true, false, false, false, false, false], // linha 3
            [false, false, false, true, true, true, false, false, false, false], // linha 4
            [false, false, true, true, true, false, false, false, false, false], // linha 5
        ];

        this.Ground.w = this.blockSize;
        this.Ground.h = this.blockSize;

        this.Ground.blocks = [];
        this.#groundSetBlocks();
    }

    #groundSetBlocks(){
        this.Ground.setup.forEach((row, y) => {
            row.forEach((land, x) => {
                let posX = x * this.Ground.w;
                let posY = y * this.Ground.h;
                this.Ground.blocks.push({x: posX, xx: (posX+this.Ground.w), y: posY, yy: (posY+this.Ground.h), w: this.Ground.w, h: this.Ground.h, land: land});
            });
        });
    }

    draw(ctx){
        this.Ground.blocks.forEach((block, key) => {
            // Is block colliding with screen? So print land
            if ((block.xx > this.Screen.x && block.x < this.Screen.xx) &&
                (block.yy > this.Screen.y && block.y < this.Screen.yy)  
            ) {
                let blockX = block.x - this.Screen.x;
                let blockY = block.y - this.Screen.y;

                ctx.fillStyle = (block.land) ? this.Ground.landColor : this.Ground.bgColor;
                ctx.fillRect(blockX, blockY, block.w, block.h);
            }
        });
    }
}

export default _Env