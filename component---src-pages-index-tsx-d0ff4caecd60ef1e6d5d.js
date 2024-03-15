"use strict";(self.webpackChunkmy_prfile=self.webpackChunkmy_prfile||[]).push([[691],{3204:function(e){const t=/[\p{Lu}]/u,a=/[\p{Ll}]/u,r=/^[\p{Lu}](?![\p{Lu}])/gu,n=/([\p{Alpha}\p{N}_]|$)/u,i=/[_.\- ]+/,s=new RegExp("^"+i.source),o=new RegExp(i.source+n.source,"gu"),l=new RegExp("\\d+"+n.source,"gu"),c=(e,n)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");if(n={pascalCase:!1,preserveConsecutiveUppercase:!1,...n},0===(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim()).length)return"";const i=!1===n.locale?e=>e.toLowerCase():e=>e.toLocaleLowerCase(n.locale),c=!1===n.locale?e=>e.toUpperCase():e=>e.toLocaleUpperCase(n.locale);if(1===e.length)return n.pascalCase?c(e):i(e);return e!==i(e)&&(e=((e,r,n)=>{let i=!1,s=!1,o=!1;for(let l=0;l<e.length;l++){const c=e[l];i&&t.test(c)?(e=e.slice(0,l)+"-"+e.slice(l),i=!1,o=s,s=!0,l++):s&&o&&a.test(c)?(e=e.slice(0,l-1)+"-"+e.slice(l-1),o=s,s=!1,i=!0):(i=r(c)===c&&n(c)!==c,o=s,s=n(c)===c&&r(c)!==c)}return e})(e,i,c)),e=e.replace(s,""),e=n.preserveConsecutiveUppercase?((e,t)=>(r.lastIndex=0,e.replace(r,(e=>t(e)))))(e,i):i(e),n.pascalCase&&(e=c(e.charAt(0))+e.slice(1)),((e,t)=>(o.lastIndex=0,l.lastIndex=0,e.replace(o,((e,a)=>t(a))).replace(l,(e=>t(e)))))(e,c)};e.exports=c,e.exports.default=c},8032:function(e,t,a){a.d(t,{L:function(){return m},M:function(){return k},P:function(){return v},S:function(){return Q},_:function(){return o},a:function(){return s},b:function(){return d},g:function(){return u},h:function(){return l}});var r=a(7294),n=(a(3204),a(5697)),i=a.n(n);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},s.apply(this,arguments)}function o(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(a=i[r])>=0||(n[a]=e[a]);return n}const l=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;function c(e,t,a){const r={};let n="gatsby-image-wrapper";return"fixed"===a?(r.width=e,r.height=t):"constrained"===a&&(n="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:n,"data-gatsby-image-wrapper":"",style:r}}function d(e,t,a,r,n){return void 0===n&&(n={}),s({},a,{loading:r,shouldLoad:e,"data-main-image":"",style:s({},n,{opacity:t?1:0})})}function u(e,t,a,r,n,i,o,l){const c={};i&&(c.backgroundColor=i,"fixed"===a?(c.width=r,c.height=n,c.backgroundColor=i,c.position="relative"):("constrained"===a||"fullWidth"===a)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),o&&(c.objectFit=o),l&&(c.objectPosition=l);const d=s({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:s({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return d}const g=["children"],p=function(e){let{layout:t,width:a,height:n}=e;return"fullWidth"===t?r.createElement("div",{"aria-hidden":!0,style:{paddingTop:n/a*100+"%"}}):"constrained"===t?r.createElement("div",{style:{maxWidth:a,display:"block"}},r.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg%20height='"+n+"'%20width='"+a+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},m=function(e){let{children:t}=e,a=o(e,g);return r.createElement(r.Fragment,null,r.createElement(p,s({},a)),t,null)},h=["src","srcSet","loading","alt","shouldLoad"],f=["fallback","sources","shouldLoad"],y=function(e){let{src:t,srcSet:a,loading:n,alt:i="",shouldLoad:l}=e,c=o(e,h);return r.createElement("img",s({},c,{decoding:"async",loading:n,src:l?t:void 0,"data-src":l?void 0:t,srcSet:l?a:void 0,"data-srcset":l?void 0:a,alt:i}))},b=function(e){let{fallback:t,sources:a=[],shouldLoad:n=!0}=e,i=o(e,f);const l=i.sizes||(null==t?void 0:t.sizes),c=r.createElement(y,s({},i,t,{sizes:l,shouldLoad:n}));return a.length?r.createElement("picture",null,a.map((e=>{let{media:t,srcSet:a,type:i}=e;return r.createElement("source",{key:t+"-"+i+"-"+a,type:i,media:t,srcSet:n?a:void 0,"data-srcset":n?void 0:a,sizes:l})})),c):c};var w;y.propTypes={src:n.string.isRequired,alt:n.string.isRequired,sizes:n.string,srcSet:n.string,shouldLoad:n.bool},b.displayName="Picture",b.propTypes={alt:n.string.isRequired,shouldLoad:n.bool,fallback:n.exact({src:n.string.isRequired,srcSet:n.string,sizes:n.string}),sources:n.arrayOf(n.oneOfType([n.exact({media:n.string.isRequired,type:n.string,sizes:n.string,srcSet:n.string.isRequired}),n.exact({media:n.string,type:n.string.isRequired,sizes:n.string,srcSet:n.string.isRequired})]))};const E=["fallback"],v=function(e){let{fallback:t}=e,a=o(e,E);return t?r.createElement(b,s({},a,{fallback:{src:t},"aria-hidden":!0,alt:""})):r.createElement("div",s({},a))};v.displayName="Placeholder",v.propTypes={fallback:n.string,sources:null==(w=b.propTypes)?void 0:w.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null}};const k=function(e){return r.createElement(r.Fragment,null,r.createElement(b,s({},e)),r.createElement("noscript",null,r.createElement(b,s({},e,{shouldLoad:!0}))))};k.displayName="MainImage",k.propTypes=b.propTypes;const L=["as","className","class","style","image","loading","imgClassName","imgStyle","backgroundColor","objectFit","objectPosition"],T=["style","className"],C=e=>e.replace(/\n/g,""),S=function(e,t,a){for(var r=arguments.length,n=new Array(r>3?r-3:0),s=3;s<r;s++)n[s-3]=arguments[s];return e.alt||""===e.alt?i().string.apply(i(),[e,t,a].concat(n)):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},I={image:i().object.isRequired,alt:S},N=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],x=["style","className"],A=new Set;let V,j;const _=function(e){let{as:t="div",image:n,style:i,backgroundColor:d,className:u,class:g,onStartLoad:p,onLoad:m,onError:h}=e,f=o(e,N);const{width:y,height:b,layout:w}=n,E=c(y,b,w),{style:v,className:k}=E,L=o(E,x),T=(0,r.useRef)(),C=(0,r.useMemo)((()=>JSON.stringify(n.images)),[n.images]);g&&(u=g);const S=function(e,t,a){let r="";return"fullWidth"===e&&(r='<div aria-hidden="true" style="padding-top: '+a/t*100+'%;"></div>'),"constrained"===e&&(r='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg%20height=\''+a+"'%20width='"+t+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),r}(w,y,b);return(0,r.useEffect)((()=>{V||(V=a.e(731).then(a.bind(a,6731)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:a}=e;return j=t,{renderImageToString:t,swapPlaceholderImage:a}})));const e=T.current.querySelector("[data-gatsby-image-ssr]");if(e&&l())return e.complete?(null==p||p({wasCached:!0}),null==m||m({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==p||p({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==m||m({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void A.add(C);if(j&&A.has(C))return;let t,r;return V.then((e=>{let{renderImageToString:a,swapPlaceholderImage:o}=e;T.current&&(T.current.innerHTML=a(s({isLoading:!0,isLoaded:A.has(C),image:n},f)),A.has(C)||(t=requestAnimationFrame((()=>{T.current&&(r=o(T.current,C,A,i,p,m,h))}))))})),()=>{t&&cancelAnimationFrame(t),r&&r()}}),[n]),(0,r.useLayoutEffect)((()=>{A.has(C)&&j&&(T.current.innerHTML=j(s({isLoading:A.has(C),isLoaded:A.has(C),image:n},f)),null==p||p({wasCached:!0}),null==m||m({wasCached:!0}))}),[n]),(0,r.createElement)(t,s({},L,{style:s({},v,i,{backgroundColor:d}),className:k+(u?" "+u:""),ref:T,dangerouslySetInnerHTML:{__html:S},suppressHydrationWarning:!0}))},O=(0,r.memo)((function(e){return e.image?(0,r.createElement)(_,e):null}));O.propTypes=I,O.displayName="GatsbyImage";const M=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"];function R(e){return function(t){let{src:a,__imageData:n,__error:i}=t,l=o(t,M);return i&&console.warn(i),n?r.createElement(e,s({image:n},l)):(console.warn("Image not loaded",a),null)}}const q=R((function(e){let{as:t="div",className:a,class:n,style:i,image:l,loading:g="lazy",imgClassName:p,imgStyle:h,backgroundColor:f,objectFit:y,objectPosition:b}=e,w=o(e,L);if(!l)return console.warn("[gatsby-plugin-image] Missing image prop"),null;n&&(a=n),h=s({objectFit:y,objectPosition:b,backgroundColor:f},h);const{width:E,height:S,layout:I,images:N,placeholder:x,backgroundColor:A}=l,V=c(E,S,I),{style:j,className:_}=V,O=o(V,T),M={fallback:void 0,sources:[]};return N.fallback&&(M.fallback=s({},N.fallback,{srcSet:N.fallback.srcSet?C(N.fallback.srcSet):void 0})),N.sources&&(M.sources=N.sources.map((e=>s({},e,{srcSet:C(e.srcSet)})))),r.createElement(t,s({},O,{style:s({},j,i,{backgroundColor:f}),className:_+(a?" "+a:"")}),r.createElement(m,{layout:I,width:E,height:S},r.createElement(v,s({},u(x,!1,I,E,S,A,y,b))),r.createElement(k,s({"data-gatsby-image-ssr":"",className:p},w,d("eager"===g,!1,M,g,h)))))})),P=function(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(r)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},z=new Set(["fixed","fullWidth","constrained"]),F={src:i().string.isRequired,alt:S,width:P,height:P,sizes:i().string,layout:e=>{if(void 0!==e.layout&&!z.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}};q.displayName="StaticImage",q.propTypes=F;const Q=R(O);Q.displayName="StaticImage",Q.propTypes=F},3992:function(e,t,a){a.r(t),a.d(t,{Head:function(){return l},default:function(){return o}});var r=a(7294),n=a(7715);var i=e=>{let{language:t,title:a,description:n}=e;return r.createElement(r.Fragment,null,r.createElement("html",{lang:t}),r.createElement("title",null,a," | db-r-hahsimoto's PORTFOLIO"),r.createElement("meta",{name:"description",content:n}),r.createElement("meta",{property:"og:title",content:a}),r.createElement("meta",{property:"og:description",content:n}),r.createElement("meta",{property:"og:image",content:{}.GATSBY_ORIGIN_URL+"/images/icon_horse.png"}),r.createElement("meta",{name:"google-site-verification",content:"IqHGNgoovC1fR2Qm7S_h3_Kt7wudqpPlv6aUb2UtXWY"}))},s=a(8032);var o=()=>r.createElement(n.Z,{pageTitle:"Home"},r.createElement("p",null,"I'm making this by following the Gatsby Tutorial."),r.createElement(s.S,{alt:"Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera",src:"https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large",width:500,__imageData:a(4207)}));const l=()=>r.createElement(r.Fragment,null,r.createElement(i,{language:"ja",title:"db-r-hashimoto's Portfolio",description:"db-r-hashimoto's Portfolio"}),r.createElement("title",null,"Home"))},4207:function(e){e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#887868","images":{"fallback":{"src":"/r-hashimoto/static/8fe15b6557b8e11d33c198a6a9024136/51a07/E1oMV3QVgAIr1NT.jpg","srcSet":"/r-hashimoto/static/8fe15b6557b8e11d33c198a6a9024136/5f2c0/E1oMV3QVgAIr1NT.jpg 125w,\\n/r-hashimoto/static/8fe15b6557b8e11d33c198a6a9024136/7ac0a/E1oMV3QVgAIr1NT.jpg 250w,\\n/r-hashimoto/static/8fe15b6557b8e11d33c198a6a9024136/51a07/E1oMV3QVgAIr1NT.jpg 500w,\\n/r-hashimoto/static/8fe15b6557b8e11d33c198a6a9024136/de105/E1oMV3QVgAIr1NT.jpg 1000w","sizes":"(min-width: 500px) 500px, 100vw"},"sources":[{"srcSet":"/r-hashimoto/static/8fe15b6557b8e11d33c198a6a9024136/ca6c0/E1oMV3QVgAIr1NT.webp 125w,\\n/r-hashimoto/static/8fe15b6557b8e11d33c198a6a9024136/6ef21/E1oMV3QVgAIr1NT.webp 250w,\\n/r-hashimoto/static/8fe15b6557b8e11d33c198a6a9024136/12849/E1oMV3QVgAIr1NT.webp 500w,\\n/r-hashimoto/static/8fe15b6557b8e11d33c198a6a9024136/85e35/E1oMV3QVgAIr1NT.webp 1000w","type":"image/webp","sizes":"(min-width: 500px) 500px, 100vw"}]},"width":500,"height":375}')}}]);
//# sourceMappingURL=component---src-pages-index-tsx-d0ff4caecd60ef1e6d5d.js.map