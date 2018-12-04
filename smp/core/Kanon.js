// This is just for a nicer syntax for all the scripts that include this one.

class Kanon {
    
    get SKIN_PATH() { return `${fb.FoobarPath}skins\\Kanon\\`; }
    
    get CORE_PATH() { return `${this.SKIN_PATH}SMP\\core\\`; }
    
    get LEGACY_PATH() { return `${this.SKIN_PATH}SMP\\legacy\\jscript\\`; }
    
    get ASSETS_PATH() { return `${this.SKIN_PATH}SMP\\assets\\`; }
    
    get PANELS_PATH() { return `${this.SKIN_PATH}SMP\\panels\\`; }
    
    get VERSION() { return "2.0.0-alpha"; }
    
}

const kanon = new Kanon();