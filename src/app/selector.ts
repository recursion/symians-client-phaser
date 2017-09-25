import * as Coordinates from '../world/coordinates';
import { TILE_SIZE } from '../world/location';
import * as Selection from './selection';

export default class Selector {
    private selection = Selection.Selection();
    private selected = [];
    private buffer = [];
    private onOver = null;
    private onOut = null;
    private onDown = null;
    private onUp = null;

    constructor() {
        this.onOver = (coords) => {
            this.selection = Selection.update(coords, this.selection);
        };
        this.onOut = (coords) => {
        };
        this.onDown = (coords) => {
            this.selection = Selection.start(coords, this.selection);
        };

        this.onUp = (coords) => {
            this.selected = this.selected.concat(this.buffer);
            this.selection = Selection.stop(coords, this.selection);
        };
    }
    // reset the tint on all tiles in the buffer
    private unTintBuffer(tiles) {
        this.buffer.map((coords) => {
            let tile = tiles[Coordinates.hash(coords)];
            tile.tint = 0xFFFFFF;
        });
    }
    private tintSelected(tiles) {
        // tint currently selected + buffer
        this.buffer.concat(this.selected).map((coords) => {
            let tile = tiles[Coordinates.hash(coords)];
            tile.tint = 0xEEEEEE;
        });
    }
    // TODO: if we pass in zLevels here, we can just access the tile from there
    // instead of this secondary reference(tiles).
    // zLevels.all[zLevels.current][Coordinates.hash(coords)]
    public update(tiles) {

        // untint the current buffer
        this.unTintBuffer(tiles);

        // calculate the new buffer
        this.buffer = Selection.selected(this.selection);

        this.tintSelected(tiles);
    }
}
