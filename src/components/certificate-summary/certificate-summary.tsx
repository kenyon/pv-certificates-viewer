import { Component, Host, h, Prop } from '@stencil/core';

import { Certificate } from '../../utils/crypto';
import * as dateFormatter from '../../utils/date_formatter';

@Component({
  tag: 'pv-certificate-summary',
  styleUrls: [
    '../../styles/reset.css',
    '../../styles/system.css',
    'certificate-summary.css',
  ],
  shadow: true,
})

export class CertificateSummary {
  @Prop() certificate: Certificate;
  @Prop() showIssuer: boolean = true;

  renderDN(item: Certificate['subject'] | Certificate['issuer']) {
    return Object.keys(item).map((keyName) => {
      return (
        <p class="dn_row">
          <span class="dn_name b3 text_black">{keyName}</span>
          <span class="dn_value b3 text_black">{item[keyName].value}</span>
        </p>
      );
    });
  }

  renderMetaData(item: Certificate) {
    return ([
      <p class="meta_row">
        <span class="meta_name text_grey b3">Serial number:</span>
        <span class="meta_value b3 text_black monospace">
          {item.serialNumber}
        </span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey b3">Version:</span>
        <span class="meta_value b3 text_black">
          {item.version}
        </span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey b3">Validity:</span>
        <span class="meta_value b3 text_black">
          {item.validity}
        </span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey b3">Issued:</span>
        <span class="meta_value b3 text_black">
          {dateFormatter.short(item.notBefore)}
        </span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey b3">Expired:</span>
        <span class="meta_value b3 text_black">
          {dateFormatter.short(item.notAfter)}
        </span>
      </p>,
    ]);
  }

  render() {
    return (
      <Host>
        <div class={{
          basic_wrapper: true,
          is_only: !this.showIssuer,
        }}>
          <div class="basic_col">
            <p class="text_grey b3 dn_row">
              Subject DN:
            </p>
            {this.renderDN(this.certificate.subject)}
          </div>
          {this.showIssuer && (
            <div class="basic_col stroke_border">
              <p class="text_grey b3 dn_row">
                Issuer DN:
              </p>
              {this.renderDN(this.certificate.issuer)}
            </div>
          )}
          <div class="basic_meta">
            {this.renderMetaData(this.certificate)}
          </div>
        </div>
      </Host>
    );
  }
}
