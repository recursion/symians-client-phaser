const Z_LEVEL_FLOOR = 0;
const Z_LEVEL_CEILING = 3; // (this.worldData.dimensions.height)

const zLevels = {
    ceiling: Z_LEVEL_CEILING,
    floor: Z_LEVEL_FLOOR,
    current: 0,
    all: []
};

export const init = (game, height) => {
    let levels = [...Array(height).keys()];
    for (let level in levels) {
        let g = game.add.group();
        g.visible = false;
        zLevels.all.push(g);
    }
    return zLevels;
};
export const showCurrent = (zLevels) => {
    zLevels.all[zLevels.current].visible = true;
};

export const hideCurrent = (zLevels) => {
    zLevels.all[zLevels.current].visible = false;
};

export const moveDown = (zLevels) => {
    if (zLevels.current > zLevels.floor) {
        return changeZLevel(zLevels, -1);
    }
};

export const moveUp = (zLevels) => {
    if (zLevels.current < zLevels.ceiling) {
        return changeZLevel(zLevels, 1);
    }
};

const changeZLevel = (zLevels, n: number) => {
    hideCurrent(zLevels);
    zLevels.current += n;
    showCurrent(zLevels);
    return zLevels;
};
