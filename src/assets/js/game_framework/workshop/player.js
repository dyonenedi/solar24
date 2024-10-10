
export default class _Player{
    #level = 1;

    setLevel(level){
        this.#level = parseInt(level);
    }
    
    //#region GETs & SETs
    get level(){
        return this.#level;
    }
    set level(value){
        this.#level = parseInt(value);
    }
    //#endregion
}