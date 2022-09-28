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
          }
          .spinner {
            width: 14px;
            height: 14px;
            vertical-align: middle;
            display: none;
          }
      </style> 
      <button part="btn">
          <slot>upload</slot>
      </button>
      <span part="spinner" class="spinner"></span>
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
            </a>
          `;
        })
        .join('<br>');
      el.style.display = 'block';
    }
  }
}
