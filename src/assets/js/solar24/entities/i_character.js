export default class ICharacter{
    constructor(){
        if (this.Position === undefined || this.Position.x === undefined || this.Position.y === undefined ) {
            throw new Error("Property 'Position' must be defined.");
        }
        if (this.Size === undefined || this.Size.w === undefined || this.Size.h === undefined ) {
            throw new Error("Property 'Size' must be defined.");
        }
        if (this.bodyShape === undefined || (this.bodyShape != "square" && this.bodyShape != "circle" && this.bodyShape != "rectangle" && this.bodyShape != "triangle")) {
            throw new Error("Property 'bodyShape' must be defined and square, circel, rectangle or triangle.");
        }
    }

    _update(){
        throw new Error("Method 'update()' must be implemented.");
    }

    _draw(){
        throw new Error("Method 'draw()' must be implemented.");
    }
}