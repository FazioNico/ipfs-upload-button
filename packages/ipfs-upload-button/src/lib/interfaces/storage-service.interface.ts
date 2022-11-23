
export interface IPFSStorageServiceInterface {
  storeFiles(files: File[]): Promise<{ cid: string; file: File }[]>;
  findFile(cid: string): Promise<File & { 
    ipfsFileCidPath: string; 
    ipfsFileNamePath: string 
  }[]>;
}