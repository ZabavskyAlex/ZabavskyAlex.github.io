export default class Hero{
    constructor(name){
        this.name = document.cookie.replace(/(?:(?:^|.*;\s*)userName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        this.hp = 100;
        this.compliteLevel = 0;
        this.activ = true;
        this.dx = 35;
        this.dy = 365;
        this.down = true;
    }
    reset(){
        this.hp = 100;
        this.compliteLevel = 0;
        this.activ = true;
        this.dx = 35;
        this.dy = 365;
        this.down = true;
    }
}