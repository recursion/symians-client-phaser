import * as Assets from '../assets';
import * as AssetUtils from '../utils/assetUtils';
export default class Preloader extends Phaser.State {
    private preloadBarSprite: Phaser.Sprite = null;
    private preloadFrameSprite: Phaser.Sprite = null;
    private infoText: Phaser.Text = null;
    private worldData = null;
    private socket = null;

    public preload(): void {
        this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadBar);
        // this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesHash.getName(), Assets.Atlases.AtlasesPreloadSpritesHash.Frames.PreloadBar);
        // this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesXml.getName(), Assets.Atlases.AtlasesPreloadSpritesXml.Frames.PreloadBar);
        this.preloadBarSprite.anchor.setTo(0, 0.5);
        this.preloadBarSprite.x -= this.preloadBarSprite.width * 0.5;

        this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadFrame);
        // this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesHash.getName(), Assets.Atlases.AtlasesPreloadSpritesHash.Frames.PreloadFrame);
        // this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesXml.getName(), Assets.Atlases.AtlasesPreloadSpritesXml.Frames.PreloadFrame);
        this.preloadFrameSprite.anchor.setTo(0.5);

        this.infoText = createText(this.game);
        this.game.load.setPreloadSprite(this.preloadBarSprite);
        AssetUtils.Loader.loadAllAssets(this.game, this.waitForSoundDecoding, this);
    }
    private waitForSoundDecoding(): void {
        AssetUtils.Loader.waitForSoundDecoding(this.startGame, this);
    }

    private startGame(): void {
        this.game.camera.onFadeComplete.addOnce(this.loadTitle, this);
        this.game.camera.fade(0x000000, 1000);
    }

    private loadTitle() {
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
