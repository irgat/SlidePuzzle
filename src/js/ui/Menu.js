import Button from "./Button";

class Menu extends PIXI.Container {
    constructor(data) {
        super();

        this.data = data;
        this.items = new Array();

        this.init();
    }

    init() {
        let margin = {
            x: 10,
            y: 10
        };
        
        //menu items
        this.items = this.data.map(item => new Button(item));
        this.items.forEach((item, index) => {
            this.addChild(item);
            item.x = (margin.x + item.width) * index + margin.x;
            item.y = margin.y;
        });
    }
}

export default Menu;