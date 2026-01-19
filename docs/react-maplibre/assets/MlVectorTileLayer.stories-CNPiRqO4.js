import{j as r}from"./index-BpemSb3a.js";import{r as l}from"./iframe-j72i5ZUO.js";import{aQ as t,b as i,B as n}from"./style-DWWhlVM-.js";import{m as p}from"./MapContextDecorator-BZWIR0DB.js";import"./index-C-CykIMM.js";import"./preload-helper-D9Z9MdNV.js";const L={title:"MapComponents/MlVectorTileLayer",component:t,argTypes:{url:{},layer:{}},decorators:p},m=a=>{const[o,s]=l.useState(!0);return r.jsxs(r.Fragment,{children:[r.jsx(i,{unmovableButtons:r.jsx(n,{color:"primary",variant:o?"contained":"outlined",onClick:()=>s(!o),children:"Vector Tile Layer"})}),o?r.jsx(t,{...a}):""]})},e=m.bind({});e.parameters={};e.args={mapId:"map_1",url:"https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf",layers:[{id:"water-vector-tile",type:"fill","source-layer":"water",layout:{},paint:{"fill-color":"#0905f5","fill-opacity":.5},maxzoom:20},{id:"buildings",type:"fill","source-layer":"building",layout:{},paint:{"fill-color":"#717875"},maxzoom:20}],sourceOptions:{minzoom:0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`(args: MlVectorTileLayerProps) => {
  const [showLayer, setShowLayer] = useState(true);
  return <>
            <TopToolbar unmovableButtons={<Button color="primary" variant={showLayer ? 'contained' : 'outlined'} onClick={() => setShowLayer(!showLayer)}>
                        Vector Tile Layer
                    </Button>} />
            {showLayer ? <MlVectorTileLayer {...args} /> : ''}
        </>;
}`,...e.parameters?.docs?.source}}};const h=["ExampleConfig"];export{e as ExampleConfig,h as __namedExportsOrder,L as default};
