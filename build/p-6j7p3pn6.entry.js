import{r as e,h as i}from"./p-24e0417d.js";const r=class{constructor(i){e(this,i),this.certificates="",this.certificatesDecoded=[]}componentWillLoad(){this.certificatesDecoded=[{subject:"GTS Root R1",issuer:"GTS Root R1",fingerprint:"e1c950e6ef22f84c5645728b922060d7d5a7a3e8",issued:"2019-11-18T11:56:50.463Z",expired:"2019-11-18T11:56:50.463Z",validity:1,version:0,serialNumber:"serial number"},{subject:"GTS Root R2",issuer:"GTS Root R2",fingerprint:"e1c950e6ef22f84c5645728b922060d7d5a7a3e8",issued:"2019-11-18T11:56:50.463Z",expired:"2019-11-18T11:56:50.463Z",validity:1,version:0,serialNumber:"serial number"}]}get certificatesPropParsed(){return this.certificates.split(",")}render(){return i("section",null,i("h3",null,"Certificates:"),i("ul",null,this.certificatesDecoded.map(e=>i("li",null,e.subject))))}static get style(){return":host{display:block;width:100%;word-wrap:break-word}"}};export{r as pv_certificates_viewer};