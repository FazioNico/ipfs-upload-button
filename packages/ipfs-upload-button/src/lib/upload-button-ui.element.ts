import { defaultHtml, butttonHTML, fromUrlHTML } from './templates';
import { globalStyle, buttonStyle, toastStyle } from './styles';

export abstract class UploadButtonUI extends HTMLElement {
  protected isDisplayResult?: boolean;
  protected isDisplayToast?: boolean;
  protected isFromUrl?: boolean;
  public static observedAttributes = ['isdisplayresult', 'isdisplaytoast', 'isfromurl'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (!this.shadowRoot) {
      throw new Error('[ERROR] shadowRoot is not defined');
    }
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
    // console.log('[INFO] Appended and connected to document');
    this._render();
    this._addEvents();
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
    if (name === 'isfromurl') {
      this.isFromUrl = Boolean(value);
    }    
  }

  private _render() {
    if (!this.shadowRoot) {
      return;
    }
    // build html
    const html = [butttonHTML, defaultHtml];
    if (this.isFromUrl) {
      html.unshift(fromUrlHTML);
    }
    // add styles
    html.unshift(`
    <style>
      ${globalStyle}
      ${buttonStyle}
      ${toastStyle}
    </style>
    `);
    // insert content to shadow root
    this.shadowRoot.innerHTML = html.join('');
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
      'input[type="file"]'
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
    buttonElement.addEventListener('click', async () => {
      // clean result zone
      if (resultElement) {
        resultElement.innerHTML = '';
        resultElement.style.display = 'none';
      }
      // trigger corresponding logic
      if (this.isFromUrl) {
        // get input value
        const inputUrlElement = this.shadowRoot?.querySelector('input[type="url"]') as any;
        if (!inputUrlElement?.value) {
          return;
        } 
        // run logic
        const file = await this._downloadFileFromUrl(inputUrlElement.value);
        if (file) {
          this._onInputFileChange(inputUrlElement, [file]);
        }
      } else {
        // trigger input click
        inputElement.click();
      }
    });
    // handle input change event
    inputElement.addEventListener('change', async (e) =>{
      const files = (e.target as HTMLInputElement).files||[];
      this._onInputFileChange(e.target as HTMLInputElement, Array.from(files));
    });
  }

  private async _onInputFileChange(target: HTMLInputElement, files: File[]) {
    // check if files are defined and not empty
    if (!files || files.length === 0) {
      return;
    }
    if (!this.shadowRoot) {
      throw new Error('[ERROR] shadowRoot is not defined');
    }
    const buttonElement = this.shadowRoot.querySelector(
      'button'
    ) as HTMLButtonElement;
    const spinner = this.shadowRoot.querySelector('.spinner') as HTMLElement;
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
    const elToReset = target 
      // ? target
      // : target?.path?.find((el: HTMLElement) => el?.tagName === 'INPUT');
    if (elToReset) {
      elToReset.value = '';
    }
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
            <a href="${ipfsUrl}" target="_blank">
              <img src="${localUrl}" width="100" />
              ${ipfsUrl}
            </a>
          `;
        })
        .join('<br>');
      el.style.display = 'block';
    }
  }

  private async _downloadFileFromUrl(url: string) {
    // download file as local file
    const file = await fetch(url)
    .then( (response) => response.blob()
    .then((blob) => new File([blob], 'file')));
    return file;
  }
}
