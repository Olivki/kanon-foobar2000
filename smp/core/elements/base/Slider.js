include(`${fb.FoobarPath}skins\\Kanon\\SMP\\core\\utils\\Importer.js`);

import_util("Common");
import_util("Variables");
import_util("ui.Graphics");
//import_legacy("Essential.VariableHelpers");

/**
 * @author Olivki
 */
class Slider {
    
    constructor() {
        this.interactionArea = new Rectangle();
        this.renderArea = new Rectangle();
        this.mouse = new Point();
        this.value = 0;
        this.isDragging = false;
        this.dragAmount = 0;
    }
    
    updateSize(window) {
        this.renderArea.Width = window.Width;
        this.renderArea.Height = window.Height;
        
        this.interactionArea.X = 2;
        this.interactionArea.Y = 2;
        this.interactionArea.Width = window.Width - 2;
        this.interactionArea.Height = window.Height - 2;
    }
    
    onRender(graphics) {
        if (this.SHOULD_PAINT) {
            const body = this.interactionArea;
            
            /** Background to prevent redrawing issues. **/
            drawRect(0, 1, body.Width, body.Height - 2, InterfaceColors.Frame, graphics);
            
            /** Draws the outline of the border.  */
            drawRect(0, 1, this.SLIDER_HEAD_POSITION + 2, body.Height - 2, InterfaceColors.LightLine, graphics);
            
            /** Draws the stuff.  */
            drawBorderedGradientRect(0, 0, this.SLIDER_HEAD_POSITION, body.Height,
                                     InterfaceGradientColors.ProgressGradientStart,
                                     InterfaceGradientColors.ProgressGradientEnd, InterfaceColors.DarkLine, graphics);
            
            this.renderText(graphics);
        }
    }
    
    renderText(graphics) {}
    
    onMouseMove(x, y) {
        this.mouse.update(x, y);
        
        if (this.isDragging && this.inBounds) {
            if (this.PRECONDITIONS_PASS) {
                this.dragAmount = x < 0 ? 0 : x > this.interactionArea.Width ? 1 : x / this.interactionArea.Height;
                this.updateValueFromMovement(this.dragAmount);
            }
        } else if (this.inBounds) {
            window.SetCursor(IDC_HAND);
        }
    }
    
    onMouseLeave() {
        window.SetCursor(IDC_ARROW);
    }
    
    onMousePressDown() {
        this.isDragging = this.inBounds;
    }
    
    onMousePressUp() {
        if (this.isDragging) {
            this.updateValueFromClick(this.dragAmount);
            this.isDragging = false;
        }
    }
    
    onMouseWheel(delta) {
        if (this.inBounds) {
            this.updateValueFromMouseWheel(delta);
        }
    }
    
    updateValueFromMovement(value) {}
    
    updateValueFromClick(value) {}
    
    updateValueFromMouseWheel(delta) {}
    
    /**
     * To be implemented by any child classes.
     * Determines whether or not the slider will actually drag.
     *
     * @returns {boolean}
     */
    get PRECONDITIONS_PASS() { return false; }
    
    /**
     * To be implemented by any child classes.
     * Determines whether or not the slider will actually render anything at all.
     *
     * @returns {boolean}
     */
    get SHOULD_PAINT() { return false; }
    
    /**
     * To be implemented by any child classes.
     * Determines the position of the slider head. This is only used in rendering the actual shape.
     *
     * @returns {number}
     */
    get SLIDER_HEAD_POSITION() { return -1; }
    
    /**
     * Mainly some syntatic sugar so that one doesn't need to write "this.interactionArea.inBounds(this.mouse);"
     * over and over again.
     *
     * @returns {boolean}
     */
    get inBounds() { return this.interactionArea.inBounds(this.mouse); }
}