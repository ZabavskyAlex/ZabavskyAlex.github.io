import dictionaryJSON from '../../dataJSON/dictionary'
import countryJSON from '../../dataJSON/countryJSON'

import vinWav from '../../audio/system/vin.wav'

import {canvasController, gameController, heroController, monsterController} from "../index";


export default class GameController{

    constructor(model, view){
        this.model = model;
        this.view = view;
    }

    addEventBtnStart(){
        window.onload = function(){
            document.getElementById('btn_start_game').onclick = function (event) {
            gameController.view.openModalNickname();
            gameController.addEventHandlerNickname();
            };
        };
    }

    startNewGame(){
        let userName =document.cookie.replace(/(?:(?:^|.*;\s*)userName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        heroController.model.reset();
        monsterController.model.reset();
        canvasController.reset();
        canvasController.model.nextFrame = true;

        this.view.clearHtmlAddCanvas();
        monsterController.collectMonster();
        canvasController.startDraw();
    }

    startGame(userName = document.cookie.replace(/(?:(?:^|.*;\s*)userName\s*\=\s*([^;]*).*$)|^.*$/, "$1")){

        document.cookie = `userName=${userName}`;
        heroController.model.name = userName;

        this.view.clearHtmlAddCanvas();
        this.addEventHandlerCanvas();
        monsterController.collectMonster();
        canvasController.startDraw();
    }

    randomNum(max = 1, min = 0){
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    addEventHandlerNickname() {

        document.getElementById('dynamic_label_input').onkeyup = (event) => {
            if (event.keyCode === 13){
                let userName = event.target.value;
                if(userName){
                    this.startGame(userName);
                }
                else{
                    this.view.addRemoveErrorModalNickname(event.target);
                }
            }
            else if(event.target.classList.contains('form_group_error')){
                this.view.addRemoveErrorModalNickname(event.target);
            }
        }
    }

    addEventHandlerCanvas(){
       document.getElementById('canvas').onclick = (event) => {
            let elem = canvasController.model.canvas,
                box = elem.getBoundingClientRect(),
                yM =  event.clientY - box.top + pageYOffset,
                xM = event.clientX - box.left + pageXOffset;


            if(xM > 22 && xM < 120 && yM > 160 && yM < 240)
                gameController.view.openModalWind();
        }
    }

    selectTask(){
        let numberTask = this.randomNum(14);

        switch (numberTask){
            case 0:{
                this.view.showTask(this.generateTaskArithmetic(), 'calculate');
                break
            }
            case 1:{
                this.view.showTask(this.generateTaskTranslation(), 'translation');
                break
            }
            case 2:{
                this.view.showTaskDragAndDrop(this.generateTaskDragAndDrop(), 'restore the order of letters');
                break
            }
            case 3:{
                this.view.showTaskReadWord(this.generateTaskReadWord(), 'Click the button and enter word');
                break
            }
            case 4:{
                this.view.showTaskComparison(this.generateTaskComparison(), 'Сhoose a comparison sign');
                break
            }
            case 5:{
                this.view.showTaskCountSubject(this.generateTaskCountSubject(), 'Сount the number of objects in the picture');
                break
            }
            case 6:{
                this.view.showTaskPoresOfTheYear(this.generateTaskPoresOfTheYear(), 'Choose the time of year for this month:');
                break
            }
            case 7:{
                this.view.showTaskCities(this.generateTaskCities(), 'The capital of country:');
                break
            }
            case 8:{
                this.view.showTaskNextNumber(this.generateTaskNextNumber(), 'Write the next number');
                break
            }
            case 9:{
                this.view.showTaskDragAndDrop(this.generateTaskDragAndDropNumber(), 'restore the order of numbers in ascending order');
                break
            }
            case 10:{
                this.view.showTaskGeometricFigures(this.generateTaskGeometricFigures(), 'geometric figure');
                break
            }
            case 11:{
                this.view.showTaskNumbersSidesFigure(this.generateTaskNumbersSidesFigure(), 'number of vertices of the figure');
                break
            }
            case 12:{
                this.view.showTaskMissedLetter(this.generateTaskMissedLetter(), 'Write a missed letter');
                break
            }
            case 13:{
                this.view.showTaskCities(this.generateTaskDaysOfTheWeek(), 'choose the day following');
                break
            }
            case 14:{
                this.view.showTaskSayTheWord(this.generateTaskSayTheWord(), 'say the word:');
                break
            }
        }
        this.view.transformModalWind();
        canvasController.stopStartDraw();
    }

    generateTaskSayTheWord(){
        let dictionaryLen = Object.keys(dictionaryJSON).length,
            numberWord = this.randomNum(dictionaryLen - 1),
            word = Object.keys(dictionaryJSON)[numberWord];


        this.model.typeTask = 'sayTheWord';
        this.model.taskAnswer = word;

        return word;
    }

    generateTaskDaysOfTheWeek(){
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday', 'Sunday'],
            dayNumber = this.randomNum(days.length - 1),
            day = days[dayNumber],
            answer = '',
            daysRespons = [];

        this.model.typeTask = 'daysOfTheWeek';

        if(dayNumber < days.length - 1)
            answer = days[dayNumber + 1];
        else
            answer = days[0];

        this.model.taskAnswer = answer;

        days.splice(dayNumber, 1);

        daysRespons.push(answer);
        while (daysRespons.length < 3){
            let daysBuf = days[this.randomNum(days.length - 1)];
            if(daysRespons.indexOf(daysBuf) === -1)
                daysRespons.push(daysBuf);
        }

        daysRespons.sort((a, b) => {
            return Math.random() - 0.5;
        });

        return [day, daysRespons];
    }

    generateTaskMissedLetter(){
       let dictionaryLen = Object.keys(dictionaryJSON).length,
           numberWord = this.randomNum(dictionaryLen - 1),
           word = Object.keys(dictionaryJSON)[numberWord],
           letterNumber = this.randomNum(word.length - 1);

       this.model.typeTask = 'missedLetter';
       this.model.taskAnswer = word[letterNumber];

       return [letterNumber, word]

    }

    generateTaskNumbersSidesFigure(){
        let arrGigure = [8,4,3,6,5],
            figureSides = arrGigure[this.randomNum(4)];

        this.model.typeTask = 'numbersSidesFigure';
        this.model.taskAnswer = figureSides;

        arrGigure.sort((a, b) => {
            return Math.random() - 0.5;
        });

        return [figureSides, arrGigure];
    }

    generateTaskGeometricFigures(){
        let arrGigure = [],
            figureNum = this.randomNum(2);

        arrGigure.push(figureNum);
        this.model.typeTask = 'geometric figure';
        this.model.taskAnswer = figureNum;

        while (arrGigure.length < 3){
            figureNum = this.randomNum(2);
            if(arrGigure.indexOf(figureNum) === -1)
                arrGigure.push(figureNum);
        }

        return [this.model.taskAnswer, arrGigure];
    }

    generateTaskDragAndDropNumber(){
        let arrNum = [],
            number,
            arrSort = [];

        for (let i = 0; i < 5; i++){
            number = this.randomNum(99);
            arrNum.push(number);
            arrSort.push(number);
        }

        arrSort.sort((a, b)=> a - b);
        arrSort = arrSort.toString().replace(/\,/g,"");

        this.model.typeTask = 'dragAndDropNumber';
        this.model.taskAnswer = arrSort;

        return arrNum;
    }


    generateTaskNextNumber(){
        let firstNumber = this.randomNum(89),
            arrNum = [],
            result;

        for (let i = 0; i < 4; i++){
            result = firstNumber + i;
            arrNum.push(result);
        }
        result++;

        this.model.typeTask = 'nextNumber';
        this.model.taskAnswer = result;

        return arrNum;
    }


    generateTaskCities(){
        let dictionaryLen = Object.keys(countryJSON).length,
            numberCountry = this.randomNum(dictionaryLen - 1),
            country = Object.keys(countryJSON)[numberCountry],
            capital = countryJSON[country],
            arrCapital = [];

        this.model.typeTask = 'cities';
        this.model.taskAnswer = capital;
        arrCapital.push(capital);

        while (arrCapital.length < 3){
            let numberCountryBuf = this.randomNum(dictionaryLen - 1),
                countryBuf = Object.keys(countryJSON)[numberCountryBuf];
            if(arrCapital.indexOf(countryJSON[countryBuf]) === -1){
                arrCapital.push(countryJSON[countryBuf]);
            }
        }

        arrCapital.sort((a, b) => {
            return Math.random() - 0.5;
        });

        return [country, arrCapital];
    }


    generateTaskPoresOfTheYear(){
        let months = ['Decemder', 'January', 'February',
                      'March', 'April', 'May',
                      'June', 'July', 'August',
                      'September', 'October', 'November'],
            numberMonth = this.randomNum(months.length - 1);

        this.model.typeTask = 'poresOfTheYear';
        if(numberMonth <= 2)
            this.model.taskAnswer = 'winter';
        else if (numberMonth <= 5)
            this.model.taskAnswer = 'spring';
        else if (numberMonth <= 8)
            this.model.taskAnswer = 'summer';
        else if (numberMonth <= 11)
            this.model.taskAnswer = 'autumn';

        return months[numberMonth];

    }

    generateTaskCountSubject(){
        let num = this.randomNum(1);

        this.model.typeTask = 'countSubject';
        if(num === 0)
            this.model.taskAnswer = 7;
        else
            this.model.taskAnswer = 3;

        return num;

    }

    generateTaskComparison(){
        let arr = [this.randomNum(19), this.randomNum(19)];

        this.model.typeTask = 'comparison';

        if(arr[0] > arr[1])
            this.model.taskAnswer = '>';
        else if(arr[0] < arr[1])
            this.model.taskAnswer = '<';
        else
            this.model.taskAnswer = '=';

        return arr;
    }

    generateTaskReadWord(){
        let dictionaryLen = Object.keys(dictionaryJSON).length,
            numberWord = this.randomNum(dictionaryLen - 1),
            word = Object.keys(dictionaryJSON)[numberWord];

        this.model.typeTask = 'readWord';
        this.model.taskAnswer = word;

        return word;
    }

    generateTaskDragAndDrop(){
        let dictionaryLen = Object.keys(dictionaryJSON).length,
            numberWord = this.randomNum(dictionaryLen - 1),
            word = Object.keys(dictionaryJSON)[numberWord],
            wordLen = word.length,
            wordMix = '',
            letterEnterCount = 0;

        this.model.typeTask = 'dragAndDrop';
        this.model.taskAnswer = word;

        while(letterEnterCount !== wordLen){
            let num = this.randomNum(word.length - 1);
            wordMix += word[num];
            word = word.substring(0, num) + word.substring(num + 1, word.length);
            letterEnterCount++;
        }

        if(wordMix === Object.keys(dictionaryJSON)[numberWord]){
            let firstLetter = wordMix[0],
                lastLetter = wordMix[wordMix.length - 1];

            wordMix = lastLetter + wordMix.substring(1, wordMix.length - 1) + firstLetter;
        }

        return wordMix;
    }

    generateTaskTranslation(){
        let dictionaryLen = Object.keys(dictionaryJSON).length,
            numberWord = this.randomNum(dictionaryLen - 1);

        this.model.typeTask = 'translation';
        this.model.taskAnswer = dictionaryJSON[Object.keys(dictionaryJSON)[numberWord]];

        return Object.keys(dictionaryJSON)[numberWord];
    }

    generateTaskArithmetic(){
        let signs = '*/+-',
            a = this.randomNum(19),
            b = this.randomNum(9, 1),
            sign = signs[this.randomNum(3)];

        switch (sign){
            case '+':{
                this.model.taskAnswer = a + b;
                break
            }
            case '-':{
                this.model.taskAnswer = a - b;
                break
            }
            case '*':{
                this.model.taskAnswer = a * b;
                break
            }
            case '/':{
                this.model.taskAnswer = parseFloat((a / b).toFixed(1));
                break
            }
        }

        this.model.typeTask = 'arithmetic';

        return `${a} ${sign} ${b}`;
    }

    checkAnswerTask(answer){
        let flag = true;

        switch (this.model.typeTask){
            case 'arithmetic':{
                if(!(parseFloat(Number(answer).toFixed(1)) === this.model.taskAnswer))
                    flag = false;
                break;
            }
            case 'translation':{
                flag = false;
                this.model.taskAnswer.forEach((value) => {
                    if(answer.replace(/\s+/g,'').toUpperCase() === value.toUpperCase())
                        flag = true;
                });
                break;
            }
            case 'readWord':{
                if(!(answer.replace(/\s+/g,'').toUpperCase() === this.model.taskAnswer.toUpperCase()))
                    flag = false;
                break
            }
            case 'comparison':{
                if(!(answer === this.model.taskAnswer))
                    flag = false;
                break
            }
            case 'countSubject':{
                if(!(Number(answer) === this.model.taskAnswer))
                    flag = false;
                break
            }
            case 'poresOfTheYear':{
                if(!(answer.toUpperCase() === this.model.taskAnswer.toUpperCase()))
                    flag = false;
                break
            }
            case 'cities':{
                if(!(answer.toUpperCase() === this.model.taskAnswer.toUpperCase()))
                    flag = false;
                break
            }
            case 'nextNumber':{
                if(!(Number(answer) === Number(this.model.taskAnswer)))
                    flag = false;
                break
            }
            case 'geometric figure':{
                if(!(Number(answer) === Number(this.model.taskAnswer)))
                    flag = false;
                break
            }
            case 'numbersSidesFigure':{
                if(!(Number(answer) === Number(this.model.taskAnswer)))
                    flag = false;
                break
            }
            case 'missedLetter':{
                if(!(answer.toUpperCase() === this.model.taskAnswer.toUpperCase()))
                    flag = false;
                break
            }
            case 'daysOfTheWeek':{
                if(!(answer.toUpperCase() === this.model.taskAnswer.toUpperCase()))
                    flag = false;
                break
            }
            case 'sayTheWord':{
                if(!(answer.toUpperCase() === this.model.taskAnswer.toUpperCase()))
                    flag = false;
                break
            }
        }

        if(flag){
            let audioVin = new Audio(vinWav);
            audioVin.play();
            setTimeout(() => {
                this.view.closeModalWind();
                heroController.model.activ = true;
                let typeSpell = document.cookie.replace(/(?:(?:^|.*;\s*)typeSpell\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                switch (typeSpell){
                    case 'fireball':{
                        heroController.addFireball();
                        break;
                    }
                    case 'heal':{
                        heroController.addHeal();
                        break;
                    }
                }
            }, 1000);

        }
        else{
            this.view.closeModalWind();
            heroController.model.activ = false;
        }
        monsterController.addDamage();
    }

    nextLevel(){
        heroController.model.compliteLevel++;
        heroController.model.hp = 100;

        monsterController.model.hp = 100;
        monsterController.model.damage = monsterController.model.damage.map((value) => value
                                                                            + heroController.model.compliteLevel * 2);

    }
}