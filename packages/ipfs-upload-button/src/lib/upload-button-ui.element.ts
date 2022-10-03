export abstract class UploadButtonUI extends HTMLElement {
  public isDisplayResult?: boolean;
  public static observedAttributes = ['isdisplayresult'];

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
      </style> 
      <button part="btn">
          <slot>upload</slot>
      </button>

      <div part="spinner" class="spinner">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>

      <div part="result" id="storage-result"></div>
      <input type="file" multiple style="display: none;" />
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
    const inputElement = this.shadowRoot.querySelector('input') as HTMLInputElement;
    const resultElement = this.shadowRoot.querySelector('#storage-result') as HTMLElement;
    const buttonElement = this.shadowRoot.querySelector('button') as HTMLButtonElement;
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
    const result = await this._uploadFiles(files);
    // display result storage files
    await this._displayResult(result);
    // ui management
    if (spinner) {
      spinner.style.display = 'none';
    }
    if (buttonElement) {
      buttonElement.disabled = false;
    }
    // dispatch event
    this.dispatchEvent(new CustomEvent('success', { detail: { result } }));
  }

  private async _displayResult(
    result: {
      ipfsUrl: string;
      localUrl: string;
    }[]
  ) {
    if (!this.isDisplayResult) {
      return;
    }
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
