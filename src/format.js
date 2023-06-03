import Constant from './constant.js';

class Format {
    static clsid(clsidRaw) {
        clsidRaw.set(clsidRaw.subarray(0, 4).reverse(), 0);
        const clsidHex = clsidRaw.toString('hex').toUpperCase();
        return `${clsidHex.slice(0, 8)}-${clsidHex.slice(8, 12)}-${clsidHex.slice(12, 16)}-${clsidHex.slice(16, 20)}-${clsidHex.slice(20)}`;
    }

    // ShellLinkHeader
    static linkCLSID(linkCLSIDRaw) {
        const formatted = Format.clsid(linkCLSIDRaw);
        if(formatted !== Constant.REQUIRED_LINK_CLSID)
            throw new Error(`Invalid linkCLSID: ${formatted}`);
        return formatted;
    }
    static linkFlags(linkFlagsRaw) {
        delete linkFlagsRaw.padding;
        return linkFlagsRaw;
    }
    static fileAttributeFlags(fileAttributeFlagsRaw) {
        delete fileAttributeFlagsRaw.padding;
        return fileAttributeFlagsRaw;
    }
    static filetime(ntTimestamp) {
        if(ntTimestamp === 0)
            return `Unavailable`;

        const unixTimestamp = ntTimestamp / 10000n - 11644473600000n;
        if(unixTimestamp > Number.MAX_SAFE_INTEGER)
            throw new Error(`Time elapsed is too big to format: ${unixTimestamp}`);

        return new Date(Number(unixTimestamp)).toString();
    }
    static showcommand(code) {
        const formatted = Constant.WINDOW_STATE_MAPPING[code];
        if(formatted === undefined)
            throw new Error(`Invalid ShowCommand code: ${code}`);
        return formatted;
    }
    static hotKey(hotKeyRaw) {
        const keyCode = hotKeyRaw.lowByte;
        const key = Constant.KEY_NAME_MAPPING[keyCode];
        const modifiers = hotKeyRaw.highByte;

        if(keyCode === 0)
            return 'No keystroke assigned';
        if(key === undefined)
            throw new Error(`Invalid key code: ${keyCode}`);
        
        delete hotKeyRaw.highByte.padding;

        let formatted = '';
        for(const modifier in modifiers)
            if(modifiers[modifier])
                formatted += `${modifier} + `;
        formatted += key;
        return formatted;
    }

    // LinkTargetIDList
    
}

export default Object.freeze(Format);