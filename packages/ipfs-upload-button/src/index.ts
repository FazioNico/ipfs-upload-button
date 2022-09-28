import { Web3UploadButton } from './lib/ipfs-upload-button.element';

if (!customElements.get('web3-upload-btn')) {
  window.customElements.define('web3-upload-btn', Web3UploadButton);
}

export * from './lib/ipfs-upload-button.element';