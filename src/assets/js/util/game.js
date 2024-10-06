// ####### GAME MAPS #######
class _Game {
    constructor(){
        this.FRAME_RATE = 60;
        this.FRAME_INTERVAL = 1000 / this.FRAME_RATE;

        this.level = null;
        this.xMapBlockCount = null;
        this.yMapBlockCount = null;
        this.map = null;
        
        this.maps = [
            [
                [false, false, true, true, false, false, false, false, false, false, false, false], // linha 1
                [true, false, false, true, false, false, false, false, false, false, false, false], // linha 2
                [true, false, true, true, false, false, false, false, false, false, false, false], // linha 3
                [true, false, false, true, false, false, false, false, false, false, false, false], // linha 4
                [true, false, true, true, false, true, false, true, false, true, false, true], // linha 5
                [false, false , true, false, false, false, false, false, false, false, false, false], // linha 6
            ],
            [
                [false, false, false, false, true, true,  false, false, false, true, false, false], // linha 1
                [false, false,  false, false, true, false,  true,  true,  false, false, false, false], // linha 2
                [false, false, false, false, true, false,  false,  true,  true,  true,  true,  false], // linha 3
                [false,  false, false, false, true, false, false, false, false, false, false, false], // linha 4
                [true, false, false,  false,  false,  false,  true,  true,  true,  true,  true,  true], // linha 5
                [false, false , true,  true,  false,  true,  true,  true,  true,  true,  true,  true], // linha 6
            ],
            [
                [true,  true, true, true, true, true,  true], // linha 1
                [true, false,  true, true, false, false,  false], // linha 2
                [false, true, false, true, false, true,  false], // linha 3
                [false, false, false, false, false, false, false], // linha 4
            ],
        ];
    }

    setLevel(level){
        this.level = level;
        this.map = this.maps[this.level-1];
        this.xMapBlockCount = this.map[0].length;
        this.yMapBlockCount = this.map.length;
    }
}

export default _Game