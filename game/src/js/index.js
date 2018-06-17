import '../style/main.css'

import GameController from "./controller/GameController";
import Game from "./model/Game";
import GameView from "./view/GameView"

import HeroController from "./controller/HeroController";
import Hero from "./model/Hero";
import HeroView from "./view/HeroView"

import MonsterController from "./controller/MonsterController";
import Monster from "./model/Monster";
import MonsterView from "./view/MonsterView"

import Canvas from "./model/Canvas"
import CanvasView from "./view/CanvasView"
import CanvasController from "./controller/CanvasController";


const canvasController = new CanvasController(new Canvas(1024, 768), new CanvasView()),
      gameController = new GameController(new Game(), new GameView()),
      heroController = new HeroController(new Hero(), new HeroView()),
      monsterController = new MonsterController(new Monster(), new MonsterView());

gameController.addEventBtnStart();

export {gameController, heroController, monsterController, canvasController}

