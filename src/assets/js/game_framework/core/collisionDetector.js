class _CollisionDetector { 
    #DEBUG = false;

    setup(wScreen, hScreen, xScreen, yScreen){
        this.wScreen = wScreen;
        this.hScreen = hScreen;
        this.xScreen = xScreen;
        this.yScreen = yScreen;
    }

    checkScreenColliding(Obj){
        let collidedObj = {};

        if (Obj.y < 0) { // Check Up Collied
            collidedObj.up = Obj.y * -1;
        }
        if (Obj.yy > this.hScreen) { // Check Down Collied
            collidedObj.down = Obj.yy - this.hScreen;
        }
        if (Obj.x < 0) { // Check Left Collied
            collidedObj.left = Obj.x * -1;
        }
        if (Obj.xx > this.wScreen) { // Check Right Collied
            collidedObj.right = Obj.xx - this.wScreen;
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

    checkBlockCollision(Obj, blocks) {
        blocks.forEach(Target => {
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
                this.#getBlockColliding(Obj, Block);
            }
        })
    }

    setDebug(debug){
        this.#DEBUG = debug;
    }

    // ##### PRIVATE #####
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
                        // console.log(`Collided: ${Block.index} | ${leftDiff} - ${downDiff} ${minDiff}`)
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
        // console.log(`${Obj.x} < ${Target.xx}`)
        return (Obj.x < Target.xx && Obj.xx > Target.x);
    }
}

export default _CollisionDetector;
