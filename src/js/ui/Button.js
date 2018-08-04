import * as CustomEvent from "../tools/CustomEvent";

class Button extends PIXI.Container {
    constructor(label, bgColor = 0x00CCCC, isSelected = false) {
        super();

        this.label = label;
        this.bgColor = bgColor;
        this.isSelected = isSelected;
        this.interactive = true;
        this.buttonMode = true;

        this.init();
    }

    init() {
        let margin = {
            x: 10,
            y: 5,
        };

        //label
        let label = new PIXI.Text(this.label);
        label.x = margin.x;
        label.y = margin.y;
        this.addChild(label);

        //bg
        let bg = new PIXI.Graphics();
        bg.beginFill(this.bgColor);
        bg.drawRect(0, 0, label.width + margin.x * 2, label.height + margin.y * 2);
        bg.endFill();
        this.addChildAt(bg, 0);

        this.on(CustomEvent.MOUSE_CLICK, this.onButtonDown)
            .on(CustomEvent.MOUSE_OVER, this.onButtonOver)
            .on(CustomEvent.MOUSE_OUT, this.onButtonOut);
    }

    onButtonDown(e) {
        this.isSelected = !this.isSelected;
        this.emit(CustomEvent.SELECTED, this);
    }

    onButtonOver(e) {
        this.alpha = 1;
    }

    onButtonOut(e) {
        this.alpha = this.isSelected ? 1 : .6;
    }

    get isSelected() {
        return this._isSelected;
    }

    set isSelected(value) {
        this._isSelected = value;
        this.alpha = this._isSelected ? 1 : .6;
    }
}

export default Button;