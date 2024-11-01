import Dummy from "../framework/core/_dummy";

class Character extends Dummy {
    #FRINCTION = 7;
    #CLICK_JUMP_LIVETIME = 200;

    // PHYSIC
    #frinction;

    //#region SKIN
    #eyeColor;
    #xEyeLeft;
    #xEyeRight;
    #xEye;
    #yEye;
    #sizeEye;
    
    #irisColor;
    #xIrisLeft;
    #xIrisRight;
    #xIris;
    #yIrisUp;
    #yIrisMiddle;
    #yIrisDown;
    #yIris;
    #sizeIris;

    _jumping;
    _jumpClick;
    _direction;
    _isColliding;
    //#endregion

    constructor() {
        super()
    }

    setup(Screen, Blocks, Camera){
        // Faz a transformação das constantes conforme o tamanho da tela.
        this._setup(Screen, Blocks, Camera)
        this.#frinction = (this._maxFallVelocity / this.#FRINCTION)

        //#region SKIN
        this.#eyeColor = "#d7f3f0";
        this.#xEyeLeft = (this._size / 10) * 2;
        this.#xEyeRight = (this._size / 10) * 8;
        this.#xEye = this.#xEyeRight;
        this.#yEye = (this._size / 10) * 4;
        this.#sizeEye = this._size / 5;
        
        this.#irisColor = "#333";
        this.#xIrisLeft = (this._size / 10) * 1;
        this.#xIrisRight = (this._size / 10) * 9;
        this.#xIris = this.#xIrisRight;
        this.#yIrisUp = (this._size / 10) * 3;
        this.#yIrisMiddle = (this._size / 10) * 4;
        this.#yIrisDown = (this._size / 10) * 5;
        this.#yIris = this.#yIrisMiddle;
        this.#sizeIris = this._size / 9;
        //#endregion
    }

    setDebug(debug){
        this._DEBUG = debug;
    }

    //#region GETS & SETS
    get x(){
        return this._x;
    }
    get xx(){
        return this._xx;
    }
    get y(){
        return this._y;
    }
    get yy(){
        return this._yy;
    }
    get gravity(){
        return this._gravity;
    }
    set gravity(value){
        this._gravity = parseFloat(value); 
    }
    get jumping(){
        return this._jumping;
    }
    set jumping(value){
        this._jumping = parseFloat(value); 
    }
    get jumpClick(){
        return this._jumpClick;
    }
    set jumpClick(value){
        this._jumpClick = value; 
    }
    get direction(){
        return this._direction;
    }
    set direction(value){
        this._direction = value; 
    }
    get isColliding(){
        return this._isColliding;
    }
    set isColliding(value){
        this._isColliding = value; 
    }
    //#endregion

    updateFriction(){
        if (this._isColliding['screen'].left || this._isColliding['screen'].right || this._isColliding['block'].left || this._isColliding['block'].right) {
            this._maxFallVelocity = this.#frinction;
        } else {
            this._maxFallVelocity = this._MAX_FALL_VELOCITY;
        }
    }

    resetJumpClick(){
        if (this._jumpClick && (Date.now() - this._jumpClick) > this.#CLICK_JUMP_LIVETIME) {
            this._jumpClick = false
        }
    }

    setSkinDirection(){
        this.#xEye = ((this._direction.left && !this._isColliding.block.left && !this._isColliding.screen.left) || this._isColliding.block.right || this._isColliding.screen.right) ? this.#xEyeLeft : this.#xEyeRight;
        this.#xIris = ((this._direction.left && !this._isColliding.block.left && !this._isColliding.screen.left) || this._isColliding.block.right || this._isColliding.screen.right) ? this.#xIrisLeft : this.#xIrisRight;

        if ((this._isColliding.block.down || this._isColliding.screen.down) && (this._isColliding.block.left || this._isColliding.screen.left || this._isColliding.block.right || this._isColliding.screen.right)) {
            const irisRand = Math.floor(Math.random() * 1000) + 1;
            let changeDirection = (irisRand <= 10);
            this.#yIris = (changeDirection) ? (this.#yIris == this.#yIrisUp ? this.#yIrisMiddle : this.#yIrisUp) : this.#yIris;
        } else if (this._direction.down && (this._isColliding.screen.left || this._isColliding.block.left || this._isColliding.screen.right || this._isColliding.block.right)) {
            this.#yIris =this.#yIrisDown
        } else {
            this.#yIris =this.#yIrisMiddle
        }
    }

    drawSkin(ctx){
          // Desenha Olhos
          ctx.beginPath();
          ctx.arc((this._x + this.#xEye), (this._y + this.#yEye), this.#sizeEye, 0, Math.PI * 2);
          ctx.fillStyle = this.#eyeColor;
          ctx.fill();
          ctx.closePath();
  
          // Desenha Iris
          ctx.beginPath();
          ctx.arc((this._x + this.#xIris), (this._y + this.#yIris), this.#sizeIris, 0, Math.PI * 2);
          ctx.fillStyle = this.#irisColor;
          ctx.fill();
          ctx.closePath();
    }
}

export default Character;
