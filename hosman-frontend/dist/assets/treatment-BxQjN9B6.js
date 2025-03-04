import{ad as b,j as e,b as D,a as A,ap as x,r as I,aF as c,B as i,T as h,n as p,a3 as m,a5 as z,a4 as v,a6 as E,a7 as S,a8 as j,a9 as s,aa as B,e as f,aG as H,p as g,aH as F,aI as M,H as k,C as G}from"./index-DKfJt2ga.js";const L=b(e.jsx("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete");function N(){const d=D(),r=A(),{data:n,loading:u}=x(t=>t.allstaff.treatmentDetails)||[],l=x(t=>t.app.auth.role),y=t=>{if(console.log("Editing treatment with ID:",t),!Array.isArray(n)){console.log("data is not an array:",n);return}const a=n.find(o=>o._id===t);a?(console.log("Found treatment to edit:",a),d(g.dashboard.Treatment.edit,{state:a})):console.log("Treatment not found for ID:",t)},w=()=>{d(g.dashboard.Treatment.newTreatMents)};I.useEffect(()=>{(!n||n.length===0)&&r(c({}))},[r,n]);const T=async t=>{if(window.confirm("Are you sure you want to delete this treatment?"))try{await r(F({treatmentID:t})),await r(c({}))}catch(o){console.error("Error deleting treatment:",o)}},C=async()=>{if(window.confirm("Are you sure you want to delete this treatment?"))try{await r(M()),await r(c(n))}catch(a){console.error("Error deleting treatment:",a)}};return u?e.jsx(i,{sx:{display:"flex",justifyContent:"center",alignItems:"center",height:"80vh"},children:e.jsx(h,{children:"Fetching treatments... ⏳"})}):e.jsxs(i,{sx:{p:3},children:[e.jsxs(i,{sx:{display:"flex",flexDirection:{xs:"row",sm:"row"},width:{xs:"85vw",lg:"auto"},justifyContent:"space-between",zIndex:1},children:[e.jsx(h,{variant:"h4",gutterBottom:!0,children:"Treatment List"}),l&&e.jsx(i,{sx:{display:"flex",gap:1.5,mr:{xs:0,lg:8},flexWrap:"wrap",mb:.2},children:l==="Manager"&&e.jsxs(e.Fragment,{children:[e.jsx(p,{sx:{mb:2},variant:"contained",color:"info",size:"small",onClick:w,children:"Add"}),e.jsx(p,{sx:{mb:2},variant:"contained",color:"error",size:"small",onClick:C,children:"Delete all"})]})})]}),e.jsx(m,{container:!0,spacing:3,children:e.jsx(m,{item:!0,xs:12,children:e.jsx(z,{component:v,sx:{maxHeight:900,maxWidth:"auto"},children:e.jsxs(E,{size:"small",children:[e.jsx(S,{children:e.jsxs(j,{sx:{height:"50px"},children:[e.jsx(s,{sx:{py:.5},children:"ID"}),e.jsx(s,{sx:{py:.5},children:"Treatment"}),e.jsx(s,{sx:{py:.5},children:"Department"}),e.jsx(s,{sx:{py:.5},children:"Specialization"}),e.jsx(s,{sx:{py:.5},children:"Price"}),l=="Manager"&&e.jsx(s,{sx:{py:.5},children:"Actions"})]})}),e.jsx(B,{children:n.map((t,a)=>e.jsxs(j,{sx:{height:"10px"},children:[e.jsx(s,{sx:{py:{xs:.2,lg:1.3}},children:a+1}),e.jsx(s,{sx:{py:{xs:.2,lg:1.3}},children:t.treatment}),e.jsx(s,{sx:{py:{xs:.2,lg:1.3}},children:t.department}),e.jsx(s,{sx:{py:{xs:.2,lg:1.3}},children:t.specialization}),e.jsx(s,{sx:{py:{xs:.2,lg:1.3}},children:t.price}),l=="Manager"&&e.jsx(s,{sx:{py:{xs:.2,lg:1.3}},children:e.jsxs(i,{children:[e.jsx(f,{onClick:()=>y(t._id),color:"primary",children:e.jsx(H,{fontSize:"small"})}),e.jsx(f,{onClick:()=>T(t._id),color:"error",children:e.jsx(L,{fontSize:"small"})})]})})]},a))})]})})})})]})}function P(){return e.jsx(i,{children:e.jsx(N,{})})}const R={title:`All Staff | Staff | Settings - ${G.appName}`};function W(){return e.jsxs(e.Fragment,{children:[e.jsx(k,{children:e.jsxs("title",{children:[" ",R.title]})}),e.jsx(P,{})]})}export{W as default};
