import backgroundLevel from '../../img/backgroundLevel.png'
import spellBook from '../../img/spellbook.png'

import startWav from '../../audio/system/microphone.wav'

import Sortable from '../../../node_modules/sortablejs'
import {canvasController, gameController, heroController, monsterController} from "../index";

export default class GameView{
    constructor(){
        this.interval = '';
    }

    openModalNickname(){
        document.getElementsByTagName('h1')[0].parentElement.removeChild(document.getElementsByTagName('h1')[0]);
        document.getElementById('wrp_btn_start_game').classList.add('wrp_btn_start_game_close');
        document.getElementById('form_inp_nickname').classList.add('form_group_open');
    }

    addRemoveErrorModalNickname(target){
        target.classList.toggle('form_group_error');
    }

    clearHtmlAddCanvas(){
        let wrp = document.getElementById('wrp');
        wrp.innerHTML = '';
        wrp.appendChild(canvasController.model.canvas);
        this.addBackgroundCanvas();
        this.addSpellBook();
    }

    addBackgroundCanvas(){
        canvasController.imgs.set('background',[backgroundLevel, 0, 0,
                                               canvasController.model.width, canvasController.model.height]);
    }

    addSpellBook() {
        canvasController.imgs.set('spellbook', [spellBook, 20, 150]);
    }

    showSpellWrp(){

            let modalWin = document.getElementById('popupWin'),
                h2 = document.createElement('h2'),
                divSpell = document.createElement('div'),
                divFireball = document.createElement('div'),
                divHeal = document.createElement('div');

            h2.appendChild(document.createTextNode('SELECT SPELL'));
            divSpell.classList.add('spell_wrp');
            divFireball.classList.add('spell');
            divFireball.classList.add('fireball');
            divFireball.id = 'fireball';
            divFireball.title = 'Deals damage: 10-30hp';

            divHeal.classList.add('spell');
            divHeal.classList.add('heal');
            divHeal.title = 'Restores health: 19-38hp';
            divHeal.id = 'heal';

            divSpell.appendChild(divFireball);
            divSpell.appendChild(divHeal);

            modalWin.appendChild(h2);
            modalWin.appendChild(document.createElement('hr'));
            modalWin.appendChild(divSpell);
            modalWin.appendChild(document.createElement('hr'));

    }

    openModalWind(){
        if(heroController.model.hp > 0 && monsterController.model.hp > 0) {
            this.showSpellWrp();

            let darkLayer = document.createElement('div');
            darkLayer.classList.add('shadow');

            darkLayer.id = 'darkLayer';
            document.body.appendChild(darkLayer);

            let modalWin = document.getElementById('popupWin');
            modalWin.style.display = 'block';

            darkLayer.onclick = () => {
                this.closeModalWind();
            };

            document.getElementById('popupWin').onclick = (event) => {

                if (event.target.classList.contains('spell')) {
                    document.cookie = `typeSpell=${event.target.id}`;
                    gameController.selectTask();
                }
            }
        }
    }

    closeModalWind(){
        let darkLayer = document.getElementById('darkLayer'),
            modalWin = document.getElementById('popupWin');

        darkLayer.parentNode.removeChild(darkLayer);
        modalWin.style.display = 'none';
        this.clearModalWind();
        if(!canvasController.model.nextFrame)
            canvasController.stopStartDraw();

        if(modalWin.classList.contains('taskwin'))
            this.transformModalWind();

    }

    closeExistModalWind(){
        let darkLayer = document.getElementById('darkLayer'),
            modalWin = document.getElementById('popupWin');
        if(darkLayer){
            darkLayer.parentNode.removeChild(darkLayer);
            modalWin.style.display = 'none';
            this.clearModalWind();
        }
    }

    clearModalWind(){
        document.getElementById('popupWin').innerHTML = '';
    }

