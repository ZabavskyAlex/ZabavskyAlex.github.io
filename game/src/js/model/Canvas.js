export default class Canvas{
    constructor(width, height){
        this.drawInterval = 1000 / 60;
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'canvas';
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.nextFrame = true;
    }
}