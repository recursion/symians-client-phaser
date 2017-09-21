import * as Assets from '../assets';

// real pixel size of the images
const IMG_SIZE = 128;

// going to display the tile images at 1/4 size for now
const TILE_SIZE = IMG_SIZE / 8;

// a sprite that represents a map/world location.
// a.k.a. a tile.
export default class Location extends Phaser.TileSprite {
    constructor(game, { x, y, z }, mouseOverHandler, mouseOutHandler, mouseDownHandler = mouseOverHandler) {
        super(
            game,
            (x * TILE_SIZE),
            (y * TILE_SIZE),
            IMG_SIZE,
            IMG_SIZE,
            Assets.Atlases.AtlasesSpritesheetTiles.getName(),
            Assets.Atlases.AtlasesSpritesheetTiles.Frames.GrassTop
        );

        this.anchor.set(0.5, 0.5);

        // setting the image to 1/4 actual size
        // this is what tilesize comes from 'TILE_SIZE'
        this.scale.set(0.125, 0.125);

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
            .onInputOut
            .add(() => {
                mouseOutHandler({ x, y, z });
            });
    }
}
