import * as PIXI from 'pixi.js';
import Menu from './ui/Menu';
import data from '../data/data.json';
import '../css/app.css';

class App {
    constructor() {
        if (process.env.NODE_ENV !== 'production') {
            console.log('===== NODE_ENV =====');
            console.log('\t', process.env.NODE_ENV);
            console.log('====================');
        }

        this.init();
    }

    init() {
        //PIXI setup
        this.app = new PIXI.Application(this.getStageDimensions());
        document.body.appendChild(this.app.view);

        //resize listener
        let onResize = (e) => {
            let dimensions = this.getStageDimensions();
            this.app.renderer.resize(dimensions.width, dimensions.height);
            this.onResize();
        }
        window.addEventListener('resize', onResize);

        //menu
        this.menu = new Menu(data.tiles);
        this.app.stage.addChild(this.menu);

        this.onResize();
    }
    
    onResize() {
        this.menu.x = (this.app.renderer.width - this.menu.width) / 2;
    }

    getStageDimensions() {
        let dimensions = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        // console.log('dimensions:', dimensions);
        return dimensions;
    }
}

export default App;

let app = new App();