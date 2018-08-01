import * as CustomEvent from "../tools/CustomEvent";

class Game extends PIXI.Container {
    constructor(data) {
        super();

        this.data = data;

        console.log('GAME >>', this.data.label);

        //bg
        let bg = new PIXI.Graphics();
        bg.beginFill(0xCCCCCC);
        bg.drawRect(0, 0, 600, 600);
        bg.endFill();
        this.addChild(bg);

        // this.emit(CustomEvent.COMPLETED);
    }
}

export default Game;