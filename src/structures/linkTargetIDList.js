import Structure from '../structure.js';
import Assert from '../assert.js';

const itemID = new Structure()
    .endianness('little')
    .uint16('itemIDSize')
    .buffer('data', {
        length: 'itemIDSize - 2',
    });

const linkTargetIDList = new Structure()
    .endianness('little')
    .uint16('idListSize')
    .array('idList', {
        type: itemID,
        lengthInBytes: 'idListSize - 2',
    })
    .uint16('terminalID', {
        assert: Assert.zero,
    });

const linkTargetIDListChoices = {
    0: null,
    1: linkTargetIDList,
}

export default linkTargetIDList;
export { linkTargetIDListChoices };