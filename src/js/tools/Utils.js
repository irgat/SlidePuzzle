class Utils {
    static getStageDimensions() {
        let dimensions = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        // console.log('dimensions:', dimensions);
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
}

export default Utils;