class _CollisionDetector {
    constructor(Env){
        this.Env = Env;
    }

    checkScreenColliding(Obj){
        let collidedObj = {};

        if (Obj.y < 0) { // Check Up Collied
            collidedObj.up = Obj.y * -1;
        }
        if (Obj.yy > this.Env.Screen.h) { // Check Down Collied
            collidedObj.down = Obj.yy - this.Env.Screen.h;
        }
        if (Obj.x < 0) { // Check Left Collied
            collidedObj.left = Obj.x * -1;
        }
        if (Obj.xx > this.Env.Screen.w) { // Check Right Collied
            collidedObj.right = Obj.xx - this.Env.Screen.w;
        }
       
        let isColliding = false;
        Object.keys(collidedObj).forEach((key, value) => {
            Obj.isColliding['screen'][key] = true;
            isColliding = true;
        })

        if (isColliding) {
            Obj.onCollisionRevert(collidedObj);
        }
    }

    checkBlockCollision(Obj) {
        this.Env.Ground.blocks.forEach(Target => {
            if (Target.isLand){
                // Clona Blocks
                let Block = {... Target};
                
                // Trasforma Env.Ground.blonk do x e y pra screen.
                Block.x = Block.x - this.Env.Screen.x;
                Block.xx = Block.x + Block.w;
                Block.y = Block.y - this.Env.Screen.y;
                Block.yy = Block.y + Block.h;

                // Valida Colisão
                this.#getBlockColliding(Obj, Block);
            }
        })
    }

    #getBlockColliding(Obj, Block) {
        let collidedObj = {};
        let upDiff = Block.yy - Obj.y;
        let downDiff = Obj.yy - Block.y;
        let leftDiff = Block.xx - Obj.x;
        let rightDiff = Obj.xx - Block.x;

        let collidedY = this.#checkCollisionY(Obj, Block);
        let collidedX = this.#checkCollisionX(Obj, Block);
        if (collidedY && collidedX) {
            const countDirection = Object.keys(Obj.direction).reduce((count, key) => Obj.direction[key] ? count + 1 : count, 0);
            let minDiff = Math.min(upDiff, downDiff, leftDiff, rightDiff);
            if (Obj.direction.up) {
                if (countDirection == 1) {
                    collidedObj.up = upDiff;
                } else {
                    if (upDiff == minDiff) {
                        collidedObj.up = minDiff;
                    }
                    if (Obj.direction.left && leftDiff == minDiff) {
                        collidedObj.left = minDiff;
                    } 
                    if (Obj.direction.right && rightDiff == minDiff) {
                        collidedObj.right = minDiff;
                    }
                }
            } else if(Obj.direction.down) {
                if (countDirection == 1) {
                    collidedObj.down = downDiff;
                    // console.log(`down 1 -> ${downDiff}`)
                } else {
                    if (downDiff == minDiff) {
                        collidedObj.down = minDiff;
                        // console.log(`down 2 -> ${minDiff}`)
                    }
                    if (Obj.direction.left && leftDiff == minDiff) {
                        collidedObj.left = minDiff;
                        // console.log(`down 3 -> ${minDiff}`)
                    } 
                    if (Obj.direction.right && rightDiff == minDiff) {
                        collidedObj.right = minDiff;
                        // console.log(`down 4 -> ${minDiff}`)
                    }
                }
            } else if (Obj.direction.left){
                collidedObj.left = leftDiff;
            } else if (Obj.direction.right) {
                collidedObj.right = rightDiff;
            } else {
                console.error('Uma colisção sem direção aconteceu');
            }
        }

        let isColliding = false;
        Object.keys(collidedObj).forEach((key, value) => {
            Obj.isColliding['block'][key] = true;
            isColliding = true;
        })

        if (isColliding) {
            Obj.onCollisionRevert(collidedObj);
        }
    }

    #checkCollisionY(Obj, Target){
        return (Obj.y < Target.yy && Obj.yy > Target.y);
    }
    #checkCollisionX(Obj, Target){
        return (Obj.x < Target.xx && Obj.xx > Target.x);
    }
}

export default _CollisionDetector;
