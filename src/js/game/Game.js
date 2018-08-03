import * as CustomEvent from "../tools/CustomEvent";
import Tile from "../ui/Tile";
import * as Utils from "../tools/Utils";
import { TweenLite } from "gsap";

class Game extends PIXI.Container {
    constructor(data) {
        super();

        this.data = data;
        this.tiles = new Array();
        this.matrix = new Array();
        this.isMoving = false;

        this.init();
    }

    init() {
        //loader
        const loader = new PIXI.loaders.Loader();
        loader.add('tiles', this.data.json);
        loader.load(this.onAssetsLoaded.bind(this));
    }

    onAssetsLoaded(loader, resources) {
        console.log('===== START GAME =====');
        console.log(this.data.label);
        console.log(this.matrix);
        console.log('======================');

        let frames = resources.tiles.data.frames;
        let assets = new Array();

        //tiles
        Object.keys(frames).forEach(key => assets.push(key)); //get tiles

        let sqrt = Math.ceil(Math.sqrt(assets.length)); //get row/column count

        this.tiles = assets.sort().map((id, index) => new Tile(index, new PIXI.Sprite(PIXI.utils.TextureCache[id]))); //create tiles
        /////////////
        //TEST MODE//
        /////////////
        this.tiles.sort(() => Math.random() - .5); //shuffle tiles
        //comment line above for testing
        this.tiles.forEach((item, index) => {
            let col = index % sqrt;
            let row = Math.floor(index / sqrt);
            item.x = item.width * col;
            item.y = item.height * row;
            item.on(CustomEvent.SELECTED, this.onSelected.bind(this));
            this.addChild(item);

            if (col === 0) {
                this.matrix.push(new Array(sqrt).fill(-1)); //increment dimension
            }

            this.matrix[row][col] = item.id; //update matrix
        });

        let itemW = this.tiles[0].width;
        let totalW = itemW * sqrt;

        //bg
        let bg = new PIXI.Graphics();
        bg.beginFill(0xCCCCCC);
        bg.drawRect(0, 0, totalW, totalW);
        bg.endFill();
        this.addChildAt(bg, 0);

        this.emit(CustomEvent.LOADED);

        /////////////
        //TEST MODE//
        /////////////
        // this.onSelected(this.tiles[this.tiles.length - 1]);
        //remove comment above for testing
    }

    onSelected(selectedItem) {
        if (!this.isMoving) {
            let position = Utils.default.getMatrixPos(selectedItem.id, this.matrix);
            let possibleMoves = Utils.default.getPossibleMoves(position, this.matrix);
            if (possibleMoves.length > 0) {
                this.moveTile(selectedItem, position, possibleMoves[0]);
            }
        }
    }

    moveTile(selectedItem, currentPosition, moveData) {
        /* console.log('===== MOVE =====');
        console.log('selectedItem:', selectedItem);
        console.log('currentPosition:', currentPosition);
        console.log('moveData:', moveData);
        console.log('================'); */
        let startAnimation = () => this.isMoving = true;
        switch (moveData.side) {
            case Utils.UP:
                TweenLite.to(selectedItem, .25, {
                    y: selectedItem.y - selectedItem.height,
                    onStart: startAnimation,
                    onCompleteParams: [selectedItem, currentPosition, moveData],
                    onComplete: this.onAnimationComplete.bind(this)
                });
                break;
            case Utils.DOWN:
                TweenLite.to(selectedItem, .25, {
                    y: selectedItem.y + selectedItem.height,
                    onStart: startAnimation,
                    onCompleteParams: [selectedItem, currentPosition, moveData],
                    onComplete: this.onAnimationComplete.bind(this)
                });
                break;
            case Utils.LEFT:
                TweenLite.to(selectedItem, .25, {
                    x: selectedItem.x - selectedItem.width,
                    onStart: startAnimation,
                    onCompleteParams: [selectedItem, currentPosition, moveData],
                    onComplete: this.onAnimationComplete.bind(this)
                });
                break;
            case Utils.RIGHT:
                TweenLite.to(selectedItem, .25, {
                    x: selectedItem.x + selectedItem.width,
                    onStart: startAnimation,
                    onCompleteParams: [selectedItem, currentPosition, moveData],
                    onComplete: this.onAnimationComplete.bind(this)
                });
                break;
            default:
                break;
        }
    }

    onAnimationComplete(selectedItem, currentPosition, moveData) {
        this.matrix[currentPosition.row][currentPosition.col] = -1;
        this.matrix[moveData.row][moveData.col] = selectedItem.id;

        let isGameOver = Utils.default.isGameOver(this.matrix);
        this.isMoving = isGameOver;

        if (isGameOver) {
            this.emit(CustomEvent.GAME_OVER);
        }
    }
}

export default Game;