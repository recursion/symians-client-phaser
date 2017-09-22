import * as World from '../world/world';
import { TILE_SIZE } from '../world/location'
import { not, contains } from 'ramda';

export default class Selector {
    private selecting = null;
    private start = null;
    private current = null;
    private buffer = [];
    private selected = [];
    private onOver = null;
    private onOut = null;
    private onDown = null;
    private onUp = null;

    constructor() {
        this.selecting = false;
        this.selected = [];
        this.buffer = [];
        this.onOver = ({ x, y, z }) => {
            this.current = { x, y, z };
        };
        this.onOut = (coords) => {
        };
        this.onDown = ({ x, y, z }) => {
            this.selecting = true;
            this.start = { x, y, z };
            this.buffer = [{ x, y, z }];
        };

        this.onUp = ({ x, y, z }) => {
            this.selecting = false;
            this.selected = this.buffer;
            this.buffer = [];
        };
    }
    // find the region of tiles currently being selected
    // and set the buffer to that region
    private calculateCurrentSelection() {
        if (this.buffer.length > 0 && this.current) {
            let xDiff, yDiff, xStart, yStart;

            // reset the buffer before recalculating it
            this.buffer = [];

            // set the current z level
            const z = this.current.z;

            // calculate the currently selected tiles
            [xStart, xDiff] = (this.current.x > this.start.x)
                ? [this.start.x, (this.current.x - this.start.x)]
                : [this.current.x, (this.start.x - this.current.x)];
            [yStart, yDiff] = (this.current.y > this.start.y)
                ? [this.start.y, (this.current.y - this.start.y)]
                : [this.current.y, (this.start.y - this.current.y)];
            for (let x = xStart; x < xStart + xDiff + 1; x++) {
                for (let y = yStart; y < yStart + yDiff + 1; y++) {
                    this.buffer.unshift({ x, y, z });
                }
            }
        }
    }
    // reset the tint on all tiles in the buffer
    private unTintBuffer(tiles) {
        this.buffer.map((coords) => {
            // dont untint if this tile is in .selected
            if (not (contains(coords, this.selected))) {
                let tile = tiles[World.hashCoords(coords)];
                tile.tint = 0xFFFFFF;
            }
        })
    }
    private tintBuffer(tiles) {
        // tint currently selected + buffer
        this.buffer.concat(this.selected).map((coords) => {
            let tile = tiles[World.hashCoords(coords)];
            tile.tint = 0xEEEEEE;
        });
    }
    public update(tiles) {
        // untint the current buffer
        this.unTintBuffer(tiles);

        // calculate the new buffer
        this.calculateCurrentSelection();

        this.tintBuffer(tiles);
    }
}
