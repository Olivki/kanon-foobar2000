// This is just for a nicer syntax for all the scripts that include this one.

const SKIN_PATH = `${fb.FoobarPath}skins\\Kanon\\`;
const CORE_PATH = `${SKIN_PATH}SMP\\core\\`;
const LEGACY_PATH = `${SKIN_PATH}SMP\\legacy\\jscript\\`;
const ASSETS_PATH = `${SKIN_PATH}SMP\\assets\\`;
const PANELS_PATH = `${SKIN_PATH}SMP\\panels\\`;
const VERSION = "2.0.0-alpha";


class Kanon {
    
    get SKIN_PATH() { return `${fb.FoobarPath}skins\\Kanon\\`; }
    
    get CORE_PATH() { return `${this.SKIN_PATH}SMP\\core\\`; }
    
    get LEGACY_PATH() { return `${this.SKIN_PATH}SMP\\legacy\\jscript\\`; }
    
    get ASSETS_PATH() { return `${this.SKIN_PATH}SMP\\assets\\`; }
    
    get PANELS_PATH() { return `${this.SKIN_PATH}SMP\\panels\\`; }
    
    get VERSION() { return "2.0.0-alpha"; }
    
}

//const kanon = new Kanon();

// Might move this to it's own file later, but for now it'll be here. Because this file will be included in most
// places where these things would actually be used, so they'll just be overwritten by default. I think.

/*String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) > 0;
};

String.prototype.contains = function (it) {
    return this.indexOf(it) > 0;
};*/