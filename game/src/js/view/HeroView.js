import hero from '../../img/hero.png'
import fireballImg from '../../img/incantations/fireball.png'
import bottleIMG from '../../img/incantations/bottle.png'

import {canvasController, heroController, monsterController} from "../index";


export default class HeroView{
    constructor(){
        this.intervalFireball = '';
        this.intervalHeal = '';
    }

    addHero(){

            canvasController.imgs.set('hero',[hero, heroController.model.dx, heroController.model.dy]);
            if(heroController.model.down){
                heroController.model.dy++;
                if(heroController.model.dy > 400)
                    heroController.model.down = false;
            }
            else {
                heroController.model.dy--;
                if(heroController.model.dy < 365)
                    heroController.model.down = true;
            }
    }

    addHeroAttributes(){
        canvasController.cnvContext().font = "30px Verdana";
        canvasController.cnvContext().strokeStyle = "black";
        canvasController.cnvContext().strokeText(heroController.model.name, 20, 90);

        canvasController.cnvContext().strokeStyle = "red";
        canvasController.cnvContext().strokeText(`${heroController.model.hp} hp`, 20, 130);

        canvasController.cnvContext().strokeStyle = "black";
        canvasController.cnvContext().strokeText(`LEVEL ${heroController.model.compliteLevel + 1} `, 420, 100);
    }

    showFireball(){

        let baseX = 220,
            baseY = 500,
            sprite = 10;

        this.intervalFireball = setInterval(()=>{
            if (baseX < monsterController.model.dxBase + 50){
                    canvasController.imgs.set('fireball',[fireballImg, baseX, baseY, 100, 50, sprite, 10, 90,50]);
                    baseX += 15;
                    if(sprite >= 410)
                        sprite = 10;
                    else
                        sprite += 100;
            }
            else{
                canvasController.imgs.delete('fireball');
                clearInterval(heroController.view.intervalFireball);
            }

        }, canvasController.model.drawInterval);
    }

    showHeal(){
        let baseX = 120,
            baseY = 260,
            sprite = 1;

        this.intervalHeal = setInterval(()=>{
            if (sprite <= 162){
                canvasController.imgs.set('bottle', [bottleIMG, baseX, baseY , 60, 110, sprite, 1, 55,105]);
                sprite += 54;
            }
            else{
                canvasController.imgs.delete('bottle');
                clearInterval(heroController.view.intervalHeal);
            }

        }, canvasController.model.drawInterval * 15);

    }
}