    showTaskSayTheWord(task, content){
        this.clearModalWind();

        let wrp = document.createElement('div'),
            taskP = document.createElement('p'),
            wordP = document.createElement('p'),
            div = document.createElement('div'),
            modalWind = document.getElementById('popupWin'),
            btn = document.createElement('button'),
            btnWrp = document.createElement('div'),
            divAnswer = document.createElement('div'),
            buttonCanNotSay = document.createElement('button'),
            divCanNotSay = document.createElement('div');

        divAnswer.id = 'divAnswer';
        divAnswer.classList.add('answer');

        divCanNotSay.id = 'buttonCanNotSay';

        buttonCanNotSay.appendChild(document.createTextNode('Can not talk'));
        buttonCanNotSay.classList.add('start_game');
        buttonCanNotSay.classList.add('task_read_word');
        buttonCanNotSay.classList.add('button_can_not_say');
        divCanNotSay.appendChild(buttonCanNotSay);
        divCanNotSay.classList.add('wrp_btn_start_game');
        divCanNotSay.classList.add('task_read_word');


        btn.appendChild(document.createTextNode('SAY'));
        btn.classList.add('start_game');
        btn.classList.add('task_read_word');

        btnWrp.classList.add('wrp_btn_start_game');

        btnWrp.classList.add('task_read_word');
        btnWrp.appendChild(btn);

        wordP.appendChild(document.createTextNode(task));


        modalWind.classList.add('bg_task');
        wrp.classList.add('wrp_task');

        taskP.appendChild(document.createTextNode(content));

        div.appendChild(taskP);
        div.appendChild(wordP);
        div.appendChild(btnWrp);
        div.appendChild(divAnswer);
        div.appendChild(divCanNotSay);

        wrp.appendChild(div);

        modalWind.appendChild(wrp);

        buttonCanNotSay.onclick = () =>{
            this.closeModalWind();
        };

        btn.onclick = () => {
            let recognizer = new webkitSpeechRecognition(),
                audioStart = new Audio(startWav);

            recognizer.interimResults = true;
            audioStart.play();

                recognizer.lang = 'en-US';
            recognizer.start();
            recognizer.onresult =  (event) => {
                let result = event.results[event.resultIndex],
                    div = document.getElementById('buttonCanNotSay');

                div.innerHTML = '';

                    if (result.isFinal) {
                        audioStart.play();
                        setTimeout(() => {
                            gameController.checkAnswerTask(result[0].transcript);
                        }, 1000);
                    }
                    else {
                        let div = document.getElementById('divAnswer');
                        div.innerHTML = '';
                        div.appendChild(document.createTextNode(result[0].transcript));
                    }
            };
        };
    }

    showTaskMissedLetter(task, content){
        this.clearModalWind();
        let ul = document.createElement('ul'),
            modalWind = document.getElementById('popupWin'),
            wrp = document.createElement('div'),
            caption = document.createElement('p'),
            wrpUl = document.createElement('div');

        ul.id = 'foo';
        ul.classList.add('ulDragAndDrop');
        ul.classList.add('li_country');
        wrp.classList.add('wrp_task');
        wrpUl.classList.add('wrpUl');


        for (let i = 0; i < task[1].length; i++ ){
            let li = document.createElement('li');
            if(i === task[0]){
                let input = document.createElement('input');
                input.id = 'input_next_number';
                input.classList.add('inp_next_number');
                this.addEventInputKeydown(input);
                ul.appendChild(input);
            }
            else {
                li.value = task[1][i];
                li.appendChild(document.createTextNode(task[1][i]));
                ul.appendChild(li);
            }
        }
        wrpUl.appendChild(ul);

        caption.appendChild(document.createTextNode(content));
        wrp.appendChild(caption);
        wrp.appendChild(wrpUl);
        modalWind.appendChild(wrp);
    }


    showTaskNumbersSidesFigure(task, content){
        this.clearModalWind();
        let ul = document.createElement('ul'),
            modalWind = document.getElementById('popupWin'),
            wrp = document.createElement('div'),
            caption = document.createElement('p'),
            taskP = document.createElement('div'),
            wrpUl = document.createElement('div'),
            classTask = task[0] === 8 ? 'octagon':
                        task[0] === 4 ? 'square':
                        task[0] === 3 ? 'triangle':
                        task[0] === 6 ? 'hexagon': 'pentagon';

        ul.id = 'foo';
        ul.classList.add('ulDragAndDrop');
        ul.classList.add('li_country');
        wrp.classList.add('wrp_task');
        wrpUl.classList.add('wrpUl');

        taskP.classList.add(classTask);
        taskP.classList.add('figure');

        for (let i = 0; i < task[1].length; i++ ){
            let li = document.createElement('li');
            li.value = task[i];
            li.id = task[1][i];
            li.appendChild(document.createTextNode(task[1][i]));
            ul.appendChild(li);
        }

        wrpUl.appendChild(taskP);
        wrpUl.appendChild(ul);

        caption.appendChild(document.createTextNode(content));
        wrp.appendChild(caption);
        wrp.appendChild(wrpUl);
        modalWind.appendChild(wrp);

        this.addEventUlOnclick(ul, "LI");

    }


