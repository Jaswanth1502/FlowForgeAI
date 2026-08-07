(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return l},formatWithValidation:function(){return d},urlObjectKeys:function(){return s}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(90809)._(e.r(98183)),o=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,n=e.protocol||"",i=e.pathname||"",l=e.hash||"",s=e.query||"",d=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?d=t+e.host:r&&(d=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(d+=":"+e.port)),s&&"object"==typeof s&&(s=String(a.urlQueryToSearchParams(s)));let c=e.search||s&&`?${s}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||o.test(n))&&!1!==d?(d="//"+(d||""),i&&"/"!==i[0]&&(i="/"+i)):d||(d=""),l&&"#"!==l[0]&&(l="#"+l),c&&"?"!==c[0]&&(c="?"+c),i=i.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${n}${d}${i}${c}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function d(e){return l(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return i}});let n=e.r(71645);function i(e,t){let r=(0,n.useRef)(null),i=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(r.current=a(e,n)),t&&(i.current=a(t,n))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return a}});let n=e.r(18967),i=e.r(52817);function a(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,i.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return g},useLinkStatus:function(){return y}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(90809),o=e.r(43476),l=a._(e.r(71645)),s=e.r(95057),d=e.r(8372),c=e.r(18581),p=e.r(18967),f=e.r(5550);e.r(33525);let u=e.r(88540),h=e.r(91949),x=e.r(73668),m=e.r(9396);function g(t){var r,n;let i,a,g,[y,v]=(0,l.useOptimistic)(h.IDLE_LINK_STATUS),j=(0,l.useRef)(null),{href:w,as:$,children:S,prefetch:k=null,passHref:C,replace:N,shallow:A,scroll:P,onClick:z,onMouseEnter:_,onTouchStart:O,legacyBehavior:T=!1,onNavigate:R,transitionTypes:M,ref:F,unstable_dynamicOnHover:I,...E}=t;i=S,T&&("string"==typeof i||"number"==typeof i)&&(i=(0,o.jsx)("a",{children:i}));let L=l.default.useContext(d.AppRouterContext),U=!1!==k,D=!1!==k?null===(n=k)||"auto"===n?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,W="string"==typeof(r=$||w)?r:(0,s.formatUrl)(r);if(T){if(i?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});a=l.default.Children.only(i)}let B=T?a&&"object"==typeof a&&a.ref:F,K=l.default.useCallback(e=>(null!==L&&(j.current=(0,h.mountLinkInstance)(e,W,L,D,U,v)),()=>{j.current&&((0,h.unmountLinkForCurrentNavigation)(j.current),j.current=null),(0,h.unmountPrefetchableInstance)(e)}),[U,W,L,D,v]),q={ref:(0,c.useMergedRef)(K,B),onClick(t){T||"function"!=typeof z||z(t),T&&a.props&&"function"==typeof a.props.onClick&&a.props.onClick(t),!L||t.defaultPrevented||function(t,r,n,i,a,o,s){if("u">typeof window){let d,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((d=t.currentTarget.getAttribute("target"))&&"_self"!==d||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,x.isLocalURL)(r)){i&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),o){let e=!1;if(o({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:p}=e.r(99781);l.default.startTransition(()=>{p(r,i?"replace":"push",!1===a?u.ScrollBehavior.NoScroll:u.ScrollBehavior.Default,n.current,s)})}}(t,W,j,N,P,R,M)},onMouseEnter(e){T||"function"!=typeof _||_(e),T&&a.props&&"function"==typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),L&&U&&(0,h.onNavigationIntent)(e.currentTarget,!0===I)},onTouchStart:function(e){T||"function"!=typeof O||O(e),T&&a.props&&"function"==typeof a.props.onTouchStart&&a.props.onTouchStart(e),L&&U&&(0,h.onNavigationIntent)(e.currentTarget,!0===I)}};return(0,p.isAbsoluteUrl)(W)?q.href=W:T&&!C&&("a"!==a.type||"href"in a.props)||(q.href=(0,f.addBasePath)(W)),g=T?l.default.cloneElement(a,q):(0,o.jsx)("a",{...E,...q,children:i}),(0,o.jsx)(b.Provider,{value:y,children:g})}e.r(84508);let b=(0,l.createContext)(h.IDLE_LINK_STATUS),y=()=>(0,l.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},13094,e=>{"use strict";var t=e.i(43476);e.s(["default",0,function({size:e=28,className:r=""}){return(0,t.jsxs)("svg",{width:e,height:e,viewBox:"0 0 100 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:`flowforge-brand-logo ${r}`,style:{display:"inline-block",verticalAlign:"middle",flexShrink:0},"aria-label":"FlowForge AI Logo",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("linearGradient",{id:"ff-top-grad",x1:"0",y1:"0",x2:"100",y2:"40",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#3b82f6"}),(0,t.jsx)("stop",{offset:"60%",stopColor:"#60a5fa"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#93c5fd"})]}),(0,t.jsxs)("linearGradient",{id:"ff-mid-grad",x1:"0",y1:"40",x2:"80",y2:"80",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#2563eb"}),(0,t.jsx)("stop",{offset:"50%",stopColor:"#4f46e5"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#6366f1"})]}),(0,t.jsxs)("linearGradient",{id:"ff-bot-grad",x1:"0",y1:"80",x2:"40",y2:"120",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#4338ca"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#6d28d9"})]}),(0,t.jsx)("filter",{id:"ff-glow",x:"-10%",y:"-10%",width:"120%",height:"120%",filterUnits:"userSpaceOnUse",children:(0,t.jsx)("feDropShadow",{dx:"0",dy:"3",stdDeviation:"4",floodColor:"#3b82f6",floodOpacity:"0.25"})})]}),(0,t.jsxs)("g",{filter:"url(#ff-glow)",children:[(0,t.jsx)("path",{d:"M 10 28 C 10 14 20 6 36 6 L 82 6 C 92 6 98 12 98 20 C 98 28 92 34 82 34 L 10 34 Z",fill:"url(#ff-top-grad)"}),(0,t.jsx)("path",{d:"M 10 66 C 10 52 18 46 32 46 L 68 46 C 76 46 82 52 82 60 C 82 68 76 74 68 74 L 10 74 Z",fill:"url(#ff-mid-grad)"}),(0,t.jsx)("path",{d:"M 10 86 L 36 86 C 36 86 36 94 36 102 C 36 112 28 118 18 118 L 10 118 Z",fill:"url(#ff-bot-grad)"})]})]})}])},18566,(e,t,r)=>{t.exports=e.r(76562)},54067,e=>{"use strict";var t=e.i(43476),r=e.i(71645);e.s(["default",0,function(){let e=(0,r.useRef)(null),n=(0,r.useRef)([]),i=(0,r.useRef)(0),a=(0,r.useRef)(null),o=(0,r.useRef)(0),[l,s]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{let t=!1,r=[],l=window.location.pathname.startsWith("/FlowForgeAI")?"/FlowForgeAI":"";for(let e=1;e<=240;e++){let n=new Image,i=String(e).padStart(3,"0");n.src=`${l}/bg-frames/ezgif-frame-${i}.jpg`,1===e&&(n.onload=()=>{t||s(!0)}),r.push(n)}n.current=r;let d=e.current;if(!d)return;let c=d.getContext("2d",{alpha:!1});if(!c)return;let p=()=>{if(!d||!c)return;let e=Math.min(window.devicePixelRatio||1,2),t=window.innerWidth,r=window.innerHeight;d.width=Math.floor(t*e),d.height=Math.floor(r*e),d.style.width=`${t}px`,d.style.height=`${r}px`,c.fillStyle="#0f172a",c.fillRect(0,0,d.width,d.height),c.imageSmoothingEnabled=!0,c.imageSmoothingQuality="high"};p(),window.addEventListener("resize",p);let f=e=>{a.current=requestAnimationFrame(f);let t=e-o.current;if(t<33.333333333333336)return;o.current=e-t%33.333333333333336;let r=i.current,l=n.current[r];if(l&&l.complete&&l.naturalWidth>0){let e=d.width,t=d.height,r=l.naturalWidth/l.naturalHeight,n=e/t,i=e,a=t,o=0,s=0;n>r?s=(t-(a=e/r))/2:o=(e-(i=t*r))/2,c.drawImage(l,o,s,i,a)}i.current=(i.current+1)%240};return a.current=requestAnimationFrame(f),()=>{t=!0,a.current&&cancelAnimationFrame(a.current),window.removeEventListener("resize",p)}},[]),(0,t.jsxs)("div",{className:"frame-sequence-bg-container","aria-hidden":"true",children:[(0,t.jsx)("canvas",{ref:e,className:"frame-sequence-canvas"}),(0,t.jsx)("div",{className:"frame-sequence-overlay"})]})}])},67585,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"BailoutToCSR",{enumerable:!0,get:function(){return i}});let n=e.r(32061);function i({reason:e,children:t}){if("u"<typeof window)throw Object.defineProperty(new n.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return t}},9885,(e,t,r)=>{"use strict";function n(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"encodeURIPath",{enumerable:!0,get:function(){return n}})},52157,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"PreloadChunks",{enumerable:!0,get:function(){return s}});let n=e.r(43476),i=e.r(74080),a=e.r(63599),o=e.r(9885),l=e.r(43369);function s({moduleIds:e}){if("u">typeof window)return null;let t=a.workAsyncStorage.getStore();if(void 0===t)return null;let r=[];if(t.reactLoadableManifest&&e){let n=t.reactLoadableManifest;for(let t of e){if(!n[t])continue;let e=n[t].files;r.push(...e)}}if(0===r.length)return null;let d=(0,l.getAssetTokenQuery)();return(0,n.jsx)(n.Fragment,{children:r.map(e=>{let r=`${t.assetPrefix}/_next/${(0,o.encodeURIPath)(e)}${d}`;return e.endsWith(".css")?(0,n.jsx)("link",{precedence:"dynamic",href:r,rel:"stylesheet",as:"style",nonce:t.nonce},e):((0,i.preload)(r,{as:"script",fetchPriority:"low",nonce:t.nonce}),null)})})}},69093,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return d}});let n=e.r(43476),i=e.r(71645),a=e.r(67585),o=e.r(52157);function l(e){return{default:e&&"default"in e?e.default:e}}let s={loader:()=>Promise.resolve(l(()=>null)),loading:null,ssr:!0},d=function(e){let t={...s,...e},r=(0,i.lazy)(()=>t.loader().then(l)),d=t.loading;function c(e){let l=d?(0,n.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,s=!t.ssr||!!t.loading,c=s?i.Suspense:i.Fragment,p=t.ssr?(0,n.jsxs)(n.Fragment,{children:["u"<typeof window?(0,n.jsx)(o.PreloadChunks,{moduleIds:t.modules}):null,(0,n.jsx)(r,{...e})]}):(0,n.jsx)(a.BailoutToCSR,{reason:"next/dynamic",children:(0,n.jsx)(r,{...e})});return(0,n.jsx)(c,{...s?{fallback:l}:{},children:p})}return c.displayName="LoadableComponent",c}},70703,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return i}});let n=e.r(55682)._(e.r(69093));function i(e,t){let r={};"function"==typeof e&&(r.loader=e);let i={...r,...t};return(0,n.default)({...i,modules:i.loadableGenerated?.modules})}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},46633,86230,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let n=(0,e.i(70703).default)(()=>e.A(35641),{loadableGenerated:{modules:[8576]},ssr:!1});function i({component:e}){switch(e.type){case"hero":return(0,t.jsx)(a,{data:e});case"list":return(0,t.jsx)(o,{data:e});case"grid":return(0,t.jsx)(l,{data:e});case"metric":return(0,t.jsx)(s,{data:e});case"card":return(0,t.jsx)(d,{data:e});case"chart":return(0,t.jsx)(c,{data:e});case"table":return(0,t.jsx)(p,{data:e});case"form":return(0,t.jsx)(f,{data:e});case"button":return(0,t.jsx)(u,{data:e});case"progress":return(0,t.jsx)(h,{data:e});case"timeline":return(0,t.jsx)(x,{data:e});default:return(0,t.jsxs)("div",{className:"unknown-component",children:["Unknown component: ",e.type]})}}function a({data:e}){return(0,t.jsxs)("div",{className:"hero-component",style:{padding:"32px",borderRadius:"var(--radius-lg)",background:"linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(124, 58, 237, 0.06))",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"12px",position:"relative"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.icon&&(0,t.jsx)("span",{style:{fontSize:"28px"},children:e.icon}),(0,t.jsx)("h2",{style:{fontSize:"26px",fontWeight:800,margin:0,color:"var(--text-primary)"},children:e.title})]}),(e.subtitle||e.content)&&(0,t.jsx)("p",{style:{fontSize:"15px",color:"var(--text-secondary)",lineHeight:1.6,margin:0,maxWidth:"720px"},children:e.subtitle||e.content}),(e.actionText||e.cta)&&(0,t.jsx)("div",{style:{marginTop:"8px"},children:(0,t.jsxs)("button",{className:"rendered-button variant-primary",onClick:()=>alert(`Action: ${e.actionText||e.cta}`),children:[e.actionText||e.cta," →"]})})]})}function o({data:e}){let r=Array.isArray(e.items)?e.items:[];return(0,t.jsxs)("div",{className:"list-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,marginBottom:"16px"},children:e.title}),(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:r.map((e,r)=>(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",borderRadius:"8px",background:"rgba(99, 102, 241, 0.04)",border:"1px solid var(--border)"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.icon&&(0,t.jsx)("span",{children:e.icon}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"var(--text-primary)"},children:e.title}),e.subtitle&&(0,t.jsx)("div",{style:{fontSize:"12px",color:"var(--text-muted)"},children:e.subtitle})]})]}),e.badge&&(0,t.jsx)("span",{style:{fontSize:"11px",fontWeight:600,padding:"3px 8px",borderRadius:"12px",background:"rgba(99, 102, 241, 0.15)",color:"var(--accent-light)"},children:e.badge})]},r))})]})}function l({data:e}){let r=Array.isArray(e.items)?e.items:[];return(0,t.jsxs)("div",{className:"grid-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,marginBottom:"16px"},children:e.title}),(0,t.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"},children:r.map((e,r)=>(0,t.jsxs)("div",{style:{padding:"16px",borderRadius:"10px",background:"var(--bg-secondary)",border:"1px solid var(--border)",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{style:{fontSize:"15px",fontWeight:700,color:"var(--text-primary)",marginBottom:"6px"},children:e.title}),e.description&&(0,t.jsx)("div",{style:{fontSize:"13px",color:"var(--text-secondary)",lineHeight:1.5,marginBottom:"10px"},children:e.description})]}),Array.isArray(e.tags)&&e.tags.length>0&&(0,t.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"8px"},children:e.tags.map((e,r)=>(0,t.jsx)("span",{style:{fontSize:"11px",padding:"2px 6px",borderRadius:"4px",background:"rgba(99, 102, 241, 0.1)",color:"var(--accent-light)"},children:e},r))})]},r))})]})}function s({data:e}){return(0,t.jsxs)("div",{className:"metric-card",children:[(0,t.jsxs)("div",{className:"metric-header",children:[e.icon&&(0,t.jsx)("span",{className:"metric-icon",children:e.icon}),(0,t.jsx)("span",{className:"metric-title",children:e.title})]}),(0,t.jsx)("div",{className:"metric-value",children:e.value}),e.change&&(0,t.jsxs)("div",{className:`metric-change ${"up"===e.trend?"trend-up":"down"===e.trend?"trend-down":"trend-neutral"}`,children:["up"===e.trend?"↑":"down"===e.trend?"↓":"→"," ",e.change]})]})}function d({data:e}){return(0,t.jsxs)("div",{className:"card-component",children:[(0,t.jsxs)("div",{className:"card-header-row",children:[e.icon&&(0,t.jsx)("span",{className:"card-icon",children:e.icon}),(0,t.jsx)("h3",{children:e.title})]}),(0,t.jsx)("div",{className:"card-content",children:e.content})]})}function c({data:e}){return(0,t.jsxs)("div",{className:"chart-card",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)(n,{chartType:e.chartType,labels:e.labels||[],datasets:e.datasets||[],title:e.title})]})}function p({data:e}){return(0,t.jsxs)("div",{className:"table-component",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)("div",{className:"table-scroll",children:(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{children:(e.columns||[]).map((e,r)=>(0,t.jsx)("th",{children:e},r))})}),(0,t.jsx)("tbody",{children:(e.rows||[]).map((e,r)=>(0,t.jsx)("tr",{children:e.map((e,r)=>(0,t.jsx)("td",{children:e},r))},r))})]})})]})}function f({data:e}){let[n,i]=(0,r.useState)({});return(0,t.jsxs)("div",{className:"form-component",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsxs)("form",{onSubmit:e=>{e.preventDefault(),alert("Form submitted: "+JSON.stringify(n,null,2))},children:[(e.fields||[]).map((e,r)=>(0,t.jsxs)("div",{className:"form-field",children:[(0,t.jsx)("label",{htmlFor:`field-${e.name}`,children:e.label}),"select"===e.fieldType?(0,t.jsxs)("select",{id:`field-${e.name}`,value:n[e.name]||"",onChange:t=>i({...n,[e.name]:t.target.value}),children:[(0,t.jsx)("option",{value:"",children:"Select..."}),(e.options||[]).map((e,r)=>(0,t.jsx)("option",{value:e,children:e},r))]}):"checkbox"===e.fieldType?(0,t.jsx)("input",{type:"checkbox",id:`field-${e.name}`,checked:"true"===n[e.name],onChange:t=>i({...n,[e.name]:String(t.target.checked)})}):"textarea"===e.fieldType?(0,t.jsx)("textarea",{id:`field-${e.name}`,placeholder:e.placeholder||"",value:n[e.name]||"",onChange:t=>i({...n,[e.name]:t.target.value}),rows:3}):(0,t.jsx)("input",{type:e.fieldType||"text",id:`field-${e.name}`,placeholder:e.placeholder||"",value:n[e.name]||"",onChange:t=>i({...n,[e.name]:t.target.value})})]},r)),(0,t.jsx)("button",{type:"submit",className:"form-submit-btn",children:"Submit"})]})]})}function u({data:e}){return(0,t.jsx)("button",{className:`rendered-button variant-${e.variant||"primary"}`,onClick:()=>alert(`Action: ${e.action||e.label}`),children:e.label})}function h({data:e}){let r=Math.min(100,Math.max(0,e.value||0));return(0,t.jsxs)("div",{className:"progress-component",children:[(0,t.jsxs)("div",{className:"progress-header",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsxs)("span",{className:"progress-value",children:[r,"%"]})]}),(0,t.jsx)("div",{className:"progress-bar-bg",children:(0,t.jsx)("div",{className:"progress-bar-fill",style:{width:`${r}%`}})}),e.label&&(0,t.jsx)("p",{className:"progress-label",children:e.label})]})}function x({data:e}){return(0,t.jsxs)("div",{className:"timeline-component",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)("div",{className:"timeline-list",children:(e.events||[]).map((e,r)=>(0,t.jsxs)("div",{className:`timeline-item status-${e.status||"upcoming"}`,children:[(0,t.jsx)("div",{className:"timeline-dot"}),(0,t.jsxs)("div",{className:"timeline-content",children:[(0,t.jsxs)("div",{className:"timeline-event-header",children:[(0,t.jsx)("strong",{children:e.title}),(0,t.jsx)("span",{className:"timeline-date",children:e.date})]}),e.description&&(0,t.jsx)("p",{className:"timeline-desc",children:e.description})]})]},r))})]})}e.s(["default",0,function({schema:e}){return e&&e.components?(0,t.jsxs)("div",{className:"ui-renderer",children:[(0,t.jsxs)("div",{className:"renderer-header",children:[(0,t.jsx)("h2",{children:e.title}),e.description&&(0,t.jsx)("p",{children:e.description})]}),(0,t.jsx)("div",{className:"components-grid",children:e.components.map((e,r)=>(0,t.jsx)("div",{className:`component-wrapper component-${e.type}`,style:{animationDelay:`${80*r}ms`},children:(0,t.jsx)(i,{component:e})},`${e.type}-${r}`))})]}):null}],46633),e.s(["downloadDirectPDF",0,function(e){let t,r,n,i=(t=e.title||"FlowForge AI Generated Application",r=e.description||"",n=(Array.isArray(e.components)?e.components:[]).map(e=>{let t=e.type||"card",r=e.title||e.name||"";if("hero"===t)return`
        <div class="pdf-card pdf-hero">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            ${e.icon?`<span style="font-size: 28px;">${e.icon}</span>`:""}
            <h2 style="font-size: 22px; font-weight: 800; color: #1e1b4b; margin: 0;">${r}</h2>
          </div>
          ${e.subtitle||e.content?`<p style="font-size: 14px; color: #475569; line-height: 1.5; margin: 0;">${e.subtitle||e.content}</p>`:""}
          ${e.actionText||e.cta?`<div style="margin-top: 12px;"><span class="pdf-btn">${e.actionText||e.cta} →</span></div>`:""}
        </div>
      `;if("metric"===t)return`
        <div class="pdf-card pdf-metric">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">${r}</div>
              <div style="font-size: 26px; font-weight: 800; color: #1e1b4b; margin-top: 4px;">${e.value||"0"}</div>
            </div>
            ${e.change?`<span class="pdf-badge ${String(e.change).startsWith("-")?"badge-neg":"badge-pos"}">${e.change}</span>`:e.icon?`<span style="font-size: 24px;">${e.icon}</span>`:""}
          </div>
        </div>
      `;if("table"===t){let t=Array.isArray(e.columns)?e.columns:["Item","Category","Status","Value"],n=Array.isArray(e.rows)?e.rows:[];return`
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px;">${r}</h3>
          <table class="pdf-table">
            <thead>
              <tr>
                ${t.map(e=>`<th>${e}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${n.map(e=>`
                <tr>
                  ${(Array.isArray(e)?e:[e]).map(e=>`<td>${e}</td>`).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `}if("timeline"===t){let t=Array.isArray(e.events)?e.events:[];return`
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 14px;">${r}</h3>
          <div class="pdf-timeline">
            ${t.map(e=>`
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-body">
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <div style="font-weight: 700; font-size: 14px; color: #1e1b4b;">${e.title||"Milestone"}</div>
                    ${e.date?`<div style="font-size: 12px; font-weight: 600; color: #4338ca;">${e.date}</div>`:""}
                  </div>
                  ${e.description?`<div style="font-size: 12px; color: #64748b; margin-top: 3px; line-height: 1.4;">${e.description}</div>`:""}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `}if("form"===t){let t=Array.isArray(e.fields)?e.fields:[];return`
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 14px;">${r}</h3>
          <div class="pdf-form-grid">
            ${t.map(e=>`
              <div class="pdf-form-group">
                <label>${e.label||e.name}</label>
                <div class="pdf-input-box">${e.placeholder||e.fieldType||"Input"}</div>
              </div>
            `).join("")}
          </div>
        </div>
      `}if("chart"===t){let t=Array.isArray(e.labels)?e.labels:["Metric A","Metric B","Metric C","Metric D"],n=e.datasets?.[0]?.data||[65,45,80,55];return`
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px;">${r} <span style="font-size: 12px; color: #64748b; font-weight: 400;">(${e.chartType||"Distribution"})</span></h3>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
            ${t.map((e,t)=>{let r=n[t]||50,i=Math.min(100,Math.max(10,r));return`
                <div style="display: flex; align-items: center; gap: 10px; font-size: 12px;">
                  <span style="width: 110px; font-weight: 600; color: #334155;">${e}</span>
                  <div style="flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; width: ${i}%; background: #4f46e5; border-radius: 4px;"></div>
                  </div>
                  <span style="width: 40px; text-align: right; color: #64748b; font-weight: 600;">${r}</span>
                </div>
              `}).join("")}
          </div>
        </div>
      `}if("progress"===t){let t=e.value||75;return`
        <div class="pdf-card">
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 14px; color: #1e1b4b; margin-bottom: 6px;">
            <span>${r}</span>
            <span style="color: #4338ca;">${t}%</span>
          </div>
          <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
            <div style="height: 100%; width: ${t}%; background: #4f46e5; border-radius: 4px;"></div>
          </div>
          ${e.label?`<div style="font-size: 12px; color: #64748b;">${e.label}</div>`:""}
        </div>
      `}return`
      <div class="pdf-card">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          ${e.icon?`<span style="font-size: 20px;">${e.icon}</span>`:""}
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin: 0;">${r}</h3>
        </div>
        <p style="font-size: 13px; color: #475569; line-height: 1.5; margin: 0;">${e.content||e.subtitle||""}</p>
      </div>
    `}).join("\n"),`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${t} - FlowForge AI Export</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 14mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #ffffff !important;
      color: #0f172a !important;
      padding: 16px;
      line-height: 1.4;
      font-size: 13px;
    }
    .pdf-header {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 14px;
      margin-bottom: 18px;
    }
    .pdf-brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .pdf-logo {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #4338ca;
      background: #eef2ff;
      padding: 4px 10px;
      border-radius: 12px;
      display: inline-block;
    }
    .pdf-date {
      font-size: 11px;
      color: #64748b;
      font-weight: 500;
    }
    .pdf-title {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin: 4px 0;
    }
    .pdf-desc {
      font-size: 13px;
      color: #475569;
      line-height: 1.5;
      max-width: 680px;
    }
    .pdf-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .pdf-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px 18px;
      page-break-inside: avoid;
    }
    .pdf-hero {
      background: linear-gradient(135deg, #eef2ff 0%, #faf5ff 100%);
      border: 1px solid #c7d2fe;
    }
    .pdf-btn {
      display: inline-block;
      background: #4338ca;
      color: #ffffff;
      font-weight: 700;
      font-size: 12px;
      padding: 6px 14px;
      border-radius: 6px;
    }
    .pdf-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .badge-pos { background: #dcfce7; color: #15803d; }
    .badge-neg { background: #fee2e2; color: #b91c1c; }
    .pdf-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      text-align: left;
    }
    .pdf-table th {
      background: #edf2f7;
      color: #475569;
      font-weight: 700;
      padding: 8px 10px;
      border-bottom: 1px solid #cbd5e1;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .pdf-table td {
      padding: 8px 10px;
      border-bottom: 1px solid #e2e8f0;
      color: #1e293b;
    }
    .pdf-table tr:nth-child(even) td {
      background: #ffffff;
    }
    .pdf-timeline {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .timeline-item {
      display: flex;
      gap: 10px;
    }
    .timeline-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4338ca;
      margin-top: 5px;
      flex-shrink: 0;
    }
    .timeline-body {
      flex: 1;
    }
    .pdf-form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .pdf-form-group label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: #475569;
      margin-bottom: 3px;
    }
    .pdf-input-box {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 12px;
      color: #94a3b8;
    }
    .pdf-footer {
      margin-top: 24px;
      padding-top: 10px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <header class="pdf-header">
    <div class="pdf-brand">
      <span class="pdf-logo">⚡ FlowForge AI Studio</span>
      <span class="pdf-date">${new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</span>
    </div>
    <h1 class="pdf-title">${t}</h1>
    ${r?`<p class="pdf-desc">${r}</p>`:""}
  </header>

  <main class="pdf-grid">
    ${n}
  </main>

  <footer class="pdf-footer">
    <span>Generated by FlowForge AI Application Engine</span>
    <span>Ready for Print & Archival PDF</span>
  </footer>
</body>
</html>`),a=document.getElementById("flowforge-print-frame");a||((a=document.createElement("iframe")).id="flowforge-print-frame",a.style.position="fixed",a.style.right="0",a.style.bottom="0",a.style.width="0",a.style.height="0",a.style.border="none",document.body.appendChild(a));let o=a.contentWindow?.document||a.contentDocument;o&&(o.open(),o.write(i),o.close(),setTimeout(()=>{a&&a.contentWindow&&(a.contentWindow.focus(),a.contentWindow.print())},300))}],86230)},35641,e=>{e.v(t=>Promise.all(["static/chunks/06f1i-44b6w2h.js"].map(t=>e.l(t))).then(()=>t(8576)))},76207,e=>{e.v(t=>Promise.all(["static/chunks/0d30h6dyawluw.js"].map(t=>e.l(t))).then(()=>t(59141)))},7690,e=>{e.v(t=>Promise.all(["static/chunks/00nc6kamqvsk5.js"].map(t=>e.l(t))).then(()=>t(84479)))}]);