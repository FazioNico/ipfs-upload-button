import '@fazionico/ipfs-upload-button';

import './app.element.css';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRiMjk5MEFiNzVjZmQ0MTgyN0EzQTNjNGViNjdFRDA1Y0YwNTU5M0MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDM2NjExODA1MDAsIm5hbWUiOiJuZ3h3ZWIzIn0.AMvg_jKnPB2pRPiR6f8AebIHrldAwMCpxILQ7av_SD8';
    const title = 'html-demo';
    this.innerHTML = `
    <div class="wrapper">
      <div class="container">
        <!--  WELCOME  -->
        <div id="welcome">
          <h1>
            <span> Hello there, </span>
            Welcome ${title} 👋
          </h1>
          <web3-upload-btn 
            token="${token}"
            isdisplayresult="true"></web3-upload-btn>
        </div>
      </div>
    </div>
      `;
    const button = document.querySelector('web3-upload-btn');
    if (!button) {
      throw new Error('Button not found');
    }
    button.addEventListener('progress', (e: any) => {
      console.log('Progress: ', e.detail);
    });
    button.addEventListener('success', (e: any) => {
      console.log('Result: ', e.detail);
      alert('File uploaded successfully to IPFS');
    });
    button.addEventListener('error', (e: any) => {
      alert(e.detail);
    });
  }
}
customElements.define('html-demo', AppElement);
