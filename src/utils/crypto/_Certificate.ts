import { Convert } from 'pvtsutils';

import * as dateFormatter from '../../utils/date_formatter';
import downloadFromBuffer from  '../download_from_buffer';

import * as pkijs from './pkijs';
import Base from './_Base';

interface IAttribute {
  long: string;
  type: string;
  value: string;
}

export default class Certificate extends Base {
  public readonly notBefore?: Date;
  public readonly notAfter?: Date;
  public readonly validity?: string;
  public readonly version: number = 0;
  public readonly serialNumber?: string;
  public readonly subject?: Record<string, IAttribute>;
  public readonly issuer?: Record<string, IAttribute>;
  public readonly isRoot: boolean = false;
  public readonly commonName?: string;
  public readonly schemaPkijs: pkijs.Certificate;
  // TODO: Need to implement
  public readonly publicKeyInfo?: any;
  // TODO: Need to implement
  public readonly extensions?: any[];

  constructor(value: string, defaultName?: string) {
    super(value, defaultName);

    this.schemaPkijs = new pkijs.Certificate({
      schema: this.schema,
    });

    this.notBefore = this.schemaPkijs.notBefore?.value;
    this.notAfter = this.schemaPkijs.notAfter?.value;
    this.validity = this.notAfter && dateFormatter.fromNow(this.notAfter);

    /**
     * Decode version
     * https://tools.ietf.org/html/rfc5280#section-4.1.2.1
     */
    this.version = this.schemaPkijs.version + 1;

    this.serialNumber = this.schemaPkijs.serialNumber && Convert.ToHex(
      this.schemaPkijs.serialNumber.valueBlock.valueHex,
    );

    this.subject = this.getAttributes(this.schemaPkijs.subject?.typesAndValues);
    this.issuer = this.getAttributes(this.schemaPkijs.issuer?.typesAndValues);

    this.isRoot = JSON.stringify(this.issuer) === JSON.stringify(this.subject);

    this.commonName = this.getCommonName(this.subject);
  }

  public downloadAsPem() {
    return downloadFromBuffer(
      this.getAsPem('CERTIFICATE'),
      'text/plain',
      this.defaultName || this.commonName,
      'crt',
    );
  }

  public downloadAsDer() {
    return downloadFromBuffer(
      this.getAsHex(true),
      'application/octet-stream',
      this.defaultName || this.commonName,
      'crt',
    );
  }

  private getCommonName(subject: Certificate['subject']): string | undefined {
    return subject?.CN?.value
      || subject?.E?.value;
  }

  // TODO: Need to implement
  private getPublicKeyInfo(publicKeyInfo: pkijs.PublicKeyInfo) {

  }

  // TODO: Need to implement
  private getExtensions(extensions: pkijs.Extension) {

  }

  private getAttributes(attributes: pkijs.AttributeTypeAndValue[]) {
    if (!attributes || !attributes.length) {
      return undefined;
    }

    const data: Record<string, IAttribute> = {};

    attributes.forEach((attribute) => {
      const type = attribute.type.toString();
      const attributeOidAndValue = Certificate.attributesOidAndValue[type];

      data[attributeOidAndValue?.short || type] = {
        type,
        long: attributeOidAndValue?.long,
        value: attribute.value.valueBlock.value.toString(),
      };
    });

    return data;
  }

  private static attributesOidAndValue: Record<string, { short?: string; long: string }> = {
    '2.5.4.3': {
      short: 'CN',
      long: 'Common Name',
    },
    '2.5.4.6': {
      short: 'C',
      long: 'Country',
    },
    '2.5.4.5': {
      short: 'serialNumber',
      long: 'Serial Number',
    },
    '0.9.2342.19200300.100.1.25': {
      short: 'DC',
      long: 'Domain Component',
    },
    '1.2.840.113549.1.9.1': {
      short: 'E',
      long: 'Email',
    },
    '2.5.4.42': {
      short: 'G',
      long: 'Given Name',
    },
    '2.5.4.43': {
      short: 'I',
      long: 'Initials',
    },
    '2.5.4.7': {
      short: 'L',
      long: 'Locality',
    },
    '2.5.4.10': {
      short: 'O',
      long: 'Organization',
    },
    '2.5.4.11': {
      short: 'OU',
      long: 'Organization Unit',
    },
    '2.5.4.8': {
      short: 'ST',
      long: 'State',
    },
    '2.5.4.9': {
      short: 'Street',
      long: 'Street Address',
    },
    '2.5.4.4': {
      short: 'SN',
      long: 'Surname',
    },
    '2.5.4.12': {
      short: 'T',
      long: 'Title',
    },
    '1.2.840.113549.1.9.8': {
      long: 'Unstructured Address',
    },
    '1.2.840.113549.1.9.2': {
      long: 'Unstructured Name',
    },
    '1.3.6.1.4.1.311.60.2.1.3': {
      short: 'jurisdictionCountry',
      long: 'Jurisdiction Country',
    },
    '2.5.4.15': {
      short: 'businessCategory',
      long: 'Business Category',
    },
    '1.3.6.1.2.1.1.5': {
      long: 'Host Name',
    },
  };
}
