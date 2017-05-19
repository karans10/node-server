export class Logger {
    private static debug: boolean;

    static setDebugMode(debug?: boolean) {
        if (debug != null) {
            this.debug = debug;
        }else {
            this.debug = false;
        }
    }

    static log (msg: string): void {
        if (this.debug) {
            console.log((new Date()), msg);
        }
    }

    static logResponse(msg: string): string {
        this.log(msg);
        return (new Date()) + ': ' + msg;
    }
}
