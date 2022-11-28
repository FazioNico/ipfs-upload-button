# @fazio/ipfs-upload-button

> Customable Web Component button to upload files to IPFS.

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

### Attributes

You can use the following attribut to toggle the component behavior:

  - `token` - **required** - Your IPFS provider APIKEY or JWT <small>(see [Configuration](https://fazionico.github.io/ipfs-upload-button/install#configuration))</small>.
  - `isdisplayresult` - **optional** - Display the result of the upload in the DOM. Default value is `false`.

### Customization Style

You can customize the component style by using the following CSS-Parts:

  - `btn` - The button element
  - `spinner` - The spinner element
  - `result` - The results display element 

**Example:**

```css
  web3-upload-btn::part(btn) {
    background-color: rgb(0, 162, 255);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
  }
```

### Handle Events

You can handle the following events from the component:

  - `progress` - The upload progress event. The event detail is the upload progress in percentage.
  - `success` - The upload success event. The event detail is the upload result.
  - `error` - The upload error event. The event detail is the error message.

**Example:**
  
  ```js
  const btn = document.querySelector('web3-upload-btn')
  btn.addEventListener('success', (e) => {
    console.log('Result: ', e.detail);
  });
  ```