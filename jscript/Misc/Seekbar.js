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

var Dragging = false;
var DragSeek = 0;

var Positions = {
	X: 0,
	Y: 0,
	Width: 0,
	Height: 0,
	MouseX: 0,
	MouseY: 0
};

function UpdatePositions() {
	Positions.X = 0;
	Positions.Y = 0;
	Positions.Width = window.Width;
	Positions.Height = window.Height;
}

function on_size() {
	UpdatePositions();
	InitInjection();
}

function on_paint(graphics) {
	if (fb.PlaybackTime > 0) {
		/** Background to prevent redrawing issues. **/
		DrawRect(0, 1, Positions.Width, Positions.Height - 2,
			InterfaceColors.Frame, graphics);

		/** Draws the outline of the border.  */
		DrawRect(0, 1, getTrackHeadPosition() + 2, Positions.Height - 2,
			InterfaceColors.LightLine, graphics);

		/** Draws the stuff.  */
		DrawBorderedGradientRect(0, 0, getTrackHeadPosition(), Positions.Height, 90,
			InterfaceGradientColors.ProgressGradientStart, InterfaceGradientColors.ProgressGradientEnd,
			InterfaceColors.DarkLine, graphics);
	}
}

function getTrackHeadPosition() {
	return Math.ceil(Positions.Width * (Dragging ? DragSeek : fb.PlaybackTime / fb.PlaybackLength));
}

function on_mouse_lbtn_down(x, y) {
	Dragging = isWithinBounds(x, y, Positions.X, Positions.Y, Positions.Width, Positions.Height);
}

function on_mouse_lbtn_up(x, y) {
	if (Dragging) {
		Dragging = false;
		fb.PlaybackTime = fb.PlaybackLength * DragSeek;
	}
}

function on_mouse_move(x, y) {
	window.SetCursor(IDC_HAND);
	Positions.MouseX = x;
	Positions.MouseY = y;
	if (Dragging && isWithinBounds(x, y, Positions.X, Positions.Y, Positions.Width, Positions.Height)) {
		if (fb.IsPlaying && fb.PlaybackLength > 0) {
			DragSeek = x < 0 ? 0 : x > Positions.Width ? 1 : x / Positions.Width;
			utils.FormatDuration(fb.PlaybackLength * DragSeek);
			window.Repaint();
		}
	}
}

function on_mouse_leave() {
	window.SetCursor(IDC_ARROW);
	window.Repaint();
}

function on_mouse_wheel(delta) {
	if (isWithinBounds(Positions.MouseX, Positions.MouseY, Positions.X, Positions.Y, Positions.Width, Positions.Height)) {
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
	}
}

function on_mouse_mbtn_down(x, y) {
	fb.PlayOrPause();
}

function on_playback_time() {
	window.Repaint();
}

function on_playback_seek() {
	window.Repaint();
}

function on_playback_new_track(metadb) {
	Dragging = false;
	window.Repaint();
}