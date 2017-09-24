const Z_LEVEL_FLOOR = 0;
const Z_LEVEL_CEILING = 3;      // (this.worldData.dimensions.height)

const zLevels = {
    ceiling: Z_LEVEL_CEILING,   // the upper limit of zLevels
    floor: Z_LEVEL_FLOOR,       // the lower limit of zLevels
    current: 0,                 // the current zLevel
    all: [],                    // each zLevels location data is stored here, indexed by zLevel
    displayed: null             // a game.group we store the current zLevel in (so its displayed)
};


// initialize our zLevels
export const init = (game, height) => {
    let levels = [...Array(height).keys()];
    for (let level in levels) {
        zLevels.all.push({});
    }
    zLevels.displayed = game.add.group();
    return zLevels;
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

// remove the current zLevel sprites from our ground group
// and add the next zLevels tiles to it.
const changeZLevel = (zLevels, n: number) => {
    zLevels.displayed.removeAll();
    zLevels.current += n;

    for (let tile in zLevels.all[zLevels.current]) {
        zLevels.displayed.add(zLevels.all[zLevels.current][tile]);
    }
    return zLevels;
};
