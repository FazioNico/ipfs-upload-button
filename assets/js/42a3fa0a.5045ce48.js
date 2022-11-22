"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[898],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=p(n),f=o,b=d["".concat(s,".").concat(f)]||d[f]||l[f]||a;return n?r.createElement(b,i(i({ref:t},u),{},{components:n})):r.createElement(b,i({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var p=2;p<a;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1087:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>l,frontMatter:()=>a,metadata:()=>c,toc:()=>p});var r=n(7462),o=(n(7294),n(3905));const a={sidebar_position:1},i="Basic usage",c={unversionedId:"reactjs/usage",id:"reactjs/usage",title:"Basic usage",description:"To use the libraries packages, you need to follow this steps:",source:"@site/docs/reactjs/01-usage.mdx",sourceDirName:"reactjs",slug:"/reactjs/usage",permalink:"/ipfs-upload-button/reactjs/usage",draft:!1,editUrl:"https://github.com/FazioNico/ipfs-upload-button/docs/reactjs/01-usage.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"ReactJS",permalink:"/ipfs-upload-button/category/reactjs"},next:{title:"Attributes usage",permalink:"/ipfs-upload-button/reactjs/attributes"}},s={},p=[{value:"Function Component",id:"function-component",level:2},{value:"Preview",id:"preview",level:2}],u={toc:p};function l(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"basic-usage"},"Basic usage"),(0,o.kt)("p",null,"To use the libraries packages, you need to follow this steps:"),(0,o.kt)("h2",{id:"function-component"},"Function Component"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Use the component in your Component page as follow")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import '@fazio/ipfs-upload-button';\n\nexport function App() {\n  const token = 'WEB3STORAGE_APIKEY';\n\n  return (\n    <>\n      <div/>\n      <web3-upload-btn token={token}></web3-upload-btn>\n      <div />\n    </>\n  );\n}\nexport default App;\n")),(0,o.kt)("h2",{id:"preview"},"Preview"),(0,o.kt)("web3-upload-btn",{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRiMjk5MEFiNzVjZmQ0MTgyN0EzQTNjNGViNjdFRDA1Y0YwNTU5M0MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDM2NjExODA1MDAsIm5hbWUiOiJuZ3h3ZWIzIn0.AMvg_jKnPB2pRPiR6f8AebIHrldAwMCpxILQ7av_SD8"},"Upload to IPFS"))}l.isMDXComponent=!0}}]);