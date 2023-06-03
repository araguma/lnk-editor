# lnk-editor
lnk-editor allows you to read, write, and validate all the properties of a Windows shortcut file. It follows the specifications and the naming conventions of [[MS-SHLLINK]](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-shllink/16cb4ca1-9339-4d0c-a68d-bf1d6cc0f943) version 7.0.

## Usage/Examples

```javascript

import fs from 'fs';
import Shortcut from 'lnk-editor';

// Read properties
let binaryData = fs.readFileSync('./link/to/shortcut.lnk');
const shortcut = new Shortcut(binaryData);
console.log(shortcut.properties);

// Edit properties
shortcut.properties.hotKey = 'F2';

// Save properties [Not Implemented Yet]
binaryData = shortcut.toBuffer();
fs.writeFileSync('./link/to/shortcut.lnk', binaryData);

```

## Progress
### Decoder
- [x] SHELL_LINK_HEADER
- [x] LINKTARGET_IDLIST
- [ ] LINKINFO
- [ ] STRING_DATA
- [ ] EXTRA_DATA
### Encoder
- [ ] SHELL_LINK_HEADER
- [ ] LINKTARGET_IDLIST
- [ ] LINKINFO
- [ ] STRING_DATA
- [ ] EXTRA_DATA
