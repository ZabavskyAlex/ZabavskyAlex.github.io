export default class Monster{
    constructor(){
        this.name = '';
        this.hp = 100;
        this.head = '';
        this.legs = '';
        this.torso = '';
        this.arsenal = '';
        this.damage = [6, 18];
        this.dxBase = 600;
        this.dyBase = 320;
        this.flagDx = true;
        this.flagDy = true;
        this.damageActiv = false;
    }

    reset(){
        this.name = '';
        this.hp = 100;
        this.head = '';
        this.legs = '';
        this.torso = '';
        this.arsenal = '';
        this.damage = [6, 18];
        this.dxBase = 600;
        this.dyBase = 320;
        this.flagDx = true;
        this.flagDy = true;
        this.damageActiv
    }
}