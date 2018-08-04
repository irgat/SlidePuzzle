import * as CustomEvent from "../tools/CustomEvent";
import Button from "./MenuButton";

class Menu extends PIXI.Container {
    constructor(data, isRadioGroup = false) {
        super();

        this.data = data;
        this.isRadioGroup = isRadioGroup;
        this.items = new Array();

        this.init();
    }

    init() {
        let margin = {
            x: 10,
            y: 0,
        };

        //menu items
        this.items = this.data.map(item => new Button(item));
        this.items.forEach((item, index) => {
            item.x = (item.width + margin.x) * index;
            item.y = margin.y;
            item.on(CustomEvent.SELECTED, this.onSelected.bind(this));
            this.addChild(item);
        });
    }

    onSelected(target) {
        if (this.isRadioGroup) {
            this.updateSelectedItem(target.id);
        }
        this.emit(CustomEvent.SELECTED, this.getSelectedItems().map(item => item.id));
    }

    updateSelectedItem(id) {
        this.items.forEach((item) => {
            item.isSelected = item.isSelected && item.id === id;
        });
    }

    getSelectedItems() {
        return this.items.filter(item => item.isSelected);
    }

    reset() {
        this.items.forEach(item => item.isSelected = false);
        return this.getSelectedItems();
    }
}

export default Menu;