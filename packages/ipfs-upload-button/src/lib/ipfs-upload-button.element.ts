import { UploadButtonUI } from './upload-button-ui.element';
import { Web3StorageService } from './web3-storage.service';

export class Web3UploadButton extends UploadButtonUI {
  public token!: string;
  // optional attributes
  public gateway?: string;
  // static observed Attributes
  public static observedAttributes = [
    ...super.observedAttributes, 
    'token', 'gateway'
  ]; 

  constructor() {
    super();
  }

  attributeChangedCallback(name: string, old: string, value: string) {
    super.attributeChangedCallback(name, old, value);
    // console.log(`Element's attribute ${name} was ${old} and is now ${value}`);
    // set correct value to the property
    if (name === 'token') {
      this.token = value;
    }
    if (name === 'gateway') {
      this.gateway = value;
    }
  }

  protected async _uploadFiles(files: File[]) {
    // init service
    const service = await this._getStorageProvider();
    // calculate total size
    const totalSize = Array.from(files)
      .map((f) => f.size)
      .reduce((a, b) => a + b, 0);
    let totalUploaded = 0;
    // CallBack function when each chunk is stored, update the percentage complete and display
    const onStoredChunk = (size: number) => {
      totalUploaded += size;
      const pct = totalSize / totalUploaded;
      console.log(`Uploading... ${pct.toFixed(0)}% complete`);
      super.dispatchEvent(new CustomEvent('progress', { detail: pct }));
    };
    // upload files
    const result = await service
      .storeFiles(Array.from(files), {
        onStoredChunk,
        wrapWithDirectory: false,
      })
      // formating result
      .then((result) =>
        result.map((r) => ({
          ...r,
          ipfsUrl: this._getIpfsUrl(r.cid),
          localUrl: this._getLocalUrl(r.file),
        }))
      );
    return result;
  }

  private async _getStorageProvider(): Promise<Web3StorageService> {
    if (!this.token || this.token.length <= 0) {
      const message = '[ERROR] Missing token attribute';
      // dispatch event
      super.dispatchEvent(new CustomEvent('error', { detail: message }));
      throw new Error(message);
    }
    return new Web3StorageService(this.token);
  }

  private _getLocalUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  private _getIpfsUrl(cid: string): string {
    return this.gateway && this.gateway.length > 0
      ? `${this.gateway}/${cid}`
      : `https://ipfs.io/ipfs/${cid}`;
  }
}
