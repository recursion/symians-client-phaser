import * as Assets from '../assets';
import * as AssetUtils from '../utils/assetUtils';
import * as Socket from '../socket';
import * as World from '../world/world';

const logger = (msg) => console.log(msg);
const tileAssets = Assets.Atlases.AtlasesSpritesheetTiles;
const preloadBarAssets = Assets.Atlases.AtlasesPreloadSpritesArray;

export default class Preloader extends Phaser.State {
    private preloadBarSprite: Phaser.Sprite = null;
    private preloadFrameSprite: Phaser.Sprite = null;
    private infoText: Phaser.Text = null;
    private gameData = {
        socket: null,
        worldData: null,
    };

    public preload(): void {
        this.initSocket();
        this.preloadBar();

        this.game.load.atlasXML(
            tileAssets.getName(),
            tileAssets.getPNG(),
            tileAssets.getXML()
        );

        this.createText();

        this.game.load.setPreloadSprite(
            this.preloadBarSprite
        );

        AssetUtils.Loader.loadAllAssets(
            this.game,
            this.waitForSoundDecoding,
            this
        );
    }

    private preloadBar() {
        this.preloadBarSprite = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            preloadBarAssets.getName(),
            preloadBarAssets.Frames.PreloadBar
        );

        this.preloadBarSprite.anchor.setTo(0, 0.5);
        this.preloadBarSprite.x -= this.preloadBarSprite.width * 0.5;

        this.preloadFrameSprite = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            preloadBarAssets.getName(),
            preloadBarAssets.Frames.PreloadFrame
        );

        this.preloadFrameSprite.anchor.setTo(0.5);
    }

    private waitForSoundDecoding(): void {
        AssetUtils.Loader.waitForSoundDecoding(
            this.waitForWorldData,
            this
        );
    }

    private startGame(): void {
        this.game
            .camera
            .onFadeComplete
            .addOnce(this.loadTitle, this);

        this.game.camera.fade(0x000000, 500);
    }


    // callback for recieving a world data message
    private loadWorld(worldData) {
        this.gameData.worldData = worldData;
    }

    // set up the socket,
    // connect to it,
    // create some channels
    // and and initialize a few event handlers
    private initSocket(): void {
        this.gameData.socket = Socket.init();
        Socket.createChannel(
            this.gameData.socket,
            'system:chat',
            [{ event: 'new:msg', handler: logger }]
        );
        Socket.createChannel(
            this.gameData.socket,
            'system:',
            [
                {
                    event: 'world',
                    handler: this.loadWorld.bind(this)
                },
                { event: 'token', handler: logger }
            ]
        );
    }

    // fire off a timer to check if we have world data yet
    private waitForWorldData() {
        this.game.time.events.add(
            50,
            this.checkForWorldData,
            this
        );
    }


    // check to see if we have world data yet
    // if we do, start the game
    // if we dont, call waitForWorldData
    private checkForWorldData() {
        if (this.gameData.worldData) {
            this.startGame();

        } else {
            this.waitForWorldData();
        }
    }

    // load the title state
    // pass it along the world data we recieved over the socket
    private loadTitle() {
        this.game.state.start(
            'title',
            true,
            false,
            this.gameData
        );
    }

    // create a big 'loading...' text sprite
    private createText = () => {
        this.infoText =
            this.game.add.text(
                this.game.world.centerX,
                200,
                ' Loading... '
            );

        this.infoText.anchor.set(0.5);
        this.infoText.align = 'center';
        this.infoText.font = 'Arial Black';
        this.infoText.fontSize = 50;
        this.infoText.fontWeight = 'bold';
        this.infoText.fill = '#FFFFFF';
        this.infoText.setShadow(0, 0, 'rgba(255, 255, 255, 0.5)');
    }
}
