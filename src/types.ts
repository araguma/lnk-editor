import { Flags } from './editor.js';

export type ShellLink = {
    headerSize: number;
    linkCLSID: string;
    linkFlags: Flags;
    fileAttributes: Flags;
    creationTime: bigint;
    accessTime: bigint;
    writeTime: bigint;
    fileSize: number;
    iconIndex: number;
    showCommand: string;
    hotKey: string;
}