import * as Coordinates from '../world/coordinates';
import { TILE_SIZE } from '../world/location';
import { not, contains } from 'ramda';
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
    private tintBuffer(tiles) {
        // tint currently selected + buffer
        this.buffer.concat(this.selected).map((coords) => {
            let tile = tiles[Coordinates.hash(coords)];
            tile.tint = 0xEEEEEE;
        });
    }
    public update(tiles) {

        // untint the current buffer
        this.unTintBuffer(tiles);

        // calculate the new buffer
        this.buffer = Selection.selected(this.selection);

        this.tintBuffer(tiles);
    }
}
