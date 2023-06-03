import Structure from '../structure.js';

const highByte = new Structure()
    .endianness('little')
    .bit1('SHIFT')
    .bit1('CTRL')
    .bit1('ALT')
    .bit5('padding', {
        assert: 0,
    });
    
const hotKey = new Structure()
    .endianness('little')
    .uint8('lowByte')
    .nest('highByte', {
        type: highByte,
    });

export default hotKey;