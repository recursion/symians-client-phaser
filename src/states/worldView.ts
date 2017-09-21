import * as Assets from '../assets';

const Z_LEVEL_FLOOR = 0;
const HOTKEY_DEFAULTS = {
    up: Phaser.Keyboard.W,
    down: Phaser.Keyboard.S,
    left: Phaser.Keyboard.A,
    right: Phaser.Keyboard.D,
    zUp: Phaser.Keyboard.R,
    zDown: Phaser.Keyboard.F,
}

export default class WorldView extends Phaser.State {
    private socket = null;
    private worldData = null;
    private layers = [];
    private cursors = null;
    private hotkeys = { up: null, down: null, left: null, right: null, zUp: null, zDown: null };
    private keypresses = { up: false, down: false, left: false, right: false, zUp: false, zDown: false };
    private zLevelInView = 0;

    public init({ worldData, socket }) {
        console.log("GOT worldData: ", worldData);
        this.worldData = worldData;
    }
    public preload(): void {
        this.hotkeys.up = this.game.input.keyboard.addKey(HOTKEY_DEFAULTS.up);

        this.hotkeys.down = this.game.input.keyboard.addKey(HOTKEY_DEFAULTS.down);

        this.hotkeys.left = this.game.input.keyboard.addKey(HOTKEY_DEFAULTS.left);

        this.hotkeys.right = this.game.input.keyboard.addKey(HOTKEY_DEFAULTS.right);

        this.hotkeys.zUp = this.game.input.keyboard.addKey(HOTKEY_DEFAULTS.zUp);

        this.hotkeys.zDown = this.game.input.keyboard.addKey(HOTKEY_DEFAULTS.zDown);
    }
    public create(): void {
        this.drawWorld();
    }

    private drawWorld = () => {
        if (this.worldData) {
            let locations = this.worldData.locations;
            let levels = [...Array(this.worldData.dimensions.height).keys()];
            this.layers = buildLayers(levels, this.game);

            for (let coords in locations) {
                if (locations.hasOwnProperty(coords)) {
                    let tile;
                    let decoded = decodeCoords(coords);
                    tile = this.game.add.sprite((decoded.x * 64),
                        (decoded.y * 64),
                        Assets.Atlases.AtlasesSpritesheetTiles.getName(),
                        Assets.Atlases.AtlasesSpritesheetTiles.Frames.GrassTop);

                    tile.anchor.set(0.5, 0.5);
                    tile.scale.set(0.5);
                    tile.z = decoded.z;
                    this.layers[decoded.z].add(tile);
                }
            }

            /*
            for (let coords in locations) {
                let decoded = decodeCoords(coords);
                if (locations.hasOwnProperty(coords)) {
                    this.layers[decoded.z].create(decoded.x,
                        decoded.y,
                        Assets.Atlases.AtlasesSpritesheetTiles.getName(),
                        Assets.Atlases.AtlasesSpritesheetTiles.Frames.GrassTop);
                }
            }
            */
        } else {
            this.game.time.events.add(50, this.drawWorld);
        }
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }
    public update() {
        let currentLayer = this.layers[this.zLevelInView]
        if (currentLayer) {
            currentLayer.visible = true;
        }
        if (this.hotkeys.up.isDown) {
            this.game.camera.y -= 4;
        }
        else if (this.hotkeys.down.isDown) {
            this.game.camera.y += 4;
        }

        if (this.hotkeys.left.isDown) {
            this.game.camera.x -= 4;
        }
        else if (this.hotkeys.right.isDown) {
            this.game.camera.x += 4;
        }
        if (this.hotkeys.zUp.isDown) {
            if (this.zLevelInView < this.worldData.dimensions.height) {
                this.zLevelInView += 1;
            }
        }
        if (this.hotkeys.zDown.isDown) {
            if (this.zLevelInView > Z_LEVEL_FLOOR) {
                this.zLevelInView -= 1;
            }
        }


    }

    public render() {

        this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }
}

const decodeCoords = (coords) => {
    return Coordinates(coords.split('|'));
};
const Coordinates = ([x, y, z]) => {
    return { x: Number(x), y: Number(y), z: Number(z) };
};
let buildLayers = (levels, game) => {
    let layers = [];
    for (let level in levels) {
        let g = game.add.group();
        g.visible = false;
        layers.push(g);
    }
    return layers;
};
