class Logger {
    
    constructor(name) {
        this.name = name;
    }
    
    log(type, output) {
        console.log(`[${this.name} ${type}] ${JSON.parse(JSON.stringify(output))}`);
    }
    
    debug(output) {
        this.log("DEBUG", output);
    }
    
    info(output) {
        this.log("INFO", output);
    }
    
    error(output) {
        this.log("ERROR", output);
    }
    
    warn(output) {
        this.log("WARN", output);
    }
    
    trace(output) {
        this.log("TRACE", output);
    }
}