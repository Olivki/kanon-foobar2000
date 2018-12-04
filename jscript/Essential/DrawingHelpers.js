// ==PREPROCESSOR==
// @name "Drawing Helper"
// @author "Olivki"
// @version "1.0"
// @feature "File for helping with drawing stuff."
// ==/PREPROCESSOR==

/**
 * A function for drawing a horizontal line taken from Minecraft.
 * @param  {[type]} x        [Placement on the X axis.]
 * @param  {[type]} y        [Placement on the Y axis.]
 * @param  {[type]} length   [The length of the line.]
 * @param  {[type]} color    [The color of the line, given in HEX value.]
 * @param  {[type]} graphics [A instance of the graphics component needed to draw the rectangle.]
 * @return {[type]}          [null]
 */
function DrawHorizontalLine(x, y, length, color, graphics) {
	if (length < x) {
		var oldX = x;
		x = length;
		length = oldX;
	}

	//graphics.FillSolidRect(x, y, length + 1, y + 1, color);
	graphics.DrawLine(x, y, length, y, 1, color);
}

/**
 * A function for drawing a vertical line taken from Minecraft.
 * @param  {[type]} x        [Placement on the X axis.]
 * @param  {[type]} y        [Placement on the Y axis.]
 * @param  {[type]} height   [The height of the line.]
 * @param  {[type]} color    [The color of the line, given in HEX value.]
 * @param  {[type]} graphics [A instance of the graphics component needed to draw the rectangle.]
 * @return {[type]}          [null]
 */
function DrawVerticalLine(x, y, height, color, graphics) {
	if (height < y) {
		var oldY = y;
		y = height;
		height = oldY;
	}

	//graphics.FillSolidRect(x, y, x, height, color);
	graphics.DrawLine(x, y, x, height, 1, color);
}


/**
 * A wrapper for the FillSolidRect(...) function.
 * @param  {[type]} x           [Placement on the X axis.]
 * @param  {[type]} y           [Placement on the Y axis.]
 * @param  {[type]} width       [The width of the rectangle.]
 * @param  {[type]} height      [The height of the rectangle.]
 * @param  {[type]} innerColor  [The color of the rectangle in the middle.]
 * @param  {[type]} graphics    [A instance of the graphics component needed to draw the rectangle.]
 * @return {[type]}             [null]
 */
function DrawRect(x, y, width, height, innerColor, graphics) {
	graphics.FillSolidRect(x, y, width, height, innerColor);
}

/**
 * A wrapper for the FillGradRect(...) function.
 * @param  {[type]} x                  [Placement on the X axis.]
 * @param  {[type]} y                  [Placement on the Y axis.]
 * @param  {[type]} width              [The width of the rectangle.]
 * @param  {[type]} height             [The height of the rectangle.]
 * @param  {[type]} gradientColorStart [The color of the start point of the gradient.]
 * @param  {[type]} gradientColorEnd   [The color of the end point of the gradient.]
 * @param  {[type]} angle              [The angle at which the gradient will be drawn. 90 degrees is the angle for a normal gradient.]
 * @param  {[type]} graphics           [A instance of the graphics component needed to draw the rectangle.]
 * @return {[type]}                    [null]
 */
function DrawGradientRect(x, y, width, height, angle, gradientColorStart, gradientColorEnd, graphics) {
	graphics.FillGradRect(x, y, width, height, angle, gradientColorStart, gradientColorEnd);
}

/**
 * A function for drawing a rectangle with a border around it. Made to look like it should even when alpha values are used for the color.
 * @param  {[type]} x           [Placement on the X axis.]
 * @param  {[type]} y           [Placement on the Y axis.]
 * @param  {[type]} width       [The width of the rectangle.]
 * @param  {[type]} height      [The height of the rectangle.]
 * @param  {[type]} innerColor  [The color of the rectangle in the middle.]
 * @param  {[type]} borderColor [The color of the border sorrounding the rectangle.]
 * @param  {[type]} graphics    [A instance of the graphics component needed to draw the rectangle.]
 * @return {[type]}             [null]
 */
function DrawBorderedRect(x, y, width, height, innerColor, borderColor, graphics) {
	graphics.FillSolidRect(x, y, width, height, innerColor);
	DrawHollowBorderedRect(x, y, width, height - 1, borderColor, graphics);
	/*DrawVerticalLine(x, y, height - 1, borderColor, graphics);
	DrawVerticalLine(width - 1, y, height - 1, borderColor, graphics);
	DrawHorizontalLine(x + 1, y, width - 1, borderColor, graphics);
	DrawHorizontalLine(x + 1, height - 1, width - 1, borderColor, graphics);*/
}

/**
 * A wrapper for a meme.
 * @param  {[type]} x           [Placement on the X axis.]
 * @param  {[type]} y           [Placement on the Y axis.]
 * @param  {[type]} width       [The width of the rectangle.]
 * @param  {[type]} height      [The height of the rectangle.]
 * @param  {[type]} borderColor [The color of the border sorrounding the rectangle.]
 * @param  {[type]} graphics    [A instance of the graphics component needed to draw the rectangle.]
 * @return {[type]}             [null]
 */
function DrawHollowBorderedRect(x, y, width, height, borderColor, graphics) {
	graphics.DrawRect(x, y, width, height, 1, borderColor);
}

/**
 * A function for drawing a gradient rectangle with a border sorrounding it.
 * @param  {[type]} x                  [Placement on the X axis.]
 * @param  {[type]} y                  [Placement on the Y axis.]
 * @param  {[type]} width              [The width of the rectangle.]
 * @param  {[type]} height             [The height of the rectangle.]
 * @param  {[type]} gradientColorStart [The color of the start point of the gradient.]
 * @param  {[type]} gradientColorEnd   [The color of the end point of the gradient.]
 * @param  {[type]} borderColor        [The color of the border sorrounding the rectangle.]
 * @param  {[type]} angle              [The angle at which the gradient will be drawn. 90 degrees is the angle for a normal gradient.]
 * @param  {[type]} graphics           [A instance of the graphics component needed to draw the rectangle.]
 * @return {[type]}                    [null]
 */
function DrawBorderedGradientRect(x, y, width, height, angle, gradientColorStart, gradientColorEnd, borderColor, graphics) {
	DrawGradientRect(x, y, width, height, angle, gradientColorStart, gradientColorEnd, graphics);
	DrawHollowBorderedRect(x, y, width, height - 1, borderColor, graphics);
}