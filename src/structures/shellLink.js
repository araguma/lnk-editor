import Constant from '../constant.js';
import Structure from '../structure.js';
import Assert from '../assert.js';
import Format from '../format.js';

import linkFlags from './linkFlags.js';
import fileAttributeFlags from './fileAttributeFlags.js';
import hotKey from './hotKey.js';
import linkTargetIDList from './linkTargetIDList.js';

const shellLink = new Structure()
    .endianness('little')

    // ShellLinkHeader
    .uint32('headerSize', {
        assert: Constant.REQUIED_HEADER_SIZE,
    })
    .buffer('linkCLSID', {
        length: 16,
        formatter: Format.linkCLSID,
    })
    .nest('linkFlags', {
        type: linkFlags,
        formatter: Format.linkFlags,
    })
    .nest('fileAttributes', {
        type: fileAttributeFlags,
        formatter: Format.fileAttributeFlags,
    })
    .uint64('creationTime', {
        formatter: Format.filetime,
    })
    .uint64('accessTime', {
        formatter: Format.filetime,
    })
    .uint64('writeTime', {
        formatter: Format.filetime,
    })
    .uint32('fileSize')
    .int32('iconIndex')
    .uint32('showCommand', {
        formatter: Format.showcommand,
    })
    .nest('hotKey', {
        type: hotKey,
        formatter: Format.hotKey,
    })
    .buffer('reserved1', {
        length: 2,
        assert: Assert.emptyBuffer,
    })
    .buffer('reserved2', {
        length: 4,
        assert: Assert.emptyBuffer,
    })
    .buffer('reserved3', {
        length: 4,
        assert: Assert.emptyBuffer,
    })

    // LinkTargetIDList
    .choice('linkTargetIDList', {
        tag: 'linkFlags.hasLinkTargetIDList',
        choices: {
            0: null,
            1: linkTargetIDList,
        },
    })

export default shellLink;