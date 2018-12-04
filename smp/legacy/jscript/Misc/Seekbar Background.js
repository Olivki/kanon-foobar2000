include(`${fb.FoobarPath}skins\\Kanon\\SMP\\core\\utils\\Importer.js`);
window.DefinePanel("Seekbar Background", { author: "Olivki" });

import_util("Common");
import_default("Helpers");
import_legacy("Essential.DrawingHelpers");
import_legacy("Essential.VariableHelpers");
import_legacy("Essential.ColorHelper");

const Positions = new Rectangle();

function setPositions() {
    Positions.Width = window.Width;
    Positions.Height = window.Height;
}

function on_size() {
    setPositions();
}

function on_paint(graphics) {
    DrawHollowBorderedRect(0, 0, Positions.Width - 1, Positions.Height - 1, InterfaceColors.LightLine, graphics);
    
    DrawBorderedRect(1, 1, Positions.Width - 3, Positions.Height - 2, InterfaceColors.Background,
                     InterfaceColors.DarkLine, graphics);
}

function on_mouse_leave() {
    window.Repaint();
}

function on_mouse_mbtn_down(x, y) {

}

function on_playback_time() {
    window.Repaint();
}

function on_playback_seek() {
    window.Repaint();
}

function on_playback_new_track(metadb) {
    window.Repaint();
}