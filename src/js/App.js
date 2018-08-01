import '../css/app.css';
import * as PIXI from 'pixi.js';
import * as CustomEvent from './tools/CustomEvent';
import data from '../data/data.json';
import Menu from './ui/Menu';
import Game from './game/Game';
import Utils from './tools/Utils';

class App {
    constructor() {
        if (process.env.NODE_ENV !== 'production') {
            console.log('===== NODE_ENV =====');
            console.log('\t', process.env.NODE_ENV);
            console.log('====================');
        }

        this.resetMenuData();
        this.init();
    }

    resetMenuData() {
        this.menuData = {
            level: -1,
            option: -1,
        };

        this.killGame();
    }

    init() {
        //PIXI setup
        this.app = new PIXI.Application(Utils.getStageDimensions());
        document.body.appendChild(this.app.view);

        //resize listener
        let onResize = (e) => {
            let dimensions = Utils.getStageDimensions();
            this.app.renderer.resize(dimensions.width, dimensions.height);
            this.onResize();
        }
        window.addEventListener(CustomEvent.RESIZE, onResize);

        //main container
        this.mainContaniner = new PIXI.Container();
        this.app.stage.addChild(this.mainContaniner);

        //level menu
        this.levelMenu = new Menu(data.levels, true);
        this.levelMenu.on(CustomEvent.SELECTED, this.onSelectLevel.bind(this));
        this.mainContaniner.addChild(this.levelMenu);

        this.onResize();
    }

    onSelectLevel(selectedItems) {
        this.resetMenuData();

        this.menuData.level = selectedItems[0] || -1;

        this.showOptionMenu();
    }

    showOptionMenu() {
        //remove existing option menu
        if (this.optionMenu) {
            this.mainContaniner.removeChild(this.optionMenu);
        }

        //option menu
        if (this.menuData.level !== -1) {
            this.optionMenu = new Menu(Utils.getLevelData(data, this.menuData), true);
            this.optionMenu.on(CustomEvent.SELECTED, this.onSelectOption.bind(this));
            this.mainContaniner.addChild(this.optionMenu);
        }

        this.onResize();
    }

    onSelectOption(selectedItems) {
        this.menuData.option = selectedItems[0] || -1;
        this.startGame();
    }

    startGame() {
        this.killGame();

        //game
        if (this.menuData.level !== -1 && this.menuData.option !== -1) {
            this.game = new Game(Utils.getGameData(data, this.menuData));
            this.game.on(CustomEvent.COMPLETED, this.onGameOver.bind(this));
            this.mainContaniner.addChild(this.game);
        }

        this.onResize();
    }

    killGame() {
        if (this.game) {
            this.mainContaniner.removeChild(this.game);
        }
    }

    onGameOver() {
        console.log('=====================');
        console.log('===== GAME OVER =====');
        console.log('=====================');
    }

    onResize() {
        let margin = {
            x: 0,
            y: 10,
        };

        let pos = {
            x: 0,
            y: 10,
        };

        this.levelMenu.x = (this.app.renderer.width - this.levelMenu.width) / 2;
        this.levelMenu.y = pos.y;
        pos.y += this.levelMenu.height + margin.y;

        if (this.optionMenu) {
            this.optionMenu.x = (this.app.renderer.width - this.optionMenu.width) / 2;
            this.optionMenu.y = pos.y;
            pos.y += this.optionMenu.height + margin.y;
        }

        if (this.game) {
            this.game.x = (this.app.renderer.width - this.game.width) / 2;
            this.game.y = pos.y;
            pos.y += this.game.height + margin.y;
        }
    }
}

export default App;

let app = new App();