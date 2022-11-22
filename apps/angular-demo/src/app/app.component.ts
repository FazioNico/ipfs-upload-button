
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@fazio/ipfs-upload-button';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  template: `
  <div>
    <h1>
        Welcome Angular 👋
    </h1>
    <web3-upload-btn 
    token="{{token}}"
    isdisplayresult="true"
    isdisplaytoast="false"></web3-upload-btn>
  </div>
  `,
  styles: [],
})
export class AppComponent {
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRiMjk5MEFiNzVjZmQ0MTgyN0EzQTNjNGViNjdFRDA1Y0YwNTU5M0MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDM2NjExODA1MDAsIm5hbWUiOiJuZ3h3ZWIzIn0.AMvg_jKnPB2pRPiR6f8AebIHrldAwMCpxILQ7av_SD8';
}
