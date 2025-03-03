import{a as v,b as w,r as m,ap as T,c as q,t as F,z as s,aK as k,ar as B,V as f,p as E,j as e,h as L,m as C,T as P,B as I,F as o,M as r,S as V,g as H,aL as M,H as _,C as z}from"./index-Dubd7hMd.js";const G=s.object({patientName:s.string().min(1,{message:"Patient Name is required!"}),department:s.string().min(1,{message:"Department is required!"}),doctorName:s.string().min(1,{message:"Doctor Name is required!"}),appointmentTime:s.string().min(1,{message:"Appointment Time is required!"}),appointmentDate:s.string().min(1,{message:"Appointment Date is required!"}),payment:s.string().min(1,{message:"Payment is required!"})});function K(){const i=v(),h=w(),x={department:"",doctorName:"",patientName:"",appointmentTime:"",appointmentDate:"",payment:"5"};m.useEffect(()=>{(async()=>{try{await i(M())}catch(a){console.error("Error fetching doctors data:",a)}})()},[i]);const{data:n}=T(t=>t.allstaff.getStaffDetails)||{data:{}};console.log("Doctors data from store:",n);const D=["Tomorrow",...Array.from({length:6},(t,a)=>new Date(Date.now()+(a+2)*864e5).toLocaleDateString())],[p,d]=m.useState([]),[u,S]=m.useState([]),g=q({mode:"onSubmit",resolver:F(G),defaultValues:x}),{watch:b,handleSubmit:j,formState:{isSubmitting:A}}=g,l=b("department");m.useEffect(()=>{if(n&&n.groupedStaff&&Array.isArray(n.groupedStaff.Doctor)){const t=n.groupedStaff.Doctor,a=Array.from(new Set(t.map(c=>String(c.department)).filter(Boolean)));if(console.log("Extracted Departments:",a),S(a),l){const c=t.filter(N=>N.department===l);d(c)}else d([])}else console.warn("Doctors list is missing or not an array.")},[n,l]);const y=j(async t=>{try{console.log("Submitting Appointment Data:",t);const a=await i(k(t)).unwrap();a!=null&&a.success&&(console.log("Appointment Booked:",a),i(B(n)),f.success("Appointment booked successfully!"),h(E.dashboard.root))}catch(a){console.error("Error booking appointment:",a),f.error("An error occurred while booking the appointment.")}});return e.jsx(L,{methods:g,onSubmit:y,children:e.jsxs(C,{sx:{p:3,boxShadow:0},elevation:0,children:[e.jsx(P,{variant:"h4",sx:{mb:2,fontWeight:"bold",color:"primary.main"},children:"Book an Appointment"}),e.jsxs(I,{display:"grid",gridTemplateColumns:{xs:"1fr",sm:"1fr 1fr"},gap:2,children:[e.jsx(o.Text,{name:"patientName",label:"Patient Name"}),e.jsx(o.Select,{name:"department",label:"Department",children:u.length>0?u.map(t=>e.jsx(r,{value:t,children:t},t)):e.jsx(r,{disabled:!0,children:"No departments available"})}),e.jsx(o.Select,{label:"Doctor Name",name:"doctorName",children:p.length>0?p.map(t=>e.jsx(r,{value:t.Name,children:t.Name},t._id)):e.jsx(r,{disabled:!0,children:"No doctors available in this department"})}),e.jsx(o.Text,{label:"Appointment Time",type:"time",name:"appointmentTime"}),e.jsx(o.Select,{label:"Appointment Date",name:"appointmentDate",children:D.map((t,a)=>e.jsx(r,{value:t,children:t},a))})]}),e.jsx(V,{alignItems:"flex-end",sx:{mt:3},children:e.jsx(H,{type:"submit",variant:"contained",loading:A,children:"Book Appointment"})})]})})}const O={title:`All Staff | Staff | Settings - ${z.appName}`};function W(){return e.jsxs(e.Fragment,{children:[e.jsx(_,{children:e.jsxs("title",{children:[" ",O.title]})}),e.jsx(K,{})]})}export{W as default};