    showTaskGeometricFigures(task, content){

        this.clearModalWind();

        let ul = document.createElement('ul'),
            modalWind = document.getElementById('popupWin'),
            wrp = document.createElement('div'),
            caption = document.createElement('p'),
            taskP = document.createElement('div'),
            wrpUl = document.createElement('div'),
            classTask = task[0] === 0 ? 'square': task[0] === 1 ? 'circle': 'triangle';

        ul.id = 'foo';
        ul.classList.add('ulDragAndDrop');
        ul.classList.add('li_country');
        wrp.classList.add('wrp_task');
        wrpUl.classList.add('wrpUl');

        taskP.classList.add(classTask);
        taskP.classList.add('figure');

        for (let i = 0; i < task[1].length; i++ ){
            let li = document.createElement('li');
            li.value = task[i];
            let figure = task[1][i] === 0 ? 'square': task[1][i] === 1 ? 'circle': 'triangle';
            li.id = task[1][i];
            li.appendChild(document.createTextNode(figure));
            ul.appendChild(li);
        }

        wrpUl.appendChild(taskP);
        wrpUl.appendChild(ul);

        caption.appendChild(document.createTextNode(content));
        wrp.appendChild(caption);
        wrp.appendChild(wrpUl);
        modalWind.appendChild(wrp);

        this.addEventUlOnclick(ul, "LI");
     }

    showTaskNextNumber(task, content){
        this.clearModalWind();

        let ul = document.createElement('ul'),
            modalWind = document.getElementById('popupWin'),
            wrp = document.createElement('div'),
            caption = document.createElement('p'),
            wrpUl = document.createElement('div');

        ul.id = 'foo';
        ul.classList.add('ulDragAndDrop');
        ul.classList.add('li_country');
        wrp.classList.add('wrp_task');
        wrpUl.classList.add('wrpUl');


        for (let i = 0; i <= task.length; i++ ){
            let li = document.createElement('li');
            if(i === task.length){
                let input = document.createElement('input');
                input.id = 'input_next_number';
                input.classList.add('inp_next_number');
                this.addEventInputKeydown(input);
                    ul.appendChild(input);
            }
            else {
                li.value = task[i];
                li.appendChild(document.createTextNode(task[i]));
                ul.appendChild(li);
            }

        }

        wrpUl.appendChild(ul);

        caption.appendChild(document.createTextNode(content));
        wrp.appendChild(caption);
        wrp.appendChild(wrpUl);
        modalWind.appendChild(wrp);
    }

    showTaskCities(task, content){
        this.clearModalWind();
        let ul = document.createElement('ul'),
            modalWind = document.getElementById('popupWin'),
            wrp = document.createElement('div'),
            caption = document.createElement('p'),
            taskP = document.createElement('p'),
            wrpUl = document.createElement('div');

        ul.id = 'foo';
        ul.classList.add('ulDragAndDrop');
        ul.classList.add('li_country');
        wrp.classList.add('wrp_task');
        wrpUl.classList.add('wrpUl');

        taskP.appendChild(document.createTextNode(task[0]));

        for (let i = 0; i < task[1].length; i++ ){
            let li = document.createElement('li');
            li.value = task[i];
            li.appendChild(document.createTextNode(task[1][i]));
            ul.appendChild(li);
        }

        wrpUl.appendChild(taskP);
        wrpUl.appendChild(ul);

        caption.appendChild(document.createTextNode(content));
        wrp.appendChild(caption);
        wrp.appendChild(wrpUl);
        modalWind.appendChild(wrp);

        this.addEventUlOnclick(ul, "LI", false);
    }

    showTaskPoresOfTheYear(task, content){
        this.clearModalWind();

        let wrp = document.createElement('div'),
            taskP = document.createElement('p'),
            div = document.createElement('div'),
            modalWind = document.getElementById('popupWin'),
            arrImg = [document.createElement('img'),
                      document.createElement('img'),
                      document.createElement('img'),
                      document.createElement('img')],
            dirImg = 'src/img/task/poresOfTheYear/',
            urlImg = [dirImg + 'winter.png',
                      dirImg + 'spring.png',
                      dirImg + 'summer.png',
                      dirImg + 'autumn.png'],
            seasons = ['winter', 'spring', 'summer', 'autumn'];

        div.classList.add('wrp_img_pores_year');
        wrp.classList.add('wrp_pores_year');

        taskP.appendChild(document.createTextNode(`${content}  ${task}`));

        arrImg.forEach((img, i) => {
            img.style.backgroundImage = `url("${urlImg[i]}")`;
            img.id = seasons[i];
            img.classList.add('img_pores_year');
            div.appendChild(img);
        });

        this.addEventUlOnclick(div, "IMG");

        wrp.appendChild(div);
        modalWind.appendChild(taskP);
        modalWind.appendChild(wrp);
    }

