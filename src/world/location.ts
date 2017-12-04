import * as Assets from '../assets';
// NOTE: this file is smelling more like `tile` than `location`
// as it seems to deal more with creating/modfiying `tile`s
// should investigate possibly changing it's name

// alias to our tile spritesheet assets
const tileAssets = Assets.Atlases.AtlasesSpritesheetTiles;

// what scale we want to display the images at
// eventually we will change this based on device resolution.
export const TILE_SCALE = 0.25;

// real pixel size of the images
const IMG_SIZE = 128;

// calculate tile size based on actual image size and current scale.
export const TILE_SIZE = IMG_SIZE * TILE_SCALE;

// select texture based on location type_
const determineTexture = (location) => {
    switch (location.type_) {
        case 'grass':
            return tileAssets.Frames.GrassTop;
        case 'dirt':
            return tileAssets.Frames.Dirt;
        default:
            return tileAssets.Frames.Water;
    }
};

/* return a random grass image
*/
export const getGrass = () => {
    const min = Math.ceil(0);
    const max = Math.floor(3);
    const index = Math.floor(Math.random() * (max - min + 1)) + min;
    return [tileAssets.Frames.Grass1,
    tileAssets.Frames.Grass2,
    tileAssets.Frames.Grass3,
    tileAssets.Frames.Grass4][index];
}

// simple function for adding entites to the tile
// adds an `entitie` to a `game` `tile` at `location`
export const addEntities = (game, coordinates, tile, location) => {
    if (location.entities.length > 0) {
        let entity = game.make.sprite(0, 0, tileAssets.getName(), getGrass());
        tile.addChild(entity);
    }
    return tile;
}

/* return a game tile
   takes a game instance, a set of coordinates, a location and a selector
*/
export const create = (game, coordinates, location, selector) => {
    const texture = determineTexture(location);

    let tile = game.make.sprite(
        coordinates.x * TILE_SIZE,
        coordinates.y * TILE_SIZE,
        tileAssets.getName(),
        texture
    );

    tile.scale.set(TILE_SCALE, TILE_SCALE);

    // this is not needed with the way we are currently displaying zLevels.
    // may be used in the future.
    // tile.z = coordinates.z;
    tile = addEntities(game, coordinates, tile, location);

    return setEventHandlers(coordinates, tile, location.entities, selector);
};

// add event handlers to a tile and return it
const setEventHandlers = (coordinates, tile, entities, selector) => {
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
            console.log(entities);
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
