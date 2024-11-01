import Collision from "./_collision";

class _Dummy extends Collision {
    // CONST
    _DEBUG = false;
    _SIZE_X_SCREEN = 4;
    _WEIGHT = 21;
    _GRAVITY = 1;
    _MAX_MOVE_VELOCITY = 3;
    _MAX_FALL_VELOCITY = 20;
    _MOVE_STRENGTH = 130;
    _JUMP_STRENGTH = 350;
    _MOVE_ACCELERATION = null;
    _JUMP_ACCELERATION = null;
    _SCREEN_W = 10 * 96;
    _SCREEN_H = 5 * 96;

    // PHYSIC VAR
    _gravity;
    _maxMoveVelocity;
    _maxFallVelocity;
    _moveAcceleration;
    _jumpAcceleration;
    _xVelocity;
    _yVelocity;
    _size;
    _w;
    _h;
    _x;
    _xx;
    _y;
    _yy;

    // PHYSIC SKIN
    _bodyColor;

    // SCREEN
    _Blocks = {};
    _Screen = {};

    constructor(){
        super();
        this._MOVE_ACCELERATION = (this._MOVE_STRENGTH / this._WEIGHT);
        this._JUMP_ACCELERATION = (this._JUMP_STRENGTH / this._WEIGHT);
    }

    _setup(Screen, Blocks, Camera){
        this._Screen = Screen;
        this._Blocks = Blocks;
        this._GRAVITY =  this._GRAVITY * Camera.h /  this._SCREEN_H;
        this._MAX_MOVE_VELOCITY = this._MAX_MOVE_VELOCITY * Camera.w / this._SCREEN_W;
        this._MAX_FALL_VELOCITY = this._MAX_FALL_VELOCITY * Camera.h /  this._SCREEN_H;
        this._MOVE_ACCELERATION = this._MOVE_ACCELERATION * Camera.w / this._SCREEN_W;
        this._JUMP_ACCELERATION = this._JUMP_ACCELERATION * Camera.h /  this._SCREEN_H;

        this._gravity =  this._GRAVITY;
        this._maxMoveVelocity =  this._MAX_MOVE_VELOCITY;
        this._maxFallVelocity =  this._MAX_FALL_VELOCITY;
        this._moveAcceleration =  this._MOVE_ACCELERATION;
        this._jumpAcceleration =  this._JUMP_ACCELERATION;
        this._xVelocity = 0;
        this._yVelocity = 0;

        this._size = this._Screen.blockSize / this._SIZE_X_SCREEN;
        this._w = this._size;
        this._h = this._size;
        this._x = 0;
        this._xx = this._x + this._size;
        this._y = this._Screen.h - this._h;
        this._yy = this._y + this._size;
        
        this._jumping = false;
        this._jumpClick = false;
        this._direction = { left: false, right: true, up: false, down: false };
        this._isColliding = {
            screen: { left: false, right: false, up: false, down: false },
            block: { left: false, right: false, up: false, down: false }
        }
        this._bodyColor = "#333";
    }

    update() {
        // PREPARA DIREÇÃO JUMP E DOUBLE JUMP
        if (this._jumpClick && this._yVelocity == 0 && !this._jumping) {
            this._yVelocity = this._jumpAcceleration;
            this._jumping = true;
            this._jumpClick = false;
        } else if(this._jumpClick && 
            (!this._isColliding['screen'].down && !this._isColliding['block'].down) && 
            (!this._isColliding['screen'].up && !this._isColliding['block'].up) && 
            (this._isColliding['screen'].left || this._isColliding['block'].left || this._isColliding['screen'].right || this._isColliding['block'].right)){
            if (this._direction.right){
                this._direction.right = false;
                this._direction.left = true;
            } else if(this._direction.left) {
                this._direction.left = false;
                this._direction.right = true;
            }

            this.#resetAxiVelocityValue('y');
            this._yVelocity = this._jumpAcceleration;
            this._jumping = true;
            this._jumpClick = false;
        }

        // MOVE NAS DIREÇOES
        if (this._jumping && this._yVelocity > 0) {
            this.#jump();
        } else {
            this.#fall();
        }
        if (this._direction.left) {
            this.#moveLeft();
            
        } else if (this._direction.right) {
            this.#moveRight();
        }

        this.#resetIsColliding();

        // Valido colisão SCREEN retornando posição máxima permitida
        this.getCollidingOut(this, this._Screen);

        // Valido colisão BLOKCS retornando posição máxima permitida
        this._Blocks.forEach(Target => {
            if (Target.isLand){
               // Clona Blocks usando a função de clonagem profunda
                let Block = {... Target};

                // Certifique-se de que this.xScreen e this.yScreen são válidos
                const xScreen = this.xScreen || 0;
                const yScreen = this.yScreen || 0;
                
               // Transforma Env.Ground.blonk do x e y para screen
                Block.x = Block.x - xScreen;
                Block.xx = Block.x + Block.w;
                Block.y = Block.y - yScreen;
                Block.yy = Block.y + Block.h;

                // Valida Colisão
                this.getColliding(this, Block);
            }
        })
        
        this.#debug();
    }

