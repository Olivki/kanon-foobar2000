/**
 * A class for more easily keeping track of a pair of X & Y values.
 *
 * @see [The constructor]{@link Point#constructor}
 * @see {@link Rectangle}
 * @class
 * @author Olivki
 */
class Point {
    
    /**
     * @constructs
     * @param {?number} [x = 0] - Position on the X axis.
     * @param {?number} [y = 0] - Position on the Y axis.
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    
    /**
     * @returns {!number} - Returns the x position of the point.
     * @constructor
     */
    get X() { return this.x; }
    
    /**
     * Sets the [X]{@link Point#X} value of the point.
     * @param {!number} x - The new X value to set.
     * @constructor
     */
    set X(x) { this.x = x; }
    
    /**
     * @returns {!number} - Returns the y position of the point.
     * @constructor
     */
    get Y() { return this.y; }
    
    /**
     * Sets the [Y]{@link Point#Y} value of the point.
     * @param {!number} x - The new X value to set.
     * @constructor
     */
    set Y(x) { this.x = x; }
    
    /**
     * Updates both the x & y value at the same time.
     *
     * @param {!number} x
     * @param {!number} y
     */
    update(x, y) {
        this.x = x;
        this.y = y;
    }
    
    /**
     * Calculates the distance between this Point and another point.
     *
     * @param {!Point} point - The point to compare against.
     * @returns {number} - The distance between this point and the given point.
     */
    distance(point) {
        const dx = this.x - point.x;
        const dy = this.y - point.y;
        
        return Math.hypot(dx, dy);
    }
    
    /**
     * Calculates the distance between two points.
     *
     * @param {!Point} a - Point A
     * @param {!Point} b - Point B
     * @returns {number} - The distance between A and B.
     */
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        
        return Math.hypot(dx, dy);
    }
}

/**
 * A class for making it easier to work with properties that require; x, y, width & height values.
 *
 * @see [The constructor]{@link Rectangle#constructor}
 * @see {@link Point}
 * @extends Point
 * @author Olivki
 */
class Rectangle extends Point {
    
    /**
     * @param {number} [x = 0] - The position on the X axis.
     * @param {number} [y = 0] - The position on the Y axis.
     * @param {number} [width = 0] - The width of the rectangle.
     * @param {number} [height = 0] - The height of the rectangle.
     */
    constructor(x = 0, y = 0, width = 0, height = 0) {
        super(x, y);
        this.width = width;
        this.height = height;
    }
    
    /**
     * @returns {!number} - Returns the width of the rectangle.
     * @constructor
     */
    get Width() { return this.width; }
    
    set Width(width) { this.width = width; }
    
    /**
     * @returns {!number} - Returns the height of the rectangle.
     * @constructor
     */
    get Height() { return this.height; }
    
    set Height(height) { this.height = height; }
    
    /**
     * @returns {number} - Returns the width of the rectangle, combined with the [x]{@link Rectangle#x} value.
     */
    get POSITIONED_WIDTH() { return this.X + this.Width; }
    
    /**
     * @returns {number} - Returns the height of the rectangle, combined with the [y]{@link Rectangle#y} value.
     */
    get POSITIONED_HEIGHT() { return this.Y + this.Height; }
    
    /**
     * Checks whether the given parameters are within the bounds of this rectangle.
     *
     * @param {?number} x - Position on the X axis.
     * @param {?number} y - Position on the Y axis.
     * @param {?Point} point - A point instance.
     * @returns {boolean}
     * @throws Will throw an error if all of the parameters are undefined.
     */
    inBounds(x, y, point) {
        // Screw speed, I need my syntatic sugar.
        if (x === undefined || y === undefined && point !== undefined) {
            return isWithinBounds(point.x, point.y, this.x, this.y, this.width, this.height);
        } else if (point === undefined) {
            // noinspection JSCheckFunctionSignatures
            return isWithinBounds(x, y, this.x, this.y, this.width, this.height);
        }
        
        throw "None of the parameters are actually defined.";
    }
}

/**
 * Checks whether the given X and Y coordinates are within the bounds of the rectangle.
 *
 * @param {!number} x - Placement on the X axis.
 * @param {!number} y - Placement on the Y axis.
 * @param {!number} rectangleX - The rectangles placement on the X axis.
 * @param {!number} rectangleY - The rectangles placement on the Y axis.
 * @param {!number} rectangleWidth - The width of the rectangle.
 * @param {!number} rectangleHeight - The height of the rectangle.
 * @returns {boolean}
 * @author Olivki
 */
function isWithinBounds(x, y, rectangleX, rectangleY, rectangleWidth, rectangleHeight) {
    return x >= rectangleX && y >= rectangleY && x <= rectangleX + rectangleWidth && y <= rectangleY + rectangleHeight;
}

/**
 * A function for adding basic function overloading support.
 *
 * @author John Resig (MIT Licensed)
 * @param object {!Object} - The prototype of the class / constructor function you wish to add a function to.
 * @param name {!string} - The name of the function to be added.
 * @param func {!function} - An inline function instance.
 * @example
 * addFunction(Users.prototype, "find", function() {// Find all users...});
 * @example
 * addFunction(Users.prototype, "find", function(name) {// Find a user by name});
 * @example
 * addFunction(Users.prototype, "find", function(first, last) {// Find a user by first and last name});
 */
function addFunction(object, name, func) {
    const old = object[name];
    if (old) {
        object[name] = function () {
            if (func.length === arguments.length) {
                return func.apply(this, arguments);
            } else if (typeof old === "function") {
                return old.apply(this, arguments);
            }
        };
    } else {
        object[name] = func;
    }
}