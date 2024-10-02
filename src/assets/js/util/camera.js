class _Camera {
    constructor(Screen, Character){
        this.Screen = Screen;
        this.Character = Character;
    }

    update(){
        const upperLimitToStartMove = (this.Screen.h / 5) * 4;
        const cameraPosIniY = (this.Screen.h / 5) * -2;

        if (this.Character.y <= upperLimitToStartMove) {
            const diff = (cameraPosIniY + (upperLimitToStartMove - this.Character.y));
            if (diff <= 0) {
                this.Screen.canvas.style.top = `${diff}px`;
            } else {
                this.Screen.canvas.style.top = `0px`;
            }
        } else {
            this.Screen.canvas.style.top = `${cameraPosIniY}px`;
        }

        const rightLimitToStartMove = (this.Screen.w / 10) * 3;
        const cameraPosEndX = (this.Screen.w / 10) * -4;

        if (this.Character.xx >= rightLimitToStartMove) {
            const diff = (this.Character.xx - rightLimitToStartMove) * -1;
            if (diff >= cameraPosEndX) {
                this.Screen.canvas.style.left = `${diff}px`;
            } else {
                this.Screen.canvas.style.left = `${cameraPosEndX}px`;
            }
        } else {
            this.Screen.canvas.style.left = `0px`;
        }
    }
}

export default _Camera;
