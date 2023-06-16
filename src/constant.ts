class Constant {
    static readonly REQUIED_HEADER_SIZE = 0x0000004C;
    static readonly REQUIRED_LINK_CLSID = '00021401-0000-0000-C000-000000000046';
    static readonly LINK_FLAGS = [
        'hasLinkTargetIDList',
        'hasLinkInfo',
        'hasName',
        'hasRelativePath',
        'hasWorkingDir',
        'hasArguments',
        'hasIconLocation',
        'isUnicode',
        'forceNoLinkInfo',
        'hasExpString',
        'runInSeparateProcess',
        'unused1',
        'hasDarwinID',
        'runAsUser',
        'hasExpIcon',
        'noPidlAlias',
        'unused2',
        'runWithShimLayer',
        'forceNoLinkTrack',
        'enableTargetMetadata',
        'disableLinkPathTracking',
        'disableKnownFolderTracking',
        'disableKnownFolderAlias',
        'allowLinkToLink',
        'unaliasOnSave',
        'preferEnvironmentPath',
        'keepLocalIDListForUNCTarget',
    ];
    static readonly FILE_ATTRIBUTE_FLAGS = [
        'FILE_ATTRIBUTE_READONLY',
        'FILE_ATTRIBUTE_HIDDEN',
        'FILE_ATTRIBUTE_SYSTEM',
        'Reserved1',
        'FILE_ATTRIBUTE_DIRECTORY',
        'FILE_ATTRIBUTE_ARCHIVE',
        'Reserved2',
        'FILE_ATTRIBUTE_NORMAL',
        'FILE_ATTRIBUTE_TEMPORARY',
        'FILE_ATTRIBUTE_SPARSE_FILE',
        'FILE_ATTRIBUTE_REPARSE_POINT',
        'FILE_ATTRIBUTE_COMPRESSED',
        'FILE_ATTRIBUTE_OFFLINE',
        'FILE_ATTRIBUTE_NOT_CONTENT_INDEXED',
        'FILE_ATTRIBUTE_ENCRYPTED',
    ];
    static readonly WINDOW_STATE_MAPPING = {
        0x00000001: 'SW_SHOWNORMAL',
        0x00000003: 'SW_SHOWMAXIMIZED',
        0x00000007: 'SW_SHOWMINNOACTIVE',
    };
    static readonly KEY_NAME_MAPPING = {
        0x30: '0',
        0x31: '1',
        0x32: '2',
        0x33: '3',
        0x34: '4',
        0x35: '5',
        0x36: '6',
        0x37: '7',
        0x38: '8',
        0x39: '9',
        0x41: 'A',
        0x42: 'B',
        0x43: 'C',
        0x44: 'D',
        0x45: 'E',
        0x46: 'F',
        0x47: 'G',
        0x48: 'H',
        0x49: 'I',
        0x4A: 'J',
        0x4B: 'K',
        0x4C: 'L',
        0x4D: 'M',
        0x4E: 'N',
        0x4F: 'O',
        0x50: 'P',
        0x51: 'Q',
        0x52: 'R',
        0x53: 'S',
        0x54: 'T',
        0x55: 'U',
        0x56: 'V',
        0x57: 'W',
        0x58: 'X',
        0x59: 'Y',
        0x5A: 'Z',
        0x70: 'F1',
        0x71: 'F2',
        0x72: 'F3',
        0x73: 'F4',
        0x74: 'F5',
        0x75: 'F6',
        0x76: 'F7',
        0x77: 'F8',
        0x78: 'F9',
        0x79: 'F10',
        0x7A: 'F11',
        0x7B: 'F12',
        0x7C: 'F13',
        0x7D: 'F14',
        0x7E: 'F15',
        0x7F: 'F16',
        0x80: 'F17',
        0x81: 'F18',
        0x82: 'F19',
        0x83: 'F20',
        0x84: 'F21',
        0x85: 'F22',
        0x86: 'F23',
        0x87: 'F24',
        0x90: 'NUM LOCK',
        0x91: 'SCROLL LOCK',
    };
    static readonly MODIFIER_FLAGS = [
        'SHIFT',
        'CTRL',
        'ALT',
    ];
    static readonly LINK_INFO_FLAGS = [
        'VolumeIDAndLocalBasePath',
        'CommonNetworkRelativeLinkAndPathSuffix',
    ];
    static readonly LINK_INFO_HEADER_SIZE_THRESHOLD = 0x00000024;
}

export default Object.freeze(Constant);