    draw(ctx) {
        // Desenha o Corpo
        ctx.fillStyle = this._bodyColor;
        ctx.fillRect(this._x, this._y, this._w, this._h);
    }

    onCollisionRevert(CollisionDirection) {
        if (CollisionDirection.up) {
            this._y += CollisionDirection.up;
            this._yy = this._y + this._size;
            this.#resetAxiVelocityValue('y');
        }

        if (CollisionDirection.down) {
            this._yy -= CollisionDirection.down;
            this._y = this._yy - this._size;
            this.#resetAxiVelocityValue('y');
        }

        if (CollisionDirection.left) {
            this._x += CollisionDirection.left;
            this._xx = this._x + this._size;
            this.#resetAxiVelocityValue('x');
        }

        if (CollisionDirection.right) {
            this._xx -= CollisionDirection.right;
            this._x = this._xx - this._size;
            this.#resetAxiVelocityValue('x');
        }
    }

    #debug(){
        if (this._DEBUG) {
            let consoleStr = "| CHARACTER |\n";
            Object.keys(this._direction).forEach((prop) =>{
                if (this._direction[prop] === true) {consoleStr += "Direction: " + prop + "\n";}
            })

            Object.keys(this._isColliding.screen).forEach((prop) =>{
                if (this._isColliding.screen[prop] === true) {consoleStr += "isColliding Screen: " + prop + "\n";}
            })

            Object.keys(this._isColliding.block).forEach((prop) =>{
                if (this._isColliding.block[prop] === true) {consoleStr += "isColliding Block: " + prop + "\n";}
            })

            console.log(consoleStr);
        }
    }

    // ##### PRIVATE #####
    #moveLeft() {
        this._xVelocity += (this._xVelocity >= this._maxMoveVelocity) ? 0 : this._moveAcceleration;
        this._x += Math.floor(this._xVelocity) * -1;
        this._xx = this._x + this._size;
    }
    #moveRight() {
        this._xVelocity += (this._xVelocity >= this._maxMoveVelocity) ? 0 : this._moveAcceleration;
        this._x += Math.floor(this._xVelocity);
        this._xx = this._x + this._size;
    }
    #jump() {
        this._direction.down = false;
        this._direction.up = true;

        this._yVelocity -= this._gravity;
        this._yVelocity = (this._yVelocity <= 0) ? 0 : this._yVelocity;
        this._y += Math.floor(this._yVelocity) * -1;
        this._yy = this._y + this._size;
    }
    #fall() {
        this._jumping = false;
        this._direction.up = false;
        this._direction.down = true;

        this._yVelocity += this._gravity;
        this._yVelocity = (this._yVelocity >= this._maxFallVelocity) ? this._maxFallVelocity : this._yVelocity;
        this._y += Math.floor(this._yVelocity);
        this._yy = this._y + this._size;
    }
    
    #resetAxiVelocityValue(axi) {
        if (axi == "x") {
            this._xVelocity = 0;
        } else {
            this._yVelocity = 0;
        }
    }
   
    #resetIsColliding(){
        this._isColliding = {
            screen: { left: false, right: false, up: false, down: false },
            block: { left: false, right: false, up: false, down: false }
        };
    }
}

export default _Dummy