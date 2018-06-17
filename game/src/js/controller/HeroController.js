import fireballWav from '../../audio/fireball.wav'
import healWav from '../../audio/heal.wav'

import {canvasController, gameController, heroController, monsterController} from "../index";


export default class HeroController{
    constructor(model, view){
        this.model = model;
        this.view = view;
    }

    addFireball(){
        let damage = gameController.randomNum(30, 10),
            level = heroController.model.compliteLevel,
            audio = new Audio(fireballWav);

        audio.play();

        this.view.showFireball();
        setTimeout(()=>{
            let interval = setInterval(() => {
                if(damage > 0 && monsterController.model.hp > 0 && level === heroController.model.compliteLevel){
                    monsterController.model.hp--;
                    damage--;
                }
                else
                    clearInterval(interval);
            }, canvasController.model.drawInterval);
        }, 800);
    }

    addHeal(){
        let heal = gameController.randomNum(38, 19),
            audio = new Audio(healWav);

        audio.play();
        this.view.showHeal();

        setTimeout(()=>{
            let interval = setInterval(() => {
                if(heal > 0 && heroController.model.hp < 100){
                    heroController.model.hp++;
                    heal--
                }
                else
                    clearInterval(interval);
            }, canvasController.model.drawInterval);
        }, 800);

    }

    saveResultBase(){

        let heroResult = window.localStorage['gameResult'],
            heroName = this.model.name,
            heroLevel = this.model.compliteLevel;

        if(heroResult){
            heroResult = JSON.parse(window.localStorage['gameResult']);
            heroResult.push({name:heroName, level:heroLevel});

            heroResult.sort((heroA, heroB) =>{
                return heroB.level - heroA.level;
            });

            heroResult.splice(10, heroResult.length);
            window.localStorage['gameResult'] = JSON.stringify(heroResult);
        }
        else
            window.localStorage['gameResult'] = JSON.stringify([{name:heroName, level:heroLevel}]);
    }

}