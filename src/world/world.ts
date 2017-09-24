import Location, { TILE_SIZE, TILE_SCALE } from './location';
import * as zLevels from './zLevels';
import { unHash } from './coordinates';
import * as Assets from '../assets';
const tileAssets = Assets.Atlases.AtlasesSpritesheetTiles;

export const createLocations = (game, locations, layers, selector) => {
    const tiles = {};
    for (let coords in locations) {
        if (locations.hasOwnProperty(coords)) {
            let coordinates = unHash(coords);

            /*
            const tile = new Location(game,
                coordinates,
                selector.onOver,
                selector.onOut,
                selector.onDown,
                selector.onUp
            );
            */
            const tile = game.make.sprite(
                coordinates.x * TILE_SIZE,
                coordinates.y * TILE_SIZE,
                tileAssets.getName(),
                tileAssets.Frames.GrassTop
            );

            tile.anchor.set(0.5, 0.5);

            tile.scale.set(TILE_SCALE, TILE_SCALE);

            tile.z = coordinates.z;
            tile.coordinates = coordinates;

            tile.inputEnabled = true;

            tile.events
                .onInputOver
                .add(() => {
                    console.log(tile.coordinates);
                    selector.onOver(tile.coordinates);
                });

            tile.events
                .onInputDown
                .add(() => {
                    selector.onDown(tile.coordinates);
                });

            tile.events
                .onInputUp
                .add(() => {
                    selector.onUp(tile.coordinates);
                });

            tile.events
                .onInputOut
                .add(() => {
                    selector.onOut(tile.coordinates);
                });
            tiles[coords] = tile;
            layers.all[coordinates.z][coords] = tile;
        }
    }
    for (let tile in layers.all[0]) {
        layers.group.add(layers.all[0][tile]);
    }
    // game.add.existing(layers.all[0]);
    return tiles;
};
