import * as World from '../world/world';
import { TILE_SIZE } from '../world/location'

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
    private tiles = null;

    constructor() {
        this.selecting = false;
        this.selected = [];
        this.buffer = [];
        this.onOver = ({ x, y, z }) => {
            if (this.selecting) {
                this.calculateBuffer({ x, y, z })
            }
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
    private calculateBuffer({ x, y, z }) {
        let xDiff, yDiff, xStart, yStart;
        // reset the buffer before recalculating it
        this.buffer.map((coords) => {
            let tile = this.tiles[World.hashCoords(coords)];
            tile.tint = 0xFFFFFF;
        })
        this.buffer = [];
        this.current = { x, y, z };
        [xStart, xDiff] = (this.current.x > this.start.x)
            ? [this.start.x, (this.current.x - this.start.x)]
            : [this.current.x, (this.start.x - this.current.x)];

        [yStart, yDiff] = (this.current.y > this.start.y)
            ? [this.start.y, (this.current.y - this.start.y)]
            : [this.current.y, (this.start.y - this.current.y)];

        for (let x = xStart + 1; x < xStart + xDiff + 1; x++) {
            for (let y = yStart; y < yStart + yDiff; y++) {
                this.buffer.unshift({ x, y, z });
            }
        }
    }
    public setTiles(tiles) {
        this.tiles = tiles;
    }
    public update() {
        if (this.buffer) {
            this.buffer.concat(this.selected).map((coords) => {
                let tile = this.tiles[World.hashCoords(coords)];
                tile.tint = 0xEEEEEE;
            });
        }

    }
}
