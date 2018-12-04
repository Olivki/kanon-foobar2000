// ==PREPROCESSOR==
// @import "%fb2k_path%skins\Kanon\jscript\Essential\DrawingHelpers.js"
// @name "Hover Love Track"
// @author "Olivki"
// @version "1.0"
// @feature "Sets the rating of the currently playing track to either 5, or <not set> when hovering over the bottom part of the album cover."
// ==/PREPROCESSOR==

var MF_SEPARATOR = 0x00000800;
var MF_ENABLED = 0x00000000;
var MF_GRAYED = 0x00000001;
var MF_DISABLED = 0x00000002;
var MF_UNCHECKED = 0x00000000;
var MF_CHECKED = 0x00000008;
var MF_STRING = 0x00000000;
var MF_POPUP = 0x00000010;

var isHovering = false;
var isHoveringHeart = false;
var font = gdi.Font("Segoe UI", 30, 1);
var currentItem = fb.GetNowPlaying();
var trackRating = titleFormat("$if2(%rating%,0)", currentItem);

//var fontOutline = gdi.Font("Segoe UI", 32, 1);

var DT_CENTER = 0x00000001;
var DT_VCENTER = 0x00000004;
var DT_SINGLELINE = 0x00000020;
var DT_CALCRECT = 0x00000400;

var color = {
    //background: RGBA(36, 36, 36, 120),
    background: RGBA(41, 41, 41, 175),
    frame: RGB(27, 27, 27),
    progress1: RGB(52, 101, 164),
    progress2: RGB(52, 101, 164),
    progHead: RGB(168, 168, 168),
    lineDark: RGB(21, 21, 21),
    lineLight: RGB(43, 43, 43),
    textColor: RGB(233, 48, 49),
    textOutline: RGB(21, 21, 21)
};

function updatePosition() {
    //Seekbar
    position.x = 0;
    position.y = 0;
    position.w = window.Width;
    position.h = window.Height;
}

function on_size() {
    updatePosition();
}

var position = {
    //Seekbar
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    //Debug
    mouseX: 0,
    mouseY: 0
};

var StringAlignment = {
    Near: 0,
    Center: 1,
    Far: 2
};

function on_paint(gr) {
    var x = position.x;
    var y = position.y;
    var width = position.w;
    var height = position.h;
    var absoluteCenter = StringFormat(StringAlignment.Center, StringAlignment.Center);
    var textColor = null;
    currentItem = fb.GetNowPlaying();
    trackRating = titleFormat("$if2(%rating%,0)", currentItem);
    gr.SetTextRenderingHint(4);

    if (isHoveringHeart) {
        if (trackRating > 3) {
            textColor = RGB(212, 214, 216);
        } else {
            textColor = RGB(233, 48, 49);
        }
    } else if (trackRating > 3) {
        textColor = RGB(233, 48, 49);
    } else {
        textColor = RGB(212, 214, 216);
    }

    if (isHovering) {
        drawBorderedRect(x, y, width, height, color.background, color.lineDark, gr);
        gr.DrawString("♥", font, textColor, x, y, width, height - 1, absoluteCenter);
    }

    //drawBorderedRect(x, y, width, height, color.background, color.lineDark, gr);
    //gr.FillSolidRect(x + 21, y + 7, width - 42, height - 12, color.lineLight);
    //gr.DrawString("♥", font, textColor, x, y, width, height - 1, absoluteCenter);
}

function titleFormat(t, metadb) {
    if (!metadb) {
        return "";
    }

    var tfo = fb.TitleFormat(t);
    var str = tfo.EvalWithMetadb(metadb);
    tfo;

    return str;
}

function on_mouse_lbtn_down(x, y) {
    if (isHoveringHeart) {
        if (trackRating > 3) {
            fb.RunContextCommandWithMetadb("Playback Statistics/Rating/<not set>", currentItem);
            Console.log("Set rating to <not set>");
            window.Repaint();
        } else {
            fb.RunContextCommandWithMetadb("Playback Statistics/Rating/5", currentItem);
            Console.log("Set rating to 5");
            window.Repaint();
        }
    }
}

