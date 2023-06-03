import Structure from '../structure.js';

const linkFlags = new Structure()
    .bit1('hasLinkTargetIDList')
    .bit1('hasLinkInfo')
    .bit1('hasName')
    .bit1('hasRelativePath')
    .bit1('hasWorkingDir')
    .bit1('hasArguments')
    .bit1('hasIconLocation')
    .bit1('isUnicode')
    .bit1('forceNoLinkInfo')
    .bit1('hasExpString')
    .bit1('runInSeparateProcess')
    .bit1('unused1')
    .bit1('hasDarwinID')
    .bit1('runAsUser')
    .bit1('hasExpIcon')
    .bit1('noPidlAlias')
    .bit1('unused2')
    .bit1('runWithShimLayer')
    .bit1('forceNoLinkTrack')
    .bit1('enableTargetMetadata')
    .bit1('disableLinkPathTracking')
    .bit1('disableKnownFolderTracking')
    .bit1('disableKnownFolderAlias')
    .bit1('allowLinkToLink')
    .bit1('unaliasOnSave')
    .bit1('preferEnvironmentPath')
    .bit1('keepLocalIDListForUNCTarget')
    .bit5('padding', {
        assert: 0,
    });

export default linkFlags;