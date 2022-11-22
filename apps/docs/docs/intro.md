---
slug: /
sidebar_position: 1
---

# Introduction

> Customable Web Component button to upload files to IPFS.

## Technology Stack

  - [Typescript](https://www.typescriptlang.org/) - Programming language used to develop the project.
  - [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) - To build and provide cross-browser support for the component.
  - [Web3Storage](https://web3.storage/) - As IPFS provider and pinning service.

## Usage & Installation

  - install NPM package `npm install @fazio/ipfs-upload-button`
  - import the component in your project `import '@fazio/ipfs-upload-button'`
  - create `APIKEY` on [Web3Storage](https://web3.storage/).
  - add the component to your HTML page 
    ```html
    <web3-upload-btn token="YOUR_WEB3STORAGE_APIKEY">
      Upload to IPFS
    </web3-upload-btn>
    ```
    
You can also customing component style and handle events. Check the documentation sections for more details.