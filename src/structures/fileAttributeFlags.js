import Structure from '../structure.js';

const fileAttributeFlags = new Structure()
    .bit1('FILE_ATTRIBUTE_READONLY')
    .bit1('FILE_ATTRIBUTE_HIDDEN')
    .bit1('FILE_ATTRIBUTE_SYSTEM')
    .bit1('Reserved1')
    .bit1('FILE_ATTRIBUTE_DIRECTORY')
    .bit1('FILE_ATTRIBUTE_ARCHIVE')
    .bit1('Reserved2')
    .bit1('FILE_ATTRIBUTE_NORMAL')
    .bit1('FILE_ATTRIBUTE_TEMPORARY')
    .bit1('FILE_ATTRIBUTE_SPARSE_FILE')
    .bit1('FILE_ATTRIBUTE_REPARSE_POINT')
    .bit1('FILE_ATTRIBUTE_COMPRESSED')
    .bit1('FILE_ATTRIBUTE_OFFLINE')
    .bit1('FILE_ATTRIBUTE_NOT_CONTENT_INDEXED')
    .bit1('FILE_ATTRIBUTE_ENCRYPTED')
    .bit17('padding', {
        assert: 0,
    });

export default fileAttributeFlags;