class _Camera {
    constructor(Screen, Character){
        this.Screen = Screen;
        this.Character = Character;
    }

    update(){
        var botton = (this.Screen.h / 5 * 2);
        var hLimit = (this.Screen.h / 5 * 4);
        if (this.Character.yy < hLimit) {
            let diff = (botton - (hLimit - this.Character.yy)) * -1;
            if (diff <= 0) {
                this.Screen.canvas.style.top = diff+"px";
            }
        }

        var right = (this.Screen.w / 10 * 4);
        var hLimit = (this.Screen.w / 10 * 3);
        if (this.Character.x > hLimit) {
            let diff = (this.Character.x - hLimit);
            if (diff <= right) {
                this.Screen.canvas.style.left = -diff+"px";
            }
        }
    }
}

export default _Camera