include(`${fb.FoobarPath}skins\\Kanon\\SMP\\core\\Kanon.js`);
window.DefinePanel("Seekbar", { author: "Olivki" });

import_util("Common");
import_util("Variables");
import_util("ui.Colors");
import_util("ui.Graphics");
import_default("Helpers");
import_element("base.Slider");

Slider.prototype.updateValueFromClick = function (value) {
    fb.PlaybackTime = fb.PlaybackLength * this.dragAmount; // the this. here might not work like I think it should.
};

Slider.prototype.updateValueFromMouseWheel = function (delta) {
    switch (true) {
        case !fb.IsPlaying:
        case fb.PlaybackLength <= 0:
            break;
        case fb.PlaybackLength < 60:
            fb.PlaybackTime += delta * 5;
            break;
        case fb.PlaybackLength < 600:
            fb.PlaybackTime += delta * 10;
            break;
        default:
            fb.PlaybackTime += delta * 60;
            break;
    }
};

/**
 * @return {boolean}
 */
Slider.prototype.PRECONDITIONS_PASS = function () {
    return fb.IsPlaying && fb.PlaybackLength > 0;
};

/**
 * @return {boolean}
 */
Slider.prototype.SHOULD_PAINT = function () {
    return fb.PlaybackTime > 0;
};

/**
 * @return {number}
 */
Slider.prototype.SLIDER_HEAD_POSITION = function () {
    return Math.ceil(
        this.interactionArea.Width * (this.isDragging ? this.dragAmount : fb.PlaybackTime / fb.PlaybackLength));
};

const seekbar = new Slider();

function on_size() {
    seekbar.updateSize(window);
}

function on_paint(graphics) {
    seekbar.onRender(graphics);
}

function on_mouse_lbtn_down(x, y) {
    seekbar.onMousePressDown();
}

function on_mouse_lbtn_up(x, y) {
    seekbar.onMousePressUp();
}

function on_mouse_move(x, y) {
    seekbar.onMouseMove(x, y);
}

function on_mouse_leave() {
    seekbar.onMouseLeave();
}

function on_mouse_wheel(delta) {
    seekbar.onMouseWheel(delta);
}

function on_mouse_mbtn_down(x, y) {
    fb.PlayOrPause();
}

function on_playback_new_track(metadb) {
    seekbar.isDragging = false;
    window.Repaint();
}

// This NEEDS to be here, otherwise the seekbar will not actually be rendered correctly.
function on_playback_time() {
    window.Repaint();
}

function on_playback_seek() {
    window.Repaint();
}