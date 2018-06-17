import blowMonster from '../../audio/blowOfMonster.wav'

import head_1 from '../../img/monster/head/head_1.png'
import head_2 from '../../img/monster/head/head_2.png'
import head_3 from '../../img/monster/head/head_3.png'

import torso_1 from '../../img/monster/torso/torso_1.png'
import torso_2 from '../../img/monster/torso/torso_2.png'
import torso_3 from '../../img/monster/torso/torso_3.png'

import legs_1 from '../../img/monster/legs/legs_1.png'
import legs_2 from '../../img/monster/legs/legs_2.png'
import legs_3 from '../../img/monster/legs/legs_3.png'

import arsenal_1 from '../../img/monster/arsenal/arsenal_1.png'
import arsenal_2 from '../../img/monster/arsenal/arsenal_2.png'
import arsenal_3 from '../../img/monster/arsenal/arsenal_3.png'

import monsterNameJSON from '../../dataJSON/monsterName';
import {canvasController, gameController, heroController, monsterController} from "../index";


export default class MonsterController{

    constructor(model, view){
        this.model = model;
        this.view = view;
        this.arrComponent = [];
    }

    collectMonster(){
        this.model.name = this.addName();
        this.addComponent();
        this.arrComponent.forEach((component, iter) => {
            switch (iter){
                case  0:{
                    this.model.head = this.addRandomComponent(component);
                    break;
                }
                case 1:{
                    this.model.torso = this.addRandomComponent(component);
                    break;
                }
                case 2:{
                    this.model.legs = this.addRandomComponent(component);
                    break;
                }
                case 3:{
                    this.model.arsenal = this.addRandomComponent(component);
                    break;
                }
            }
        });
    }

    addName(){
        return `${monsterNameJSON['adjective'][gameController.randomNum(monsterNameJSON['adjective'].length - 1)]} ${monsterNameJSON['race'][gameController.randomNum(monsterNameJSON['race'].length - 1)]} ${monsterNameJSON['name'][gameController.randomNum(monsterNameJSON['name'].length - 1)]}`;
    }

    addComponent(){
            /*const fs = require('fs');
           const dir = '../../img/monster/head';

           fs.readdir(dir, (err, files) => {
               alert(files.length);
           });*/
        this.arrComponent = [];

        let head = [],
            legs = [],
            torso = [],
            arsenal = [];

        head.push(head_1);
        head.push(head_2);
        head.push(head_3);

        torso.push(torso_1);
        torso.push(torso_2);
        torso.push(torso_3);

        legs.push(legs_1);
        legs.push(legs_2);
        legs.push(legs_3);

        arsenal.push(arsenal_1);
        arsenal.push(arsenal_2);
        arsenal.push(arsenal_3);

        this.arrComponent.push(head);
        this.arrComponent.push(torso);
        this.arrComponent.push(legs);
        this.arrComponent.push(arsenal);
    }

    addRandomComponent(component){

        return component[gameController.randomNum(component.length - 1)];

    }

    addDamage(){
        let damage = gameController.randomNum(this.model.damage[1], this.model.damage[0]),
            level = heroController.model.compliteLevel,
            audio = new Audio(blowMonster),
            timeout = heroController.model.activ ? 2000 : 400;

        setTimeout(() =>{
                monsterController.model.damageActiv = true;
                this.view.showDamage();
                if(heroController.model.hp > 0 && monsterController.model.hp > 0)
                    audio.play();
                setTimeout(() =>{
                    let interval = setInterval(() => {
                        if(damage > 0 && heroController.model.hp > 0 && level === heroController.model.compliteLevel){
                            heroController.model.hp--;
                            damage--;
                        }
                        else
                            clearInterval(interval);
                    }, canvasController.model.drawInterval);
                },timeout / 2);
            }, timeout
        )
    }



}