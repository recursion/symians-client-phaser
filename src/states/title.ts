import * as Assets from '../assets';
import * as Socket from '../socket';

const logger = (msg) => console.log(msg);

export default class Title extends Phaser.State {
    private title: Phaser.Text = null;
    private startButtonText: Phaser.Text = null;
    private worldData = null;
    private socket = null;

    public create(): void {
        this.title = createTitleText(this.game);
        this.initSocket();

        this.startButtonText = this.game.add.text(this.game.world.centerX, 300, 'Start');
        this.startButtonText.anchor.set(0.5);
        this.startButtonText.fontSize = 25;
        this.startButtonText.align = 'center';
        this.startButtonText.fill = '#FFFFFF';
        this.startButtonText.setShadow(1, 1, 'rgba(0, 0, 0, 0.5)');
        this.startButtonText.setShadow(-1, -1, 'rgba(0, 0, 0, 0.5)');

        this.startButtonText.inputEnabled = true;
        this.startButtonText.events.onInputUp.add(() => up(this.startButtonText), this);
        this.startButtonText.events.onInputOut.add(() => out(this.startButtonText), this);
        this.startButtonText.events.onInputOver.add(() => over(this.startButtonText), this);
        this.startButtonText.events.onInputDown.add(() => this.actionOnClick(), this);
        this.startButtonText.visible = false;
    }

    private actionOnClick() {
        this.state.start('worldView', true, false, { worldData: this.worldData, socket: this.socket });
    }
    private loadWorld(worldData) {
        console.log('Loading bitches', worldData);
        this.worldData = worldData;
        this.game.world.resize(worldData.dimensions.width * 64, worldData.height * 64);
        this.startButtonText.visible = true;
    }

    private initSocket(): void {

        this.socket = Socket.init();

        Socket.createChannel(this.socket, 'system:chat', [{ event: 'new:msg', handler: logger }]);
        Socket.createChannel(this.socket, 'system:',
            [{ event: 'world', handler: this.loadWorld.bind(this) },
            { event: 'token', handler: logger }
            ]);
    }
}
const createTitleText = (game) => {
    const infoText = game.add.text(game.world.centerX, 150, ' Symians! ');
    infoText.anchor.set(0.5);
    infoText.align = 'center';
    infoText.font = 'Arial Black';
    infoText.fontSize = 50;
    infoText.fontWeight = 'bold';
    infoText.fill = '#FFFFFF';
    infoText.setShadow(1, 1, 'rgba(155, 155, 155, 1)');
    return infoText;
};


function up(text) {
    console.log('button up', arguments);
}

function over(text) {
    text.setShadow(1, 1, 'rgba(255, 0, 0, 0.5)');
    text.setShadow(-1, -1, 'rgba(255, 0, 0, 0.5)');
}

function out(text) {
    text.setShadow(1, 1, 'rgba(0, 0, 0, 0.5)');
    text.setShadow(-1, -1, 'rgba(0, 0, 0, 0.5)');
}

