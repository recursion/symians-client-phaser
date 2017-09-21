import * as zLevels from '../world/zLevels';


const CAMERA_SPEED = 5;

const HOTKEY_DEFAULTS = {
    up: Phaser.Keyboard.W,
    down: Phaser.Keyboard.S,
    left: Phaser.Keyboard.A,
    right: Phaser.Keyboard.D,
    zUp: Phaser.Keyboard.R,
    zDown: Phaser.Keyboard.F,
};

export const update = (hotkeys, game, selector) => {
    if (game.input.activePointer.leftButton.isDown) {
        selector.selecting = true;
    }
    if (hotkeys.up.isDown) {
        game.camera.y -= CAMERA_SPEED;
    }
    else if (hotkeys.down.isDown) {
        game.camera.y += CAMERA_SPEED;
    }

    if (hotkeys.left.isDown) {
        game.camera.x -= CAMERA_SPEED;
    }
    else if (hotkeys.right.isDown) {
        game.camera.x += CAMERA_SPEED;
    }
}
export const setup = (game, zLayers) => {
    const hotkeys = { up: null, down: null, left: null, right: null, zUp: null, zDown: null };

    hotkeys.up = game.input.keyboard.addKey(HOTKEY_DEFAULTS.up);

    hotkeys.down = game.input.keyboard.addKey(HOTKEY_DEFAULTS.down);

    hotkeys.left = game.input.keyboard.addKey(HOTKEY_DEFAULTS.left);

    hotkeys.right = game.input.keyboard.addKey(HOTKEY_DEFAULTS.right);

    hotkeys.zUp = game.input.keyboard.addKey(HOTKEY_DEFAULTS.zUp);

    hotkeys.zDown = game.input.keyboard.addKey(HOTKEY_DEFAULTS.zDown);

    hotkeys.zUp.onDown.add(() => zLevels.moveUp(zLayers));
    hotkeys.zDown.onDown.add(() => zLevels.moveDown(zLayers));

    return hotkeys;
}
