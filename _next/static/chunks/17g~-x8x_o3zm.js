(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,13094,e=>{"use strict";var t=e.i(43476);e.s(["default",0,function({size:e=28,className:s=""}){return(0,t.jsxs)("svg",{width:e,height:e,viewBox:"0 0 100 120",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:`flowforge-brand-logo ${s}`,style:{display:"inline-block",verticalAlign:"middle",flexShrink:0},"aria-label":"FlowForge AI Logo",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("linearGradient",{id:"ff-top-grad",x1:"0",y1:"0",x2:"100",y2:"40",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#3b82f6"}),(0,t.jsx)("stop",{offset:"60%",stopColor:"#60a5fa"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#93c5fd"})]}),(0,t.jsxs)("linearGradient",{id:"ff-mid-grad",x1:"0",y1:"40",x2:"80",y2:"80",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#2563eb"}),(0,t.jsx)("stop",{offset:"50%",stopColor:"#4f46e5"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#6366f1"})]}),(0,t.jsxs)("linearGradient",{id:"ff-bot-grad",x1:"0",y1:"80",x2:"40",y2:"120",gradientUnits:"userSpaceOnUse",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#4338ca"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#6d28d9"})]}),(0,t.jsx)("filter",{id:"ff-glow",x:"-10%",y:"-10%",width:"120%",height:"120%",filterUnits:"userSpaceOnUse",children:(0,t.jsx)("feDropShadow",{dx:"0",dy:"3",stdDeviation:"4",floodColor:"#3b82f6",floodOpacity:"0.25"})})]}),(0,t.jsxs)("g",{filter:"url(#ff-glow)",children:[(0,t.jsx)("path",{d:"M 10 28 C 10 14 20 6 36 6 L 82 6 C 92 6 98 12 98 20 C 98 28 92 34 82 34 L 10 34 Z",fill:"url(#ff-top-grad)"}),(0,t.jsx)("path",{d:"M 10 66 C 10 52 18 46 32 46 L 68 46 C 76 46 82 52 82 60 C 82 68 76 74 68 74 L 10 74 Z",fill:"url(#ff-mid-grad)"}),(0,t.jsx)("path",{d:"M 10 86 L 36 86 C 36 86 36 94 36 102 C 36 112 28 118 18 118 L 10 118 Z",fill:"url(#ff-bot-grad)"})]})]})}])},18566,(e,t,s)=>{t.exports=e.r(76562)},67585,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"BailoutToCSR",{enumerable:!0,get:function(){return i}});let a=e.r(32061);function i({reason:e,children:t}){if("u"<typeof window)throw Object.defineProperty(new a.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return t}},9885,(e,t,s)=>{"use strict";function a(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"encodeURIPath",{enumerable:!0,get:function(){return a}})},52157,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"PreloadChunks",{enumerable:!0,get:function(){return o}});let a=e.r(43476),i=e.r(74080),r=e.r(63599),n=e.r(9885),l=e.r(43369);function o({moduleIds:e}){if("u">typeof window)return null;let t=r.workAsyncStorage.getStore();if(void 0===t)return null;let s=[];if(t.reactLoadableManifest&&e){let a=t.reactLoadableManifest;for(let t of e){if(!a[t])continue;let e=a[t].files;s.push(...e)}}if(0===s.length)return null;let d=(0,l.getAssetTokenQuery)();return(0,a.jsx)(a.Fragment,{children:s.map(e=>{let s=`${t.assetPrefix}/_next/${(0,n.encodeURIPath)(e)}${d}`;return e.endsWith(".css")?(0,a.jsx)("link",{precedence:"dynamic",href:s,rel:"stylesheet",as:"style",nonce:t.nonce},e):((0,i.preload)(s,{as:"script",fetchPriority:"low",nonce:t.nonce}),null)})})}},69093,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"default",{enumerable:!0,get:function(){return d}});let a=e.r(43476),i=e.r(71645),r=e.r(67585),n=e.r(52157);function l(e){return{default:e&&"default"in e?e.default:e}}let o={loader:()=>Promise.resolve(l(()=>null)),loading:null,ssr:!0},d=function(e){let t={...o,...e},s=(0,i.lazy)(()=>t.loader().then(l)),d=t.loading;function c(e){let l=d?(0,a.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,o=!t.ssr||!!t.loading,c=o?i.Suspense:i.Fragment,p=t.ssr?(0,a.jsxs)(a.Fragment,{children:["u"<typeof window?(0,a.jsx)(n.PreloadChunks,{moduleIds:t.modules}):null,(0,a.jsx)(s,{...e})]}):(0,a.jsx)(r.BailoutToCSR,{reason:"next/dynamic",children:(0,a.jsx)(s,{...e})});return(0,a.jsx)(c,{...o?{fallback:l}:{},children:p})}return c.displayName="LoadableComponent",c}},70703,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"default",{enumerable:!0,get:function(){return i}});let a=e.r(55682)._(e.r(69093));function i(e,t){let s={};"function"==typeof e&&(s.loader=e);let i={...s,...t};return(0,a.default)({...i,modules:i.loadableGenerated?.modules})}("function"==typeof s.default||"object"==typeof s.default&&null!==s.default)&&void 0===s.default.__esModule&&(Object.defineProperty(s.default,"__esModule",{value:!0}),Object.assign(s.default,s),t.exports=s.default)},46633,86230,e=>{"use strict";var t=e.i(43476),s=e.i(71645);let a=(0,e.i(70703).default)(()=>e.A(35641),{loadableGenerated:{modules:[8576]},ssr:!1});function i({component:e}){switch(e.type){case"hero":return(0,t.jsx)(r,{data:e});case"list":return(0,t.jsx)(n,{data:e});case"grid":return(0,t.jsx)(l,{data:e});case"metric":return(0,t.jsx)(o,{data:e});case"card":return(0,t.jsx)(d,{data:e});case"chart":return(0,t.jsx)(c,{data:e});case"table":return(0,t.jsx)(p,{data:e});case"form":return(0,t.jsx)(f,{data:e});case"button":return(0,t.jsx)(m,{data:e});case"progress":return(0,t.jsx)(x,{data:e});case"timeline":return(0,t.jsx)(h,{data:e});default:return(0,t.jsxs)("div",{className:"unknown-component",children:["Unknown component: ",e.type]})}}function r({data:e}){return(0,t.jsxs)("div",{className:"hero-component",style:{padding:"32px",borderRadius:"var(--radius-lg)",background:"linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(124, 58, 237, 0.06))",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"12px",position:"relative"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.icon&&(0,t.jsx)("span",{style:{fontSize:"28px"},children:e.icon}),(0,t.jsx)("h2",{style:{fontSize:"26px",fontWeight:800,margin:0,color:"var(--text-primary)"},children:e.title})]}),(e.subtitle||e.content)&&(0,t.jsx)("p",{style:{fontSize:"15px",color:"var(--text-secondary)",lineHeight:1.6,margin:0,maxWidth:"720px"},children:e.subtitle||e.content}),(e.actionText||e.cta)&&(0,t.jsx)("div",{style:{marginTop:"8px"},children:(0,t.jsxs)("button",{className:"rendered-button variant-primary",onClick:()=>alert(`Action: ${e.actionText||e.cta}`),children:[e.actionText||e.cta," →"]})})]})}function n({data:e}){let s=Array.isArray(e.items)?e.items:[];return(0,t.jsxs)("div",{className:"list-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,marginBottom:"16px"},children:e.title}),(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:s.map((e,s)=>(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",borderRadius:"8px",background:"rgba(99, 102, 241, 0.04)",border:"1px solid var(--border)"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.icon&&(0,t.jsx)("span",{children:e.icon}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"var(--text-primary)"},children:e.title}),e.subtitle&&(0,t.jsx)("div",{style:{fontSize:"12px",color:"var(--text-muted)"},children:e.subtitle})]})]}),e.badge&&(0,t.jsx)("span",{style:{fontSize:"11px",fontWeight:600,padding:"3px 8px",borderRadius:"12px",background:"rgba(99, 102, 241, 0.15)",color:"var(--accent-light)"},children:e.badge})]},s))})]})}function l({data:e}){let s=Array.isArray(e.items)?e.items:[];return(0,t.jsxs)("div",{className:"grid-component",style:{padding:"24px",borderRadius:"var(--radius-lg)",background:"var(--bg-glass)",border:"1px solid var(--border)"},children:[(0,t.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,marginBottom:"16px"},children:e.title}),(0,t.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"14px"},children:s.map((e,s)=>(0,t.jsxs)("div",{style:{padding:"16px",borderRadius:"10px",background:"var(--bg-secondary)",border:"1px solid var(--border)",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{style:{fontSize:"15px",fontWeight:700,color:"var(--text-primary)",marginBottom:"6px"},children:e.title}),e.description&&(0,t.jsx)("div",{style:{fontSize:"13px",color:"var(--text-secondary)",lineHeight:1.5,marginBottom:"10px"},children:e.description})]}),Array.isArray(e.tags)&&e.tags.length>0&&(0,t.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"4px",marginTop:"8px"},children:e.tags.map((e,s)=>(0,t.jsx)("span",{style:{fontSize:"11px",padding:"2px 6px",borderRadius:"4px",background:"rgba(99, 102, 241, 0.1)",color:"var(--accent-light)"},children:e},s))})]},s))})]})}function o({data:e}){return(0,t.jsxs)("div",{className:"metric-card",children:[(0,t.jsxs)("div",{className:"metric-header",children:[e.icon&&(0,t.jsx)("span",{className:"metric-icon",children:e.icon}),(0,t.jsx)("span",{className:"metric-title",children:e.title})]}),(0,t.jsx)("div",{className:"metric-value",children:e.value}),e.change&&(0,t.jsxs)("div",{className:`metric-change ${"up"===e.trend?"trend-up":"down"===e.trend?"trend-down":"trend-neutral"}`,children:["up"===e.trend?"↑":"down"===e.trend?"↓":"→"," ",e.change]})]})}function d({data:e}){return(0,t.jsxs)("div",{className:"card-component",children:[(0,t.jsxs)("div",{className:"card-header-row",children:[e.icon&&(0,t.jsx)("span",{className:"card-icon",children:e.icon}),(0,t.jsx)("h3",{children:e.title})]}),(0,t.jsx)("div",{className:"card-content",children:e.content})]})}function c({data:e}){return(0,t.jsxs)("div",{className:"chart-card",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)(a,{chartType:e.chartType,labels:e.labels||[],datasets:e.datasets||[],title:e.title})]})}function p({data:e}){return(0,t.jsxs)("div",{className:"table-component",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)("div",{className:"table-scroll",children:(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{children:(e.columns||[]).map((e,s)=>(0,t.jsx)("th",{children:e},s))})}),(0,t.jsx)("tbody",{children:(e.rows||[]).map((e,s)=>(0,t.jsx)("tr",{children:e.map((e,s)=>(0,t.jsx)("td",{children:e},s))},s))})]})})]})}function f({data:e}){let[a,i]=(0,s.useState)({});return(0,t.jsxs)("div",{className:"form-component",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsxs)("form",{onSubmit:e=>{e.preventDefault(),alert("Form submitted: "+JSON.stringify(a,null,2))},children:[(e.fields||[]).map((e,s)=>(0,t.jsxs)("div",{className:"form-field",children:[(0,t.jsx)("label",{htmlFor:`field-${e.name}`,children:e.label}),"select"===e.fieldType?(0,t.jsxs)("select",{id:`field-${e.name}`,value:a[e.name]||"",onChange:t=>i({...a,[e.name]:t.target.value}),children:[(0,t.jsx)("option",{value:"",children:"Select..."}),(e.options||[]).map((e,s)=>(0,t.jsx)("option",{value:e,children:e},s))]}):"checkbox"===e.fieldType?(0,t.jsx)("input",{type:"checkbox",id:`field-${e.name}`,checked:"true"===a[e.name],onChange:t=>i({...a,[e.name]:String(t.target.checked)})}):"textarea"===e.fieldType?(0,t.jsx)("textarea",{id:`field-${e.name}`,placeholder:e.placeholder||"",value:a[e.name]||"",onChange:t=>i({...a,[e.name]:t.target.value}),rows:3}):(0,t.jsx)("input",{type:e.fieldType||"text",id:`field-${e.name}`,placeholder:e.placeholder||"",value:a[e.name]||"",onChange:t=>i({...a,[e.name]:t.target.value})})]},s)),(0,t.jsx)("button",{type:"submit",className:"form-submit-btn",children:"Submit"})]})]})}function m({data:e}){return(0,t.jsx)("button",{className:`rendered-button variant-${e.variant||"primary"}`,onClick:()=>alert(`Action: ${e.action||e.label}`),children:e.label})}function x({data:e}){let s=Math.min(100,Math.max(0,e.value||0));return(0,t.jsxs)("div",{className:"progress-component",children:[(0,t.jsxs)("div",{className:"progress-header",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsxs)("span",{className:"progress-value",children:[s,"%"]})]}),(0,t.jsx)("div",{className:"progress-bar-bg",children:(0,t.jsx)("div",{className:"progress-bar-fill",style:{width:`${s}%`}})}),e.label&&(0,t.jsx)("p",{className:"progress-label",children:e.label})]})}function h({data:e}){return(0,t.jsxs)("div",{className:"timeline-component",children:[(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)("div",{className:"timeline-list",children:(e.events||[]).map((e,s)=>(0,t.jsxs)("div",{className:`timeline-item status-${e.status||"upcoming"}`,children:[(0,t.jsx)("div",{className:"timeline-dot"}),(0,t.jsxs)("div",{className:"timeline-content",children:[(0,t.jsxs)("div",{className:"timeline-event-header",children:[(0,t.jsx)("strong",{children:e.title}),(0,t.jsx)("span",{className:"timeline-date",children:e.date})]}),e.description&&(0,t.jsx)("p",{className:"timeline-desc",children:e.description})]})]},s))})]})}e.s(["default",0,function({schema:e}){return e&&e.components?(0,t.jsxs)("div",{className:"ui-renderer",children:[(0,t.jsxs)("div",{className:"renderer-header",children:[(0,t.jsx)("h2",{children:e.title}),e.description&&(0,t.jsx)("p",{children:e.description})]}),(0,t.jsx)("div",{className:"components-grid",children:e.components.map((e,s)=>(0,t.jsx)("div",{className:`component-wrapper component-${e.type}`,style:{animationDelay:`${80*s}ms`},children:(0,t.jsx)(i,{component:e})},`${e.type}-${s}`))})]}):null}],46633),e.s(["downloadDirectPDF",0,function(e){let t,s,a,i=(t=e.title||"FlowForge AI Generated Application",s=e.description||"",a=(Array.isArray(e.components)?e.components:[]).map(e=>{let t=e.type||"card",s=e.title||e.name||"";if("hero"===t)return`
        <div class="pdf-card pdf-hero">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            ${e.icon?`<span style="font-size: 28px;">${e.icon}</span>`:""}
            <h2 style="font-size: 22px; font-weight: 800; color: #1e1b4b; margin: 0;">${s}</h2>
          </div>
          ${e.subtitle||e.content?`<p style="font-size: 14px; color: #475569; line-height: 1.5; margin: 0;">${e.subtitle||e.content}</p>`:""}
          ${e.actionText||e.cta?`<div style="margin-top: 12px;"><span class="pdf-btn">${e.actionText||e.cta} →</span></div>`:""}
        </div>
      `;if("metric"===t)return`
        <div class="pdf-card pdf-metric">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">${s}</div>
              <div style="font-size: 26px; font-weight: 800; color: #1e1b4b; margin-top: 4px;">${e.value||"0"}</div>
            </div>
            ${e.change?`<span class="pdf-badge ${String(e.change).startsWith("-")?"badge-neg":"badge-pos"}">${e.change}</span>`:e.icon?`<span style="font-size: 24px;">${e.icon}</span>`:""}
          </div>
        </div>
      `;if("table"===t){let t=Array.isArray(e.columns)?e.columns:["Item","Category","Status","Value"],a=Array.isArray(e.rows)?e.rows:[];return`
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px;">${s}</h3>
          <table class="pdf-table">
            <thead>
              <tr>
                ${t.map(e=>`<th>${e}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${a.map(e=>`
                <tr>
                  ${(Array.isArray(e)?e:[e]).map(e=>`<td>${e}</td>`).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `}if("timeline"===t){let t=Array.isArray(e.events)?e.events:[];return`
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 14px;">${s}</h3>
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
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 14px;">${s}</h3>
          <div class="pdf-form-grid">
            ${t.map(e=>`
              <div class="pdf-form-group">
                <label>${e.label||e.name}</label>
                <div class="pdf-input-box">${e.placeholder||e.fieldType||"Input"}</div>
              </div>
            `).join("")}
          </div>
        </div>
      `}if("chart"===t){let t=Array.isArray(e.labels)?e.labels:["Metric A","Metric B","Metric C","Metric D"],a=e.datasets?.[0]?.data||[65,45,80,55];return`
        <div class="pdf-card">
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin-bottom: 12px;">${s} <span style="font-size: 12px; color: #64748b; font-weight: 400;">(${e.chartType||"Distribution"})</span></h3>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
            ${t.map((e,t)=>{let s=a[t]||50,i=Math.min(100,Math.max(10,s));return`
                <div style="display: flex; align-items: center; gap: 10px; font-size: 12px;">
                  <span style="width: 110px; font-weight: 600; color: #334155;">${e}</span>
                  <div style="flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                    <div style="height: 100%; width: ${i}%; background: #4f46e5; border-radius: 4px;"></div>
                  </div>
                  <span style="width: 40px; text-align: right; color: #64748b; font-weight: 600;">${s}</span>
                </div>
              `}).join("")}
          </div>
        </div>
      `}if("progress"===t){let t=e.value||75;return`
        <div class="pdf-card">
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 14px; color: #1e1b4b; margin-bottom: 6px;">
            <span>${s}</span>
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
          <h3 style="font-size: 16px; font-weight: 700; color: #1e1b4b; margin: 0;">${s}</h3>
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
    ${s?`<p class="pdf-desc">${s}</p>`:""}
  </header>

  <main class="pdf-grid">
    ${a}
  </main>

  <footer class="pdf-footer">
    <span>Generated by FlowForge AI Application Engine</span>
    <span>Ready for Print & Archival PDF</span>
  </footer>
</body>
</html>`),r=document.getElementById("flowforge-print-frame");r||((r=document.createElement("iframe")).id="flowforge-print-frame",r.style.position="fixed",r.style.right="0",r.style.bottom="0",r.style.width="0",r.style.height="0",r.style.border="none",document.body.appendChild(r));let n=r.contentWindow?.document||r.contentDocument;n&&(n.open(),n.write(i),n.close(),setTimeout(()=>{r&&r.contentWindow&&(r.contentWindow.focus(),r.contentWindow.print())},300))}],86230)},72296,e=>{"use strict";var t=e.i(43476),s=e.i(71645),a=e.i(18566),i=e.i(46633),r=e.i(86230),n=e.i(13094);let l=[{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash",providerLabel:"Google Gemini API (gemini-2.0-flash)"},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash",providerLabel:"Google Gemini API (gemini-1.5-flash)"},{id:"gpt-4o",name:"GPT-4o",providerLabel:"OpenAI API (gpt-4o)"},{id:"gpt-4o-mini",name:"GPT-4o Mini",providerLabel:"OpenAI API (gpt-4o-mini)"},{id:"o3-mini",name:"o3-mini Reasoning",providerLabel:"OpenAI API (o3-mini Reasoning)"},{id:"claude-3.5-sonnet",name:"Claude 3.5 Sonnet",providerLabel:"Anthropic Claude 3.5 Sonnet"},{id:"deepseek-r1",name:"DeepSeek R1",providerLabel:"DeepSeek V3 / R1 (Reasoner)"}];e.s(["default",0,function(){let o=(0,a.useRouter)(),d=(0,a.useSearchParams)().get("workflow"),[c,p]=(0,s.useState)(null),[f,m]=(0,s.useState)(null),[x,h]=(0,s.useState)(""),[u,g]=(0,s.useState)(""),[b,j]=(0,s.useState)(!0),[v,y]=(0,s.useState)(!1),[w,N]=(0,s.useState)(null),[k,S]=(0,s.useState)(null),[$,C]=(0,s.useState)(!0),[A,P]=(0,s.useState)(!1),[z,I]=(0,s.useState)(!1),[F,T]=(0,s.useState)(""),[O,D]=(0,s.useState)("gemini-2.0-flash"),[R,_]=(0,s.useState)("FlowForge Creator"),[M,W]=(0,s.useState)("creator@flowforge.ai"),[L,E]=(0,s.useState)(!1),[U,B]=(0,s.useState)([]),[G,J]=(0,s.useState)(!0),H=(0,s.useRef)(null),K=(0,s.useRef)(null),V=(0,s.useCallback)(e=>{S(e),setTimeout(()=>S(null),3e3)},[]);(0,s.useEffect)(()=>{K.current&&K.current.scrollIntoView({behavior:"smooth"})},[U,v]),(0,s.useEffect)(()=>{fetch("/api/auth/me").then(e=>e.json()).then(e=>{e.user&&(p(e.user),e.user.name&&_(e.user.name),e.user.email&&W(e.user.email))}).catch(()=>{})},[]),(0,s.useEffect)(()=>{if(d)j(!0),fetch(`/api/workflows/${d}`).then(e=>e.json()).then(e=>{e.workflow?(m(e.workflow.uiSchema),h(e.workflow.prompt||""),B([{role:"user",content:e.workflow.prompt||"Loaded workflow"},{role:"assistant",content:`Loaded "${e.workflow.title}" output.`}])):N("Workflow not found.")}).catch(()=>N("Failed to load workflow.")).finally(()=>j(!1));else try{let e=sessionStorage.getItem("flowforge_current_schema"),t=sessionStorage.getItem("flowforge_current_prompt")||"",s=sessionStorage.getItem("flowforge_chat_messages"),a=sessionStorage.getItem("flowforge_selected_model");if(a&&D(a),t&&h(t),e){let a=JSON.parse(e);m(a),s?B(JSON.parse(s)):B([{role:"user",content:t||"Generated prompt"},{role:"assistant",content:`Generated "${a.title||"Interface"}" successfully.`}])}else o.replace("/workspace")}catch(e){console.error("Hydration error:",e),o.replace("/workspace")}finally{j(!1)}},[d,o]);let Z=async()=>{if(!u.trim())return;let t=u.trim(),s=[...U,{role:"user",content:t}];B(s),g(""),y(!0),N(null);try{let a=null;try{let e=await fetch("/api/ai/modify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({schema:f||void 0,currentSchema:f||void 0,instruction:t,model:O})}),s=await e.json();e.ok&&s.schema&&(a=s.schema)}catch{}if(!a){let{modifyClientSchema:s}=await e.A(7690);a=s(f,t)}m(a),sessionStorage.setItem("flowforge_current_schema",JSON.stringify(a));let i=[...s,{role:"assistant",content:`Applied: "${t}". Updated ${a.title||"Interface"}.`}];B(i),sessionStorage.setItem("flowforge_chat_messages",JSON.stringify(i)),V("Interface updated successfully!")}catch(t){let e=t.message||"Failed to update interface. Please try again.";N(e),B(t=>[...t,{role:"assistant",content:`⚠️ ${e}`}])}finally{y(!1)}},q=async()=>{if(f)try{V("Generating PDF document..."),(0,r.downloadDirectPDF)(f),V("PDF exported successfully!")}catch(e){console.error("PDF Export error:",e),V("Failed to generate PDF. Retrying..."),window.print()}},Q=async()=>{if(F.trim()&&f)try{if(!c){let e=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({isDemo:!0})}),t=await e.json();t.user&&p(t.user)}if(!(await fetch("/api/workflows",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:F.trim(),description:f.description||"",prompt:x,uiSchema:f})})).ok)throw Error("Save failed");I(!1),T(""),V("Workflow saved successfully!")}catch{V("Failed to save workflow")}};return(0,t.jsxs)("div",{className:"workspace-layout",children:[(0,t.jsx)("button",{className:"mobile-menu-btn",onClick:()=>C(!$),"aria-label":"Toggle sidebar",children:(0,t.jsx)("span",{children:$?"✕":"☰"})}),(0,t.jsxs)("aside",{className:`workspace-sidebar ${$?"open":""} ${A?"collapsed":""}`,children:[(0,t.jsxs)("div",{className:"sidebar-top",children:[(0,t.jsx)("div",{className:"sidebar-logo-bar",children:(0,t.jsxs)("a",{href:"/",className:"sidebar-logo",title:"FlowForge AI",children:[(0,t.jsx)(n.default,{size:24}),(0,t.jsxs)("span",{className:"logo-text",children:["FlowForge",(0,t.jsx)("span",{className:"logo-ai",children:"AI"})]})]})}),(0,t.jsx)("div",{className:"sidebar-toggle-bar",children:(0,t.jsxs)("button",{className:"sidebar-collapse-toggle",onClick:()=>P(!A),title:A?"Expand sidebar":"Collapse sidebar","aria-label":"Toggle sidebar collapse",children:[(0,t.jsx)("span",{className:"toggle-icon",children:A?"▶":"◀"}),(0,t.jsx)("span",{className:"toggle-label",children:A?"Expand":"Collapse"})]})}),(0,t.jsxs)("nav",{className:"sidebar-nav",children:[(0,t.jsxs)("a",{href:"/workspace",className:"sidebar-item",title:"New Workflow",children:[(0,t.jsx)("span",{className:"sidebar-item-icon",children:"✦"}),(0,t.jsx)("span",{className:"sidebar-item-text",children:"New Workflow"})]}),(0,t.jsxs)("a",{href:"/workflows",className:"sidebar-item",title:"My Workflows",children:[(0,t.jsx)("span",{className:"sidebar-item-icon",children:"📁"}),(0,t.jsx)("span",{className:"sidebar-item-text",children:"My Workflows"})]}),(0,t.jsxs)("a",{href:"/workspace",className:"sidebar-item",title:"Templates",children:[(0,t.jsx)("span",{className:"sidebar-item-icon",children:"📋"}),(0,t.jsx)("span",{className:"sidebar-item-text",children:"Templates"})]}),(0,t.jsxs)("a",{href:"/settings",className:"sidebar-item",title:"Settings",children:[(0,t.jsx)("span",{className:"sidebar-item-icon",children:"⚙️"}),(0,t.jsx)("span",{className:"sidebar-item-text",children:"Settings"})]})]})]}),(0,t.jsxs)("div",{className:"sidebar-bottom",children:[(0,t.jsxs)("a",{href:"/",className:"sidebar-back-home-btn",title:"Back to Home",children:[(0,t.jsx)("span",{className:"sidebar-item-icon",children:"🏠"}),(0,t.jsx)("span",{className:"sidebar-item-text",children:"Back to Home"})]}),(0,t.jsxs)("div",{className:"sidebar-user-card",onClick:()=>E(!0),title:"Open Profile & Settings",role:"button",tabIndex:0,children:[(0,t.jsxs)("div",{className:"user-avatar-wrapper",children:[(0,t.jsx)("div",{className:"user-avatar",children:(c?.name||R).charAt(0).toUpperCase()}),(0,t.jsx)("span",{className:"online-status-dot",title:"Active"})]}),(0,t.jsxs)("div",{className:"user-info",children:[(0,t.jsx)("span",{className:"user-name",children:c?.name||R}),(0,t.jsx)("span",{className:"user-email",children:c?.email||M})]}),(0,t.jsx)("button",{className:"profile-quick-btn",onClick:e=>{e.stopPropagation(),E(!0)},title:"Open Profile","aria-label":"Open Profile",children:"⚙️"})]})]})]}),$&&(0,t.jsx)("div",{className:"sidebar-overlay",onClick:()=>C(!1)}),(0,t.jsxs)("main",{className:`workspace-main ${A?"sidebar-collapsed":""} has-right-sidebar`,children:[b&&(0,t.jsxs)("div",{className:"loading-state",children:[(0,t.jsx)("div",{className:"loading-spinner"}),(0,t.jsx)("p",{style:{color:"var(--on-surface-variant)",fontWeight:600},children:"Loading output canvas..."})]}),w&&(0,t.jsxs)("div",{className:"error-banner",children:[(0,t.jsxs)("span",{children:["⚠️ ",w]}),(0,t.jsx)("button",{onClick:()=>o.push("/workspace"),children:"Return to Prompt Builder"})]}),f&&!b&&(0,t.jsxs)("div",{ref:H,className:"result-section",children:[(0,t.jsxs)("div",{className:"result-toolbar",children:[(0,t.jsx)("div",{className:"toolbar-left",children:(0,t.jsx)("button",{className:"toolbar-btn",onClick:()=>o.push("/workspace"),title:"Return to Prompt Builder",children:"← Back to Prompt Builder"})}),(0,t.jsxs)("div",{className:"toolbar-right",children:[(0,t.jsxs)("button",{className:"toolbar-btn export-pdf-btn",onClick:q,title:"Export data directly as PDF (.pdf)",style:{background:"linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",color:"#ffffff",fontWeight:700,border:"1px solid rgba(255, 255, 255, 0.18)",boxShadow:"0 2px 10px rgba(79, 70, 229, 0.35)",display:"inline-flex",alignItems:"center",gap:"6px"},children:[(0,t.jsx)("span",{children:"📑"}),(0,t.jsx)("span",{children:"Export as PDF"})]}),(0,t.jsx)("button",{className:"toolbar-btn save-btn",onClick:()=>{T(f.title||""),I(!0)},children:"💾 Save Workflow"})]})]}),(0,t.jsx)(i.default,{schema:f})]})]}),f&&!b&&(0,t.jsxs)("aside",{className:"workspace-right-sidebar",children:[(0,t.jsxs)("div",{className:"right-sidebar-header",children:[(0,t.jsxs)("div",{className:"right-sidebar-title",children:[(0,t.jsx)("span",{className:"copilot-icon",children:"✨"}),(0,t.jsx)("span",{className:"copilot-text",children:"AI Copilot"})]}),(0,t.jsx)("div",{className:"right-sidebar-controls",children:(0,t.jsx)("span",{className:"right-sidebar-model-badge",children:l.find(e=>e.id===O)?.name||"Gemini 2.0"})})]}),(0,t.jsxs)("div",{className:"right-sidebar-chat-body",children:[0===U.length&&(0,t.jsx)("div",{className:"chat-empty-state",children:(0,t.jsx)("span",{children:"✨ Ask AI to customize, add, or remove components in real-time."})}),U.map((e,s)=>(0,t.jsx)("div",{className:`chat-message-row ${e.role}`,children:(0,t.jsxs)("div",{className:"chat-message-bubble",children:[(0,t.jsx)("span",{className:"chat-message-role",children:"user"===e.role?"You":"FlowForge AI"}),(0,t.jsx)("p",{className:"chat-message-text",children:e.content})]})},s)),v&&(0,t.jsx)("div",{className:"chat-message-row assistant modifying",children:(0,t.jsxs)("div",{className:"chat-message-bubble",children:[(0,t.jsx)("span",{className:"chat-message-role",children:"FlowForge AI"}),(0,t.jsxs)("p",{className:"chat-message-text",children:[(0,t.jsx)("span",{className:"modify-spinner inline"})," Updating interface..."]})]})}),(0,t.jsx)("div",{ref:K})]}),(0,t.jsxs)("div",{className:"right-sidebar-suggestions",children:[(0,t.jsx)("span",{className:"suggestions-label",children:"Quick Actions:"}),(0,t.jsx)("div",{className:"suggestions-list",children:["Add a pie chart","Add warning card","Add upcoming schedule","Remove component"].map((e,s)=>(0,t.jsxs)("button",{className:"right-sidebar-chip",onClick:()=>g(e),children:["+ ",e]},s))})]}),(0,t.jsxs)("div",{className:"right-sidebar-input-box",children:[(0,t.jsx)("textarea",{value:u,onChange:e=>g(e.target.value),placeholder:"Tell AI how to change this interface…",onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),Z())},disabled:v,rows:2}),(0,t.jsx)("button",{onClick:Z,disabled:!u.trim()||v,className:"right-sidebar-send-btn",title:"Apply AI modification",children:v?(0,t.jsx)("span",{className:"modify-spinner"}):"Apply ✨"})]})]}),k&&(0,t.jsx)("div",{className:"toast-notification",children:k}),z&&(0,t.jsx)("div",{className:"modal-overlay",onClick:()=>I(!1),children:(0,t.jsxs)("div",{className:"modal-content",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("h3",{children:"Save Workflow"}),(0,t.jsx)("input",{value:F,onChange:e=>T(e.target.value),placeholder:"Workflow name",autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&Q()}}),(0,t.jsxs)("div",{className:"modal-actions",children:[(0,t.jsx)("button",{className:"btn-modal-cancel",onClick:()=>I(!1),children:"Cancel"}),(0,t.jsx)("button",{className:"btn-modal-save",onClick:Q,disabled:!F.trim(),children:"Save"})]})]})})]})}])},35641,e=>{e.v(t=>Promise.all(["static/chunks/06f1i-44b6w2h.js"].map(t=>e.l(t))).then(()=>t(8576)))},7690,e=>{e.v(t=>Promise.all(["static/chunks/00nc6kamqvsk5.js"].map(t=>e.l(t))).then(()=>t(84479)))}]);