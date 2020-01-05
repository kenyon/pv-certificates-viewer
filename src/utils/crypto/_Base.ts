import * as asn1js from 'asn1js';
import { Convert } from 'pvtsutils';

export default class Base {
  public readonly defaultName?: string;
  public readonly schema: asn1js.LocalBaseBlock;

  static validation = {
    isHex: (value: string) => /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(value),
    isPem: (value: string) => /-----BEGIN.+-----/.test(value),
  };

  static formatHex(hexString: string) {
    return hexString
      .replace(/(.{32})/g, '$1\n')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  static formatBase64(base64String: string) {
    return base64String
      .replace(/(.{64})/g, '$1\n')
      .trim();
  }

  static formatPem(base64String: string, name: string) {
    return `-----BEGIN ${name}-----${Base.formatBase64(base64String)}-----END ${name}-----`;
  }

  constructor(value: string, defaultName?: string) {
    this.defaultName = defaultName;

    let buffer: ArrayBuffer;

    if (Base.validation.isHex(value)) {
      buffer = Convert.FromHex(value);
    } else {
      buffer = Convert.FromBase64(value);
    }

    this.schema = asn1js.fromBER(buffer).result;
  }

  public getAsBase64(format?: boolean) {
    const base64 = Convert.ToBase64(this.schema.valueBeforeDecode);

    if (format) {
      return Base.formatBase64(base64);
    }

    return base64;
  }

  public getAsHex(format?: boolean) {
    const hex = Convert.ToHex(this.schema.valueBeforeDecode);

    if (format) {
      return Base.formatHex(hex);
    }

    return hex;
  }

  public getAsPem(name: string) {
    const base64 = Convert.ToBase64(this.schema.valueBeforeDecode);

    return Base.formatPem(base64, name);
  }

  public getFingerprint(algorithm: string | Algorithm = 'SHA-1') {
    return crypto
      .subtle
      .digest(
        algorithm,
        this.schema.valueBeforeDecode,
      );
  }
}
