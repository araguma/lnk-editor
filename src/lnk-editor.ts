import { Buffer } from 'node:buffer';
import Constant from './constant.js';
import { Editor } from './editor.js';
import { ShellLink } from './types.js';

const lnkEditor = new Editor<ShellLink>()
    .int('headerSize', { length: 4 })
    .clsid('linkCLSID')
    .flags('linkFlags', { length: 4, flagNames: Constant.LINK_FLAGS })
    .flags('fileAttributes', { length: 4, flagNames: Constant.FILE_ATTRIBUTE_FLAGS })
    .filetime('creationTime')
    .filetime('accessTime')
    .filetime('writeTime')
    .int('fileSize', { length: 4 })
    .int('iconIndex', { length: 4, signed: true })
    .mapping('showCommand', { length: 4, mapping: Constant.WINDOW_STATE_MAPPING })

export default lnkEditor;