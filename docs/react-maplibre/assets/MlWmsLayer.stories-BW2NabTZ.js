import{j as e}from"./index-D_jt9QYA.js";import{r as n}from"./iframe-B-5v0xel.js";import{a4 as t,b as m,B as l}from"./style-BToUMRiZ.js";import{m as u}from"./MapContextDecorator-BM3FNXbA.js";import"./index-lrHrizay.js";import"./preload-helper-D9Z9MdNV.js";const g={title:"MapComponents/MlWmsLayer",component:t,argTypes:{url:{},layer:{}},decorators:u},i=(p,o)=>{const[a,s]=n.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(m,{unmovableButtons:e.jsx(l,{color:"primary",variant:a?"contained":"outlined",onClick:()=>s(!a),children:"WMS"})}),e.jsx(t,{visible:a,url:o.args.url,urlParameters:o.args.urlParameters})," "]})},r=i.bind({});r.parameters={};r.args={url:"https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme",urlParameters:{layers:"nw_uraufnahme_rw"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`(Story: any, context: any) => {
  const [showLayer, setShowLayer] = useState(true);
  return <>
            <TopToolbar unmovableButtons={<Button color="primary" variant={showLayer ? 'contained' : 'outlined'} onClick={() => setShowLayer(!showLayer)}>
                        WMS
                    </Button>} />
            <MlWmsLayer visible={showLayer} url={context.args.url} urlParameters={context.args.urlParameters} />{' '}
        </>;
}`,...r.parameters?.docs?.source}}};const L=["ExampleConfig"];export{r as ExampleConfig,L as __namedExportsOrder,g as default};
