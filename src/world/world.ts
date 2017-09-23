import Location from './location';
import * as zLevels from './zLevels';
import { unHash } from './coordinates';

export const createLocations = (game, locations, layers, selector) => {
    const tiles = {};
    for (let coords in locations) {
        if (locations.hasOwnProperty(coords)) {
            let coordinates = unHash(coords);

            const tile = new Location(game,
                coordinates,
                selector.onOver,
                selector.onOut,
                selector.onDown,
                selector.onUp
            );

            layers.all[coordinates.z].add(tile);
            tiles[coords] = tile;
        }
    }
    zLevels.showCurrent(layers);
    return tiles;
};
