class _Env {
    constructor(Screen) {
        this.Screen = Screen;
        this.Ground = {};
        this.Ground.landColor = "#2dd4bf";
        this.Ground.bgColor = "#a8e6df";
        this.Ground.w = this.Screen.Camera.BLOCK_SIZE;
        this.Ground.h = this.Screen.Camera.BLOCK_SIZE;
        this.Ground.blocks = [];

        this.#createBlocks();
    }

    draw(ctx) {
        this.Ground.blocks.forEach((block, key) => {
            // Is block colliding with screen? So print land
            if ((block.xx > this.Screen.x && block.x < this.Screen.xx) &&
                (block.yy > this.Screen.y && block.y < this.Screen.yy)
            ) {
                let blockX = block.x - this.Screen.x;
                let blockY = block.y - this.Screen.y;

                ctx.fillStyle = (block.isLand) ? this.Ground.landColor : this.Ground.bgColor;
                ctx.fillRect(blockX, blockY, block.w, block.h);
            }
        });
    }

    #createBlocks() {
        this.Screen.Game.map.forEach((row, y) => {
            row.forEach((isLand, x) => {
                let posX = x * this.Ground.w;
                let posY = y * this.Ground.h;
                this.Ground.blocks.push({ x: posX, xx: (posX + this.Ground.w), y: posY, yy: (posY + this.Ground.h), w: this.Ground.w, h: this.Ground.h, isLand: isLand });
            });
        });
    }
}

export default _Env