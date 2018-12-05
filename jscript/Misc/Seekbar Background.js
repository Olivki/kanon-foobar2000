// ==PREPROCESSOR==
// @import "%fb2k_path%skins\Kanon\jscript\Essential\DrawingHelpers.js"
// @import "%fb2k_path%skins\Kanon\jscript\Essential\VariableHelpers.js"
// @import "%fb2k_path%skins\Kanon\jscript\Essential\Utils.js"
// @import "%fb2k_path%skins\Kanon\jscript\Essential\ColorHelper.js"
// @name "Seekbar"
// @author "Olivki"
// @version "1.0"
// @feature "The seekbar for the currently playing track, you move it and stuff."
// ==/PREPROCESSOR==

var Positions = {
	X: 0,
	Y: 0,
	Width: 0,
	Height: 0
};

function UpdatePositions() {
	Positions.X = 0;
	Positions.Y = 0;
	Positions.Width = window.Width;
	Positions.Height = window.Height;
}

function on_size() {
	UpdatePositions();
}

function on_paint(graphics) {
	drawHollowBorderedRect(0, 0, Positions.Width - 1, Positions.Height - 1,
                           InterfaceColors.LightLine, graphics);

	drawBorderedRect(1, 1, Positions.Width - 3, Positions.Height - 2,
                     InterfaceColors.Background, InterfaceColors.DarkLine, graphics);
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