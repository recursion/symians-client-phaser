import * as Assets from '../assets';

const tileAssets = Assets.Atlases.AtlasesSpritesheetTiles;

// what scale we want to display the images at
// eventually we will change this based on device resolution.
export const TILE_SCALE = 0.25;

// real pixel size of the images
const IMG_SIZE = 128;

// calculate tile size based on actual image size and current scale.
export const TILE_SIZE = IMG_SIZE * TILE_SCALE;

const determineTexture = (location) => {
    switch (location.type_) {
        case 'grass':
            return tileAssets.Frames.GrassTop;
        case 'dirt':
            return tileAssets.Frames.Dirt;
        default:
            return tileAssets.Frames.Rock;
    }
};

export const create = (game, coordinates, location, selector) => {
    // select texture based on location type_
    const texture = determineTexture(location);

    let tile = game.make.sprite(
        coordinates.x * TILE_SIZE,
        coordinates.y * TILE_SIZE,
        tileAssets.getName(),
        texture
    );


    tile.scale.set(TILE_SCALE, TILE_SCALE);

    tile.z = coordinates.z;

    tile = setEventHandlers(coordinates, tile, selector);

    return tile;
};

const setEventHandlers = (coordinates, tile, selector) => {
    tile.inputEnabled = true;

    tile.events
        .onInputOver
        .add(() => {
            selector.onOver(coordinates);
        });

    tile.events
        .onInputDown
        .add(() => {
            console.log(coordinates);
            selector.onDown(coordinates);
        });

    tile.events
        .onInputUp
        .add(() => {
            selector.onUp(coordinates);
        });

    tile.events
        .onInputOut
        .add(() => {
            selector.onOut(coordinates);
        });
    return tile;
};
