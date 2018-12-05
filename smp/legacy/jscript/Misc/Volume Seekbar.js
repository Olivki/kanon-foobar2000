include(`${fb.FoobarPath}skins\\Kanon\\SMP\\core\\utils\\Importer.js`);
window.DefinePanel("Volume Seekbar", { author: "Olivki" });

import_default("Helpers");
import_legacy("Essential.DrawingHelpers");
import_legacy("Essential.VariableHelpers");
import_legacy("Essential.ColorHelper");

const TextFont = gdi.Font("Segoe UI", 12);
let Dragging = 0;
let DraggingSeek = 0;
let HoveringSeek;
let HoveringPosition;
let Clicked = 0;

const Positions = {
    X: 0,
    Y: 0,
    Width: 0,
    Height: 0
};

function setPositions() {
    Positions.X = 0;
    Positions.Y = 0;
    Positions.Width = window.Width;
    Positions.Height = window.Height;
}

function on_size() {
    setPositions();
}

function on_paint(graphics) {
    const headTrackPosition = Positions.Width * Math.exp(0.04 * fb.Volume);
    const volumeText = "" + (Math.ceil(fb.Volume)) + " dB";
    
    graphics.SetTextRenderingHint(TextRenderingHint.ClearTypeGridFit);
    
    drawBorderedRect(0, 0, Positions.Width - 1, Positions.Height, InterfaceColors.Frame, InterfaceColors.DarkLine,
                     graphics);
    
    drawHollowBorderedRect(0, 1, headTrackPosition + 1, Positions.Height - 3, InterfaceColors.LightLine, graphics);
    
    drawBorderedGradientRect(0, 0, headTrackPosition, Positions.Height, 90,
                             InterfaceGradientColors.ProgressGradientStart, InterfaceGradientColors.ProgressGradientEnd,
                             InterfaceColors.DarkLine, graphics);
    
    graphics.DrawString(volumeText, TextFont, InterfaceColors.TextColor, 0, -1, Positions.Width, Positions.Height,
                        StringFormat(StringAlignment.Center, StringAlignment.Center));
    
    if (HoveringSeek) {
        const hoverFont = gdi.Font("Segoe UI", 10);
        const textWidth = graphics.CalcTextWidth(HoveringSeek, hoverFont) + 5;
        
        if ((HoveringPosition + textWidth) > Positions.Width) {
            HoveringPosition -= textWidth + 4;
        }
        
        drawHollowBorderedRect(HoveringPosition - 3, 2, textWidth + 4, Positions.Height - 5, InterfaceColors.LightLine,
                               graphics);
        
        drawBorderedGradientRect(HoveringPosition - 2, 3, textWidth + 2, Positions.Height - 6, 90,
                                 InterfaceGradientColors.ProgressGradientStart,
                                 InterfaceGradientColors.ProgressGradientEnd, InterfaceColors.DarkLine, graphics);
        
        graphics.DrawString(HoveringSeek, hoverFont, InterfaceColors.TextColor, HoveringPosition, 0, textWidth,
                            Positions.Height, StringFormat(StringAlignment.Center, StringAlignment.Center));
    }
    
}

function on_mouse_lbtn_down(x, y) {
    Dragging = 1;
    Clicked = 1;
    HoveringPosition = 0;
    
    on_mouse_move(x, y);
}

function on_mouse_lbtn_up(x, y) {
    if (Dragging) {
        on_mouse_move(x, y);
        Dragging = 0;
    }
    
    Clicked = 0;
}

function on_mouse_move(x, y) {
    window.SetCursor(IDC_HAND);
    
    if (Dragging) {
        let positionX = x / window.Width;
        positionX = (positionX < 0) ? 0 : (positionX < 1) ? positionX : 1;
        positionX = 25 * Math.log(positionX + 0.00001);
        
        if (fb.Volume !== positionX) {
            fb.Volume = positionX;
        }
    }
    
    HoveringSeek = null;
    HoveringSeek = x / window.Width;
    HoveringSeek = (HoveringSeek < 0) ? 0 : (HoveringSeek < 1) ? HoveringSeek : 1;
    HoveringSeek = 25 * Math.log(HoveringSeek + 0.00001);
    HoveringSeek = (Math.ceil(HoveringSeek)) + "dB";
    HoveringPosition = x + 4;
    
    window.Repaint();
}

function on_mouse_leave() {
    HoveringSeek = null;
    HoveringPosition = null;
    Clicked = 0;
    
    window.SetCursor(IDC_ARROW);
    window.Repaint();
}

function on_mouse_wheel(delta) {
    if (delta > 0) {
        fb.VolumeUp();
    } else {
        fb.VolumeDown();
    }
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