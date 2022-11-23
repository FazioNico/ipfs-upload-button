import axios from 'axios';
import { IPFSStorageServiceInterface } from '../interfaces/storage-service.interface';

export class PinataStorageService implements IPFSStorageServiceInterface {
  private _token!: string;

  constructor(token: string) {
    this._token = token;
  }

  async storeFiles(files: File[]) {
    // loop through files and create a FormData object for each
    const req = files.map(async (file) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        // request to pinata
        const resFile = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this._token}`,
          },
        });
        // return the result
        const cid = resFile.data.IpfsHash;
        return { cid, file };
      } catch (error) {
        console.log('Error sending File to IPFS: ');
        console.log(error);
        throw new Error('Error sending File to IPFS: ');
      }
    });
    // wait for all requests to complete and return the results
    return Promise.all(req);
  }

  async findFile(
    cid: string
  ): Promise<File & { ipfsFileCidPath: string; ipfsFileNamePath: string }[]> {
    // unpack File objects from the response
    const ipfsFiles: File &
      { ipfsFileCidPath: string; ipfsFileNamePath: string }[] = [] as any;
    // load file from IPFS
    const res = await axios({
      method: 'get',
      url: `https://ipfs.io/ipfs/${cid}`,
      responseType: 'blob',
    });
    // create a File object from the response
    const file = new File([res.data], cid, { type: res.data.type });
    // add custom properties to the File object
    (file as any).ipfsFileCidPath = `https://ipfs.io/ipfs/${cid}`;
    (file as any).ipfsFileNamePath = `https://ipfs.io/ipfs/${cid}/${file.name}`;
    ipfsFiles.push(file as any);
    return ipfsFiles;
  }
}
