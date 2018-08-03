class Utils {
    static getStageDimensions() {
        let dimensions = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        return dimensions;
    }

    static getLevelData(data, menuData) {
        let level = data.levels.filter(item => item.id === menuData.level);
        return level[0].options;
    }

    static getGameData(data, menuData) {
        let level = Utils.getLevelData(data, menuData);
        let option = level.filter(item => item.id === menuData.option);
        return option[0];
    }

    static getMatrixPos(id, matrix) {
        let col = -1;
        let row = -1;

        matrix.forEach((item, index) => {
            let _col = item.findIndex(val => val === id);
            if (_col > -1) {
                col = _col;
                row = index;
            }
        });

        return { row, col };
    }

    static getPossibleMoves(position, matrix) {
        // record position if tile exists and available
        let possibleMoves = [
            //check if tile exists_____//then check if tile available____________________//then return move data, if not return false_________________
            (position.row - 1 >= 0) && (matrix[position.row - 1][position.col] === -1 && { row: position.row - 1, col: position.col, side: UP }), //up
            //check if tile exists________________//then check if tile available____________________//then return move data, if not return false_____________________
            (position.row + 1 < matrix.length) && (matrix[position.row + 1][position.col] === -1 && { row: position.row + 1, col: position.col, side: DOWN }), //down
            //check if tile exists_____//then check if tile available____________________//then return move data, if not return false_____________________
            (position.col - 1 >= 0) && (matrix[position.row][position.col - 1] === -1 && { row: position.row, col: position.col - 1, side: LEFT }), //left
            //check if tile exists________________//then check if tile available____________________//then return move data, if not return false_______________________
            (position.col + 1 < matrix.length) && (matrix[position.row][position.col + 1] === -1 && { row: position.row, col: position.col + 1, side: RIGHT }), //right
        ].filter(item => item !== false); //filter available moves

        return possibleMoves;
    }

    static isGameOver(matrix) {
        matrix = [].concat(...matrix); //flatten the matrix
        
        let input = [...matrix];
        let output = [...matrix].sort((a, b) => a - b); //sort the matrix
        
        input.pop(); //remove the last item, expected -1
        output.shift(); //remove the first item, expected -1
        
        let result = input.toString() === output.toString(); //compare input and output
        
        return result;
    }
}

export const UP = 'UP';
export const DOWN = 'DOWN';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';

export default Utils;