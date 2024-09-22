import{d as a,r as o,j as e}from"./index-CN6LEeTH.js";const d=a.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 5px;
`,m=a.div`
  text-align: center;
  font-size: 14px;
  padding: 5px 0;
  color: white;
`,x=({item:n})=>{const{name:s,"poster-image":c}=n,i="https://test.create.diagnal.com/images/placeholder_for_missing_posters.png",t=`https://test.create.diagnal.com/images/${c}`,[l,r]=o.useState(t);o.useEffect(()=>{r(t)},[t]);const p=()=>{r(i)};return e.jsxs("div",{children:[e.jsx(d,{src:l,alt:s,onError:p}),e.jsx(m,{children:s})]})};export{x as default};