    showTaskCountSubject(task, content){
        this.clearModalWind();

        let wrp = document.createElement('div'),
            taskImg = document.createElement('img'),
            taskP = document.createElement('p'),
            div = document.createElement('div'),
            input = document.createElement('input'),
            modalWind = document.getElementById('popupWin');

        input.placeholder = 'count of items';

        modalWind.classList.add('bg_task');
        wrp.classList.add('wrp_task');
        input.classList.add('input_task');
        input.id = 'iptAnswerTask';

        taskP.appendChild(document.createTextNode(content));

        taskImg.classList.add('img_count_subjects');

        if(task === 0)
            taskImg.style.backgroundImage = "url('src/img/task/countSubject/boxes.png')";
        else
            taskImg.style.backgroundImage = "url('src/img/task/countSubject/pencils.png')";

        div.appendChild(taskP);
        div.appendChild(taskImg);
        div.appendChild(input);

        wrp.appendChild(div);

        modalWind.appendChild(wrp);
        document.getElementById('iptAnswerTask').focus();

        this.addEventInputKeydown(div);

    }

    showTaskComparison(task, placeholder){
        this.clearModalWind();

        let ul = document.createElement('ul'),
            modalWind = document.getElementById('popupWin'),
            wrp = document.createElement('div'),
            caption = document.createElement('p'),
            taskP = document.createElement('p'),
            wrpUl = document.createElement('div'),
            sing = '<=>';

        ul.id = 'foo';
        ul.classList.add('ulDragAndDrop');
        wrp.classList.add('wrp_task');
        wrpUl.classList.add('wrpUl');

        taskP.appendChild(document.createTextNode(`${task[0]}   ?   ${task[1]}`));

        for (let i = 0; i < sing.length; i++ ){
            let li = document.createElement('li');
            li.value = sing[i];
            li.appendChild(document.createTextNode(sing[i]));

            ul.appendChild(li);
        }

        wrpUl.appendChild(taskP);
        wrpUl.appendChild(ul);

        caption.appendChild(document.createTextNode(placeholder));
        wrp.appendChild(caption);
        wrp.appendChild(wrpUl);
        modalWind.appendChild(wrp);

        this.addEventUlOnclick(ul, "LI", false);
    }

    showTaskReadWord(task, placeholder){
        this.clearModalWind();


        let wrp = document.createElement('div'),
            taskP = document.createElement('p'),
            div = document.createElement('div'),
            input = document.createElement('input'),
            modalWind = document.getElementById('popupWin'),
            btn = document.createElement('button'),
            btnWrp = document.createElement('div');

        btn.appendChild(document.createTextNode('LISTEN'));
        btn.classList.add('start_game');
        btn.classList.add('task_read_word');

        btnWrp.classList.add('wrp_btn_start_game');
        btnWrp.appendChild(btn);

        input.placeholder = 'Enter the word here';

        modalWind.classList.add('bg_task');
        wrp.classList.add('wrp_task');
        input.classList.add('input_task');
        input.id = 'iptAnswerTask';

        taskP.appendChild(document.createTextNode(placeholder));

        div.appendChild(taskP);
        div.appendChild(btnWrp);
        div.appendChild(input);

        wrp.appendChild(div);

        modalWind.appendChild(wrp);
        document.getElementById('iptAnswerTask').focus();

        btn.onclick = () =>{
            speechSynthesis.speak(
                new SpeechSynthesisUtterance(task)
            );
        };

        this.addEventInputKeydown(div);

    }

    showTaskDragAndDrop(task, placeholder){
        this.clearModalWind();

        let ul = document.createElement('ul'),
            modalWind = document.getElementById('popupWin'),
            wrp = document.createElement('div'),
            caption = document.createElement('p'),
            wrpUl = document.createElement('div');

        ul.id = 'foo';
        ul.classList.add('ulDragAndDrop');
        wrp.classList.add('wrp_task');
        wrpUl.classList.add('wrpUl');

        for (let i = 0; i < task.length; i++ ){
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(task[i]));

            ul.appendChild(li);
        }

        wrpUl.appendChild(ul);

        caption.appendChild(document.createTextNode(placeholder));
        wrp.appendChild(caption);
        wrp.appendChild(wrpUl);
        modalWind.appendChild(wrp);

