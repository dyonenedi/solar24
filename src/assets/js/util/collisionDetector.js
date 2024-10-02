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
            this.collided.left = Obj.x * -1;
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
        let leftDiff = Block.x + Block.w - Obj.x + this.MIN_VAL;
        let rightDiff = Obj.x + Obj.w - Block.x + this.MIN_VAL;
        let upDiff = Block.y + Block.h - Obj.y + this.MIN_VAL;
        let downDiff = Obj.y + Obj.h - Block.y + this.MIN_VAL;

        let minDiff = Math.min(leftDiff, rightDiff, upDiff, downDiff);

        if (Obj.direction.up && this.#checkCollisionUp(Obj, Block) && minDiff === upDiff) {
            this.collided.up = upDiff;
        } else if (Obj.direction.down && this.#checkCollisionDown(Obj, Block) && minDiff === downDiff) {
            this.collided.down = downDiff;
        } else if (Obj.direction.left && this.#checkCollisionLeft(Obj, Block) && minDiff === leftDiff) {
            this.collided.left = leftDiff;
        } else if (Obj.direction.right && this.#checkCollisionRight(Obj, Block) && minDiff === rightDiff) {
            this.collided.right = rightDiff;
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
