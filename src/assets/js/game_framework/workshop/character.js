import _Dummy from "../core/dummy";
import _CollisionDetector from '../core/collisionDetector';

class _Character extends _Dummy {
    constructor() {
        super();
        
        this.SIZE_X_SCREEN = 4;
        this.WEIGHT = 21;
        this.GRAVITY = 1;
        this.MAX_MOVE_VELOCITY = 2;
        this.MAX_FALL_VELOCITY = 20;
        this.FRINCTION = 7;
        this.MOVE_STRENGTH = 120;
        this.JUMP_STRENGTH = 335;
        this.MOVE_ACCELERATION = (this.MOVE_STRENGTH / this.WEIGHT);
        this.JUMP_ACCELERATION = (this.JUMP_STRENGTH / this.WEIGHT);
        this.SCREEN_W = 10 * 96;
        this.SCREEN_H = 5 * 96;
        this.CLICK_JUMP_LIVETIME = 200;
    }

    setup(wCamera, hCamera, blockSize, hScreen, canvasElem, Rumtime){
        // Faz a transformação das constantes conforme o tamanho da tela.
        this.weight = this.WEIGHT * hCamera /  this.SCREEN_H;
        this.gravity =  this.GRAVITY * hCamera /  this.SCREEN_H;
        this.maxMoveVelocity = this.MAX_MOVE_VELOCITY * wCamera / this.SCREEN_W;
        this.maxFallVelocity = this.MAX_FALL_VELOCITY * hCamera /  this.SCREEN_H;
        this.frinction = (this.maxFallVelocity / this.FRINCTION)
        this.moveStrength = this.MOVE_STRENGTH * wCamera / this.SCREEN_W;
        this.jumpStrength = this.JUMP_STRENGTH * hCamera /  this.SCREEN_H;
        this.moveAcceleration = this.MOVE_ACCELERATION * wCamera / this.SCREEN_W;
        this.jumpAcceleration = this.JUMP_ACCELERATION * hCamera /  this.SCREEN_H;

        this.xVelocity = 0;
        this.yVelocity = 0;

        this.bodyColor = "#333";
        this.size = blockSize / this.SIZE_X_SCREEN;
        this.w = this.size;
        this.h = this.size;
        this.x = 0;
        this.xx = this.x + this.size;
        this.y = hScreen - this.h;
        this.yy = this.y + this.size;

        // SKIN
        this.eyeColor = "#d7f3f0";
        this.xEyeLeft = (this.size / 10) * 2;
        this.xEyeRight = (this.size / 10) * 8;
        this.xEye = this.xEyeRight;
        this.yEye = (this.size / 10) * 4;
        this.sizeEye = this.size / 5;
        
        this.irisColor = "#333";
        this.xIrisLeft = (this.size / 10) * 1;
        this.xIrisRight = (this.size / 10) * 9;
        this.xIris = this.xIrisRight;
        this.yIrisUp = (this.size / 10) * 3;
        this.yIrisMiddle = (this.size / 10) * 4;
        this.yIrisDown = (this.size / 10) * 5;
        this.yIris = this.yIrisMiddle;
        this.sizeIris = this.size / 9;

        this.jumping = false;
        this.jumpClick = false;
        this.direction = { left: false, right: true, up: false, down: false };
        this.isColliding = {
            screen: { left: false, right: false, up: false, down: false },
            block: { left: false, right: false, up: false, down: false }
        };

        canvasElem.addEventListener('mousedown', this.#handleClickDown.bind(this, Rumtime));
        canvasElem.addEventListener('touchstart', this.#handleClickDown.bind(this, Rumtime));
    }

    update(CollisionDetector, blocks) {
        // RESETA TIME JUMP_CLICK
        this.#resetJumpClick();

        // PREPARA DIREÇÃO JUMP E DOUBLE JUMP
        if (this.jumpClick && this.yVelocity == 0 && !this.jumping) {
            this.yVelocity = this.jumpAcceleration;
            this.jumping = true;
            this.jumpClick = false;
        } else if(this.jumpClick && 
            (!this.isColliding['screen'].down && !this.isColliding['block'].down) && 
            (!this.isColliding['screen'].up && !this.isColliding['block'].up) && 
            (this.isColliding['screen'].left || this.isColliding['block'].left || this.isColliding['screen'].right || this.isColliding['block'].right)){
            if (this.direction.right){
                this.direction.right = false;
                this.direction.left = true;
            } else if(this.direction.left) {
                this.direction.left = false;
                this.direction.right = true;
            }

            this.#resetAxiVelocityValue('y');
            this.yVelocity = this.jumpAcceleration;
            this.jumping = true;
            this.jumpClick = false;
        }

        // MOVE NAS DIREÇOES
        if (this.jumping && this.yVelocity > 0) {
            this.#jump();
        } else {
            this.#fall();
        }
        if (this.direction.left) {
            this.#moveLeft();
            
        } else if (this.direction.right) {
            this.#moveRight();
            
        }

        this.#resetIsColliding();

        // Valido colisão SCREEN retornando posição máxima permitida
        CollisionDetector.checkScreenColliding(this);

        // Valido colisão BLOKCS retornando posição máxima permitida
        CollisionDetector.checkBlockCollision(this, blocks);

        this.#setSkinDirection()

    }

    draw(ctx) {
        // Desenha o Corpo
        ctx.fillStyle = this.bodyColor;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        // Desenha Olhos
        ctx.beginPath();
        ctx.arc((this.x + this.xEye), (this.y + this.yEye), this.sizeEye, 0, Math.PI * 2);
        ctx.fillStyle = this.eyeColor;
        ctx.fill();
        ctx.closePath();

        // Desenha Iris
        ctx.beginPath();
        ctx.arc((this.x + this.xIris), (this.y + this.yIris), this.sizeIris, 0, Math.PI * 2);
        ctx.fillStyle = this.irisColor;
        ctx.fill();
        ctx.closePath();
    }

    onCollisionRevert(CollisionDirection) {
        if (CollisionDirection.up) {
            this.y += CollisionDirection.up;
            this.yy = this.y + this.size;
            this.#resetAxiVelocityValue('y');
        }

        if (CollisionDirection.down) {
            this.yy -= CollisionDirection.down;
            this.y = this.yy - this.size;
            this.#resetAxiVelocityValue('y');
        }

        if (CollisionDirection.left) {
            this.x += CollisionDirection.left;
            this.xx = this.x + this.size;
            this.#resetAxiVelocityValue('x');
        }

        if (CollisionDirection.right) {
            this.xx -= CollisionDirection.right;
            this.x = this.xx - this.size;
            this.#resetAxiVelocityValue('x');
        }
    }

    // ##### PRIVATE #####
    #moveLeft() {
        this.xVelocity += (this.xVelocity >= this.maxMoveVelocity) ? 0 : this.moveAcceleration;
        this.x += this.xVelocity * -1;
        this.xx = this.x + this.size;
    }
    #moveRight() {
        this.xVelocity += (this.xVelocity >= this.maxMoveVelocity) ? 0 : this.moveAcceleration;
        this.x += this.xVelocity;
        this.xx = this.x + this.size;
    }
    #jump() {
        this.direction.down = false;
        this.direction.up = true;

