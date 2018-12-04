include(`${fb.FoobarPath}skins\\Kanon\\SMP\\core\\utils\\Importer.js`);

import_core("Kanon");
import_util("Common");
import_legacy("Essential.VariableHelpers");

/**
 * @author Olivki
 */
class Slider {
    
    constructor(renderString = true) {
        this.rectangle = new Rectangle();
        this.mouse = new Point();
        this.value = 0;
        this.isDragging = false;
        this.dragAmount = 0;
    }
    
    updateSize(window) {
        this.rectangle.Width = window.Width;
        this.rectangle.Height = window.Height;
    }
    
    render(graphics) {
    
    }
    
    onMouseMove(x, y) {
        if (this.inBounds) {
            this.mouse.update(x, y);
        }
    }
    
    onMousePressDown() {
        this.isDragging = this.inBounds;
    }
    
    onMousePressUp() {
    
    }
    
    get inBounds() { return this.rectangle.inBounds(this.mouse); }
}