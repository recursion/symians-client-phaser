import * as Assets from '../assets';
const IMG_SIZE = 128;
const TILE_SIZE = 32;

export default class Location extends Phaser.TileSprite {
    constructor(game, { x, y, z }, mouseOverHandler, mouseOutHandler) {
        super(game, (x * TILE_SIZE),
            (y * TILE_SIZE),
            IMG_SIZE, IMG_SIZE,
            Assets.Atlases.AtlasesSpritesheetTiles.getName(),
            Assets.Atlases.AtlasesSpritesheetTiles.Frames.GrassTop);

        this.anchor.set(0.5, 0.5);
        this.scale.set(0.25, 0.25);
        this.z = z;

        this.inputEnabled = true;
        this.events.onInputOver.add(() => mouseOverHandler({ x, y, z }));
        this.events.onInputDown.add(() => mouseOverHandler({ x, y, z }))
        this.events.onInputOut.add(() => mouseOutHandler({ x, y, z }));
    }
}
