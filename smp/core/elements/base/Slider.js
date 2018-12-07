// REQUIRES
//  import_util("Common");
//  import_util("Variables");
//  import_util("ui.Graphics");

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
        this.interactionArea.Width = window.Width - 4;
        this.interactionArea.Height = window.Height - 4;
    }
    
    onRender(graphics) {
        if (this.SHOULD_PAINT()) {
            const body = this.interactionArea;
            const rBody = this.renderArea;
        
            // Draws the "glow" around the slider.
            drawHollowBorderedRect(0, 0, rBody.Width - 1, rBody.Height - 1, InterfaceColors.LightLine, graphics);
        
            // Draws the black outline around the slider, and the background.
            drawBorderedRect(1, 1, rBody.Width - 3, rBody.Height - 2, InterfaceColors.Frame, InterfaceColors.DarkLine,
                             graphics);
        
            // Draws the border around the slider head.
            drawRect(body.X, body.Y, this.SLIDER_HEAD_POSITION() + 1, body.Height, InterfaceColors.LightLine, graphics);
        
            // Draws the gradient that goes from the start to the slider head position.
            drawBorderedGradientRect(body.X - 1, body.Y - 1, this.SLIDER_HEAD_POSITION(), body.Height + 2,
                                     InterfaceGradientColors.ProgressGradientStart,
                                     InterfaceGradientColors.ProgressGradientEnd, InterfaceColors.DarkLine, graphics);
        
            this.renderAdditional(graphics);
        }
    }
    
    renderAdditional(graphics) {}
    
    onMouseMove(x, y) {
        this.mouse.update(x, y);
        
        if (this.isDragging && this.inBounds) {
            if (this.PRECONDITIONS_PASS()) {
                this.dragAmount = x < 0 ? 0 : x > this.interactionArea.Width ? 1 : x / this.interactionArea.Width;
                this.updateValueFromMovement(this.dragAmount);
                window.Repaint();
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
    PRECONDITIONS_PASS() { return false; }
    
    /**
     * To be implemented by any child classes.
     * Determines whether or not the slider will actually render anything at all.
     *
     * @returns {boolean}
     */
    SHOULD_PAINT() { return false; }
    
    /**
     * To be implemented by any child classes.
     * Determines the position of the slider head. This is only used in rendering the actual shape.
     *
     * @returns {number}
     */
    SLIDER_HEAD_POSITION() { return -1; }
    
    /**
     * Mainly some syntatic sugar so that one doesn't need to write "this.interactionArea.inBounds(this.mouse);"
     * over and over again.
     *
     * @returns {boolean}
     */
    get inBounds() { return this.interactionArea.inBounds(this.mouse); }
}