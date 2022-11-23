import '@fazio/ipfs-upload-button';

import './app.element.css';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRiMjk5MEFiNzVjZmQ0MTgyN0EzQTNjNGViNjdFRDA1Y0YwNTU5M0MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDM2NjExODA1MDAsIm5hbWUiOiJuZ3h3ZWIzIn0.AMvg_jKnPB2pRPiR6f8AebIHrldAwMCpxILQ7av_SD8';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzODE0YTYyMC1hNmQyLTRmOTUtYTYyYi1kNGUyODc2ZWM5N2IiLCJlbWFpbCI6ImNvbnRhY3RAbmljb2xhc2ZhemlvLmNoIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijk5ZGQxOGY4ZDM0NTBhY2ZmMTNkIiwic2NvcGVkS2V5U2VjcmV0IjoiNmVjODk1YmQ4ZTM2MTMzZjhiODg2ZDQ1N2E1ZDdkMzc3YmRmYjdiMmMwYWExMTliYjBlMzJmZjY4OTNkNjhhNiIsImlhdCI6MTY2OTE5NjM5OH0.vzyK4jrPgQghByWuGAtcaeN0bn9PyvljJ1WG8r9somo';
    const title = 'html-demo';
    this.innerHTML = `
    <div class="wrapper">
      <div class="container">
        <!--  WELCOME  -->
        <div id="welcome">
          <h1>
            <span> Hello there! </span>
            Welcome ${title} 👋
          </h1>
          <web3-upload-btn 
            token="${token}"
            isdisplayresult="true"
            isdisplaytoast="false"
            provider="pinata"></web3-upload-btn>
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
      // alert('File uploaded successfully to IPFS');
    });
    button.addEventListener('error', (e: any) => {
      alert(e.detail);
    });
  }
}
customElements.define('html-demo', AppElement);
