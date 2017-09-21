import * as Assets from '../assets';
import * as AssetUtils from '../utils/assetUtils';


export default class Preloader extends Phaser.State {
    private preloadBarSprite: Phaser.Sprite = null;
    private preloadFrameSprite: Phaser.Sprite = null;
    private infoText: Phaser.Text = null;

    public preload(): void {
        this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX,
            this.game.world.centerY,
            Assets.Atlases.AtlasesPreloadSpritesArray.getName(),
            Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadBar);

        this.preloadBarSprite.anchor.setTo(0, 0.5);
        this.preloadBarSprite.x -= this.preloadBarSprite.width * 0.5;

        this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX,
            this.game.world.centerY,
            Assets.Atlases.AtlasesPreloadSpritesArray.getName(),
            Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadFrame);

        this.preloadFrameSprite.anchor.setTo(0.5);

        this.game.load.atlasXML(Assets.Atlases.AtlasesSpritesheetTiles.getName(),
            Assets.Atlases.AtlasesSpritesheetTiles.getPNG(),
            Assets.Atlases.AtlasesSpritesheetTiles.getXML());

        this.infoText = createText(this.game);
        this.game.load.setPreloadSprite(this.preloadBarSprite);

        AssetUtils.Loader.loadAllAssets(this.game, this.waitForSoundDecoding, this);
    }
    private waitForSoundDecoding(): void {
        AssetUtils.Loader.waitForSoundDecoding(this.startGame, this);
    }

    private startGame(): void {
        this.game.camera.onFadeComplete.addOnce(this.trans, this);
        this.game.camera.fade(0x000000, 1000);
    }

    private trans() {
        console.log('Trans......')
        this.game.time.events.add(1000, this.loadTitle, this);
    }
    private loadTitle() {
        console.log('Fat!')
        this.game.state.start('title');
    }
}

const createText = (game) => {
    const infoText = game.add.text(game.world.centerX, 200, ' Loading... ');
    infoText.anchor.set(0.5);
    infoText.align = 'center';
    infoText.font = 'Arial Black';
    infoText.fontSize = 50;
    infoText.fontWeight = 'bold';
    infoText.fill = '#FFFFFF';
    infoText.setShadow(0, 0, 'rgba(255, 255, 255, 0.5)');
    return infoText;
};
