class _Env {
    #DEBUG = false;
    #landColor = "#2dd4bf";
    #bgColor = "#a8e6df";
    #blocks = [];

    create(map, blockSize) {
        let i = 0;
        map.forEach((row, y) => {
            row.forEach((isLand, x) => {
                let posX = x * blockSize;
                let posXX = posX + blockSize;
                let posY = y * blockSize;
                let posYY = posY + blockSize;
                i++;
                this.#blocks.push({ index: i, x: posX, xx: posXX, y: posY, yy: posYY, w: blockSize, h: blockSize, isLand: isLand });
            });
        });
    }
    
    draw(ctx, xScreen, yScreen, xxScreen, yyScreen) {
        this.#blocks.forEach((block) => {
            // Is block colliding with screen? So print land
            if ((block.xx > xScreen && block.x < xxScreen) &&
                (block.yy > yScreen && block.y < yyScreen)
            ) {
                let blockX = block.x - xScreen;
                let blockY = block.y - yScreen;

                ctx.fillStyle = (block.isLand) ? this.#landColor : this.#bgColor;
                ctx.fillRect(blockX, blockY, block.w, block.h);

                if (this.#DEBUG) {
                    // Desenhar o índice no centro do bloco
                    ctx.fillStyle = 'black'; // Cor do texto
                    ctx.font = '20px Arial'; // Fonte do texto
                    ctx.textAlign = 'center'; // Alinhamento horizontal
                    ctx.textBaseline = 'middle'; // Alinhamento vertical
    
                    const textX = blockX + (block.w / 2);
                    const textY = blockY + (block.h / 2);
    
                    ctx.fillText(block.index, textX, textY);
                }
            }
        });
    }

    setDebug(debug){
        this.#DEBUG = debug;
    }

    get blocks(){
        return this.#blocks;
    }
}

export default _Env