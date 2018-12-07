include(`${fb.FoobarPath}skins\\Kanon\\SMP\\core\\utils\\Logger.js`);

// This is just for a nicer syntax for all the scripts that include this one.
class Kanon {
    
    get SKIN_PATH() { return `${fb.FoobarPath}skins\\Kanon\\`; }
    
    get CORE_PATH() { return `${this.SKIN_PATH}SMP\\core\\`; }
    
    get LEGACY_PATH() { return `${this.SKIN_PATH}SMP\\legacy\\jscript\\`; }
    
    get ASSETS_PATH() { return `${this.SKIN_PATH}SMP\\assets\\`; }
    
    get PANELS_PATH() { return `${this.SKIN_PATH}SMP\\panels\\`; }
    
    get VERSION() { return "2.0.0-alpha"; }
    
}

// Note to self:
// If file A has an instance in file B, and both need to include file C, file B should be the one to include it.
// Otherwise things will hit the fan.

const kanon = new Kanon();
const log = new Logger("Kanon");

/**
 * Includes any file inside the docs directory for the Spider Monkey Panel component that match the given name.
 *
 * @param {!string} name - The name of the JS file, excluding the ".js".
 * @author Olivki
 */
function import_default(name) {
    include(`${fb.ComponentPath}docs\\${name.replace(".", "\\")}.js`);
}

/**
 * Includes any file inside the core directory inside the Kanon skin directory.
 * Also includes any files inside any sub-folders if given the correct syntax.
 *
 * @example
 * import_element("files.Reader");
 * @example
 * import_element("files\\Reader");
 * @param {!string} name - The name of the JS file, excluding the ".js".
 * @author Olivki
 */
function import_core(name) {
    include(`${kanon.CORE_PATH}${name.replace(".", "\\")}.js`);
}

/**
 * Includes any file inside the util directory inside the core directory.
 * Also includes any files inside any sub-folders if given the correct syntax.
 *
 * @example
 * import_util("Logger");
 * @example
 * import_util("files.Reader");
 * @param {!string} name - The name of the JS file, excluding the ".js".
 * @author Olivki
 */
function import_util(name) {
    import_core(`utils\\${name}`);
}

/**
 * Includes any file inside the element directory inside the core directory.
 * Also includes any files inside any sub-folders if given the correct syntax.
 *
 * @example
 * import_element("VolumeSlider");
 * @example
 * import_element("base.Slider");
 * @param {!string} name - The name of the JS file, excluding the ".js".
 * @author Olivki
 */
function import_element(name) {
    import_core(`elements\\${name}`);
}

/**
 * Includes any file inside the core directory inside the Kanon skin directory.
 * Also includes any files inside any sub-folders if given the correct syntax.
 *
 * @example
 * import_legacy("DoomsdayMachine");
 * @example
 * import_legacy("Essential.VariableHelpers");
 * @param {!string} name - The name of the JS file, excluding the ".js".
 * @author Olivki
 */
function import_legacy(name) {
    include(`${kanon.LEGACY_PATH}${name.replace(".", "\\")}.js`);
}

/**
 * Includes any file inside the core directory inside the samples directory inside the component folder for the
 * Spider Monkey Panel component. These are essentially all made by marc2003.
 * Also includes any files inside any sub-folders if given the correct syntax.
 *
 * @example
 * import_sample("DoomsdayMachine");
 * @example
 * import_sample("Essential.VariableHelpers");
 * @param {!string} name - The name of the JS file, excluding the ".js".
 * @author Olivki
 */
function import_sample(name) {
    include(`${fb.ComponentPath}samples\\${name.replace(".", "\\")}.js`);
}

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) > 0;
};

String.prototype.contains = function (it) {
    return this.indexOf(it) > 0;
};