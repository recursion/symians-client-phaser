import * as Assets from '../assets';
import Location from '../world/location';
import * as Input from '../app/input';
import * as zLevels from '../world/zLevels';
import * as World from '../world/world';
import Selector from '../app/selector';

export default class WorldView extends Phaser.State {
    private socket = null;
    private worldData = null;
    private hotkeys = null;
    private zLevels = null;
    private selector = null;
    private tiles = {};

    public init({ worldData }) {
        this.worldData = worldData;
    }

    public preload(): void {
        // add locations to their respective groups by zLevel
        this.zLevels = zLevels.init(this.game, this.worldData.dimensions.height);

        // setup camera movement / zLevel nagivation hotkeys
        this.hotkeys = Input.setup(this.game, this.zLevels);
    }


    public create(): void {
        this.selector = new Selector();
        this.tiles = World.createLocations(
            this.game,
            this.worldData.locations,
            this.zLevels,
            this.selector
        );
        this.selector.setTiles(this.tiles);
    }

    public update() {
        this.selector.update();
        Input.update(this.hotkeys, this.game, this.selector);
    }

    public render() {
        // this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }

}
