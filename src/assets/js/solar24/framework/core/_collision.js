class _Collision { 
    getColliding(Obj, Target) {
        let collidedObj = {};
        let upDiff = Target.yy - Obj.y;
        let downDiff = Obj.yy - Target.y;
        let leftDiff = Target.xx - Obj.x;
        let rightDiff = Obj.xx - Target.x;

        let collidedY = this.#checkCollisionY(Obj, Target);
        let collidedX = this.#checkCollisionX(Obj, Target);
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
    getCollidingOut(Obj, Target){
        let collidedObj = {};

        if (Obj.y < Target.y) { // Check Up Collied
            collidedObj.up = (Obj.y - Target.y) * -1;
        }
        if (Obj.yy > Target.h) { // Check Down Collied
            collidedObj.down = (Obj.yy - Target.h);
        }
        if (Obj.x < Target.x) { // Check Left Collied
            collidedObj.left = (Obj.x - Target.x) * -1;
        }
        if (Obj.xx > Target.w) { // Check Right Collied
            collidedObj.right = (Obj.xx - Target.w);
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

    // ##### PRIVATE #####
    #checkCollisionY(Obj, Target){
        return (Obj.y < Target.yy && Obj.yy > Target.y);
    }
    #checkCollisionX(Obj, Target){
        return (Obj.x < Target.xx && Obj.xx > Target.x);
    }
}

export default _Collision