        Sortable.create(foo, {
            group: 'foo',
            animation: 100
        });

        this.interval = setInterval(()=>{
           let foo = document.getElementById('foo'),
               word = '';
           for(let i = 0; i < foo.childElementCount; i++){
               word += foo.children[i].textContent;
           }
           if(word === gameController.model.taskAnswer){
               gameController.checkAnswerTask(word);
               clearInterval(gameController.view.interval);
           }
        }, 500);
    }

    transformModalWind(){
        let win = document.getElementById('popupWin');
        win.classList.toggle('taskwin');
    }

    showTask(task, placeholder){
        this.clearModalWind();


            let wrp = document.createElement('div'),
                taskP = document.createElement('p'),
                div = document.createElement('div'),
                input = document.createElement('input'),
                modalWind = document.getElementById('popupWin');

            input.placeholder = placeholder;

            modalWind.classList.add('bg_task');
            wrp.classList.add('wrp_task');
            input.classList.add('input_task');
            input.id = 'iptAnswerTask';

            taskP.appendChild(document.createTextNode(task));

            div.appendChild(taskP);
            div.appendChild(input);

            wrp.appendChild(div);

            modalWind.appendChild(wrp);
            document.getElementById('iptAnswerTask').focus();

           this.addEventInputKeydown(div);

    }

    addEventUlOnclick(ul, tag, flagId = true ){
        ul.onclick = (event) => {
            if(event.target.tagName === tag){
                if(flagId)
                    gameController.checkAnswerTask(event.target.id);
                else
                    gameController.checkAnswerTask(event.target.textContent);

            }
        };
    }

    addEventInputKeydown(div){
        div.onkeydown = (event) => {
            if (event.keyCode === 13){
                let value = event.target.value;
                if(gameController.model.typeTask === 'arithmetic' && Number(value) || value === '0'){
                    gameController.checkAnswerTask(value);
                }
                else if(gameController.model.typeTask !== 'arithmetic' && value){
                    gameController.checkAnswerTask(value);
                }
                else{
                    this.addRemoveErrorModalNickname(event.target);
                }
            }
            else if(event.target.classList.contains('form_group_error')){
                this.addRemoveErrorModalNickname(event.target);
            }
        }
    }

    showTableScore(){
        document.getElementById('wrp').innerHTML = '';
        let tableWrp = document.createElement('div'),
            wrp = document.getElementById('wrp'),
            table = document.createElement('table'),
            heroResult = JSON.parse(window.localStorage['gameResult']),
            tr = document.createElement('tr'),
            thName = document.createElement('th'),
            thLevel = document.createElement('th'),
            caption = document.createElement('caption'),
            btn = document.createElement('button'),
            divBtn = document.createElement('div');

        btn.classList.add('start_game');
        btn.appendChild(document.createTextNode('New game'));

        btn.onclick = function(){
            gameController.startNewGame();
        };

        divBtn.appendChild(btn);
        divBtn.id = "wrp_btn_start_game";
        divBtn.classList.add('wrp_btn_start_game');

        table.classList.add('table_result');

        caption.appendChild(document.createTextNode('TABLE SCORE'));

        table.appendChild(caption);

        thName.appendChild(document.createTextNode('NAME HERO'));
        thLevel.appendChild(document.createTextNode('MONSTERS'));

        tr.appendChild(thName);
        tr.appendChild(thLevel);
        table.appendChild(tr);

        heroResult.forEach((value)=>{
            let tdName = document.createElement('td'),
                tdLevel = document.createElement('td');

            tr = document.createElement('tr');
            tdName.appendChild(document.createTextNode(value['name']));
            tdLevel.appendChild(document.createTextNode(value['level']));
            tr.appendChild(tdName);
            tr.appendChild(tdLevel);
            table.appendChild(tr);
        });

        tableWrp.appendChild(table);
        wrp.appendChild(tableWrp);
        wrp.appendChild(btn);

    }

    showNumberNextLevel(content = `LEVEL ${heroController.model.compliteLevel + 2}` ){
        let div = document.createElement('div'),
            divContent =document.createElement('div');

        divContent.classList.add('inf_next_level');
        divContent.id = 'inf_next_level';

        div.appendChild(document.createTextNode(content));
        divContent.appendChild(div);
        document.getElementsByTagName('body')[0].appendChild(divContent);
        setTimeout(()=>{
            document.getElementById('inf_next_level').parentElement.removeChild(document.getElementById('inf_next_level'));
        }, 1500);
    }

    showGameOver(){
        this.showNumberNextLevel('GAME OVER');
    }
}

