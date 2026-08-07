(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={formatUrl:function(){return l},formatWithValidation:function(){return d},urlObjectKeys:function(){return o}};for(var a in s)Object.defineProperty(r,a,{enumerable:!0,get:s[a]});let i=e.r(90809)._(e.r(98183)),n=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,s=e.protocol||"",a=e.pathname||"",l=e.hash||"",o=e.query||"",d=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?d=t+e.host:r&&(d=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(d+=":"+e.port)),o&&"object"==typeof o&&(o=String(i.urlQueryToSearchParams(o)));let c=e.search||o&&`?${o}`||"";return s&&!s.endsWith(":")&&(s+=":"),e.slashes||(!s||n.test(s))&&!1!==d?(d="//"+(d||""),a&&"/"!==a[0]&&(a="/"+a)):d||(d=""),l&&"#"!==l[0]&&(l="#"+l),c&&"?"!==c[0]&&(c="?"+c),a=a.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${s}${d}${a}${c}${l}`}let o=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function d(e){return l(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return a}});let s=e.r(71645);function a(e,t){let r=(0,s.useRef)(null),a=(0,s.useRef)(null);return(0,s.useCallback)(s=>{if(null===s){let e=r.current;e&&(r.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(r.current=i(e,s)),t&&(a.current=i(t,s))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return i}});let s=e.r(18967),a=e.r(52817);function i(e){if(!(0,s.isAbsoluteUrl)(e))return!0;try{let t=(0,s.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,a.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return s}});let s=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={default:function(){return g},useLinkStatus:function(){return y}};for(var a in s)Object.defineProperty(r,a,{enumerable:!0,get:s[a]});let i=e.r(90809),n=e.r(43476),l=i._(e.r(71645)),o=e.r(95057),d=e.r(8372),c=e.r(18581),p=e.r(18967),f=e.r(5550);e.r(33525);let u=e.r(88540),m=e.r(91949),h=e.r(73668),x=e.r(9396);function g(t){var r,s;let a,i,g,[y,v]=(0,l.useOptimistic)(m.IDLE_LINK_STATUS),j=(0,l.useRef)(null),{href:w,as:N,children:k,prefetch:S=null,passHref:$,replace:C,shallow:P,scroll:A,onClick:O,onMouseEnter:_,onTouchStart:T,legacyBehavior:I=!1,onNavigate:z,transitionTypes:R,ref:F,unstable_dynamicOnHover:M,...D}=t;a=k,I&&("string"==typeof a||"number"==typeof a)&&(a=(0,n.jsx)("a",{children:a}));let L=l.default.useContext(d.AppRouterContext),E=!1!==S,U=!1!==S?null===(s=S)||"auto"===s?x.FetchStrategy.PPR:x.FetchStrategy.Full:x.FetchStrategy.PPR,W="string"==typeof(r=N||w)?r:(0,o.formatUrl)(r);if(I){if(a?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});i=l.default.Children.only(a)}let B=I?i&&"object"==typeof i&&i.ref:F,G=l.default.useCallback(e=>(null!==L&&(j.current=(0,m.mountLinkInstance)(e,W,L,U,E,v)),()=>{j.current&&((0,m.unmountLinkForCurrentNavigation)(j.current),j.current=null),(0,m.unmountPrefetchableInstance)(e)}),[E,W,L,U,v]),K={ref:(0,c.useMergedRef)(G,B),onClick(t){I||"function"!=typeof O||O(t),I&&i.props&&"function"==typeof i.props.onClick&&i.props.onClick(t),!L||t.defaultPrevented||function(t,r,s,a,i,n,o){if("u">typeof window){let d,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((d=t.currentTarget.getAttribute("target"))&&"_self"!==d||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){a&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),n){let e=!1;if(n({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:p}=e.r(99781);l.default.startTransition(()=>{p(r,a?"replace":"push",!1===i?u.ScrollBehavior.NoScroll:u.ScrollBehavior.Default,s.current,o)})}}(t,W,j,C,A,z,R)},onMouseEnter(e){I||"function"!=typeof _||_(e),I&&i.props&&"function"==typeof i.props.onMouseEnter&&i.props.onMouseEnter(e),L&&E&&(0,m.onNavigationIntent)(e.currentTarget,!0===M)},onTouchStart:function(e){I||"function"!=typeof T||T(e),I&&i.props&&"function"==typeof i.props.onTouchStart&&i.props.onTouchStart(e),L&&E&&(0,m.onNavigationIntent)(e.currentTarget,!0===M)}};return(0,p.isAbsoluteUrl)(W)?K.href=W:I&&!$&&("a"!==i.type||"href"in i.props)||(K.href=(0,f.addBasePath)(W)),g=I?l.default.cloneElement(i,K):(0,n.jsx)("a",{...D,...K,children:a}),(0,n.jsx)(b.Provider,{value:y,children:g})}e.r(84508);let b=(0,l.createContext)(m.IDLE_LINK_STATUS),y=()=>(0,l.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},13094,e=>{"use strict";var t=e.i(43476);e.s(["default",0,function({size:e=28,className:r=""}){return(0,t.jsxs)("svg",{width:e,height:e,viewBox:"0 0 100 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:`flowforge-brand-logo ${r}`,style:{display:"inline-block",verticalAlign:"middle",flexShrink:0},"aria-label":"FlowForge AI Logo",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("linearGradient",{id:"ff-top-grad",x1:"0",y1:"0",x2:"100",y2:"40",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#3b82f6"}),(0,t.jsx)("stop",{offset:"60%",stopColor:"#60a5fa"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#93c5fd"})]}),(0,t.jsxs)("linearGradient",{id:"ff-mid-grad",x1:"0",y1:"40",x2:"80",y2:"80",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#2563eb"}),(0,t.jsx)("stop",{offset:"50%",stopColor:"#4f46e5"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#6366f1"})]}),(0,t.jsxs)("linearGradient",{id:"ff-bot-grad",x1:"0",y1:"80",x2:"40",y2:"120",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#4338ca"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#6d28d9"})]}),(0,t.jsx)("filter",{id:"ff-glow",x:"-10%",y:"-10%",width:"120%",height:"120%",filterUnits:"userSpaceOnUse",children:(0,t.jsx)("feDropShadow",{dx:"0",dy:"3",stdDeviation:"4",floodColor:"#3b82f6",floodOpacity:"0.25"})})]}),(0,t.jsxs)("g",{filter:"url(#ff-glow)",children:[(0,t.jsx)("path",{d:"M 10 28 C 10 14 20 6 36 6 L 82 6 C 92 6 98 12 98 20 C 98 28 92 34 82 34 L 10 34 Z",fill:"url(#ff-top-grad)"}),(0,t.jsx)("path",{d:"M 10 66 C 10 52 18 46 32 46 L 68 46 C 76 46 82 52 82 60 C 82 68 76 74 68 74 L 10 74 Z",fill:"url(#ff-mid-grad)"}),(0,t.jsx)("path",{d:"M 10 86 L 36 86 C 36 86 36 94 36 102 C 36 112 28 118 18 118 L 10 118 Z",fill:"url(#ff-bot-grad)"})]})]})}])},18566,(e,t,r)=>{t.exports=e.r(76562)},67585,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"BailoutToCSR",{enumerable:!0,get:function(){return a}});let s=e.r(32061);function a({reason:e,children:t}){if("u"<typeof window)throw Object.defineProperty(new s.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return t}},9885,(e,t,r)=>{"use strict";function s(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"encodeURIPath",{enumerable:!0,get:function(){return s}})},52157,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"PreloadChunks",{enumerable:!0,get:function(){return o}});let s=e.r(43476),a=e.r(74080),i=e.r(63599),n=e.r(9885),l=e.r(43369);function o({moduleIds:e}){if("u">typeof window)return null;let t=i.workAsyncStorage.getStore();if(void 0===t)return null;let r=[];if(t.reactLoadableManifest&&e){let s=t.reactLoadableManifest;for(let t of e){if(!s[t])continue;let e=s[t].files;r.push(...e)}}if(0===r.length)return null;let d=(0,l.getAssetTokenQuery)();return(0,s.jsx)(s.Fragment,{children:r.map(e=>{let r=`${t.assetPrefix}/_next/${(0,n.encodeURIPath)(e)}${d}`;return e.endsWith(".css")?(0,s.jsx)("link",{precedence:"dynamic",href:r,rel:"stylesheet",as:"style",nonce:t.nonce},e):((0,a.preload)(r,{as:"script",fetchPriority:"low",nonce:t.nonce}),null)})})}},69093,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return d}});let s=e.r(43476),a=e.r(71645),i=e.r(67585),n=e.r(52157);function l(e){return{default:e&&"default"in e?e.default:e}}let o={loader:()=>Promise.resolve(l(()=>null)),loading:null,ssr:!0},d=function(e){let t={...o,...e},r=(0,a.lazy)(()=>t.loader().then(l)),d=t.loading;function c(e){let l=d?(0,s.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,o=!t.ssr||!!t.loading,c=o?a.Suspense:a.Fragment,p=t.ssr?(0,s.jsxs)(s.Fragment,{children:["u"<typeof window?(0,s.jsx)(n.PreloadChunks,{moduleIds:t.modules}):null,(0,s.jsx)(r,{...e})]}):(0,s.jsx)(i.BailoutToCSR,{reason:"next/dynamic",children:(0,s.jsx)(r,{...e})});return(0,s.jsx)(c,{...o?{fallback:l}:{},children:p})}return c.displayName="LoadableComponent",c}},70703,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return a}});let s=e.r(55682)._(e.r(69093));function a(e,t){let r={};"function"==typeof e&&(r.loader=e);let a={...r,...t};return(0,s.default)({...a,modules:a.loadableGenerated?.modules})}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},46633,86230,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let s=(0,e.i(70703).default)(()=>e.A(35641),{loadableGenerated:{modules:[8576]},ssr:!1});function a({component:e}){switch(e.type){case"hero":return(0,t.jsx)(i,{data:e});case"list":return(0,t.jsx)(n,{data:e});case"grid":return(0,t.jsx)(l,{data:e});case"metric":return(0,t.jsx)(o,{data:e});case"card":return(0,t.jsx)(d,{data:e});case"chart":return(0,t.jsx)(c,{data:e});case"table":return(0,t.jsx)(p,{data:e});case"form":return(0,t.jsx)(f,{data:e});case"button":return(0,t.jsx)(u,{data:e});case"progress":return(0,t.jsx)(m,{data:e});case"timeline":return(0,t.jsx)(h,{data:e});default:return(0,t.jsxs)("div",{className:"unknown-component",children:["Unknown component: ",e.type]})}}function i({data:e}){return(0,t.jsxs)("div",{className:"hero-component",style:{padding:"32px",borderRadius:"var(--radius-lg)",background:"linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(124, 58, 237, 0.06))",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"12px",position:"relative"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.icon&&(0,t.jsx)("span",{style:{fontSize:"28px"},children:e.icon}),(0,t.jsx)("h2",{style:{fontSize:"26px",fontWeight:800,margin:0,color:"var(--text-primary)"},children:e.title})]}),(e.subtitle||e.content)&&(0,t.jsx)("p",{style:{fontSize:"15px",color:"var(--text-secondary)",lineHeight:1.6,margin:0,maxWidth:"720px"},children:e.subtitle||e.content}),(e.actionText||e.cta)&&(0,t.jsx)("div",{style:{marginTop:"8px"},children:(0,t.jsxs)("button",{className:"rendered-button variant-primary",onClick:()=>alert(`Action: ${e.actionText||e.cta}`),children:[e.actionText||e.cta," →"]})})]})}function n({data:e}){let r=Array.isArray(e.items)?e.items:[];return(0,t.jsxs)("div",{className:"list-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,marginBottom:"16px"},children:e.title}),(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:r.map((e,r)=>(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",borderRadius:"8px",background:"rgba(99, 102, 241, 0.04)",border:"1px solid var(--border)"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.icon&&(0,t.jsx)("span",{children:e.icon}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"var(--text-primary)"},children:e.title}),e.subtitle&&(0,t.jsx)("div",{style:{fontSize:"12px",color:"var(--text-muted)"},children:e.subtitle})]})]}),e.badge&&(0,t.jsx)("span",{style:{fontSize:"11px",fontWeight:600,padding:"3px 8px",borderRadius:"12px",background:"rgba(99, 102, 241, 0.15)",color:"var(--accent-light)"},children:e.badge})]},r))})]})}function l({data:e}){let r=Array.isArray(e.items)?e.items:[];return(0,t.jsxs)("div",{className:"grid-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,marginBottom:"16px"},children:e.title}),(0,t.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"},children:r.map((e,r)=>(0,t.jsxs)("div",{style:{padding:"16px",borderRadius:"10px",background:"var(--bg-secondary)",border:"1px solid var(--border)",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{style:{fontSize:"15px",fontWeight:700,color:"var(--text-primary)",marginBottom:"6px"},children:e.title}),e.description&&(0,t.jsx)("div",{style:{fontSize:"13px",color:"var(--text-secondary)",lineHeight:1.5,marginBottom:"10px"},children:e.description})]}),Array.isArray(e.tags)&&e.tags.length>0&&(0,t.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"8px"},children:e.tags.map((e,r)=>(0,t.jsx)("span",{style:{fontSize:"11px",padding:"2px 6px",borderRadius:"4px",background:"rgba(99, 102, 241, 0.1)",color:"var(--accent-light)"},children:e},r))})]},r))})]})}function o({data:e}){return(0,t.jsxs)("div",{className:"metric-card",children:[(0,t.jsxs)("div",{className:"metric-header",children:[e.icon&&(0,t.jsx)("span",{className:"metric-icon",children:e.icon}),(0,t.jsx)("span",{className:"metric-title",children:e.title})]}),(0,t.jsx)("div",{className:"metric-value",children:e.value}),e.change&&(0,t.jsxs)("div",{className:`metric-change ${"up"===e.trend?"trend-up":"down"===e.trend?"trend-down":"trend-neutral"}`,children:["up"===e.trend?"↑":"down"===e.trend?"↓":"→"," ",e.change]})]})}function d({data:e}){return(0,t.jsxs)("div",{className:"card-component",children:[(0,t.jsxs)("div",{className:"card-header-row",children:[e.icon&&(0,t.jsx)("span",{className:"card-icon",children:e.icon}),(0,t.jsx)("h3",{children:e.title})]}),(0,t.jsx)("div",{className:"card-content",children:e.content})]})}function c({data:e}){return(0,t.jsxs)("div",{className:"chart-card",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)(s,{chartType:e.chartType,labels:e.labels||[],datasets:e.datasets||[],title:e.title})]})}function p({data:e}){return(0,t.jsxs)("div",{className:"table-component",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)("div",{className:"table-scroll",children:(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{children:(e.columns||[]).map((e,r)=>(0,t.jsx)("th",{children:e},r))})}),(0,t.jsx)("tbody",{children:(e.rows||[]).map((e,r)=>(0,t.jsx)("tr",{children:e.map((e,r)=>(0,t.jsx)("td",{children:e},r))},r))})]})})]})}function f({data:e}){let[s,a]=(0,r.useState)({});return(0,t.jsxs)("div",{className:"form-component",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsxs)("form",{onSubmit:e=>{e.preventDefault(),alert("Form submitted: "+JSON.stringify(s,null,2))},children:[(e.fields||[]).map((e,r)=>(0,t.jsxs)("div",{className:"form-field",children:[(0,t.jsx)("label",{htmlFor:`field-${e.name}`,children:e.label}),"select"===e.fieldType?(0,t.jsxs)("select",{id:`field-${e.name}`,value:s[e.name]||"",onChange:t=>a({...s,[e.name]:t.target.value}),children:[(0,t.jsx)("option",{value:"",children:"Select..."}),(e.options||[]).map((e,r)=>(0,t.jsx)("option",{value:e,children:e},r))]}):"checkbox"===e.fieldType?(0,t.jsx)("input",{type:"checkbox",id:`field-${e.name}`,checked:"true"===s[e.name],onChange:t=>a({...s,[e.name]:String(t.target.checked)})}):"textarea"===e.fieldType?(0,t.jsx)("textarea",{id:`field-${e.name}`,placeholder:e.placeholder||"",value:s[e.name]||"",onChange:t=>a({...s,[e.name]:t.target.value}),rows:3}):(0,t.jsx)("input",{type:e.fieldType||"text",id:`field-${e.name}`,placeholder:e.placeholder||"",value:s[e.name]||"",onChange:t=>a({...s,[e.name]:t.target.value})})]},r)),(0,t.jsx)("button",{type:"submit",className:"form-submit-btn",children:"Submit"})]})]})}function u({data:e}){return(0,t.jsx)("button",{className:`rendered-button variant-${e.variant||"primary"}`,onClick:()=>alert(`Action: ${e.action||e.label}`),children:e.label})}function m({data:e}){let r=Math.min(100,Math.max(0,e.value||0));return(0,t.jsxs)("div",{className:"progress-component",children:[(0,t.jsxs)("div",{className:"progress-header",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsxs)("span",{className:"progress-value",children:[r,"%"]})]}),(0,t.jsx)("div",{className:"progress-bar-bg",children:(0,t.jsx)("div",{className:"progress-bar-fill",style:{width:`${r}%`}})}),e.label&&(0,t.jsx)("p",{className:"progress-label",children:e.label})]})}function h({data:e}){return(0,t.jsxs)("div",{className:"timeline-component",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)("div",{className:"timeline-list",children:(e.events||[]).map((e,r)=>(0,t.jsxs)("div",{className:`timeline-item status-${e.status||"upcoming"}`,children:[(0,t.jsx)("div",{className:"timeline-dot"}),(0,t.jsxs)("div",{className:"timeline-content",children:[(0,t.jsxs)("div",{className:"timeline-event-header",children:[(0,t.jsx)("strong",{children:e.title}),(0,t.jsx)("span",{className:"timeline-date",children:e.date})]}),e.description&&(0,t.jsx)("p",{className:"timeline-desc",children:e.description})]})]},r))})]})}e.s(["default",0,function({schema:e}){return e&&e.components?(0,t.jsxs)("div",{className:"ui-renderer",children:[(0,t.jsxs)("div",{className:"renderer-header",children:[(0,t.jsx)("h2",{children:e.title}),e.description&&(0,t.jsx)("p",{children:e.description})]}),(0,t.jsx)("div",{className:"components-grid",children:e.components.map((e,r)=>(0,t.jsx)("div",{className:`component-wrapper component-${e.type}`,style:{animationDelay:`${80*r}ms`},children:(0,t.jsx)(a,{component:e})},`${e.type}-${r}`))})]}):null}],46633),e.s(["downloadDirectPDF",0,function(e){let t,r,s,a=(t=e.title||"FlowForge AI Generated Application",r=e.description||"",s=(Array.isArray(e.components)?e.components:[]).map(e=>{let t=e.type||"card",r=e.title||e.name||"";if("hero"===t)return`
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
      `;if("table"===t){let t=Array.isArray(e.columns)?e.columns:["Item","Category","Status","Value"],s=Array.isArray(e.rows)?e.rows:[];return`
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px;">${r}</h3>
          <table class="pdf-table">
            <thead>
              <tr>
                ${t.map(e=>`<th>${e}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${s.map(e=>`
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
      `}if("chart"===t){let t=Array.isArray(e.labels)?e.labels:["Metric A","Metric B","Metric C","Metric D"],s=e.datasets?.[0]?.data||[65,45,80,55];return`
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px;">${r} <span style="font-size: 12px; color: #64748b; font-weight: 400;">(${e.chartType||"Distribution"})</span></h3>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
            ${t.map((e,t)=>{let r=s[t]||50,a=Math.min(100,Math.max(10,r));return`
                <div style="display: flex; align-items: center; gap: 10px; font-size: 12px;">
                  <span style="width: 110px; font-weight: 600; color: #334155;">${e}</span>
                  <div style="flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; width: ${a}%; background: #4f46e5; border-radius: 4px;"></div>
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
    ${s}
  </main>

  <footer class="pdf-footer">
    <span>Generated by FlowForge AI Application Engine</span>
    <span>Ready for Print & Archival PDF</span>
  </footer>
</body>
</html>`),i=document.getElementById("flowforge-print-frame");i||((i=document.createElement("iframe")).id="flowforge-print-frame",i.style.position="fixed",i.style.right="0",i.style.bottom="0",i.style.width="0",i.style.height="0",i.style.border="none",document.body.appendChild(i));let n=i.contentWindow?.document||i.contentDocument;n&&(n.open(),n.write(a),n.close(),setTimeout(()=>{i&&i.contentWindow&&(i.contentWindow.focus(),i.contentWindow.print())},300))}],86230)},72296,e=>{"use strict";var t=e.i(43476),r=e.i(71645),s=e.i(18566),a=e.i(22016),i=e.i(46633),n=e.i(86230),l=e.i(13094);let o=[{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash",providerLabel:"Google Gemini API (gemini-2.0-flash)"},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash",providerLabel:"Google Gemini API (gemini-1.5-flash)"},{id:"gpt-4o",name:"GPT-4o",providerLabel:"OpenAI API (gpt-4o)"},{id:"gpt-4o-mini",name:"GPT-4o Mini",providerLabel:"OpenAI API (gpt-4o-mini)"},{id:"o3-mini",name:"o3-mini Reasoning",providerLabel:"OpenAI API (o3-mini Reasoning)"},{id:"claude-3.5-sonnet",name:"Claude 3.5 Sonnet",providerLabel:"Anthropic Claude 3.5 Sonnet"},{id:"deepseek-r1",name:"DeepSeek R1",providerLabel:"DeepSeek V3 / R1 (Reasoner)"}];e.s(["default",0,function(){let d=(0,s.useRouter)(),c=(0,s.useSearchParams)().get("workflow"),[p,f]=(0,r.useState)(null),[u,m]=(0,r.useState)(null),[h,x]=(0,r.useState)(""),[g,b]=(0,r.useState)(""),[y,v]=(0,r.useState)(!0),[j,w]=(0,r.useState)(!1),[N,k]=(0,r.useState)(null),[S,$]=(0,r.useState)(null),[C,P]=(0,r.useState)(!0),[A,O]=(0,r.useState)(!1),[_,T]=(0,r.useState)(!1),[I,z]=(0,r.useState)(""),[R,F]=(0,r.useState)("gemini-2.0-flash"),[M,D]=(0,r.useState)("FlowForge Creator"),[L,E]=(0,r.useState)("creator@flowforge.ai"),[U,W]=(0,r.useState)(!1),[B,G]=(0,r.useState)([]),[K,J]=(0,r.useState)(!0),H=(0,r.useRef)(null),q=(0,r.useRef)(null),V=(0,r.useCallback)(e=>{$(e),setTimeout(()=>$(null),3e3)},[]);(0,r.useEffect)(()=>{q.current&&q.current.scrollIntoView({behavior:"smooth"})},[B,j]),(0,r.useEffect)(()=>{fetch("/api/auth/me").then(e=>e.json()).then(e=>{e.user&&(f(e.user),e.user.name&&D(e.user.name),e.user.email&&E(e.user.email))}).catch(()=>{})},[]),(0,r.useEffect)(()=>{if(c)v(!0),fetch(`/api/workflows/${c}`).then(e=>e.json()).then(e=>{e.workflow?(m(e.workflow.uiSchema),x(e.workflow.prompt||""),G([{role:"user",content:e.workflow.prompt||"Loaded workflow"},{role:"assistant",content:`Loaded "${e.workflow.title}" output.`}])):k("Workflow not found.")}).catch(()=>k("Failed to load workflow.")).finally(()=>v(!1));else try{let e=sessionStorage.getItem("flowforge_current_schema"),t=sessionStorage.getItem("flowforge_current_prompt")||"",r=sessionStorage.getItem("flowforge_chat_messages"),s=sessionStorage.getItem("flowforge_selected_model");if(s&&F(s),t&&x(t),e){let s=JSON.parse(e);m(s),r?G(JSON.parse(r)):G([{role:"user",content:t||"Generated prompt"},{role:"assistant",content:`Generated "${s.title||"Interface"}" successfully.`}])}else d.replace("/workspace")}catch(e){console.error("Hydration error:",e),d.replace("/workspace")}finally{v(!1)}},[c,d]);let Q=async()=>{if(!g.trim())return;let t=g.trim(),r=[...B,{role:"user",content:t}];G(r),b(""),w(!0),k(null);try{let s=null;try{let e=await fetch("/api/ai/modify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({schema:u||void 0,currentSchema:u||void 0,instruction:t,model:R})}),r=await e.json();e.ok&&r.schema&&(s=r.schema)}catch{}if(!s){let{modifyClientSchema:r}=await e.A(7690);s=r(u,t)}m(s),sessionStorage.setItem("flowforge_current_schema",JSON.stringify(s));let a=[...r,{role:"assistant",content:`Applied: "${t}". Updated ${s.title||"Interface"}.`}];G(a),sessionStorage.setItem("flowforge_chat_messages",JSON.stringify(a)),V("Interface updated successfully!")}catch(t){let e=t.message||"Failed to update interface. Please try again.";k(e),G(t=>[...t,{role:"assistant",content:`⚠️ ${e}`}])}finally{w(!1)}},X=async()=>{if(u)try{V("Generating PDF document..."),(0,n.downloadDirectPDF)(u),V("PDF exported successfully!")}catch(e){console.error("PDF Export error:",e),V("Failed to generate PDF. Retrying..."),window.print()}},Z=async()=>{if(I.trim()&&u)try{if(!p){let e=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({isDemo:!0})}),t=await e.json();t.user&&f(t.user)}if(!(await fetch("/api/workflows",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:I.trim(),description:u.description||"",prompt:h,uiSchema:u})})).ok)throw Error("Save failed");T(!1),z(""),V("Workflow saved successfully!")}catch{V("Failed to save workflow")}};return(0,t.jsxs)("div",{className:"workspace-layout",children:[(0,t.jsx)("button",{className:"mobile-menu-btn",onClick:()=>P(!C),"aria-label":"Toggle sidebar",children:(0,t.jsx)("span",{children:C?"✕":"☰"})}),(0,t.jsxs)("aside",{className:`workspace-sidebar ${C?"open":""} ${A?"collapsed":""}`,children:[(0,t.jsxs)("div",{className:"sidebar-top",children:[(0,t.jsx)("div",{className:"sidebar-logo-bar",children:(0,t.jsxs)(a.default,{href:"/",className:"sidebar-logo",title:"FlowForge AI",children:[(0,t.jsx)(l.default,{size:24}),(0,t.jsxs)("span",{className:"logo-text",children:["FlowForge",(0,t.jsx)("span",{className:"logo-ai",children:"AI"})]})]})}),(0,t.jsx)("div",{className:"sidebar-toggle-bar",children:(0,t.jsxs)("button",{className:"sidebar-collapse-toggle",onClick:()=>O(!A),title:A?"Expand sidebar":"Collapse sidebar","aria-label":"Toggle sidebar collapse",children:[(0,t.jsx)("span",{className:"toggle-icon",children:A?"▶":"◀"}),(0,t.jsx)("span",{className:"toggle-label",children:A?"Expand":"Collapse"})]})}),(0,t.jsxs)("nav",{className:"sidebar-nav",children:[(0,t.jsxs)(a.default,{href:"/workspace",className:"sidebar-item",title:"New Workflow",children:[(0,t.jsx)("span",{className:"sidebar-item-icon",children:"✦"}),(0,t.jsx)("span",{className:"sidebar-item-text",children:"New Workflow"})]}),(0,t.jsxs)(a.default,{href:"/workflows",className:"sidebar-item",title:"My Workflows",children:[(0,t.jsx)("span",{className:"sidebar-item-icon",children:"📁"}),(0,t.jsx)("span",{className:"sidebar-item-text",children:"My Workflows"})]}),(0,t.jsxs)(a.default,{href:"/workspace",className:"sidebar-item",title:"Templates",children:[(0,t.jsx)("span",{className:"sidebar-item-icon",children:"📋"}),(0,t.jsx)("span",{className:"sidebar-item-text",children:"Templates"})]}),(0,t.jsxs)(a.default,{href:"/settings",className:"sidebar-item",title:"Settings",children:[(0,t.jsx)("span",{className:"sidebar-item-icon",children:"⚙️"}),(0,t.jsx)("span",{className:"sidebar-item-text",children:"Settings"})]})]})]}),(0,t.jsxs)("div",{className:"sidebar-bottom",children:[(0,t.jsxs)(a.default,{href:"/",className:"sidebar-back-home-btn",title:"Back to Home",children:[(0,t.jsx)("span",{className:"sidebar-item-icon",children:"🏠"}),(0,t.jsx)("span",{className:"sidebar-item-text",children:"Back to Home"})]}),(0,t.jsxs)("div",{className:"sidebar-user-card",onClick:()=>W(!0),title:"Open Profile & Settings",role:"button",tabIndex:0,children:[(0,t.jsxs)("div",{className:"user-avatar-wrapper",children:[(0,t.jsx)("div",{className:"user-avatar",children:(p?.name||M).charAt(0).toUpperCase()}),(0,t.jsx)("span",{className:"online-status-dot",title:"Active"})]}),(0,t.jsxs)("div",{className:"user-info",children:[(0,t.jsx)("span",{className:"user-name",children:p?.name||M}),(0,t.jsx)("span",{className:"user-email",children:p?.email||L})]}),(0,t.jsx)("button",{className:"profile-quick-btn",onClick:e=>{e.stopPropagation(),W(!0)},title:"Open Profile","aria-label":"Open Profile",children:"⚙️"})]})]})]}),C&&(0,t.jsx)("div",{className:"sidebar-overlay",onClick:()=>P(!1)}),(0,t.jsxs)("main",{className:`workspace-main ${A?"sidebar-collapsed":""} has-right-sidebar`,children:[y&&(0,t.jsxs)("div",{className:"loading-state",children:[(0,t.jsx)("div",{className:"loading-spinner"}),(0,t.jsx)("p",{style:{color:"var(--on-surface-variant)",fontWeight:600},children:"Loading output canvas..."})]}),N&&(0,t.jsxs)("div",{className:"error-banner",children:[(0,t.jsxs)("span",{children:["⚠️ ",N]}),(0,t.jsx)("button",{onClick:()=>d.push("/workspace"),children:"Return to Prompt Builder"})]}),u&&!y&&(0,t.jsxs)("div",{ref:H,className:"result-section",children:[(0,t.jsxs)("div",{className:"result-toolbar",children:[(0,t.jsx)("div",{className:"toolbar-left",children:(0,t.jsx)("button",{className:"toolbar-btn",onClick:()=>d.push("/workspace"),title:"Return to Prompt Builder",children:"← Back to Prompt Builder"})}),(0,t.jsxs)("div",{className:"toolbar-right",children:[(0,t.jsxs)("button",{className:"toolbar-btn export-pdf-btn",onClick:X,title:"Export data directly as PDF (.pdf)",style:{background:"linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",color:"#ffffff",fontWeight:700,border:"1px solid rgba(255, 255, 255, 0.18)",boxShadow:"0 2px 10px rgba(79, 70, 229, 0.35)",display:"inline-flex",alignItems:"center",gap:"6px"},children:[(0,t.jsx)("span",{children:"📑"}),(0,t.jsx)("span",{children:"Export as PDF"})]}),(0,t.jsx)("button",{className:"toolbar-btn save-btn",onClick:()=>{z(u.title||""),T(!0)},children:"💾 Save Workflow"})]})]}),(0,t.jsx)(i.default,{schema:u})]})]}),u&&!y&&(0,t.jsxs)("aside",{className:"workspace-right-sidebar",children:[(0,t.jsxs)("div",{className:"right-sidebar-header",children:[(0,t.jsxs)("div",{className:"right-sidebar-title",children:[(0,t.jsx)("span",{className:"copilot-icon",children:"✨"}),(0,t.jsx)("span",{className:"copilot-text",children:"AI Copilot"})]}),(0,t.jsx)("div",{className:"right-sidebar-controls",children:(0,t.jsx)("span",{className:"right-sidebar-model-badge",children:o.find(e=>e.id===R)?.name||"Gemini 2.0"})})]}),(0,t.jsxs)("div",{className:"right-sidebar-chat-body",children:[0===B.length&&(0,t.jsx)("div",{className:"chat-empty-state",children:(0,t.jsx)("span",{children:"✨ Ask AI to customize, add, or remove components in real-time."})}),B.map((e,r)=>(0,t.jsx)("div",{className:`chat-message-row ${e.role}`,children:(0,t.jsxs)("div",{className:"chat-message-bubble",children:[(0,t.jsx)("span",{className:"chat-message-role",children:"user"===e.role?"You":"FlowForge AI"}),(0,t.jsx)("p",{className:"chat-message-text",children:e.content})]})},r)),j&&(0,t.jsx)("div",{className:"chat-message-row assistant modifying",children:(0,t.jsxs)("div",{className:"chat-message-bubble",children:[(0,t.jsx)("span",{className:"chat-message-role",children:"FlowForge AI"}),(0,t.jsxs)("p",{className:"chat-message-text",children:[(0,t.jsx)("span",{className:"modify-spinner inline"})," Updating interface..."]})]})}),(0,t.jsx)("div",{ref:q})]}),(0,t.jsxs)("div",{className:"right-sidebar-suggestions",children:[(0,t.jsx)("span",{className:"suggestions-label",children:"Quick Actions:"}),(0,t.jsx)("div",{className:"suggestions-list",children:["Add a pie chart","Add warning card","Add upcoming schedule","Remove component"].map((e,r)=>(0,t.jsxs)("button",{className:"right-sidebar-chip",onClick:()=>b(e),children:["+ ",e]},r))})]}),(0,t.jsxs)("div",{className:"right-sidebar-input-box",children:[(0,t.jsx)("textarea",{value:g,onChange:e=>b(e.target.value),placeholder:"Tell AI how to change this interface…",onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),Q())},disabled:j,rows:2}),(0,t.jsx)("button",{onClick:Q,disabled:!g.trim()||j,className:"right-sidebar-send-btn",title:"Apply AI modification",children:j?(0,t.jsx)("span",{className:"modify-spinner"}):"Apply ✨"})]})]}),S&&(0,t.jsx)("div",{className:"toast-notification",children:S}),_&&(0,t.jsx)("div",{className:"modal-overlay",onClick:()=>T(!1),children:(0,t.jsxs)("div",{className:"modal-content",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("h3",{children:"Save Workflow"}),(0,t.jsx)("input",{value:I,onChange:e=>z(e.target.value),placeholder:"Workflow name",autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&Z()}}),(0,t.jsxs)("div",{className:"modal-actions",children:[(0,t.jsx)("button",{className:"btn-modal-cancel",onClick:()=>T(!1),children:"Cancel"}),(0,t.jsx)("button",{className:"btn-modal-save",onClick:Z,disabled:!I.trim(),children:"Save"})]})]})})]})}])},35641,e=>{e.v(t=>Promise.all(["static/chunks/06f1i-44b6w2h.js"].map(t=>e.l(t))).then(()=>t(8576)))},7690,e=>{e.v(t=>Promise.all(["static/chunks/00nc6kamqvsk5.js"].map(t=>e.l(t))).then(()=>t(84479)))}]);