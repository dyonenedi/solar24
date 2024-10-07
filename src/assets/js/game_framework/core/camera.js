class _Camera {
    constructor(){
        this.X_COUNT_BLOCKS = 6;
        this.Y_COUNT_BLOCKS = 3;
        this.w = null;
        this.h = null;
        this.BLOCK_SIZE = null;
    }
    
    setup(cameraElem){
        this.w = cameraElem.offsetWidth;
        this.h = cameraElem.offsetHeight;
        this.BLOCK_SIZE = this.w / this.X_COUNT_BLOCKS;
    }

    update(Player, Screen){
        const upperLimitToStartMove = this.BLOCK_SIZE * (this.Y_COUNT_BLOCKS / 2);
        const cameraPosEndY = this.BLOCK_SIZE * (this.Y_COUNT_BLOCKS - Screen.Y_COUNT_BLOCKS);
        var yCharTransformed = Screen.h - Player.y
        if (yCharTransformed >= upperLimitToStartMove) {
            const diff = (upperLimitToStartMove - yCharTransformed);
            if (diff >= cameraPosEndY) {
                Screen.canvasElem.style.bottom = `${diff}px`;
            } else {
                Screen.canvasElem.style.bottom = `${cameraPosEndY}px`;
            }
        } else {
            Screen.canvasElem.style.bottom = `0px`;
        }

        const rightLimitToStartMove = this.BLOCK_SIZE * (this.X_COUNT_BLOCKS / 2);
        const cameraPosEndX = this.BLOCK_SIZE * (this.X_COUNT_BLOCKS - Screen.X_COUNT_BLOCKS);
        if (Player.xx >= rightLimitToStartMove) {
            const diff = (rightLimitToStartMove - Player.xx);
            if (diff >= cameraPosEndX) {
                Screen.canvasElem.style.left = `${diff}px`;
            } else {
                Screen.canvasElem.style.left = `${cameraPosEndX}px`;
            }
        } else {
            Screen.canvasElem.style.left = `0px`;
        }
    }
}

export default _Camera;
