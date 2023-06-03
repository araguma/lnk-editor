import shellLink from './structures/shellLink.js';

class Shortcut {
    constructor(rawData) {
        this.properties = shellLink.decode(rawData);
    }
    get toBuffer() {
        return shellLink.encode(this);
    }
}

export default Object.freeze(Shortcut);