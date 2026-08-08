(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i={formatUrl:function(){return l},formatWithValidation:function(){return d},urlObjectKeys:function(){return s}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let o=e.r(90809)._(e.r(98183)),a=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,i=e.protocol||"",n=e.pathname||"",l=e.hash||"",s=e.query||"",d=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?d=t+e.host:r&&(d=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(d+=":"+e.port)),s&&"object"==typeof s&&(s=String(o.urlQueryToSearchParams(s)));let p=e.search||s&&`?${s}`||"";return i&&!i.endsWith(":")&&(i+=":"),e.slashes||(!i||a.test(i))&&!1!==d?(d="//"+(d||""),n&&"/"!==n[0]&&(n="/"+n)):d||(d=""),l&&"#"!==l[0]&&(l="#"+l),p&&"?"!==p[0]&&(p="?"+p),n=n.replace(/[?#]/g,encodeURIComponent),p=p.replace("#","%23"),`${i}${d}${n}${p}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function d(e){return l(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return n}});let i=e.r(71645);function n(e,t){let r=(0,i.useRef)(null),n=(0,i.useRef)(null);return(0,i.useCallback)(i=>{if(null===i){let e=r.current;e&&(r.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(r.current=o(e,i)),t&&(n.current=o(t,i))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return o}});let i=e.r(18967),n=e.r(52817);function o(e){if(!(0,i.isAbsoluteUrl)(e))return!0;try{let t=(0,i.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,n.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return i}});let i=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i={default:function(){return h},useLinkStatus:function(){return y}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let o=e.r(90809),a=e.r(43476),l=o._(e.r(71645)),s=e.r(95057),d=e.r(8372),p=e.r(18581),c=e.r(18967),f=e.r(5550);e.r(33525);let u=e.r(88540),x=e.r(91949),g=e.r(73668),m=e.r(9396);function h(t){var r,i;let n,o,h,[y,v]=(0,l.useOptimistic)(x.IDLE_LINK_STATUS),j=(0,l.useRef)(null),{href:w,as:S,children:$,prefetch:z=null,passHref:k,replace:A,shallow:C,scroll:R,onClick:T,onMouseEnter:_,onTouchStart:P,legacyBehavior:O=!1,onNavigate:N,transitionTypes:I,ref:M,unstable_dynamicOnHover:B,...W}=t;n=$,O&&("string"==typeof n||"number"==typeof n)&&(n=(0,a.jsx)("a",{children:n}));let D=l.default.useContext(d.AppRouterContext),L=!1!==z,U=!1!==z?null===(i=z)||"auto"===i?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,E="string"==typeof(r=S||w)?r:(0,s.formatUrl)(r);if(O){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});o=l.default.Children.only(n)}let F=O?o&&"object"==typeof o&&o.ref:M,K=l.default.useCallback(e=>(null!==D&&(j.current=(0,x.mountLinkInstance)(e,E,D,U,L,v)),()=>{j.current&&((0,x.unmountLinkForCurrentNavigation)(j.current),j.current=null),(0,x.unmountPrefetchableInstance)(e)}),[L,E,D,U,v]),G={ref:(0,p.useMergedRef)(K,F),onClick(t){O||"function"!=typeof T||T(t),O&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),!D||t.defaultPrevented||function(t,r,i,n,o,a,s){if("u">typeof window){let d,{nodeName:p}=t.currentTarget;if("A"===p.toUpperCase()&&((d=t.currentTarget.getAttribute("target"))&&"_self"!==d||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,g.isLocalURL)(r)){n&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),a){let e=!1;if(a({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:c}=e.r(99781);l.default.startTransition(()=>{c(r,n?"replace":"push",!1===o?u.ScrollBehavior.NoScroll:u.ScrollBehavior.Default,i.current,s)})}}(t,E,j,A,R,N,I)},onMouseEnter(e){O||"function"!=typeof _||_(e),O&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),D&&L&&(0,x.onNavigationIntent)(e.currentTarget,!0===B)},onTouchStart:function(e){O||"function"!=typeof P||P(e),O&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),D&&L&&(0,x.onNavigationIntent)(e.currentTarget,!0===B)}};return(0,c.isAbsoluteUrl)(E)?G.href=E:O&&!k&&("a"!==o.type||"href"in o.props)||(G.href=(0,f.addBasePath)(E)),h=O?l.default.cloneElement(o,G):(0,a.jsx)("a",{...W,...G,children:n}),(0,a.jsx)(b.Provider,{value:y,children:h})}e.r(84508);let b=(0,l.createContext)(x.IDLE_LINK_STATUS),y=()=>(0,l.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},13094,e=>{"use strict";var t=e.i(43476);e.s(["default",0,function({size:e=28,className:r=""}){return(0,t.jsxs)("svg",{width:e,height:e,viewBox:"0 0 100 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:`flowforge-brand-logo ${r}`,style:{display:"inline-block",verticalAlign:"middle",flexShrink:0},"aria-label":"FlowForge AI Logo",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("linearGradient",{id:"ff-top-grad",x1:"0",y1:"0",x2:"100",y2:"40",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#3b82f6"}),(0,t.jsx)("stop",{offset:"60%",stopColor:"#60a5fa"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#93c5fd"})]}),(0,t.jsxs)("linearGradient",{id:"ff-mid-grad",x1:"0",y1:"40",x2:"80",y2:"80",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#2563eb"}),(0,t.jsx)("stop",{offset:"50%",stopColor:"#4f46e5"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#6366f1"})]}),(0,t.jsxs)("linearGradient",{id:"ff-bot-grad",x1:"0",y1:"80",x2:"40",y2:"120",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#4338ca"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#6d28d9"})]}),(0,t.jsx)("filter",{id:"ff-glow",x:"-10%",y:"-10%",width:"120%",height:"120%",filterUnits:"userSpaceOnUse",children:(0,t.jsx)("feDropShadow",{dx:"0",dy:"3",stdDeviation:"4",floodColor:"#3b82f6",floodOpacity:"0.25"})})]}),(0,t.jsxs)("g",{filter:"url(#ff-glow)",children:[(0,t.jsx)("path",{d:"M 10 28 C 10 14 20 6 36 6 L 82 6 C 92 6 98 12 98 20 C 98 28 92 34 82 34 L 10 34 Z",fill:"url(#ff-top-grad)"}),(0,t.jsx)("path",{d:"M 10 66 C 10 52 18 46 32 46 L 68 46 C 76 46 82 52 82 60 C 82 68 76 74 68 74 L 10 74 Z",fill:"url(#ff-mid-grad)"}),(0,t.jsx)("path",{d:"M 10 86 L 36 86 C 36 86 36 94 36 102 C 36 112 28 118 18 118 L 10 118 Z",fill:"url(#ff-bot-grad)"})]})]})}])},18566,(e,t,r)=>{t.exports=e.r(76562)},67585,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"BailoutToCSR",{enumerable:!0,get:function(){return n}});let i=e.r(32061);function n({reason:e,children:t}){if("u"<typeof window)throw Object.defineProperty(new i.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return t}},9885,(e,t,r)=>{"use strict";function i(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"encodeURIPath",{enumerable:!0,get:function(){return i}})},52157,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"PreloadChunks",{enumerable:!0,get:function(){return s}});let i=e.r(43476),n=e.r(74080),o=e.r(63599),a=e.r(9885),l=e.r(43369);function s({moduleIds:e}){if("u">typeof window)return null;let t=o.workAsyncStorage.getStore();if(void 0===t)return null;let r=[];if(t.reactLoadableManifest&&e){let i=t.reactLoadableManifest;for(let t of e){if(!i[t])continue;let e=i[t].files;r.push(...e)}}if(0===r.length)return null;let d=(0,l.getAssetTokenQuery)();return(0,i.jsx)(i.Fragment,{children:r.map(e=>{let r=`${t.assetPrefix}/_next/${(0,a.encodeURIPath)(e)}${d}`;return e.endsWith(".css")?(0,i.jsx)("link",{precedence:"dynamic",href:r,rel:"stylesheet",as:"style",nonce:t.nonce},e):((0,n.preload)(r,{as:"script",fetchPriority:"low",nonce:t.nonce}),null)})})}},69093,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return d}});let i=e.r(43476),n=e.r(71645),o=e.r(67585),a=e.r(52157);function l(e){return{default:e&&"default"in e?e.default:e}}let s={loader:()=>Promise.resolve(l(()=>null)),loading:null,ssr:!0},d=function(e){let t={...s,...e},r=(0,n.lazy)(()=>t.loader().then(l)),d=t.loading;function p(e){let l=d?(0,i.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,s=!t.ssr||!!t.loading,p=s?n.Suspense:n.Fragment,c=t.ssr?(0,i.jsxs)(i.Fragment,{children:["u"<typeof window?(0,i.jsx)(a.PreloadChunks,{moduleIds:t.modules}):null,(0,i.jsx)(r,{...e})]}):(0,i.jsx)(o.BailoutToCSR,{reason:"next/dynamic",children:(0,i.jsx)(r,{...e})});return(0,i.jsx)(p,{...s?{fallback:l}:{},children:c})}return p.displayName="LoadableComponent",p}},70703,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return n}});let i=e.r(55682)._(e.r(69093));function n(e,t){let r={};"function"==typeof e&&(r.loader=e);let n={...r,...t};return(0,i.default)({...n,modules:n.loadableGenerated?.modules})}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},46633,86230,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let i=(0,e.i(70703).default)(()=>e.A(35641),{loadableGenerated:{modules:[8576]},ssr:!1});function n({component:e}){if(!e||!e.type)return null;switch(e.type.toLowerCase()){case"hero":return(0,t.jsx)(o,{data:e});case"list":return(0,t.jsx)(a,{data:e});case"grid":return(0,t.jsx)(l,{data:e});case"metric":case"metrics":return(0,t.jsx)(s,{data:e});case"card":return(0,t.jsx)(p,{data:e});case"chart":case"charts":return(0,t.jsx)(c,{data:e});case"table":case"tables":return(0,t.jsx)(f,{data:e});case"form":return(0,t.jsx)(u,{data:e});case"button":return(0,t.jsx)(x,{data:e});case"progress":return(0,t.jsx)(g,{data:e});case"timeline":return(0,t.jsx)(m,{data:e});default:return(0,t.jsxs)("div",{className:"card-component",style:{padding:"20px",borderRadius:"12px",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:700,marginBottom:"8px"},children:e.title||e.type}),e.description&&(0,t.jsx)("p",{style:{fontSize:"14px",color:"var(--text-secondary)"},children:e.description})]})}}function o({data:e}){return(0,t.jsxs)("div",{className:"hero-component",style:{padding:"32px",borderRadius:"var(--radius-lg)",background:"linear-gradient(135deg, rgba(99, 102, 241, 0.14), rgba(124, 58, 237, 0.08))",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"12px",position:"relative"},children:[e.badge&&(0,t.jsx)("div",{style:{display:"inline-flex",alignSelf:"flex-start",padding:"4px 12px",borderRadius:"16px",background:"rgba(99, 102, 241, 0.2)",color:"var(--primary-indigo)",fontSize:"12px",fontWeight:700},children:e.badge}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.icon&&(0,t.jsx)("span",{style:{fontSize:"28px"},children:e.icon}),(0,t.jsx)("h2",{style:{fontSize:"26px",fontWeight:800,margin:0,color:"var(--text-primary)"},children:e.title})]}),(e.subtitle||e.content||e.description)&&(0,t.jsx)("p",{style:{fontSize:"15px",color:"var(--text-secondary)",lineHeight:1.6,margin:0,maxWidth:"720px"},children:e.subtitle||e.content||e.description}),(e.ctaText||e.actionText||e.cta)&&(0,t.jsx)("div",{style:{marginTop:"8px"},children:(0,t.jsxs)("button",{className:"rendered-button variant-primary",onClick:()=>alert(`Action: ${e.ctaText||e.actionText||e.cta}`),style:{padding:"10px 20px",borderRadius:"8px",background:"linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",color:"#ffffff",border:"none",fontWeight:600,cursor:"pointer"},children:[e.ctaText||e.actionText||e.cta," →"]})})]})}function a({data:e}){let r=Array.isArray(e.items)?e.items:[];return(0,t.jsxs)("div",{className:"list-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[e.title&&(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:700,marginBottom:"16px",color:"var(--text-primary)"},children:e.title}),(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:r.map((e,r)=>(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderRadius:"8px",background:"rgba(99, 102, 241, 0.05)",border:"1px solid var(--border)"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.icon&&(0,t.jsx)("span",{style:{fontSize:"18px"},children:e.icon}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"var(--text-primary)"},children:e.title||e.label||String(e)}),(e.subtitle||e.description)&&(0,t.jsx)("div",{style:{fontSize:"12px",color:"var(--text-muted)",marginTop:"2px"},children:e.subtitle||e.description})]})]}),e.badge&&(0,t.jsx)("span",{style:{fontSize:"11px",fontWeight:600,padding:"3px 8px",borderRadius:"12px",background:"rgba(99, 102, 241, 0.15)",color:"var(--accent-light)"},children:e.badge})]},r))})]})}function l({data:e}){let r=Array.isArray(e.items)?e.items:[];return(0,t.jsxs)("div",{className:"grid-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[e.title&&(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:700,marginBottom:"16px",color:"var(--text-primary)"},children:e.title}),(0,t.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"},children:r.map((e,r)=>(0,t.jsxs)("div",{style:{padding:"16px",borderRadius:"10px",background:"var(--bg-secondary)",border:"1px solid var(--border)",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{style:{fontSize:"15px",fontWeight:700,color:"var(--text-primary)",marginBottom:"6px"},children:e.title||e.label}),(e.description||e.subtitle)&&(0,t.jsx)("div",{style:{fontSize:"13px",color:"var(--text-secondary)",lineHeight:1.5,marginBottom:"10px"},children:e.description||e.subtitle})]}),Array.isArray(e.tags)&&e.tags.length>0&&(0,t.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"8px"},children:e.tags.map((e,r)=>(0,t.jsx)("span",{style:{fontSize:"11px",padding:"2px 6px",borderRadius:"4px",background:"rgba(99, 102, 241, 0.12)",color:"var(--accent-light)"},children:e},r))})]},r))})]})}function s({data:e}){let r=Array.isArray(e.items)?e.items:[e];return(0,t.jsxs)("div",{className:"metrics-section",style:{width:"100%"},children:[e.title&&(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:700,marginBottom:"12px",color:"var(--text-primary)"},children:e.title}),(0,t.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"14px"},children:r.map((e,r)=>(0,t.jsx)(d,{data:e},r))})]})}function d({data:e}){return(0,t.jsxs)("div",{className:"metric-card",style:{padding:"20px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"6px"},children:[(0,t.jsxs)("div",{className:"metric-header",style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,t.jsx)("span",{className:"metric-title",style:{fontSize:"13px",fontWeight:600,color:"var(--text-secondary)"},children:e.label||e.title}),e.icon&&(0,t.jsx)("span",{className:"metric-icon",style:{fontSize:"18px"},children:e.icon})]}),(0,t.jsx)("div",{className:"metric-value",style:{fontSize:"24px",fontWeight:800,color:"var(--text-primary)"},children:e.value}),e.change&&(0,t.jsxs)("div",{style:{fontSize:"12px",fontWeight:600,color:"up"===e.trend?"#10b981":"down"===e.trend?"#ef4444":"var(--text-muted)",display:"flex",alignItems:"center",gap:"4px"},children:[(0,t.jsx)("span",{children:"up"===e.trend?"↑":"down"===e.trend?"↓":"→"}),(0,t.jsx)("span",{children:e.change})]})]})}function p({data:e}){return(0,t.jsxs)("div",{className:"card-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[(0,t.jsxs)("div",{className:"card-header-row",style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"},children:[e.icon&&(0,t.jsx)("span",{className:"card-icon",style:{fontSize:"20px"},children:e.icon}),(0,t.jsx)("h3",{style:{fontSize:"17px",fontWeight:700,margin:0,color:"var(--text-primary)"},children:e.title})]}),(0,t.jsx)("div",{className:"card-content",style:{fontSize:"14px",color:"var(--text-secondary)",lineHeight:1.6},children:e.content||e.description})]})}function c({data:e}){let r=e.labels,n=e.datasets;return!r&&Array.isArray(e.data)&&(r=e.data.map(e=>e.label||e.name||e.subject||e.month||"Item"),n=[{label:e.title||"Values",data:e.data.map(e=>"number"==typeof e.value?e.value:parseFloat(e.value)||0),backgroundColor:["rgba(99, 102, 241, 0.8)","rgba(139, 92, 246, 0.8)","rgba(59, 130, 246, 0.8)","rgba(16, 185, 129, 0.8)","rgba(245, 158, 11, 0.8)","rgba(236, 72, 153, 0.8)"]}]),(0,t.jsxs)("div",{className:"chart-card",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:700,marginBottom:"4px",color:"var(--text-primary)"},children:e.title}),e.description&&(0,t.jsx)("p",{style:{fontSize:"13px",color:"var(--text-secondary)",marginBottom:"16px"},children:e.description}),(0,t.jsx)(i,{chartType:e.chartType||"bar",labels:r||["Item A","Item B","Item C","Item D"],datasets:n||[{label:e.title||"Data",data:[40,65,80,95],backgroundColor:"rgba(99, 102, 241, 0.8)"}],title:e.title})]})}function f({data:e}){let r=Array.isArray(e.columns)?e.columns:[],i=Array.isArray(e.rows)?e.rows:[];return(0,t.jsxs)("div",{className:"table-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[e.title&&(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:700,marginBottom:"16px",color:"var(--text-primary)"},children:e.title}),(0,t.jsx)("div",{className:"table-scroll",style:{overflowX:"auto"},children:(0,t.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse",textAlign:"left",fontSize:"14px"},children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{style:{borderBottom:"2px solid var(--border)",color:"var(--text-secondary)"},children:r.map((e,r)=>(0,t.jsx)("th",{style:{padding:"10px 12px",fontWeight:600},children:e},r))})}),(0,t.jsx)("tbody",{children:i.map((e,r)=>{let i=Array.isArray(e)?e:Object.values(e);return(0,t.jsx)("tr",{style:{borderBottom:"1px solid var(--border)"},children:i.map((e,r)=>(0,t.jsx)("td",{style:{padding:"10px 12px",color:"var(--text-primary)"},children:String(e)},r))},r)})})]})})]})}function u({data:e}){let[i,n]=(0,r.useState)({});return(0,t.jsxs)("div",{className:"form-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[e.title&&(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:700,marginBottom:"16px",color:"var(--text-primary)"},children:e.title}),(0,t.jsxs)("form",{onSubmit:e=>{e.preventDefault(),alert("Form submitted: "+JSON.stringify(i,null,2))},style:{display:"flex",flexDirection:"column",gap:"14px"},children:[(e.fields||[]).map((e,r)=>(0,t.jsxs)("div",{className:"form-field",style:{display:"flex",flexDirection:"column",gap:"6px"},children:[(0,t.jsx)("label",{htmlFor:`field-${e.name}`,style:{fontSize:"13px",fontWeight:600,color:"var(--text-secondary)"},children:e.label}),"select"===e.fieldType?(0,t.jsxs)("select",{id:`field-${e.name}`,value:i[e.name]||"",onChange:t=>n({...i,[e.name]:t.target.value}),style:{padding:"10px",borderRadius:"6px",border:"1px solid var(--border)",background:"var(--bg-secondary)",color:"var(--text-primary)"},children:[(0,t.jsx)("option",{value:"",children:"Select..."}),(e.options||[]).map((e,r)=>(0,t.jsx)("option",{value:e,children:e},r))]}):"textarea"===e.fieldType?(0,t.jsx)("textarea",{id:`field-${e.name}`,placeholder:e.placeholder||"",value:i[e.name]||"",onChange:t=>n({...i,[e.name]:t.target.value}),rows:3,style:{padding:"10px",borderRadius:"6px",border:"1px solid var(--border)",background:"var(--bg-secondary)",color:"var(--text-primary)"}}):(0,t.jsx)("input",{type:e.fieldType||"text",id:`field-${e.name}`,placeholder:e.placeholder||"",value:i[e.name]||"",onChange:t=>n({...i,[e.name]:t.target.value}),style:{padding:"10px",borderRadius:"6px",border:"1px solid var(--border)",background:"var(--bg-secondary)",color:"var(--text-primary)"}})]},r)),(0,t.jsx)("button",{type:"submit",className:"form-submit-btn",style:{padding:"10px 20px",borderRadius:"8px",background:"linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",color:"#ffffff",border:"none",fontWeight:600,cursor:"pointer",alignSelf:"flex-start",marginTop:"6px"},children:"Submit"})]})]})}function x({data:e}){return(0,t.jsx)("button",{className:`rendered-button variant-${e.variant||"primary"}`,onClick:()=>alert(`Action: ${e.action||e.label}`),style:{padding:"10px 20px",borderRadius:"8px",background:"linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",color:"#ffffff",border:"none",fontWeight:600,cursor:"pointer"},children:e.label||e.title||"Action Button"})}function g({data:e}){let r=Array.isArray(e.items)?e.items:[e];return(0,t.jsxs)("div",{className:"progress-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[e.title&&(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:700,marginBottom:"16px",color:"var(--text-primary)"},children:e.title}),(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"14px"},children:r.map((e,r)=>{let i=Math.min(100,Math.max(0,e.percentage??e.value??50));return(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",fontWeight:600,marginBottom:"6px",color:"var(--text-primary)"},children:[(0,t.jsx)("span",{children:e.label||e.title||"Progress Item"}),(0,t.jsxs)("span",{style:{color:"var(--primary-indigo)"},children:[i,"%"]})]}),(0,t.jsx)("div",{style:{height:"8px",borderRadius:"4px",background:"rgba(99, 102, 241, 0.15)",overflow:"hidden"},children:(0,t.jsx)("div",{style:{width:`${i}%`,height:"100%",background:"linear-gradient(90deg, #6366f1, #4f46e5)",borderRadius:"4px",transition:"width 0.4s ease"}})})]},r)})})]})}function m({data:e}){let r=Array.isArray(e.events)?e.events:[];return(0,t.jsxs)("div",{className:"timeline-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[e.title&&(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:700,marginBottom:"16px",color:"var(--text-primary)"},children:e.title}),(0,t.jsx)("div",{className:"timeline-list",style:{display:"flex",flexDirection:"column",gap:"14px"},children:r.map((e,r)=>(0,t.jsxs)("div",{style:{display:"flex",gap:"12px",alignItems:"flex-start"},children:[(0,t.jsx)("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#6366f1",marginTop:"5px",flexShrink:0}}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:[(0,t.jsx)("strong",{style:{fontSize:"14px",color:"var(--text-primary)"},children:e.title}),e.date&&(0,t.jsx)("span",{style:{fontSize:"12px",color:"var(--text-muted)"},children:e.date})]}),e.description&&(0,t.jsx)("p",{style:{fontSize:"13px",color:"var(--text-secondary)",marginTop:"2px"},children:e.description})]})]},r))})]})}e.s(["default",0,function({schema:e}){return e&&e.components&&Array.isArray(e.components)?(0,t.jsxs)("div",{className:"ui-renderer",children:[(0,t.jsxs)("div",{className:"renderer-header",style:{marginBottom:"24px"},children:[(0,t.jsx)("h2",{style:{fontSize:"24px",fontWeight:800,color:"var(--text-primary)",marginBottom:"6px"},children:e.title}),e.description&&(0,t.jsx)("p",{style:{fontSize:"14px",color:"var(--text-secondary)",lineHeight:1.6},children:e.description})]}),(0,t.jsx)("div",{className:"components-grid",style:{display:"flex",flexDirection:"column",gap:"20px"},children:e.components.map((e,r)=>(0,t.jsx)("div",{className:`component-wrapper component-${e.type}`,style:{animationDelay:`${80*r}ms`},children:(0,t.jsx)(n,{component:e})},`${e.type}-${r}`))})]}):null}],46633),e.s(["downloadDirectPDF",0,function(e){let t,r,i,n=(t=e.title||"FlowForge AI Generated Application",r=e.description||"",i=(Array.isArray(e.components)?e.components:[]).map(e=>{let t=e.type||"card",r=e.title||e.name||"";if("hero"===t)return`
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
      `;if("table"===t){let t=Array.isArray(e.columns)?e.columns:["Item","Category","Status","Value"],i=Array.isArray(e.rows)?e.rows:[];return`
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px;">${r}</h3>
          <table class="pdf-table">
            <thead>
              <tr>
                ${t.map(e=>`<th>${e}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${i.map(e=>`
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
      `}if("chart"===t){let t=Array.isArray(e.labels)?e.labels:["Metric A","Metric B","Metric C","Metric D"],i=e.datasets?.[0]?.data||[65,45,80,55];return`
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px;">${r} <span style="font-size: 12px; color: #64748b; font-weight: 400;">(${e.chartType||"Distribution"})</span></h3>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
            ${t.map((e,t)=>{let r=i[t]||50,n=Math.min(100,Math.max(10,r));return`
                <div style="display: flex; align-items: center; gap: 10px; font-size: 12px;">
                  <span style="width: 110px; font-weight: 600; color: #334155;">${e}</span>
                  <div style="flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; width: ${n}%; background: #4f46e5; border-radius: 4px;"></div>
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
    ${i}
  </main>

  <footer class="pdf-footer">
    <span>Generated by FlowForge AI Application Engine</span>
    <span>Ready for Print & Archival PDF</span>
  </footer>
</body>
</html>`),o=document.getElementById("flowforge-print-frame");o||((o=document.createElement("iframe")).id="flowforge-print-frame",o.style.position="fixed",o.style.right="0",o.style.bottom="0",o.style.width="0",o.style.height="0",o.style.border="none",document.body.appendChild(o));let a=o.contentWindow?.document||o.contentDocument;a&&(a.open(),a.write(n),a.close(),setTimeout(()=>{o&&o.contentWindow&&(o.contentWindow.focus(),o.contentWindow.print())},300))}],86230)}]);