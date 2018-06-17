import {heroController, canvasController, monsterController, gameController} from "../index";

export default class CanvasController {
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.imgs = new Map();
    }

    cnvElement(){
        return document.getElementById(this.model.canvas.id);
    }

    cnvContext(){
        return this.cnvElement().getContext('2d');
    }

    startDraw(){
        canvasController.imgs.forEach((key) =>{
                canvasController.view.addImage(key[0],key[1],key[2],key[3],key[4],key[5],key[6],key[7],key[8]);
            }
        );

        heroController.view.addHeroAttributes();
        heroController.view.addHero();

        monsterController.view.addMonsterAttributes();
        monsterController.view.addMonster();

        if( monsterController.model.hp <= 0){
            gameController.view.showNumberNextLevel();
            canvasController.model.nextFrame = false;
            gameController.view.closeExistModalWind();
            setTimeout(() => {
                monsterController.collectMonster();
                gameController.nextLevel();
                canvasController.model.nextFrame = true;
                requestAnimationFrame(canvasController.startDraw);
            }, 1500);
        }
        else if(heroController.model.hp <= 0 ){
            gameController.view.closeExistModalWind();
            gameController.view.showGameOver();
            canvasController.model.nextFrame = false;
            setTimeout(() => {
                heroController.saveResultBase();
                gameController.view.showTableScore();
            }, 1500);
        }
        if(canvasController.model.nextFrame)
            requestAnimationFrame(canvasController.startDraw)
    }

    stopStartDraw(){
        this.model.nextFrame === true ? this.model.nextFrame = false: this.model.nextFrame = true;
        if(this.model.nextFrame)
            this.startDraw();
    }

    reset(){
        this.imgs = new Map();
    }
}