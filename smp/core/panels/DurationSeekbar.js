include(`${fb.FoobarPath}skins\\Kanon\\SMP\\core\\utils\\Importer.js`);
window.DefinePanel("Duration Seekbar", { author: "Olivki" });

import_element("Seekbar");

const seekbar = new Seekbar();

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
    seekbar.onMiddleMouseButtonDown();
}

function on_playback_new_track(metadb) {
    seekbar.onPlaybackNewTrack();
}