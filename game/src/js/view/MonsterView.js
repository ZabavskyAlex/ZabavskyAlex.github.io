import {canvasController, monsterController} from "../index";


export default class MonsterView{
    constructor(){
        this.intervalDamage = '';
    }

    addMonsterAttributes(){
        canvasController.cnvContext().font = "30px Verdana";
        canvasController.cnvContext().strokeStyle = "black";
        canvasController.cnvContext().strokeText(monsterController.model.name, 700, 90);

        canvasController.cnvContext().strokeStyle = "red";
        canvasController.cnvContext().strokeText(`${monsterController.model.hp} hp`, 900, 130);
    }

    addMonster(){

        let dxBase = monsterController.model.dxBase,
            dyBase = monsterController.model.dyBase,
            flagDx = monsterController.model.flagDx,
            flagDy = monsterController.model.flagDy;

            canvasController.imgs.set('torso',[monsterController.model.torso, dxBase + 100, dyBase + 140]);
            canvasController.imgs.set('head',[monsterController.model.head, dxBase + 155, dyBase + 65]);
            canvasController.imgs.set('legs',[monsterController.model.legs, dxBase + 147, dyBase + 245]);
            if(!monsterController.model.damageActiv)
                canvasController.imgs.set('arsenal',[monsterController.model.arsenal, dxBase + 70, dyBase + 80]);


            if(flagDx){
                dxBase++;
                if(dxBase > 650)
                    flagDx = false;
            }
            else {
                dxBase--;
                if(dxBase < 520)
                    flagDx = true;
            }

            if(flagDy){
                dyBase++;
                if(dyBase > 340)
                    flagDy = false;
            }
            else {
                dyBase--;
                if(dyBase < 275)
                    flagDy = true;
            }

            monsterController.model.flagDx = flagDx;
            monsterController.model.flagDy = flagDy;
            monsterController.model.dxBase = dxBase;
            monsterController.model.dyBase = dyBase;

    }

    showDamage(){
        let baseX = monsterController.model.dxBase + 70,
            baseY = monsterController.model.dyBase + 80;
        this.intervalDamage = setInterval(()=>{
            if (baseX > 180){
                canvasController.imgs.set('arsenal',[monsterController.model.arsenal, baseX, baseY]);
                baseX -= 15;
            }
            else{
                canvasController.imgs.set('arsenal',[monsterController.model.arsenal, monsterController.model.dxBase + 70, monsterController.model.dyBase + 80]);
                clearInterval(monsterController.view.intervalDamage);
                monsterController.model.damageActiv = false;
            }

        }, canvasController.model.drawInterval / 2);
    }
}