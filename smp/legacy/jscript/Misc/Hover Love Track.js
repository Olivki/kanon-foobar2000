// ==PREPROCESSOR==
// @import "%fb2k_path%skins\Kanon\jscript\Essential\DrawingHelpers.js"
// @import "%fb2k_path%skins\Kanon\jscript\Essential\VariableHelpers.js"
// @import "%fb2k_path%skins\Kanon\jscript\Essential\Utils.js"
// @import "%fb2k_path%skins\Kanon\jscript\Essential\ColorHelper.js"
// @name "Hover Love Track"
// @author "Olivki"
// @version "1.0"
// @feature "Sets the rating of the currently playing track to either 5, or <not set> when hovering over the bottom part of the album cover."
// ==/PREPROCESSOR==

var Hovering = false;
var HeartHover = false;
var TextFont = gdi.Font("Segoe UI", 30, 1);
var TextColor = BasicColors.White;
var CurrentItem = fb.GetNowPlaying();
var TrackRating = TitleFormat("$if2(%rating%,0)", CurrentItem);

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
	OnUpdate();
	graphics.SetTextRenderingHint(TextRenderingHint.AntiAlias);

	if (Hovering) {
		DrawBorderedRect(0, 0, Positions.Width, Positions.Height, HoverInterfaceColors.Background, InterfaceColors.DarkLine, graphics);
		graphics.DrawString("♥", TextFont, TextColor, 0, 0, Positions.Width, Positions.Height - 2,
			StringFormat(StringAlignment.Center, StringAlignment.Center));
	}
}

function OnUpdate() {
	CurrentItem = fb.GetNowPlaying();
	TrackRating = TitleFormat("$if2(%rating%,0)", CurrentItem);

	if (HeartHover) {
		if (TrackRating > 3) {
			TextColor = HoverInterfaceColors.ActiveHeartHighlight;
		} else {
			TextColor = HoverInterfaceColors.InactiveHeartHighlight;
		}
	} else if (TrackRating > 3) {
		TextColor = HoverInterfaceColors.ActiveHeart;
	} else {
		TextColor = HoverInterfaceColors.InactiveHeart;
	}
}

function on_mouse_lbtn_down(x, y) {
	if (HeartHover) {
		setTrackRating(TrackRating > 3 ? 0 : 5, CurrentItem);
		window.Repaint();
	}
}

function on_mouse_rbtn_down(x, y) {
	if (HeartHover) {
		var heartMenu = window.CreatePopupMenu();
		var trackRatingMenu = window.CreatePopupMenu();

		trackRatingMenu.AppendTo(heartMenu, MF_STRING, "Track Rating");
		heartMenu.AppendMenuItem(MF_SEPARATOR, 0, 0);
		heartMenu.AppendMenuItem(MF_STRING, 1, "Configure");

		// - Rating Buttons -
		trackRatingMenu.AppendMenuItem(MF_STRING, 2, "1");
		trackRatingMenu.AppendMenuItem(MF_STRING, 3, "2");
		trackRatingMenu.AppendMenuItem(MF_STRING, 4, "3");
		trackRatingMenu.AppendMenuItem(MF_STRING, 5, "4");
		trackRatingMenu.AppendMenuItem(MF_STRING, 6, "5");

		var heartMenuAction = heartMenu.TrackPopupMenu(x, y);

		switch (heartMenuAction) {
			case 1:
				window.ShowConfigure();
				//fb.ShowConsole();
				break;
		}

		if (heartMenuAction > 1) {
			setTrackRating(heartMenuAction - 1, CurrentItem);
		}

		trackRatingMenu;
		heartMenu;
	}
}

function on_mouse_move(x, y) {
	Hovering = true;

	HeartHover = isWithinBounds(x, y, Positions.X + 21, Positions.Y + 7, Positions.Width - 42, Positions.Height - 12);

	window.SetCursor(HeartHover ? IDC_HAND : IDC_ARROW);

	window.Repaint();
}

function on_mouse_leave() {
	Hovering = false;
	HeartHover = false;
	window.SetCursor(IDC_ARROW);
	window.Repaint();
}

function on_playback_time(time) {
	window.Repaint();
}