function on_mouse_rbtn_down(x, y) {
    if (isHoveringHeart) {
        var heartMenu = window.CreatePopupMenu();
        var trackRatingMenu = window.CreatePopupMenu();
        //trackRatingMenu.CheckMenuRadioItem(1, buttonIDTrack, false);

        //heartMenu.AppendMenuItem(MF_STRING, 1, "Track Rating");
        trackRatingMenu.AppendTo(heartMenu, MF_STRING, "Track Rating");
        heartMenu.AppendMenuItem(MF_SEPARATOR, 0, 0);
        heartMenu.AppendMenuItem(MF_STRING, 1, "Configure");

        trackRatingMenu.AppendMenuItem(MF_STRING, 2, "1");
        trackRatingMenu.AppendMenuItem(MF_STRING, 3, "2");
        trackRatingMenu.AppendMenuItem(MF_STRING, 4, "3");
        trackRatingMenu.AppendMenuItem(MF_STRING, 5, "4");
        trackRatingMenu.AppendMenuItem(MF_STRING, 6, "5");

        var heartMenuAction = heartMenu.TrackPopupMenu(x, y);

        switch (heartMenuAction) {
            case 0:
                break;

            case 1:
                window.ShowConfigure();
                break;

            case 2:
                fb.RunContextCommandWithMetadb("Playback Statistics/Rating/1", currentItem);
                break;

            case 3:
                fb.RunContextCommandWithMetadb("Playback Statistics/Rating/2", currentItem);
                break;

            case 4:
                fb.RunContextCommandWithMetadb("Playback Statistics/Rating/3", currentItem);
                break;

            case 5:
                fb.RunContextCommandWithMetadb("Playback Statistics/Rating/4", currentItem);
                break;

            case 6:
                fb.RunContextCommandWithMetadb("Playback Statistics/Rating/5", currentItem);
                break;
        }

        trackRatingMenu;
        heartMenu;
    }
}

function on_mouse_move(x, y) {
    var pX = position.x;
    var pY = position.y;
    var pWidth = position.w;
    var pHeight = position.h;

    isHovering = true;

    isHoveringHeart = isMouseHovering(x, y, pX + 21, pY + 7, pWidth - 42, pHeight - 12);

    if (isHoveringHeart) {
        window.SetCursor(32649);
    } else {
        window.SetCursor(32512);
    }

    window.Repaint();
}

function on_mouse_leave() {
    isHovering = false;
    isHoveringHeart = false;
    window.SetCursor(32512);
    window.Repaint();
}

function RGB(r, g, b) {
    return (0xff000000 | (r << 16) | (g << 8) | (b));
}

function RGBA(r, g, b, a) {
    return ((a << 24) | (r << 16) | (g <<
        8) | (b));
}

function isMouseHovering(x, y, pX, pY, pW, pH) {
    return x >= pX && y >= pY && x <= pX + pW && y <= pY + pH;
}

/* eslint-disable */
function StringFormat() {
    var h_align = 0,
        v_align = 0,
        trimming = 0,
        flags = 0;

    switch (arguments.length) {
        case 4:
            flags = arguments[3];
            break;

        case 3:
            trimming = arguments[2];
            break;

        case 2:
            v_align = arguments[1];
            break;

        case 1:
            h_align = arguments[0];
            break;

        default:
            return 0;
    }

    return ((h_align << 28) | (v_align << 24) | (trimming << 20) | flags);
}

/* eslint-enable */

function timeFormat(t) {
    var zpad = function (n) {
        var str = n.toString();
        return (str.length < 2) ? "0" + str : str;
    };

    var h = Math.floor(t / 3600);
    t -= h * 3600;
    var m = Math.floor(t / 60);
    t -= m * 60;
    var s = Math.floor(t);

    if (h > 0) {
        return h.toString() + ":" + zpad(m) + ":" + zpad(s);
    }

    return m.toString() + ":" + zpad(s);
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