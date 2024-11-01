export default class Camera {
    #DEBUG = false;
    #X_COUNT_BLOCKS = 6;
    #Y_COUNT_BLOCKS = 3;
    #w = null;
    #h = null;
    #BLOCK_SIZE = null;
    
    setSize(cameraElementId){
        const cameraElem = document.getElementById(cameraElementId);
        if (cameraElem instanceof HTMLDivElement) {
            this.#w = cameraElem.offsetWidth;
            this.#h = cameraElem.offsetHeight;
            this.#BLOCK_SIZE = this.#w / this.#X_COUNT_BLOCKS;
        } else {
            throw new Error("Parameter cameraElementId must be a HTMLDivElement")
        }
    }

    update(Player, Screen){
        const upperLimitToStartMove = this.#BLOCK_SIZE * (this.#Y_COUNT_BLOCKS / 2);
        const cameraPosEndY = this.#BLOCK_SIZE * (this.#Y_COUNT_BLOCKS - Screen.Y_COUNT_BLOCKS);
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

        const rightLimitToStartMove = this.#BLOCK_SIZE * (this.#X_COUNT_BLOCKS / 2);
        const cameraPosEndX = this.#BLOCK_SIZE * (this.#X_COUNT_BLOCKS - Screen.X_COUNT_BLOCKS);
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

        if (this.#DEBUG) {
            console.log("| CAMERA X |\nStart move UP: "+upperLimitToStartMove+"\n"+"Mouse Y pos: "+yCharTransformed+"\n"+"Stop move up: "+cameraPosEndY);
            console.log("| CAMERA Y |\nStart move RIGHT: "+rightLimitToStartMove+"\n"+"Mouse XX pos: "+Player.xx+"\n"+"Stop move right: "+cameraPosEndX);
        }
    }

    setDebug(debug){
        this.#DEBUG = debug;
    }

    //#region GETS & SETS
    get BLOCK_SIZE(){
        return this.#BLOCK_SIZE;
    }
    get w(){
        return this.#w;
    }
    get h(){
        return this.#h;
    }
    get xCountBlocks(){
        return this.#X_COUNT_BLOCKS;
    }
    get yCountBlocks(){
        return this.#Y_COUNT_BLOCKS;
    }
    //#endregion
}
