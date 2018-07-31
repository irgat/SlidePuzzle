class Button extends PIXI.Container {
    constructor(data) {
        super();

        this.defaultBgColor = 0x00CCCC;
        this.data = data;

        this.init();
    }

    init() {
        let margin = {
            x: 10,
            y: 5,
        };

        //label
        let label = new PIXI.Text(this.data.label);
        label.x = margin.x;
        label.y = margin.y;
        this.addChild(label);

        //bg
        let bg = new PIXI.Graphics();
        bg.beginFill(this.data.color || this.defaultBgColor);
        bg.drawRect(0, 0, label.width + margin.x * 2, label.height + margin.y * 2);
        bg.endFill();
        this.addChildAt(bg, 0);
    }
}

export default Button;