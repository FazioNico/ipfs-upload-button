import { PutOptions, Web3Storage } from 'web3.storage';

export class Web3StorageService {
  private _service!: Web3Storage;

  constructor(token: string) {
    this._service = new Web3Storage({ token });
  }

  async storeFiles(files: File[], opts?: PutOptions) {
    // show the root cid as soon as it's ready
    const onRootCidReady = (cid: any) => {
      console.log('[INFO] uploading files with root cid:', cid);
    };
    const result = await Promise.all(
      files.map(async (file) => {
        const cid = await this._service.put([file], {
          onRootCidReady,
          wrapWithDirectory: true,
          maxRetries: 3,
          ...opts,
        });
        return { cid, file };
      })
    );
    return result;
  }

  async findFile(
    cid: string
  ): Promise<File & { ipfsFileCidPath: string; ipfsFileNamePath: string }[]> {
    const res = await this._service.get(cid);
    if (!res) {
      throw new Error('File not found');
    }
    // console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
      throw new Error(`failed to get ${cid}`);
    }
    // request succeeded!
    // unpack File objects from the response
    const web3File: File &
      { ipfsFileCidPath: string; ipfsFileNamePath: string }[] = [] as any;
    const files = await res.files();
    for (const file of files) {
      // add custom properties to the File object
      (file as any).ipfsFileCidPath = `https://ipfs.io/ipfs/${file.cid}`;
      (
        file as any
      ).ipfsFileNamePath = `https://ipfs.io/ipfs/${cid}/${file.name}`;
      web3File.push(file as any);
    }
    return web3File;
  }

}
