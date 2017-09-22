import * as Assets from '../assets';

const tileAssets = Assets.Atlases.AtlasesSpritesheetTiles;

// what scale we want to display the images at
const TILE_SCALE = 0.25;

// real pixel size of the images
const IMG_SIZE = 128;

// display the tile images at our scale
export const TILE_SIZE = IMG_SIZE * TILE_SCALE;

// a sprite that represents a map/world location.
// a.k.a. a tile.
export default class Location extends Phaser.TileSprite {
    constructor(
        game,
        { x, y, z },
        mouseOverHandler,
        mouseOutHandler,
        mouseDownHandler,
        mouseUpHandler
    ) {
        super(
            game,
            (x * TILE_SIZE),
            (y * TILE_SIZE),
            IMG_SIZE,
            IMG_SIZE,
            tileAssets.getName(),
            tileAssets.Frames.GrassTop
        );

        this.anchor.set(0.5, 0.5);

        // setting the image to 1/4 actual size
        // this is what tilesize comes from 'TILE_SIZE'
        this.scale.set(TILE_SCALE, TILE_SCALE);

        this.z = z;

        this.inputEnabled = true;

        this.events
            .onInputOver
            .add(() => {
                mouseOverHandler({ x, y, z });
            });

        this.events
            .onInputDown
            .add(() => {
                mouseDownHandler({ x, y, z });
            });

        this.events
            .onInputUp
            .add(() => {
                mouseUpHandler({ x, y, z });
            });

        this.events
            .onInputOut
            .add(() => {
                mouseOutHandler({ x, y, z });
            });
    }
}
