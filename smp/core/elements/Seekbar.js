include(`${fb.FoobarPath}skins\\Kanon\\SMP\\core\\utils\\Importer.js`);

import_element("base.Slider");

/**
 * @extends Slider
 */
class Seekbar extends Slider {
    
    onPlaybackNewTrack() {
        this.isDragging = false;
    }
    
    onMiddleMouseButtonDown() {
        fb.PlayOrPause();
    }
    
    updateValueFromMovement(value) {
        utils.FormatDuration(fb.PlaybackLength * this.dragAmount);
    }
    
    updateValueFromClick(value) {
        fb.PlaybackTime = fb.PlaybackLength * this.dragAmount;
    }
    
    updateValueFromMouseWheel(delta) {
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
    
    get PRECONDITIONS_PASS() { return fb.IsPlaying && fb.PlaybackLength > 0; }
    
    get SHOULD_PAINT() { return fb.PlaybackTime > 0; }
    
    get SLIDER_HEAD_POSITION() {
        return Math.ceil(
            this.interactionArea.Width * (this.isDragging ? this.dragAmount : fb.PlaybackTime / fb.PlaybackLength));
    }
}