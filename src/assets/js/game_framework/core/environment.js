class _Env {
    constructor() {
        this.landColor = "#2dd4bf";
        this.bgColor = "#a8e6df";
        this.blocks = [];
    }

    create(map, blockSize) {
        map.forEach((row, y) => {
            row.forEach((isLand, x) => {
                let posX = x * blockSize;
                let posXX = posX + blockSize;
                let posY = y * blockSize;
                let posYY = posY + blockSize;
                this.blocks.push({ x: posX, xx: posXX, y: posY, yy: posYY, w: blockSize, h: blockSize, isLand: isLand });
            });
        });
    }
    
    draw(ctx, xScreen, yScreen, xxScreen, yyScreen) {
        this.blocks.forEach((block, key) => {
            // Is block colliding with screen? So print land
            if ((block.xx > xScreen && block.x < xxScreen) &&
                (block.yy > yScreen && block.y < yyScreen)
            ) {
                let blockX = block.x - xScreen;
                let blockY = block.y - yScreen;

                ctx.fillStyle = (block.isLand) ? this.landColor : this.bgColor;
                ctx.fillRect(blockX, blockY, block.w, block.h);
            }
        });
    }
}

export default _Env