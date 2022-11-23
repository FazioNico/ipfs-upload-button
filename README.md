# IPFS Upload button

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

## Documentation

  - [Doc Reference](https://fazionico.github.io/ipfs-upload-button/)
  - [Usage with Angular](https://fazionico.github.io/ipfs-upload-button/category/angular)
  - [Usage with React](https://fazionico.github.io/ipfs-upload-button/category/reactjs)
  - [Usage with Javascript](https://fazionico.github.io/ipfs-upload-button/category/vanilla-javascript)



## Development

- Clone repository
- Install dependencies using NodeJS and NPM
- Install Nx Workspace CLI to manage workspace project
- Run developpment server using nx serve command will open the application in the browser
- This project was generated using Nx Workspace.

## Publish

- Run `npm run publish` to build and publish the project to NPM registry.

## Architecture overview

The follder architecture is based on Nx Workspace to provide a configurable workspace that can contain multiple applications in the `./apps` folder and multiple libraries in the `./packages` folder. 
This is very useful for building large scale applications with multiple components and features that can be easily maintained and updated.

The main package is stored in `./packages/ipfs-upload-button` folder and it contains files and folders organized with the following structure:

| File                                      | Description                                                           |
|-------------------------------------------|-----------------------------------------------------------------------|
| `/src/index.ts`                           | contains the main entry point of the library                          |
| `/src/lib/upload-button-ui.element.ts`    | Web Component that implement UI                                       |
| `/src/lib/ipfs-upload-button.element.ts`  | Web Component that implenent interaction with Web3Storage Service     |
| `/src/lib/web3-storage.service.ts`        | Service that interact with Web3Storage Library to store media to IPFS |


## Contributing

Thanks for taking the time to help out and improve the project! 🎉

The following is a set of guidelines for contributions and may change over time. Feel free to suggest improvements to this document in a pull request!

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

Project is Open Source and available under the [MIT License](LICENSE).

## Team

- [**@fazionico**](https://github.com/FazioNico) - **Nicolas Fazio** 
  
  Software Architect & Blockchain Developer

  Mr. Fazio is a software architect and blockchain developer with over 15 years of industry experience. He has worked on a variety of projects ranging from cloud enterprise software to blockchain applications focusing last 3 years exclusively in the Web 3 industry. He is passionate about building decentralized solutions and is currently working on Web3 projects.

  LinkedIn: [https://www.linkedin.com/in/fazio-nicolas/](https://www.linkedin.com/in/fazio-nicolas/)

## Support

If you like this project, please consider supporting it by giving a ⭐️ on Github and sharing it with your friends! 