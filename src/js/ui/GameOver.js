import Utils from "../tools/Utils";
import * as CustomEvent from "../tools/CustomEvent";
import Button from "./Button";

class GameOver extends PIXI.Container {
    constructor() {
        super();

        this.init();
    }

    init() {
        let margin = {
            x: 10,
            y: 10,
        };

        //bg
        this.bg = new PIXI.Graphics();
        this.bg.beginFill(0x333333, .6);
        this.bg.drawRect(0, 0, 10, 10);
        this.bg.endFill();
        this.addChild(this.bg);

        //container
        this.mainContainer = new PIXI.Container();
        this.addChild(this.mainContainer);

        //style
        var style = new PIXI.TextStyle({
            fontSize: 36,
            fill: '#ffffff',
            align: 'center',
        });

        //label
        let label = new PIXI.Text('CONGRATULATIONS!\n\nYOU WIN ; ))', style);
        this.mainContainer.addChild(label);

        //reset label
        let resetButton = new Button('RESET', 0xffffff, true);
        resetButton.x = (label.width - resetButton.width) / 2;
        resetButton.y = label.height + margin.y * 4;
        this.mainContainer.addChild(resetButton);

        this.interactive = true;
        this.buttonMode = true;
        this.on(CustomEvent.MOUSE_CLICK, () => this.emit(CustomEvent.SELECTED));

        this.onResize();
    }

    onResize(w, h) {
        let dimensions = Utils.getStageDimensions();
        this.bg.width = w;
        this.bg.height = h;

        this.mainContainer.x = (this.bg.width - this.mainContainer.width) / 2;
        this.mainContainer.y = (this.bg.height - this.mainContainer.height) / 2;
    }
}

export default GameOver;