import { Buffer } from 'node:buffer';

interface Codec<T> {
    decode: (encoded: Buffer, options?: Options<T>) => T;
    encode: (decoded: T, options?: Options<T>) => Buffer;
}

type DecodeContext<T> = {
    offset: number;
    decoded: Partial<T>;
}

type EncodeContext<T> = {
    decoded: Partial<T>;
    encoded: Buffer[];
}

type Options<T> = {
    length?: number;
    signed?: boolean;
    flagNames?: string[];
    mapping?: Record<number, string>
    codec?: Codec<any | undefined>;
}

type Field<T> = {
    label: keyof T;
    codec: Codec<T[keyof T] | undefined>;
    options: Options<T>;
}

type KeyType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

export type Flags = {
    [key: string]: boolean;
}

export class Editor<T extends object> implements Codec<Partial<T>> {
    structure: Field<T>[] = [];
    decode(encoded: Buffer) {
        const context: DecodeContext<T> = {
            offset: 0,
            decoded: {},
        }
        this.structure.forEach((field) => {
            context.decoded[field.label] = field.codec.decode.call(context, encoded, field.options);
        });
        return context.decoded;
    }
    encode(decoded: Partial<T>) {
        const context: EncodeContext<T> = {
            decoded: decoded,
            encoded: [],
        }
        this.structure.forEach((field) => {
            context.encoded.push(field.codec.encode.call(context, context.decoded[field.label], field.options));
        });
        return Buffer.concat(context.encoded);
    }
    private addField(label: keyof T, codec: Codec<T[keyof T] | undefined>, options: Options<T>) {
        this.structure.push({
            label: label,
            codec: codec,
            options: options,
        });
        return this;
    }
    int(label: KeyType<T, number>, options: Options<T> = {}) {
        return this.addField(label, Editor.intCodec as Codec<T[keyof T] | undefined>, options);
    }
    static intCodec: Codec<number | undefined> = {
        decode: function(this: DecodeContext<unknown>, encoded, options) {
            const byteLength = options?.length ?? 0;
            const decodeFn = options?.signed ? encoded.readIntLE : encoded.readUIntLE;
            const decoded = decodeFn.call(encoded, this.offset, byteLength);
            this.offset += byteLength;
            return decoded;
        },
        encode: function(this: EncodeContext<unknown>, decoded = 0, options) {
            const byteLength = options?.length ?? 0;
            const encoded = Buffer.alloc(byteLength);
            const encodeFn = options?.signed ? encoded.writeIntLE : encoded.writeUIntLE;
            encodeFn.call(encoded, decoded, 0, byteLength);
            return encoded;
        },
    }
    bigInt(label: KeyType<T, bigint>, options: Options<T> = {}) {
        return this.addField(label, Editor.bigIntCodec as Codec<T[keyof T] | undefined>, options);
    }
    static bigIntCodec: Codec<bigint | undefined> = {
        decode: function(this: DecodeContext<unknown>, encoded, options) {
            const byteLength = options?.length ?? 0;
            const decodeFn = options?.signed ? encoded.readInt8 : encoded.readUInt8;
            let decoded = 0n;
            for(let i = byteLength - 1; i >= 0; i --)
                decoded = (decoded << 8n) | BigInt(decodeFn.call(encoded, this.offset + i));
            this.offset += byteLength;
            return decoded;
        },
        encode: function(this: EncodeContext<unknown>, decoded = 0n, options) {
            const byteLength = options?.length ?? 0;
            const encoded = Buffer.alloc(byteLength);
            const encodeFn = options?.signed ? encoded.writeInt8 : encoded.writeUInt8;
            for(let i = byteLength - 1; i >= 0; i --)
                encodeFn.call(encoded, Number((decoded >> BigInt(i) * 8n) & BigInt(0xFF)), i);
            return encoded;
        },
    }
    flags(label: KeyType<T, Flags>, options: Options<T> = {}) {
        return this.addField(label, Editor.flagsCodec as Codec<T[keyof T] | undefined>, options);
    }
    static flagsCodec: Codec<Flags | undefined> = {
        decode: function(this: DecodeContext<unknown>, encoded, options) {
            const segment = encoded.subarray(this.offset, this.offset += options?.length ?? 0);
            const decoded: Flags = {};
            options?.flagNames?.forEach((flagID, i) => {
                const byteIndex = Math.floor(i / 8);
                const bitIndex = i % 8;
                decoded[flagID] = ((segment[byteIndex] >> bitIndex) & 1) ? true : false;
            });
            return decoded;
        },
        encode: function(this: EncodeContext<unknown>, decoded, options) {
            const segment = Buffer.alloc(options?.length ?? 0);
            if(!decoded) return segment;
            options?.flagNames?.forEach((flagID, i) => {
                if(decoded[flagID]) {
                    const byteIndex = Math.floor(i / 8);
                    const bitIndex = i % 8;
                    segment[byteIndex] |= (1 << bitIndex);
                }
            });
            return segment;
        },
    }
    mapping(label: KeyType<T, string>, options: Options<T> = {}) {
        return this.addField(label, Editor.mappingCodec as Codec<T[keyof T] | undefined>, options);
    }
    static mappingCodec: Codec<string | undefined> = {
        decode: function(this: DecodeContext<unknown>, encoded, options) {
            const mapping = options?.mapping ?? {};
            return mapping[Editor.intCodec.decode.call(this, encoded, options) ?? 0];
        },
        encode: function(this: EncodeContext<unknown>, decoded, options) {
            const mapping = options?.mapping ?? {};
            for(const key in mapping)
                if(mapping[key] === decoded)
                    return Editor.intCodec.encode.call(this, parseInt(key), options);
            return Buffer.alloc(options?.length ?? 0);
        },
    }
    clsid(label: KeyType<T, string>, options: Options<T> = {}) {
        return this.addField(label, Editor.clsidCodec as Codec<T[keyof T] | undefined>, options);
    }
    static clsidCodec: Codec<string | undefined> = {
        decode: function(this: DecodeContext<unknown>, encoded, options) {
            const segment = Buffer.from(encoded.subarray(this.offset, this.offset += 16));
            segment.set(segment.subarray(0, 4).reverse(), 0);
            const clsid = segment.toString('hex').toUpperCase();
            return `${clsid.slice(0, 8)}-${clsid.slice(8, 12)}-${clsid.slice(12, 16)}-${clsid.slice(16, 20)}-${clsid.slice(20)}`;
        },
        encode: function(this: EncodeContext<unknown>, decoded, options) {
            const segment = Buffer.alloc(16);
            segment.write(decoded?.replaceAll('-', '') ?? '', 'hex');
            segment.set(segment.subarray(0, 4).reverse(), 0);
            return segment;
        },
    }
    filetime(label: KeyType<T, bigint>, options: Options<T> = {}) {
        return this.addField(label, Editor.filetimeCodec as Codec<T[keyof T] | undefined>, options);
    }
    static filetimeCodec: Codec<bigint | undefined> = {
        decode: function(this: DecodeContext<unknown>, encoded, options) {
            return Editor.bigIntCodec.decode.call(this, encoded, {
                length: 8,
            })
        },
        encode: function(this: EncodeContext<unknown>, decoded, options) {
            return Editor.bigIntCodec.encode.call(this, decoded, {
                length: 8,
            })
        },
    }
    custom(label: KeyType<T, unknown>, options: Options<T> = {}) {
        return this.addField(label, Editor.customCodec as Codec<T[keyof T] | undefined>, options);
    }
    static customCodec: Codec<unknown | undefined> = {
        decode: function(this: DecodeContext<unknown>, encoded, options) {
            return options?.codec?.decode.call(this, encoded, options)
        },
        encode: function(this: EncodeContext<unknown>, decoded, options) {
            const encoded = options?.codec?.encode.call(this, decoded, options);
            return encoded ? encoded : Buffer.alloc(0);
        },
    }
}