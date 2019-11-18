/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface PvCertificatesViewer {
    'certificates': string;
  }
}

declare global {


  interface HTMLPvCertificatesViewerElement extends Components.PvCertificatesViewer, HTMLStencilElement {}
  var HTMLPvCertificatesViewerElement: {
    prototype: HTMLPvCertificatesViewerElement;
    new (): HTMLPvCertificatesViewerElement;
  };
  interface HTMLElementTagNameMap {
    'pv-certificates-viewer': HTMLPvCertificatesViewerElement;
  }
}

declare namespace LocalJSX {
  interface PvCertificatesViewer {
    'certificates'?: string;
  }

  interface IntrinsicElements {
    'pv-certificates-viewer': PvCertificatesViewer;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'pv-certificates-viewer': LocalJSX.PvCertificatesViewer & JSXBase.HTMLAttributes<HTMLPvCertificatesViewerElement>;
    }
  }
}


