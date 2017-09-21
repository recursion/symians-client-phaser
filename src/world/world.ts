import Location from './location';
import * as zLevels from './zLevels';

export const Coordinates = ([x, y, z]) => {
    return { x: Number(x), y: Number(y), z: Number(z) };
};

export const hashCoords = (coords) => {
    return [coords.x, coords.y, coords.z].join('|');
}

export const decodeCoords = (coords) => {
    return Coordinates(coords.split('|'));
};

export const createLocations = (game, locations, layers, selector) => {
    const tiles = {};
    for (let coords in locations) {
        if (locations.hasOwnProperty(coords)) {
            let coordinates = decodeCoords(coords);
            const tile = new Location(game,
                coordinates,
                () => mouseOverLocation(game, coordinates, tiles, selector),
                () => mouseOutLocation(coordinates, tiles));
            layers.all[coordinates.z].add(tile);
            tiles[coords] = tile;
        }
    }
    zLevels.showCurrent(layers);
    return tiles;
}

const mouseOutLocation = (coords, tiles) => {
    let tile = tiles[hashCoords(coords)];
    tile.tint = 0xFFFFFF;
}
const mouseOverLocation = (game, coords, tiles, selector) => {
    console.log(coords);
    let tile = tiles[hashCoords(coords)];
    tile.tint = 0xEEEEEE;
    if (game.input.activePointer.leftButton.isDown) {
        selector.selecting = true;
        selector.buffer.unshift(coords);
    } else {
        selector.selecting = false;
    }
}
