import * as CustomEvent from "../tools/CustomEvent";

class Tile extends PIXI.Container {
    constructor(id, bg) {
        super();
        
        this.id = id;
        this.bg = bg;
        this.interactive = true;
        this.buttonMode = true;

        this.init();
    }

    init() {
        this.addChild(this.bg);

        //border
        let border = new PIXI.Graphics();
        border.lineStyle(2, 0xCCCCCC);
        border.drawRect(0, 0, this.bg.width, this.bg.height);
        this.addChild(border);

        this.on(CustomEvent.MOUSE_CLICK, this.onButtonDown);
    }

    onButtonDown(e) {
        this.emit(CustomEvent.SELECTED, this);
    }
}

export default Tile;