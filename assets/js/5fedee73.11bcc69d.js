"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[64],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(n),m=o,f=d["".concat(l,".").concat(m)]||d[m]||u[m]||a;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7269:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var r=n(7462),o=(n(7294),n(3905));const a={sidebar_position:4},i="Customization Style",s={unversionedId:"reactjs/custom-css",id:"reactjs/custom-css",title:"Customization Style",description:"Component is build on top of web component and using CSS-Parts and CSS-Variables to allow customization.",source:"@site/docs/reactjs/05-custom-css.mdx",sourceDirName:"reactjs",slug:"/reactjs/custom-css",permalink:"/ipfs-upload-button/reactjs/custom-css",draft:!1,editUrl:"https://github.com/FazioNico/ipfs-upload-button/docs/reactjs/05-custom-css.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Events management",permalink:"/ipfs-upload-button/reactjs/events"},next:{title:"Vanilla Javascript",permalink:"/ipfs-upload-button/category/vanilla-javascript"}},l={},c=[{value:"CSS-Parts",id:"css-parts",level:2},{value:"Code Example",id:"code-example",level:2},{value:"Preview result",id:"preview-result",level:3}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"customization-style"},"Customization Style"),(0,o.kt)("p",null,"Component is build on top of web component and using CSS-Parts and CSS-Variables to allow customization."),(0,o.kt)("h2",{id:"css-parts"},"CSS-Parts"),(0,o.kt)("p",null,"You can customize the component style by using the following CSS-Parts:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"btn")," - The button element"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"spinner")," - The spinner element"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"result")," - The results display element "),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"toast")," - The toast display element nv")),(0,o.kt)("h2",{id:"code-example"},"Code Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-css"},"    web3-upload-btn::part(btn) {\n      background-color: rgb(0, 162, 255);\n      color: #fff;\n      border: none;\n      border-radius: 4px;\n      padding: 8px 16px;\n      font-size: 16px;\n      cursor: pointer;\n      text-align: center;\n      text-decoration: none;\n      text-transform: uppercase;\n    }\n")),(0,o.kt)("h3",{id:"preview-result"},"Preview result"),(0,o.kt)("p",null,(0,o.kt)("web3-upload-btn",{class:"demoCSS",token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRiMjk5MEFiNzVjZmQ0MTgyN0EzQTNjNGViNjdFRDA1Y0YwNTU5M0MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDM2NjExODA1MDAsIm5hbWUiOiJuZ3h3ZWIzIn0.AMvg_jKnPB2pRPiR6f8AebIHrldAwMCpxILQ7av_SD8",isdisplayresult:"true",isdisplaytoast:"true"},"\nUpload to IPFS\n")))}u.isMDXComponent=!0}}]);