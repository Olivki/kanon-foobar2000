// TODO: Fix up the comments for this.

/**
 * A function for drawing a horizontal line taken from Minecraft.
 * @param x        [Placement on the X axis.]
 * @param y        [Placement on the Y axis.]
 * @param length   [The length of the line.]
 * @param color    [The color of the line, given in HEX value.]
 * @param graphics [A instance of the graphics component needed to draw the rectangle.]
 */
function drawHorizontalLine(x, y, length, color, graphics) {
    if (length < x) {
        const oldX = x;
        x = length;
        length = oldX;
    }
    
    graphics.DrawLine(x, y, length, y, 1, color);
}

/**
 * A function for drawing a vertical line taken from Minecraft.
 * @param x        [Placement on the X axis.]
 * @param y        [Placement on the Y axis.]
 * @param height   [The height of the line.]
 * @param color    [The color of the line, given in HEX value.]
 * @param graphics [A instance of the graphics component needed to draw the rectangle.]
 */
function drawVerticalLine(x, y, height, color, graphics) {
    if (height < y) {
        const oldY = y;
        y = height;
        height = oldY;
    }
    
    graphics.DrawLine(x, y, x, height, 1, color);
}


/**
 * A wrapper for the FillSolidRect(...) function.
 * @param x           [Placement on the X axis.]
 * @param y           [Placement on the Y axis.]
 * @param width       [The width of the rectangle.]
 * @param height      [The height of the rectangle.]
 * @param innerColor  [The color of the rectangle in the middle.]
 * @param graphics    [An instance of the graphics component needed to draw the rectangle.]
 */
function drawRect(x, y, width, height, innerColor, graphics) {
    graphics.FillSolidRect(x, y, width, height, innerColor);
}

/**
 * A wrapper for the FillGradRect(...) function.
 * @param x
 * @param y                  [Placement on the Y axis.]
 * @param width              [The width of the rectangle.]
 * @param height             [The height of the rectangle.]
 * @param gradientColorStart [The color of the start point of the gradient.]
 * @param gradientColorEnd   [The color of the end point of the gradient.]
 * @param angle              [The angle at which the gradient will be drawn. 90 degrees is the angle for a normal
 *     gradient.]
 * @param graphics           [A instance of the graphics component needed to draw the rectangle.]
 */
function drawGradientRect(x, y, width, height, gradientColorStart, gradientColorEnd, graphics, angle = 90) {
    graphics.FillGradRect(x, y, width, height, angle, gradientColorStart, gradientColorEnd);
}

/**
 * A function for drawing a rectangle with a border around it. Made to look like it should even when alpha values are
 * used for the color.
 * @param x           [Placement on the X axis.]
 * @param y           [Placement on the Y axis.]
 * @param width       [The width of the rectangle.]
 * @param height      [The height of the rectangle.]
 * @param innerColor  [The color of the rectangle in the middle.]
 * @param borderColor [The color of the border sorrounding the rectangle.]
 * @param graphics    [A instance of the graphics component needed to draw the rectangle.]
 */
function drawBorderedRect(x, y, width, height, innerColor, borderColor, graphics) {
    graphics.FillSolidRect(x, y, width, height, innerColor);
    drawHollowBorderedRect(x, y, width, height - 1, borderColor, graphics);
}

/**
 * A wrapper for a meme.
 * @param x           [Placement on the X axis.]
 * @param y           [Placement on the Y axis.]
 * @param width       [The width of the rectangle.]
 * @param height      [The height of the rectangle.]
 * @param borderColor [The color of the border sorrounding the rectangle.]
 * @param graphics    [A instance of the graphics component needed to draw the rectangle.]
 */
function drawHollowBorderedRect(x, y, width, height, borderColor, graphics) {
    graphics.DrawRect(x, y, width, height, 1, borderColor);
}

/**
 * A function for drawing a gradient rectangle with a border sorrounding it.
 * @param x                  [Placement on the X axis.]
 * @param y                  [Placement on the Y axis.]
 * @param width              [The width of the rectangle.]
 * @param height             [The height of the rectangle.]
 * @param gradientColorStart [The color of the start point of the gradient.]
 * @param gradientColorEnd   [The color of the end point of the gradient.]
 * @param borderColor        [The color of the border sorrounding the rectangle.]
 * @param angle              [The angle at which the gradient will be drawn. 90 degrees is the angle for a normal
 *     gradient.]
 * @param graphics           [A instance of the graphics component needed to draw the rectangle.]
 */
function drawBorderedGradientRect(x, y, width, height, gradientColorStart, gradientColorEnd, borderColor, graphics,
                                  angle = 90) {
    drawGradientRect(x, y, width, height, gradientColorStart, gradientColorEnd, graphics, angle);
    drawHollowBorderedRect(x, y, width, height - 1, borderColor, graphics);
}

function drawCenteredString(text, rectangle, color, font, graphics) {
    graphics.SetTextRenderingHint(TextRenderingHint.ClearTypeGridFit); // AntiAliasGridFit
    graphics.DrawString(text, font, color, 0, 0, rectangle.Width, rectangle.Height,
                        StringFormat(StringAlignment.Center, StringAlignment.Center));
}