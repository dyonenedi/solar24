class _CollisionDetector {
    constructor(Environment){
        this.Env = Environment;
        this.Blocks = this.Env.Ground.blocks;
        this.collided = {};
        this.#resetCollided();
        this.MIN_VAL = 1;
    }

    checkCollisionEnv(Obj, checkScreenCollisions = true, checkLandColision = true) {
        // Verificar colisões com as bordas da tela
        if (checkScreenCollisions) {
            this.#checkScreenColliding(Obj);
        }

        // Verificar colisões com blocos
        if (checkLandColision) {
            this.#checkTargetsCollision(Obj)
        }

        // Retorna collied e reseta this.collied
        let collided = this.collided;
        this.#resetCollided();
        return collided;
    }
    
    #checkScreenColliding(Obj){
        if (Obj.x < 0) { // Chewck Left Collied
            this.collided.left = Obj.x*-1;
        }
        if (Obj.xx > this.Env.Screen.w) { // Chewck Right Collied
            this.collided.right = Obj.xx - this.Env.Screen.w;
        }
        if (Obj.y < 0) { // Chewck Up Collied
            this.collided.up = Obj.y * -1;
        }
        if (Obj.yy > this.Env.Screen.h) { // Chewck Down Collied
            this.collided.down = Obj.yy - this.Env.Screen.h;
        }
    }

    #checkTargetsCollision(Obj){        
        this.Blocks.forEach(Target => {
            if (Target.land){
                // Clona Blocks
                let Block = {... Target};
                
                // Trasforma Env.Ground.blonk do x e y pra screen.
                Block.x = Block.x - this.Env.Screen.x;
                Block.y = Block.y - this.Env.Screen.y;
                // Valida Colisão
                this.#checkTargetColliding(Obj, Block);
            }
        })
    }

    #checkTargetColliding(Obj, Block) {
        var leftDiff = Block.x + Block.w - Obj.x + this.MIN_VAL;
        var rightDiff = Obj.x + Obj.w - Block.x + this.MIN_VAL;
        var upDiff = Block.y + Block.h - Obj.y + this.MIN_VAL;
        var downDiff = Obj.y + Obj.h - Block.y + this.MIN_VAL;
        var directions = {};

        if (Obj.direction.up && !this.collided.up && this.#checkCollisionUp(Obj, Block) && (this.#checkCollisionLeft(Obj, Block) || this.#checkCollisionRight(Obj, Block))) {
            if (Obj.direction.left){
                this.collided.left = this.#getFirstIdMinor(leftDiff, upDiff);
                this.collided.up = this.#getFirstIdMinor(upDiff, leftDiff);
            } else if (Obj.direction.right){
                this.collided.right = this.#getFirstIdMinor(rightDiff, upDiff);
                this.collided.up = this.#getFirstIdMinor(upDiff, rightDiff);
            } else {
                this.collided.up = upDiff;
            }

            var directions = {up: this.collided.up, left: this.collided.left, right: this.collided.right};
        } else if (Obj.direction.down && !this.collided.down && this.#checkCollisionDown(Obj, Block) && (this.#checkCollisionLeft(Obj, Block) || this.#checkCollisionRight(Obj, Block))){
            if (Obj.direction.left){
                this.collided.left = this.#getFirstIdMinor(leftDiff, downDiff);
                this.collided.down = this.#getFirstIdMinor(downDiff, leftDiff);
            } else if (Obj.direction.right){
                this.collided.right = this.#getFirstIdMinor(rightDiff, downDiff);
                this.collided.down = this.#getFirstIdMinor(downDiff, rightDiff);
            } else {
                this.collided.down = downDiff;
                console.log(Obj.yy);
            }

            var directions = {down: this.collided.down, left: this.collided.left, right: this.collided.right};
        } else if(Obj.direction.left && !this.collided.left && this.#checkCollisionLeft(Obj, Block) && (this.#checkCollisionUp(Obj, Block) || this.#checkCollisionDown(Obj, Block))){
            this.collided.left = leftDiff;
            var directions = {left: this.collided.left};
        } else if (Obj.direction.right && !this.collided.right && this.#checkCollisionRight(Obj, Block) && (this.#checkCollisionUp(Obj, Block) || this.#checkCollisionDown(Obj, Block))){
            this.collided.right = rightDiff;
            var directions = {right: this.collided.right};
        }

        if (Object.entries(directions).some(([key, value]) => value)) {
            console.log(Obj, Block, directions);
        }
    }

    #getFirstIdMinor(diff1, diff2){
        return (diff1 <= diff2) ? diff1 : false;
    }

    #checkCollisionLeft(Obj, Target){
        return (Obj.x <= Target.x + Target.w && Obj.x >= Target.x);
    }
    #checkCollisionRight(Obj, Target){
        return (Obj.x + Obj.w >= Target.x && Obj.x + Obj.w <= Target.x + Target.w);
    }
    #checkCollisionUp(Obj, Target){
        return (Obj.y <= Target.y + Target.h && Obj.y >= Target.y);
    }
    #checkCollisionDown(Obj, Target){
        return (Obj.y + Obj.h >= Target.y && Obj.y + Obj.h <= Target.y + Target.h);
    }

    #resetCollided(){
        this.collided = {
            left: false,
            right: false,
            up: false,
            down: false
        }
    }
}

export default _CollisionDetector;
