include(`${fb.FoobarPath}skins\\Kanon\\SMP\\core\\Kanon.js`);

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
    include(`${CORE_PATH}${name.replace(".", "\\")}.js`);
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
    include(`${LEGACY_PATH}${name.replace(".", "\\")}.js`);
}