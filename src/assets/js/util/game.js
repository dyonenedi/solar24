// ####### GAME MAPS #######
class _Game {
    constructor(){
        this.FRAME_RATE = 60;
        this.FRAME_INTERVAL = 1000 / this.FRAME_RATE;

        this.isStarted = false;
        this.isPaused = false;
        this.level = null;
        this.xMapBlockCount = null;
        this.yMapBlockCount = null;
        this.map = null;
        
        this.maps = [
            [
                [false, false, false, false, false, false, false, false, false, false, false, false], // linha 1
                [false, false, false, false, false, false, false, false, false, false, false, false], // linha 2
                [false, false, false, false, false, false, false, false, false, false, false, false], // linha 3
                [false, false, false, false, false, false, false, false, false, false, false, false], // linha 4
                [false, false, false, false, false, false, false, false, false, false, false, false], // linha 5
                [false, true , false, false, false, false, false, false, false, false, false, false], // linha 6
            ],
            [
                [false, false, false, false, false, true,  false, false, false, false, false, false], // linha 1
                [false, true,  false, false, false, true,  true,  true,  false, false, false, false], // linha 2
                [false, false, false, false, false, true,  true,  true,  true,  true,  true,  false], // linha 3
                [true,  false, false, false, false, false, false, false, false, false, false, false], // linha 4
                [false, false, true,  true,  true,  true,  true,  true,  true,  true,  true,  true], // linha 5
                [false, true , true,  true,  true,  true,  true,  true,  true,  true,  true,  true], // linha 6
            ],
        ];
    }

    setLevel(level){
        this.level = 1;
        this.map = this.maps[this.level-1];
        this.xMapBlockCount = this.map[0].length;
        this.yMapBlockCount = this.map.length;
    }
}

export default _Game