        this.yVelocity -= this.gravity;
        this.yVelocity = (this.yVelocity <= 0) ? 0 : this.yVelocity;
        this.y += this.yVelocity * -1;
        this.yy = this.y + this.size;
    }
    #fall() {
        this.jumping = false;
        this.direction.up = false;
        this.direction.down = true;

        let maxVelocity = (this.isColliding['screen'].left || this.isColliding['screen'].right || this.isColliding['block'].left || this.isColliding['block'].right) ? (this.frinction) : this.maxFallVelocity;
        this.yVelocity += this.gravity;
        this.yVelocity = (this.yVelocity >= maxVelocity) ? maxVelocity : this.yVelocity;
        this.y += this.yVelocity;
        this.yy = this.y + this.size;
    }
    #setSkinDirection(){
        this.xEye = ((this.direction.left && !this.isColliding.block.left && !this.isColliding.screen.left) || this.isColliding.block.right || this.isColliding.screen.right) ? this.xEyeLeft : this.xEyeRight;
        this.xIris = ((this.direction.left && !this.isColliding.block.left && !this.isColliding.screen.left) || this.isColliding.block.right || this.isColliding.screen.right) ? this.xIrisLeft : this.xIrisRight;

        if ((this.isColliding.block.down || this.isColliding.screen.down) && (this.isColliding.block.left || this.isColliding.screen.left || this.isColliding.block.right || this.isColliding.screen.right)) {
            const irisRand = Math.floor(Math.random() * 1000) + 1;
            let changeDirection = (irisRand <= 10);
            this.yIris = (changeDirection) ? (this.yIris == this.yIrisUp ? this.yIrisMiddle : this.yIrisUp) : this.yIris;
        } else if (this.direction.down && (this.isColliding.screen.left || this.isColliding.block.left || this.isColliding.screen.right || this.isColliding.block.right)) {
            this.yIris =this.yIrisDown
        } else {
            this.yIris =this.yIrisMiddle
        }
    }
    #resetAxiVelocityValue(axi) {
        if (axi == "x") {
            this.xVelocity = 0;
        } else {
            this.yVelocity = 0;
        }
    }
    #resetJumpClick(){
        if (this.jumpClick && (Date.now() - this.jumpClick) > this.CLICK_JUMP_LIVETIME) {
            this.jumpClick = false
        }
    }
    #resetIsColliding(){
        this.isColliding = {
            screen: { left: false, right: false, up: false, down: false },
            block: { left: false, right: false, up: false, down: false }
        };
    }
    #handleClickDown(Rumtime) {
        if (Rumtime.isStared && !Rumtime.isPaused) {
            this.jumpClick = Date.now();
        }
    }
}

export default _Character;
