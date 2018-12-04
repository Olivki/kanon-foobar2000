// ==PREPROCESSOR==
// @name "Utils"
// @author "Olivki & marc2003"
// @version "1.0"
// @feature "File for various functions that are useful."
// ==/PREPROCESSOR==

const App = new ActiveXObject("Shell.Application");
const WshShell = new ActiveXObject("WScript.Shell");
const FileSystem = new ActiveXObject("Scripting.FileSystemObject");

/**
 * A wrapper around the Console.log() function to mark output with the name of the skin.
 * @param {Object} output [The output that's desired to be printed out.]
 */
function PrintOut(output) {
    Console.log("[Kanon] " + output);
}

/**
 * "Opens" a file for reading.
 * @param {File} file [The file to read.]
 */
function OpenFile(file) {
    return utils.ReadTextFile(file);
}

/**
 * Checks to see whether the Object that's being passed is a String or not.
 * @param    {Object} text [The Object that's going to be checked.]
 * @return    {Boolean}    [Whether it's a String or not.]
 */
function isString(text) {
    return typeof text === "string" || text instanceof String;
}

/**
 * Checks whether the Object is a File or not.
 * @param  {Object}  file [The Object that's going to be checked.]
 * @return {Boolean}      [Returns whether the Object is a file or not.]
 */
function isFile(file) {
    return isString(file) ? FileSystem.FileExists(file) : false;
}

/**
 * Checks whether the Object is a Folder or not.
 * @param  {Object}  folder [The Object that's going to be checked.]
 * @return {Boolean}        [Returns whether the Object is a folder or not.]
 */
function isFolder(folder) {
    return isString(folder) ? FileSystem.FolderExists(folder) : false;
}

/**
 * Checks whether the given X and Y coordinates are within the bounds of the rectangle.
 * @param  {Number}     x               [Placement on the X axis.]
 * @param  {Number}  y               [Placement on the Y axis.]
 * @param  {Number}  rectangleX      [The rectangles placement on the X axis.]
 * @param  {Number}  rectangleY      [The rectangles placement on the Y axis.]
 * @param  {Number}  rectangleWidth  [The width of the rectangle.]
 * @param  {Number}  rectangleHeight [The height of the rectangle.]
 * @return {Boolean}                 [Returns whether the X & Y coordinates are within the bounds of the rectangle.]
 */
function isWithinBounds(x, y, rectangleX, rectangleY, rectangleWidth, rectangleHeight) {
    return x >= rectangleX && y >= rectangleY && x <= rectangleX + rectangleWidth && y <= rectangleY + rectangleHeight;
}

/**
 * Get's the date the file was modified last.
 * @param  {File}    file [The file to check.]
 * @return {String}      [The last modified date.]
 */
function getLastModified(file) {
    return isFile(file) ? Date.parse(FileSystem.Getfile(file).DateLastModified) : "<NOT A FILE>";
}

/**
 * Set's the rating of a track.
 * @param {Object} rating [The rating to be given. 0-5]
 * @param {Object} track  [description]
 */
function setTrackRating(rating, track) {
    if (rating > 5) {
        PrintOut("Rating is too high, it can only be between 0 and 5. Aborting.");
        return;
    }
    
    if (rating <= 0) {
        rating = "<not set>";
    }
    
    fb.RunContextCommandWithMetadb("Playback Statistics/Rating/" + rating, track);
    PrintOut("Set rating of \'" + TitleFormat("%title% by %artist%", track) + "\' to " +
             (rating === "<not set>" ? "0" : rating) + ".");
}

/**
 * Parses JSON value to return clean data.
 * @param {String} value [The JSON data.]
 */
function JSONParse(value) {
    try {
        const data = JSON.parse(value);
        return data;
    } catch (exception) {
        return [];
    }
}

/**
 * Parses and entire .json file and returns the clean data.
 * @param {File} file [The .json file to parse.]
 */
function JSONParseFile(file) {
    return JSONParse(OpenFile(file));
}

/**
 * Pushes a title through foobars title formatting.
 * @param    {String} title    [The title that's going to be formatted.]
 * @param    {Object} metadb    [The metadb instance.]
 * @return    {String}        [The formatted title.]
 */
function TitleFormat(title, metadb) {
    if (!metadb) {
        return "";
    }
    
    const tempTitleFormat = fb.TitleFormat(title);
    return tempTitleFormat.EvalWithMetadb(metadb);
}

/**
 * A function designed to be used with the StringAlignment variable in VariableHelpers.js
 * @return {number}
 */
function StringFormat() {
    let horizontalAlign = 0, verticalAlign = 0, trimming = 0, flags = 0;
    
    switch (arguments.length) {
        case 4:
            flags = arguments[3];
            break;
        
        case 3:
            trimming = arguments[2];
            break;
        
        case 2:
            verticalAlign = arguments[1];
            break;
        
        case 1:
            horizontalAlign = arguments[0];
            break;
        
        default:
            return 0;
    }
    
    return ((horizontalAlign << 28) | (verticalAlign << 24) | (trimming << 20) | flags);
}

/**
 * Converts a long time number into a readable format. (1:32:40, 5:32)
 * @param  {Number} time [The time to be converted.]
 * @return {String}     [The converted time.]
 */
function TimeFormat(time) {
    const hours = Math.floor(time / 3600);
    time -= hours * 3600;
    
    const minutes = Math.floor(time / 60);
    time -= minutes * 60;
    
    const seconds = Math.floor(time);
    
    if (hours > 0) {
        return hours.toString() + ":" + ZeroPad(minutes) + ":" + ZeroPad(seconds);
    }
    
    return minutes.toString() + ":" + ZeroPad(seconds);
}

/**
 * Pads single digit numbers with a zero. (4 -> 04)
 * @param    {Number} number [The number to be padded.]
 * @return    {String}        [The padded number.]
 */
function ZeroPad(number) {
    const tempString = number.toString();
    return (tempString.length < 2) ? "0" + tempString : tempString;
}

/**
 * A function for converting a position to a volume based on the human hearing curve.
 * @param    {Number} position [The position that will be converted into volume.]
 * @return    {Number}        [Value: -100 <= vol <= 0]
 */
function PositionToVolume(position) {
    return 50 * Math.log(0.99 * pos + 0.01) / Math.LN10;
}

/**
 * The inverse of the PositionToVolume fucntion.
 * @param {Number} volume [The volume that will be converted into a position.]
 * @return {number}
 */
function VolumeToPosition(volume) {
    return (Math.pow(10, v / 50) - 0.01) / 0.99;
}