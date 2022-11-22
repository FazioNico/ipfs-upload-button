export abstract class UploadButtonUI extends HTMLElement {
  public isDisplayResult?: boolean;
  public isDisplayToast?: boolean;
  public static observedAttributes = ['isdisplayresult', 'isdisplaytoast'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (!this.shadowRoot) {
      throw new Error('[ERROR] shadowRoot is not defined');
    }
    this._render();
    this._addEvents();
  }

  protected abstract _uploadFiles(files: File[]): Promise<
    {
      ipfsUrl: string;
      localUrl: string;
      cid: string;
      file: File;
    }[]
  >;

  connectedCallback() {
    console.log('[INFO] Appended and connected to document');
  }

  disconnectedCallback() {
    console.log('[INFO] Disconnected from document');
    this.innerHTML = ``;
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = ``;
    }
  }

  attributeChangedCallback(name: string, old: string, value: string) {
    // console.log(`Element's attribute ${name} was ${old} and is now ${value}`);
    // set correct value to the property
    if (name === 'isdisplayresult') {
      this.isDisplayResult = Boolean(value);
    }
    if (name === 'isdisplaytoast') {
      this.isDisplayToast = Boolean(value);
    }
  }

  private _render() {
    if (!this.shadowRoot) {
      return;
    }
    this.shadowRoot.innerHTML = `
      <style>
          :host {
              display: inline;
              position: relative;
              width: 100%;
              height: 100%;
              overflow: hidden;
  
          }
          button {
              position: relative;
              display: inline;
              cursor: pointer;
              z-index: 1;
              min-height: 18px;
          }
          #storage-result {
            display: none;
            margin-top: 1rem;
          }
          #storage-result a {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            align-content: center;
          }
          #storage-result a img {
            margin-right: 10px;
          }
          .spinner {
            display: none;
          }
          .lds-ellipsis {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 12px;
          }
          .lds-ellipsis div {
            position: absolute;
            top: 0px;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: #000;
            animation-timing-function: cubic-bezier(0, 1, 1, 0);
          }
          .lds-ellipsis div:nth-child(1) {
            left: 8px;
            animation: lds-ellipsis1 0.6s infinite;
          }
          .lds-ellipsis div:nth-child(2) {
            left: 8px;
            animation: lds-ellipsis2 0.6s infinite;
          }
          .lds-ellipsis div:nth-child(3) {
            left: 32px;
            animation: lds-ellipsis2 0.6s infinite;
          }
          .lds-ellipsis div:nth-child(4) {
            left: 56px;
            animation: lds-ellipsis3 0.6s infinite;
          }
          @keyframes lds-ellipsis1 {
            0% {
              transform: scale(0);
            }
            100% {
              transform: scale(1);
            }
          }
          @keyframes lds-ellipsis3 {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(0);
            }
          }
          @keyframes lds-ellipsis2 {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(24px, 0);
            }
          } 
          
          /* Toast Element */
          #ipfsToast {
            visibility: hidden; /* Hidden by default. Visible on click */
            min-width: 250px; /* Set a default minimum width */
            margin-left: -125px; /* Divide value of min-width by 2 */
            background-color: lightblue; /* Background color */
            color: #fff; /* White text color */
            text-align: center; /* Centered text */
            border-radius: 8px; /* Rounded borders */
            padding: 16px; /* Padding */
            position: fixed; /* Sit on top of the screen */
            z-index: 1; /* Add a z-index if needed */
            left: 50%; /* Center the snackbar */
            bottom: 30px; /* 30px from the bottom */
            font-family: 'Roboto', sans-serif;
            display: inline-flex;
            line-hight: 12px;
          }
          #ipfsToast.success {
            background-color: green; /* Fallback Background color */
            background-color: lightgreen; /* Fallback Background color */
            background-color: springgreen; /* Background color */
          }
          #ipfsToast span {
            margin-left: 12px;
            margin-top: 2px;
          }
          
          /* Show the SIMPLE-TOAST when clicking on a button (class added with JavaScript) */
          #ipfsToast.show {
            visibility: visible; /* Show the SIMPLE-TOAST */
            /* Add animation: Take 0.5 seconds to fade in and out the SIMPLE-TOAST.
            However, delay the fade out process for 2.5 seconds */
            -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
            animation: fadein 0.5s, fadeout 0.5s 2.5s;
          }
          
          /* Animations to fade the SIMPLE-TOAST in and out */
          @-webkit-keyframes fadein {
            from {bottom: 0; opacity: 0;}
            to {bottom: 30px; opacity: 1;}
          }
          
          @keyframes fadein {
            from {bottom: 0; opacity: 0;}
            to {bottom: 30px; opacity: 1;}
          }
          
          @-webkit-keyframes fadeout {
            from {bottom: 30px; opacity: 1;}
            to {bottom: 0; opacity: 0;}
          }
          
          @keyframes fadeout {
            from {bottom: 30px; opacity: 1;}
            to {bottom: 0; opacity: 0;}
          }
      </style> 
      <button part="btn">
          <slot>upload</slot>
      </button>

      <div part="spinner" class="spinner">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>

      <div part="result" id="storage-result"></div>
      <input type="file" multiple style="display: none;" />
      <div part="toast" id="ipfsToast"></div>
    `;
  }

  private _addEvents() {
    if (!this.shadowRoot) {
      const message = '[ERROR] shadowRoot is not defined';
      // dispatch event
      this.dispatchEvent(new CustomEvent('error', { detail: message }));
      throw new Error(message);
    }
    // find all ui elements
    const inputElement = this.shadowRoot.querySelector(
      'input'
    ) as HTMLInputElement;
    const resultElement = this.shadowRoot.querySelector(
      '#storage-result'
    ) as HTMLElement;
    const buttonElement = this.shadowRoot.querySelector(
      'button'
    ) as HTMLButtonElement;
    // handle undefined elements
    if (!inputElement || !resultElement || !buttonElement) {
      const message = '[ERROR] Some Elements are not defined';
      this.dispatchEvent(new CustomEvent('error', { detail: message }));
      throw new Error(message);
    }
    // handle click event
    buttonElement.addEventListener('click', () => {
      // clean result zone
      if (resultElement) {
        resultElement.innerHTML = '';
        resultElement.style.display = 'none';
      }
      // trigger input click
      inputElement.click();
    });
    // handle input change event
    inputElement.addEventListener('change', async (e) =>
      this._onInputFileChange(e)
    );
  }

  private async _onInputFileChange(e: any) {
    if (!this.shadowRoot) {
      throw new Error('[ERROR] shadowRoot is not defined');
    }
    const buttonElement = this.shadowRoot.querySelector(
      'button'
    ) as HTMLButtonElement;
    const spinner = this.shadowRoot.querySelector('.spinner') as HTMLElement;
    const files = (e?.target as any)?.files;
    // only if have files
    if (!files || files.length === 0) {
      return;
    }
    // ui management
    if (spinner) {
      spinner.style.display = 'inline-block';
    }
    if (buttonElement) {
      buttonElement.disabled = true;
    }
    // upload files
    const result = await this._uploadFiles(files).catch((error) => ({
      error: new Error(error?.mmessage || `Error uploading files to IPFS`),
    }));
    if (this.isDisplayToast) {
      // disdplay Toast message
      const haveError = result instanceof Error;
      await this._displayToast({
        message: haveError
          ? result.message
          : `Successfully uploaded ${(result as any[]).length} files to IPFS`,
        type: haveError ? 'error' : 'success',
      });
    }
    if (this.isDisplayResult && result instanceof Array) {
      // display result storage files
      await this._displayResult(result);
    }
    // ui management
    e.target.value = '';
    if (spinner) {
      spinner.style.display = 'none';
    }
    if (buttonElement) {
      buttonElement.disabled = false;
    }
    // dispatch event
    if (result instanceof Error) {
      this.dispatchEvent(new CustomEvent('error', { detail: { result } }));
    } else {
      this.dispatchEvent(new CustomEvent('success', { detail: { result } }));
    }
  }

  private async _displayToast({
    message,
    hideInMS = 3000,
    type = `success`,
  }: {
    message: string;
    hideInMS?: number;
    type?: string;
  }) {
    if (!this.shadowRoot) {
      throw new Error('[ERROR] shadowRoot is not defined');
    }
    // get created element
    const toastElement = this.shadowRoot.querySelector(
      '#ipfsToast'
    ) as HTMLElement;
    if (!toastElement) {
      throw new Error('[ERROR] toastElement is not defined');
    }
    // insert message and toggle class
    toastElement.innerHTML = `<span>${message}</span>`;
    toastElement.classList.add('show');
    toastElement.classList.add(type);
    // hide element after 3s
    const t = setTimeout(() => {
      toastElement.classList.remove('show');
      toastElement.classList.remove(type);
      clearTimeout(t);
    }, hideInMS);
  }

  private async _displayResult(
    result: {
      ipfsUrl: string;
      localUrl: string;
    }[]
  ) {
    const el = this.shadowRoot?.querySelector('#storage-result') as any;
    if (el) {
      el.innerHTML = result
        .map(({ localUrl, ipfsUrl }) => {
          return `
            <a href="${ipfsUrl}">
              <img src="${localUrl}" width="100" />
              ${ipfsUrl}
            </a>
          `;
        })
        .join('<br>');
      el.style.display = 'block';
    }
  }
}
