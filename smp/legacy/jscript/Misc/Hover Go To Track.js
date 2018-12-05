// ==PREPROCESSOR==
// @import "%fb2k_path%skins\Kanon\jscript\Essential\DrawingHelpers.js"
// @import "%fb2k_path%skins\Kanon\jscript\Essential\VariableHelpers.js"
// @import "%fb2k_path%skins\Kanon\jscript\Essential\Utils.js"
// @import "%fb2k_path%skins\Kanon\jscript\Essential\ColorHelper.js"
// @name "Hover Go To Track"
// @author "Olivki"
// @version "1.0"
// @feature "Goes to the currently playing track."
// ==/PREPROCESSOR==

/// <reference path="./../../docs/js/foo_spider_monkey_panel.js">

var Hovering = false;
var TextFont = gdi.Font("Segoe UI", 10, 1);

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
    graphics.SetTextRenderingHint(TextRenderingHint.AntiAlias);

    if (Hovering) {
        drawBorderedRect(0, 0, Positions.Width, Positions.Height, HoverInterfaceColors.Background, InterfaceColors.DarkLine, graphics);
        graphics.DrawString("Go to track", TextFont, InterfaceColors.TextColor, 0, 0, Positions.Width, Positions.Height - 1, StringFormat(StringAlignment.Center, StringAlignment.Center));
    }
}

function on_mouse_lbtn_down(x, y) {
    var currentFocusedPlaylist = plman.ActivePlaylist;
    var currentFocusedItem = plman.GetPlaylistFocusItemIndex(currentFocusedPlaylist);
    var playingItemLocation = plman.GetPlayingItemLocation();
    var playlistIndex = playingItemLocation.PlaylistIndex;
    var playlistItemIndex = playingItemLocation.PlaylistItemIndex;

    if (playingItemLocation.IsValid) {
        if (!(currentFocusedPlaylist === playlistIndex)) {
            PrintOut("Switching from playlist #" + currentFocusedPlaylist + " to #" + playlistIndex + ".");
            plman.ActivePlaylist = playlistIndex;
        }

        if (!(currentFocusedItem === playlistItemIndex)) {
            PrintOut("Deselecting item #" + currentFocusedItem + " and selecting item #" + playlistItemIndex + ".");
            plman.SetPlaylistSelectionSingle(currentFocusedPlaylist, currentFocusedItem, false);
            plman.SetPlaylistFocusItem(playlistIndex, playlistItemIndex);
            plman.SetPlaylistSelectionSingle(playlistIndex, playlistItemIndex, true);
        }
    }
}

function on_mouse_move(x, y) {
    Hovering = true;

    window.SetCursor(IDC_HAND);

    window.Repaint();
}

function on_mouse_leave() {
    Hovering = false;
    window.SetCursor(IDC_ARROW);
    window.Repaint();
}

function on_playback_time(time) {
    window.Repaint();
}