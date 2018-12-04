// ================================================================  
//         Volume Control for foobar2000   
//         using WSH Panel Mod component.  
//        Has hover-seek tooltip info effect.  
//  
// --- Script Engine ..............: JScript  
// --- Edge Style .................: None  
// --- Pseudo Transparent .........: Unchecked   
// --- Grab Focus .................: Checked  
// --- Delay Load .................: Unchecked  
// ================================================================  
var DT_CENTER = 0x00000001;
var DT_VCENTER = 0x00000004;
var DT_SINGLELINE = 0x00000020;
var DT_CALCRECT = 0x00000400;

var color = {
	background1: RGB(149, 149, 149),
	background2: RGB(119, 119, 119),
	frame: RGB(41, 41, 41),
	progress1: RGB(52, 101, 164),
	progress2: RGB(38, 71, 117),
	progHead: RGB(168, 168, 168),
	lineDark: RGB(21, 21, 21),
	lineLight: RGB(43, 43, 43),
	textColor: RGB(232, 234, 236)
};

function RGB(r, g, b) {
	return (0xff000000 | (r << 16) | (g <<
		8) | (b));
}

function RGBA(r, g, b, a) {
	return ((a << 24) | (r << 16) | (g <<
		8) | (b));
}

// gdi.Font is changed, the last paramter is style flags  
// FontStyleRegular = 0,  
// FontStyleBold = 1,  
// FontStyleItalic = 2,  
// FontStyleBoldItalic = 3,  
// FontStyleUnderline = 4,  
// FontStyleStrikeout = 8  
// Here we are using 2, meaning FontStyleItalic  
var g_font = gdi.Font("Segoe UI", 12);

var g_colors = new Array(
	RGB(36, 36, 36),
	RGB(52, 101, 164),
	RGB(38, 71, 117),
	RGB(111, 164, 195));

var g_drag = 0;
var g_drag_seek = 0;
var g_hover_seek;
var g_hover;
var g_clicked = 0;

//------------------------------------------------------------------------------ function on_paint(gr)  START  

function on_paint(gr) {
	gr.SetTextRenderingHint(4);
	var volume = fb.Volume;
	var ww = window.Width;
	var wh = window.Height;

	var pos = window.Width * Math.exp(0.04 * volume);

	var txt = "" + (Math.ceil(volume)) + " dB";

	gr.FillSolidRect(pos, 0, ww - pos, wh, color.frame);

	gr.FillSolidRect(0, 0, pos, wh - 1, color.lineLight);
	gr.FillSolidRect(0, 0, pos - 1, wh - 1, color.lineDark);
	gr.FillGradRect(0, 0, pos - 2, wh, 90, color.progress1, color.progress2);

	gr.DrawRect(0, 0, ww - 1, wh - 1, 1.0, color.lineDark);

	gr.GdiDrawText(txt, g_font, color.textColor, 0, 0, ww, wh, DT_CENTER | DT_VCENTER | DT_SINGLELINE);

	if (g_hover_seek) {
		var text_w = gr.CalcTextWidth(g_hover_seek, g_font) + 5;

		if ((g_hover + text_w) > ww) {
			g_hover -= text_w + 4;
		}

		gr.FillSolidRect(g_hover - 2, 3, text_w + 2, wh - 6, color.progress1);

		gr.GdiDrawText(g_hover_seek, g_font, color.textColor, g_hover, 4, text_w, wh - 8, DT_CENTER | DT_VCENTER |
			DT_SINGLELINE | DT_CALCRECT);
	}

}

//------------------------------------------------------------------------------ function on_paint(gr)  END  
function on_mouse_lbtn_down(x, y) {
	g_drag = 1;
	g_clicked = 1;
	g_hover = 0;

	on_mouse_move(x, y);
}

function on_mouse_lbtn_up(x, y) {
	if (g_drag) {
		on_mouse_move(x, y);
		g_drag = 0;
	}
	g_clicked = 0;
}

//NOTE------------------------------->   v = -100 * (1-v);               <--------- fb2k old linear scaling  
//NOTE------------------------------->   v = 25 *Math.log(v+0.00001);    <--------- fb2k logarithmic scaling (as used in default volume slider)  
function on_mouse_move(x, y) {
	window.SetCursor(32649);
	if (g_drag) {
		var v = x / window.Width;
		v = (v < 0) ? 0 : (v < 1) ? v : 1;
		v = 25 * Math.log(v + 0.00001);
		if (fb.Volume != v)
			fb.Volume = v;
	}
	g_hover_seek = null;
	g_hover_seek = x / window.Width;
	g_hover_seek = (g_hover_seek < 0) ? 0 :
		(g_hover_seek < 1) ? g_hover_seek : 1;
	g_hover_seek = 25 * Math.log(
		g_hover_seek + 0.00001);
	g_hover_seek = (Math.ceil(g_hover_seek)) +
		"dB";
	g_hover = x + 4;
	window.Repaint();
}

function on_mouse_leave() {
	g_hover_seek = null;
	g_hover = null;
	g_clicked = 0;
	window.SetCursor(32512);
	window.Repaint();
}

function on_mouse_wheel(delta) {
	if (delta > 0)
		fb.VolumeUp();
	else
		fb.VolumeDown();
}

function on_playback_new_track(info) {
	window.Repaint();
}

function on_playback_stop() {
	window.Repaint();
}

function on_playback_seek(time) {
	window.Repaint();
}

function on_playback_pause(state) {
	window.Repaint();
}

function on_playback_time(time) {
	window.Repaint();
}

function on_volume_change(val) {
	window.Repaint();
}