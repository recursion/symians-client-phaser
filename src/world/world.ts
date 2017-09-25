import * as Location from './location';
import * as zLevels from './zLevels';
import { unHash } from './coordinates';
import * as Assets from '../assets';
const tileAssets = Assets.Atlases.AtlasesSpritesheetTiles;

export const init = (game, locations, layers, selector) => {
    const tiles = {};
    // iterate over the locations creating tiles for each location
    // sort locations into by zLevel.
    // TODO: send data from the server by zLevel?
    for (let coords in locations) {
        if (locations.hasOwnProperty(coords)) {
            let coordinates = unHash(coords);
            const location = locations[coords];
            const tile = Location.create(game, coordinates, location, selector);
            tiles[coords] = tile;
            layers.all[coordinates.z][coords] = tile;
        }
    }
    // add all tiles for the current zLevel to the zLevel group (to be displayed)
    for (let tile in layers.all[0]) {
        layers.displayed.add(layers.all[0][tile]);
    }
    return tiles;
};
