import * as CustomEvent from "../tools/CustomEvent";
import Tile from "../ui/Tile";

class Game extends PIXI.Container {
    constructor(data) {
        super();

        this.data = data;
        this.tiles = new Array();
        //todo: dynamic
        this.matrix = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ];

        console.log('===== START GAME =====');
        console.log(this.data.label);
        console.log('======================');

        this.init();
    }

    init() {
        //loader
        const loader = new PIXI.loaders.Loader();
        loader.add('tiles', this.data.json);
        loader.load(this.onAssetsLoaded.bind(this));
    }

    onAssetsLoaded(loader, resources) {
        let frames = resources.tiles.data.frames;
        let assets = new Array();

        //tiles
        Object.keys(frames).forEach(key => assets.push(key)); //get tiles

        let sqrt = Math.ceil(Math.sqrt(assets.length)); //get row/column count

        this.tiles = assets.sort().map((id, index) => new Tile(index, new PIXI.Sprite(PIXI.utils.TextureCache[id]))); //create tiles
        this.tiles.sort(() => Math.random() - .5); //shuffle tiles
        this.tiles.forEach((item, index) => {
            let col = index % sqrt;
            let row = Math.floor(index / sqrt);
            item.x = item.width * col;
            item.y = item.height * row;
            item.pos.x = row; //position in matrix
            item.pos.y = col; //position in matrix
            item.on(CustomEvent.SELECTED, this.onSelected.bind(this));
            this.addChild(item);

            this.matrix[row][col] = item.id; //update matrix
        });

        console.log('>>>>>>>>>>', this.matrix);

        let itemW = this.tiles[0].width;
        let totalW = itemW * sqrt;

        //bg
        let bg = new PIXI.Graphics();
        bg.beginFill(0xCCCCCC);
        bg.drawRect(0, 0, totalW, totalW);
        bg.endFill();
        this.addChildAt(bg, 0);

        this.emit(CustomEvent.LOADED);
    }

    onSelected(id) {
        console.log('###', id);
    }
}

export default Game;