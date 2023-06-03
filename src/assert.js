class Assert {
    static emptyBuffer(buffer) {
        for(let i = 0; i < buffer.length; i ++)
            if(buffer[i] !== 0)
                return false;
        return true;
    }
    static zero(num) {
        return num === 0;
    }
}

export default Object.freeze(Assert);