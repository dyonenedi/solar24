class _Map {
    constructor(){
        this.xBlockCount = null;
        this.yBlockCount = null;
        this.blocks = [];
        
        this.maps = [
            [
                [true, false, false, true, false, false, false, false, false, false, false, false], // linha 1
                [true, false, false, true, false, false, false, false, false, false, false, false], // linha 2
                [true, false, false, true, false, false, false, false, false, false, false, false], // linha 3
                [false, false, false, true, false, false, false, false, false, false, false, false], // linha 4
                [true, true,  false, true, true, true, false, true, false, true, false, true], // linha 5
                [false, false, false, true, true, false, false, false, false, false, false, false], // linha 6
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

    setup(level){
        this.blocks = this.maps[level-1];
        this.xBlockCount = this.blocks[0].length;
        this.yBlockCount = this.blocks.length;
    }
}

export default _Map