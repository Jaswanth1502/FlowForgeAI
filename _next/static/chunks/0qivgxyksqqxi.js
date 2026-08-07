(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,13094,e=>{"use strict";var t=e.i(43476);e.s(["default",0,function({size:e=28,className:i=""}){return(0,t.jsxs)("svg",{width:e,height:e,viewBox:"0 0 100 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:`flowforge-brand-logo ${i}`,style:{display:"inline-block",verticalAlign:"middle",flexShrink:0},"aria-label":"FlowForge AI Logo",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("linearGradient",{id:"ff-top-grad",x1:"0",y1:"0",x2:"100",y2:"40",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#3b82f6"}),(0,t.jsx)("stop",{offset:"60%",stopColor:"#60a5fa"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#93c5fd"})]}),(0,t.jsxs)("linearGradient",{id:"ff-mid-grad",x1:"0",y1:"40",x2:"80",y2:"80",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#2563eb"}),(0,t.jsx)("stop",{offset:"50%",stopColor:"#4f46e5"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#6366f1"})]}),(0,t.jsxs)("linearGradient",{id:"ff-bot-grad",x1:"0",y1:"80",x2:"40",y2:"120",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#4338ca"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#6d28d9"})]}),(0,t.jsx)("filter",{id:"ff-glow",x:"-10%",y:"-10%",width:"120%",height:"120%",filterUnits:"userSpaceOnUse",children:(0,t.jsx)("feDropShadow",{dx:"0",dy:"3",stdDeviation:"4",floodColor:"#3b82f6",floodOpacity:"0.25"})})]}),(0,t.jsxs)("g",{filter:"url(#ff-glow)",children:[(0,t.jsx)("path",{d:"M 10 28 C 10 14 20 6 36 6 L 82 6 C 92 6 98 12 98 20 C 98 28 92 34 82 34 L 10 34 Z",fill:"url(#ff-top-grad)"}),(0,t.jsx)("path",{d:"M 10 66 C 10 52 18 46 32 46 L 68 46 C 76 46 82 52 82 60 C 82 68 76 74 68 74 L 10 74 Z",fill:"url(#ff-mid-grad)"}),(0,t.jsx)("path",{d:"M 10 86 L 36 86 C 36 86 36 94 36 102 C 36 112 28 118 18 118 L 10 118 Z",fill:"url(#ff-bot-grad)"})]})]})}])},18566,(e,t,i)=>{t.exports=e.r(76562)},54067,e=>{"use strict";var t=e.i(43476),i=e.i(71645);e.s(["default",0,function(){let e=(0,i.useRef)(null),n=(0,i.useRef)([]),r=(0,i.useRef)(0),a=(0,i.useRef)(null),s=(0,i.useRef)(0),[l,o]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{let t=!1,i=[];for(let e=1;e<=240;e++){let n=new Image,r=String(e).padStart(3,"0");n.src=`/bg-frames/ezgif-frame-${r}.jpg`,1===e&&(n.onload=()=>{t||o(!0)}),i.push(n)}n.current=i;let l=e.current;if(!l)return;let d=l.getContext("2d",{alpha:!1});if(!d)return;let c=()=>{if(!l||!d)return;let e=Math.min(window.devicePixelRatio||1,2),t=window.innerWidth,i=window.innerHeight;l.width=Math.floor(t*e),l.height=Math.floor(i*e),l.style.width=`${t}px`,l.style.height=`${i}px`,d.imageSmoothingEnabled=!0,d.imageSmoothingQuality="high"};c(),window.addEventListener("resize",c);let p=e=>{a.current=requestAnimationFrame(p);let t=e-s.current;if(t<33.333333333333336)return;s.current=e-t%33.333333333333336;let i=r.current,o=n.current[i];if(o&&o.complete&&o.naturalWidth>0){let e=l.width,t=l.height,i=o.naturalWidth/o.naturalHeight,n=e/t,r=e,a=t,s=0,c=0;n>i?c=(t-(a=e/i))/2:s=(e-(r=t*i))/2,d.drawImage(o,s,c,r,a)}r.current=(r.current+1)%240};return a.current=requestAnimationFrame(p),()=>{t=!0,a.current&&cancelAnimationFrame(a.current),window.removeEventListener("resize",c)}},[]),(0,t.jsxs)("div",{className:"frame-sequence-bg-container","aria-hidden":"true",children:[(0,t.jsx)("canvas",{ref:e,className:"frame-sequence-canvas"}),(0,t.jsx)("div",{className:"frame-sequence-overlay"})]})}])},67585,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"BailoutToCSR",{enumerable:!0,get:function(){return r}});let n=e.r(32061);function r({reason:e,children:t}){if("u"<typeof window)throw Object.defineProperty(new n.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return t}},9885,(e,t,i)=>{"use strict";function n(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"encodeURIPath",{enumerable:!0,get:function(){return n}})},52157,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"PreloadChunks",{enumerable:!0,get:function(){return o}});let n=e.r(43476),r=e.r(74080),a=e.r(63599),s=e.r(9885),l=e.r(43369);function o({moduleIds:e}){if("u">typeof window)return null;let t=a.workAsyncStorage.getStore();if(void 0===t)return null;let i=[];if(t.reactLoadableManifest&&e){let n=t.reactLoadableManifest;for(let t of e){if(!n[t])continue;let e=n[t].files;i.push(...e)}}if(0===i.length)return null;let d=(0,l.getAssetTokenQuery)();return(0,n.jsx)(n.Fragment,{children:i.map(e=>{let i=`${t.assetPrefix}/_next/${(0,s.encodeURIPath)(e)}${d}`;return e.endsWith(".css")?(0,n.jsx)("link",{precedence:"dynamic",href:i,rel:"stylesheet",as:"style",nonce:t.nonce},e):((0,r.preload)(i,{as:"script",fetchPriority:"low",nonce:t.nonce}),null)})})}},69093,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"default",{enumerable:!0,get:function(){return d}});let n=e.r(43476),r=e.r(71645),a=e.r(67585),s=e.r(52157);function l(e){return{default:e&&"default"in e?e.default:e}}let o={loader:()=>Promise.resolve(l(()=>null)),loading:null,ssr:!0},d=function(e){let t={...o,...e},i=(0,r.lazy)(()=>t.loader().then(l)),d=t.loading;function c(e){let l=d?(0,n.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,o=!t.ssr||!!t.loading,c=o?r.Suspense:r.Fragment,p=t.ssr?(0,n.jsxs)(n.Fragment,{children:["u"<typeof window?(0,n.jsx)(s.PreloadChunks,{moduleIds:t.modules}):null,(0,n.jsx)(i,{...e})]}):(0,n.jsx)(a.BailoutToCSR,{reason:"next/dynamic",children:(0,n.jsx)(i,{...e})});return(0,n.jsx)(c,{...o?{fallback:l}:{},children:p})}return c.displayName="LoadableComponent",c}},70703,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"default",{enumerable:!0,get:function(){return r}});let n=e.r(55682)._(e.r(69093));function r(e,t){let i={};"function"==typeof e&&(i.loader=e);let r={...i,...t};return(0,n.default)({...r,modules:r.loadableGenerated?.modules})}("function"==typeof i.default||"object"==typeof i.default&&null!==i.default)&&void 0===i.default.__esModule&&(Object.defineProperty(i.default,"__esModule",{value:!0}),Object.assign(i.default,i),t.exports=i.default)},46633,86230,e=>{"use strict";var t=e.i(43476),i=e.i(71645);let n=(0,e.i(70703).default)(()=>e.A(35641),{loadableGenerated:{modules:[8576]},ssr:!1});function r({component:e}){switch(e.type){case"hero":return(0,t.jsx)(a,{data:e});case"list":return(0,t.jsx)(s,{data:e});case"grid":return(0,t.jsx)(l,{data:e});case"metric":return(0,t.jsx)(o,{data:e});case"card":return(0,t.jsx)(d,{data:e});case"chart":return(0,t.jsx)(c,{data:e});case"table":return(0,t.jsx)(p,{data:e});case"form":return(0,t.jsx)(f,{data:e});case"button":return(0,t.jsx)(x,{data:e});case"progress":return(0,t.jsx)(u,{data:e});case"timeline":return(0,t.jsx)(m,{data:e});default:return(0,t.jsxs)("div",{className:"unknown-component",children:["Unknown component: ",e.type]})}}function a({data:e}){return(0,t.jsxs)("div",{className:"hero-component",style:{padding:"32px",borderRadius:"var(--radius-lg)",background:"linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(124, 58, 237, 0.06))",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"12px",position:"relative"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.icon&&(0,t.jsx)("span",{style:{fontSize:"28px"},children:e.icon}),(0,t.jsx)("h2",{style:{fontSize:"26px",fontWeight:800,margin:0,color:"var(--text-primary)"},children:e.title})]}),(e.subtitle||e.content)&&(0,t.jsx)("p",{style:{fontSize:"15px",color:"var(--text-secondary)",lineHeight:1.6,margin:0,maxWidth:"720px"},children:e.subtitle||e.content}),(e.actionText||e.cta)&&(0,t.jsx)("div",{style:{marginTop:"8px"},children:(0,t.jsxs)("button",{className:"rendered-button variant-primary",onClick:()=>alert(`Action: ${e.actionText||e.cta}`),children:[e.actionText||e.cta," →"]})})]})}function s({data:e}){let i=Array.isArray(e.items)?e.items:[];return(0,t.jsxs)("div",{className:"list-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,marginBottom:"16px"},children:e.title}),(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:i.map((e,i)=>(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",borderRadius:"8px",background:"rgba(99, 102, 241, 0.04)",border:"1px solid var(--border)"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.icon&&(0,t.jsx)("span",{children:e.icon}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"var(--text-primary)"},children:e.title}),e.subtitle&&(0,t.jsx)("div",{style:{fontSize:"12px",color:"var(--text-muted)"},children:e.subtitle})]})]}),e.badge&&(0,t.jsx)("span",{style:{fontSize:"11px",fontWeight:600,padding:"3px 8px",borderRadius:"12px",background:"rgba(99, 102, 241, 0.15)",color:"var(--accent-light)"},children:e.badge})]},i))})]})}function l({data:e}){let i=Array.isArray(e.items)?e.items:[];return(0,t.jsxs)("div",{className:"grid-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,marginBottom:"16px"},children:e.title}),(0,t.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"},children:i.map((e,i)=>(0,t.jsxs)("div",{style:{padding:"16px",borderRadius:"10px",background:"var(--bg-secondary)",border:"1px solid var(--border)",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{style:{fontSize:"15px",fontWeight:700,color:"var(--text-primary)",marginBottom:"6px"},children:e.title}),e.description&&(0,t.jsx)("div",{style:{fontSize:"13px",color:"var(--text-secondary)",lineHeight:1.5,marginBottom:"10px"},children:e.description})]}),Array.isArray(e.tags)&&e.tags.length>0&&(0,t.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"8px"},children:e.tags.map((e,i)=>(0,t.jsx)("span",{style:{fontSize:"11px",padding:"2px 6px",borderRadius:"4px",background:"rgba(99, 102, 241, 0.1)",color:"var(--accent-light)"},children:e},i))})]},i))})]})}function o({data:e}){return(0,t.jsxs)("div",{className:"metric-card",children:[(0,t.jsxs)("div",{className:"metric-header",children:[e.icon&&(0,t.jsx)("span",{className:"metric-icon",children:e.icon}),(0,t.jsx)("span",{className:"metric-title",children:e.title})]}),(0,t.jsx)("div",{className:"metric-value",children:e.value}),e.change&&(0,t.jsxs)("div",{className:`metric-change ${"up"===e.trend?"trend-up":"down"===e.trend?"trend-down":"trend-neutral"}`,children:["up"===e.trend?"↑":"down"===e.trend?"↓":"→"," ",e.change]})]})}function d({data:e}){return(0,t.jsxs)("div",{className:"card-component",children:[(0,t.jsxs)("div",{className:"card-header-row",children:[e.icon&&(0,t.jsx)("span",{className:"card-icon",children:e.icon}),(0,t.jsx)("h3",{children:e.title})]}),(0,t.jsx)("div",{className:"card-content",children:e.content})]})}function c({data:e}){return(0,t.jsxs)("div",{className:"chart-card",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)(n,{chartType:e.chartType,labels:e.labels||[],datasets:e.datasets||[],title:e.title})]})}function p({data:e}){return(0,t.jsxs)("div",{className:"table-component",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)("div",{className:"table-scroll",children:(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{children:(e.columns||[]).map((e,i)=>(0,t.jsx)("th",{children:e},i))})}),(0,t.jsx)("tbody",{children:(e.rows||[]).map((e,i)=>(0,t.jsx)("tr",{children:e.map((e,i)=>(0,t.jsx)("td",{children:e},i))},i))})]})})]})}function f({data:e}){let[n,r]=(0,i.useState)({});return(0,t.jsxs)("div",{className:"form-component",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsxs)("form",{onSubmit:e=>{e.preventDefault(),alert("Form submitted: "+JSON.stringify(n,null,2))},children:[(e.fields||[]).map((e,i)=>(0,t.jsxs)("div",{className:"form-field",children:[(0,t.jsx)("label",{htmlFor:`field-${e.name}`,children:e.label}),"select"===e.fieldType?(0,t.jsxs)("select",{id:`field-${e.name}`,value:n[e.name]||"",onChange:t=>r({...n,[e.name]:t.target.value}),children:[(0,t.jsx)("option",{value:"",children:"Select..."}),(e.options||[]).map((e,i)=>(0,t.jsx)("option",{value:e,children:e},i))]}):"checkbox"===e.fieldType?(0,t.jsx)("input",{type:"checkbox",id:`field-${e.name}`,checked:"true"===n[e.name],onChange:t=>r({...n,[e.name]:String(t.target.checked)})}):"textarea"===e.fieldType?(0,t.jsx)("textarea",{id:`field-${e.name}`,placeholder:e.placeholder||"",value:n[e.name]||"",onChange:t=>r({...n,[e.name]:t.target.value}),rows:3}):(0,t.jsx)("input",{type:e.fieldType||"text",id:`field-${e.name}`,placeholder:e.placeholder||"",value:n[e.name]||"",onChange:t=>r({...n,[e.name]:t.target.value})})]},i)),(0,t.jsx)("button",{type:"submit",className:"form-submit-btn",children:"Submit"})]})]})}function x({data:e}){return(0,t.jsx)("button",{className:`rendered-button variant-${e.variant||"primary"}`,onClick:()=>alert(`Action: ${e.action||e.label}`),children:e.label})}function u({data:e}){let i=Math.min(100,Math.max(0,e.value||0));return(0,t.jsxs)("div",{className:"progress-component",children:[(0,t.jsxs)("div",{className:"progress-header",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsxs)("span",{className:"progress-value",children:[i,"%"]})]}),(0,t.jsx)("div",{className:"progress-bar-bg",children:(0,t.jsx)("div",{className:"progress-bar-fill",style:{width:`${i}%`}})}),e.label&&(0,t.jsx)("p",{className:"progress-label",children:e.label})]})}function m({data:e}){return(0,t.jsxs)("div",{className:"timeline-component",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)("div",{className:"timeline-list",children:(e.events||[]).map((e,i)=>(0,t.jsxs)("div",{className:`timeline-item status-${e.status||"upcoming"}`,children:[(0,t.jsx)("div",{className:"timeline-dot"}),(0,t.jsxs)("div",{className:"timeline-content",children:[(0,t.jsxs)("div",{className:"timeline-event-header",children:[(0,t.jsx)("strong",{children:e.title}),(0,t.jsx)("span",{className:"timeline-date",children:e.date})]}),e.description&&(0,t.jsx)("p",{className:"timeline-desc",children:e.description})]})]},i))})]})}e.s(["default",0,function({schema:e}){return e&&e.components?(0,t.jsxs)("div",{className:"ui-renderer",children:[(0,t.jsxs)("div",{className:"renderer-header",children:[(0,t.jsx)("h2",{children:e.title}),e.description&&(0,t.jsx)("p",{children:e.description})]}),(0,t.jsx)("div",{className:"components-grid",children:e.components.map((e,i)=>(0,t.jsx)("div",{className:`component-wrapper component-${e.type}`,style:{animationDelay:`${80*i}ms`},children:(0,t.jsx)(r,{component:e})},`${e.type}-${i}`))})]}):null}],46633),e.s(["downloadDirectPDF",0,function(e){let t,i,n,r=(t=e.title||"FlowForge AI Generated Application",i=e.description||"",n=(Array.isArray(e.components)?e.components:[]).map(e=>{let t=e.type||"card",i=e.title||e.name||"";if("hero"===t)return`
        <div class="pdf-card pdf-hero">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            ${e.icon?`<span style="font-size: 28px;">${e.icon}</span>`:""}
            <h2 style="font-size: 22px; font-weight: 800; color: #1e1b4b; margin: 0;">${i}</h2>
          </div>
          ${e.subtitle||e.content?`<p style="font-size: 14px; color: #475569; line-height: 1.5; margin: 0;">${e.subtitle||e.content}</p>`:""}
          ${e.actionText||e.cta?`<div style="margin-top: 12px;"><span class="pdf-btn">${e.actionText||e.cta} →</span></div>`:""}
        </div>
      `;if("metric"===t)return`
        <div class="pdf-card pdf-metric">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">${i}</div>
              <div style="font-size: 26px; font-weight: 800; color: #1e1b4b; margin-top: 4px;">${e.value||"0"}</div>
            </div>
            ${e.change?`<span class="pdf-badge ${String(e.change).startsWith("-")?"badge-neg":"badge-pos"}">${e.change}</span>`:e.icon?`<span style="font-size: 24px;">${e.icon}</span>`:""}
          </div>
        </div>
      `;if("table"===t){let t=Array.isArray(e.columns)?e.columns:["Item","Category","Status","Value"],n=Array.isArray(e.rows)?e.rows:[];return`
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px;">${i}</h3>
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
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 14px;">${i}</h3>
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
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 14px;">${i}</h3>
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
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px;">${i} <span style="font-size: 12px; color: #64748b; font-weight: 400;">(${e.chartType||"Distribution"})</span></h3>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
            ${t.map((e,t)=>{let i=n[t]||50,r=Math.min(100,Math.max(10,i));return`
                <div style="display: flex; align-items: center; gap: 10px; font-size: 12px;">
                  <span style="width: 110px; font-weight: 600; color: #334155;">${e}</span>
                  <div style="flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; width: ${r}%; background: #4f46e5; border-radius: 4px;"></div>
                  </div>
                  <span style="width: 40px; text-align: right; color: #64748b; font-weight: 600;">${i}</span>
                </div>
              `}).join("")}
          </div>
        </div>
      `}if("progress"===t){let t=e.value||75;return`
        <div class="pdf-card">
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 14px; color: #1e1b4b; margin-bottom: 6px;">
            <span>${i}</span>
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
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin: 0;">${i}</h3>
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
    ${i?`<p class="pdf-desc">${i}</p>`:""}
  </header>

  <main class="pdf-grid">
    ${n}
  </main>

  <footer class="pdf-footer">
    <span>Generated by FlowForge AI Application Engine</span>
    <span>Ready for Print & Archival PDF</span>
  </footer>
</body>
</html>`),a=document.getElementById("flowforge-print-frame");a||((a=document.createElement("iframe")).id="flowforge-print-frame",a.style.position="fixed",a.style.right="0",a.style.bottom="0",a.style.width="0",a.style.height="0",a.style.border="none",document.body.appendChild(a));let s=a.contentWindow?.document||a.contentDocument;s&&(s.open(),s.write(r),s.close(),setTimeout(()=>{a&&a.contentWindow&&(a.contentWindow.focus(),a.contentWindow.print())},300))}],86230)},35641,e=>{e.v(t=>Promise.all(["static/chunks/06f1i-44b6w2h.js"].map(t=>e.l(t))).then(()=>t(8576)))},76207,e=>{e.v(t=>Promise.all(["static/chunks/0d30h6dyawluw.js"].map(t=>e.l(t))).then(()=>t(59141)))},7690,e=>{e.v(t=>Promise.all(["static/chunks/00nc6kamqvsk5.js"].map(t=>e.l(t))).then(()=>t(84479)))}]);