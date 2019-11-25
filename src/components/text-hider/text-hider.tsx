import { Component, Host, h, Prop, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'pv-text-hider',
  styleUrls: [
    '../../styles/reset.css',
    '../../styles/system.css',
    'text-hider.css'
  ],
  shadow: true
})
export class TextHider {
  @Prop({ mutable: true, reflect: true }) opened: boolean = false;

  @Event() textExpand: EventEmitter;

  @Listen('textExpand')
  textExpandHandler() {
    this.opened = !this.opened;
  }

  render() {
    return (
      <Host>
        <div class="root">
          <div class={{
            text: true,
            m_opened: this.opened,
          }}>
            <slot></slot>
          </div>
          <div class="action">
            <pv-button
              onClick={this.textExpand.emit}
              class={{
                button_action: true,
                m_opened: this.opened,
              }}
              fill={this.opened ? 'fill' : 'stroke'}
            >
              <svg
                viewBox="0 0 7 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="expand_icon"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z"
                  fill={this.opened ? '#FFFFFF' : '#3584F7'}
                />
              </svg>
            </pv-button>
          </div>
        </div>
      </Host>
    );
  }

}