/**
 * First of all, there's no actual need for this to even be a .js file, but fuck it.
 *
 * All this is, is just some basic standards I've laid out to keep all the files looking somewhat cohesive rather than just a garbled mess.
 *
 * - GLOBAL VARIABLES -
 * - If they're used for something like a Flag code, like most of the variables in VariableHelper.js, then write them in all caps and separate with a _.
 * var FILE_ATTRIBUTE_READONLY = 0x00000001;
 *
 * - If they're just a normal variable, Pascal case (UpperCamelCase) is used.
 * var HoverHeart = false;
 * - If the variable is an array, the variables inside of that array will also use Pascal case.
 * var FontStyle = {
 * 		Regular: 0,
 * 		Bold: 1,
 * 		Italic: 2,
 * 		ItalicBold: 3,
 * 		Underline: 4,
 * 		Strikeout: 8
 * };
 *
 * - LOCAL VARIABLES -
 * - Local variables will make use of camel case (lowerCamelCase), to differentiate them for the global variables.
 * var currentItem = fb.GetNowPlaying();
 *
 * - FUNCTIONS -
 * - Constructor variables are to be written the same way the local variables are, that is, in camel case.
 * function ...(keyInput, directInput) {
 * 		PrintOut("Key: " + keyInput + ", Direct Input: " + directInput + ".");
 * }
 *
 * - Function names are to be written with Pascal case, just like the global variables that are for Flag codes.
 * function DoubleUp(number) {
 * 		return number * 2;
 * }
 * - EXCEPT if they are a getter, setter, or starts with "is". In that case, they will use camel case, because it looks better.
 * getRGB(red, green, blue) {
 * 		...
 * }
 *
 * isString(text) {
 * 		...
 * }
 *
 * - GENERAL NOTES -
 * - Try to keep the code clean and readable.
 * - Use logical variable names, nothing like "var var1 = 0;" or "var k2 = false;", it just looks bad and makes the code hard to read.
 * - Try to comment what stuff does, to increase readability.
 * - Try to not lose your sanity, hang in there, me.
 */