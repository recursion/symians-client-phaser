import * as Assets from '../assets';
import * as Socket from '../socket';

// setup some common colors;
const colors = {
    base: '#FFFFFF',
    green: '#00FF00',
    orange: '#FAFA00'
};

export default class Title extends Phaser.State {
    private title: Phaser.Text = null;
    private subTitle: Phaser.Text = null;
    private startButtonText: Phaser.Text = null;
    private colors = colors;
    private worldData = null;

    public init({ worldData, socket }) {
        this.worldData = worldData;
    }

    public create(): void {
        this.createTitleText();
        this.createStartButton();
    }

    private createTitleText() {
        this.initTitle();
        this.initSubTitle();

        this.setTextProps(this.title, 50, this.colors.green, true, true);
        this.setTextProps(this.subTitle, 10, this.colors.base, false, false);
    }

    private initTitle() {
        this.title = this.game.add.text(
            this.game.world.centerX,
            250,
            'Symians'
        );
    }
    private initSubTitle() {
        this.subTitle = this.game.add.text(
            this.game.world.centerX,
            300,
            'A big game, about little monkeys.'
        );
    }

    private setTextProps(el, size, color, isBold, hasShadow) {
        el.anchor.set(0.5);
        el.align = 'center';
        el.font = 'Arial Black';
        el.fontSize = size;
        el.fill = color;
        if (isBold) {
            el.fontWeight = 'bold';
        }
        if (hasShadow) {
            el.setShadow(1, 1, 'rgba(155, 155, 155, 1)');
        }
    }

    private createStartButton() {
        this.startButtonText = this.game.add.text(this.game.world.centerX, 350, 'Start');
        this.startButtonText.anchor.set(0.5);
        this.startButtonText.fontSize = 14;
        this.startButtonText.align = 'center';
        this.startButtonText.fill = this.colors.orange;
        this.startButtonText.stroke = '#000';
        this.startButtonText.setShadow(1, 1, 'rgba(255, 255, 255, 0.5)');
        this.startButtonText.setShadow(-1, -1, 'rgba(255, 255, 255, 0.5)');

        this.startButtonText.inputEnabled = true;
        this.startButtonText.events.onInputUp.add(() => {
            // nothing for now....
        });

        this.startButtonText.events.onInputOut.add(() => {
            this.startButtonText.fill = this.colors.green;
            this.startButtonText.setShadow(1, 1, 'rgba(255, 255, 255, 0.5)');
            this.startButtonText.setShadow(-1, -1, 'rgba(255, 255, 255, 0.5)');
        });

        this.startButtonText.events.onInputOver.add(() => {
            this.startButtonText.fill = '#00FF00';
            this.startButtonText.setShadow(1, 1, 'rgba(255, 255, 255, 0.5)');
            this.startButtonText.setShadow(-1, -1, 'rgba(0, 205, 205, 0.5)');
        });

        this.startButtonText.events.onInputDown.add(() => {
            this.game.camera.onFadeComplete.addOnce(this.startWorld, this);
            this.game.camera.fade(0x000000, 100);
        });

    }

    private startWorld() {
        this.state.start('worldView',
            true,
            false,
            {
                worldData: this.worldData
            }
        );
    }
}


