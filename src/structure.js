import { Parser } from 'binary-parser';

class Structure extends Parser {
    decode(buffer) {
        return super.parse(buffer);
    }
    encode(properties) {
        throw new Error('encode is not implemented yet');
    }
}

export default Object.freeze(Structure);