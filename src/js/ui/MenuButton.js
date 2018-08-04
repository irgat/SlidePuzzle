import Button from "./Button";

class MenuButton extends Button {
    constructor(data, isSelected = false) {
        super(data.label, data.color, isSelected);

        this.id = data.id;
    }
}

export default MenuButton;