import{j as e}from"./index-DtQ6Ei6g.js";import{r as o}from"./iframe-DNf3k_ah.js";import{b4 as l,b as d,B as b,S as L,ba as v,bb as s,c as i,bc as x,aQ as h,a4 as w}from"./style-18SAlq8x.js";import{s as C}from"./sample_polygon_1-C4T77cfz.js";import{d as G}from"./EmptyMapDecorator-CkWxBCn2.js";import"./index-B8Aem304.js";import"./preload-helper-D9Z9MdNV.js";const J="Feature",_={name:"path path path path path path path path"},T={type:"LineString",coordinates:[[7.1074676513671875,50.74340774029213],[7.0992279052734375,50.756441089372665],[7.079315185546874,50.764693667025014],[7.045669555664062,50.77945780529241],[7.030563354492187,50.79161300845443],[7.0291900634765625,50.80940599750376],[7.0236968994140625,50.820685846099174],[7.0085906982421875,50.825891011253546],[6.9879913330078125,50.826758482363275],[6.97906494140625,50.835432306955276],[6.9824981689453125,50.84583876895451],[6.9962310791015625,50.85147463352982],[7.012023925781249,50.85710981721644],[7.021636962890625,50.86664473085768],[7.0367431640625,50.872278081520406],[7.0477294921875,50.877044231111014],[7.052536010742187,50.88397594225127]]},g={type:J,properties:_,geometry:T},B="Feature",N={},F={type:"LineString",coordinates:[[7.0635223388671875,50.71385204707258],[7.06146240234375,50.709721458354075],[7.063865661621094,50.70298129536074],[7.064552307128906,50.69906720767511],[7.059059143066406,50.69428287906098],[7.05596923828125,50.68797551838366],[7.0580291748046875,50.680797145321655],[7.062835693359375,50.67514068397085],[7.060432434082031,50.6686131506577],[7.051849365234375,50.659255436656736],[7.044639587402344,50.6512019574539],[7.0484161376953125,50.64271166020676],[7.0566558837890625,50.63748609931014]]},f={type:B,properties:N,geometry:F},E="FeatureCollection",M=[{type:"Feature",geometry:{type:"Point",coordinates:[7.065242883489901,50.76377849881001]},properties:{name:"Point 1"}},{type:"Feature",geometry:{type:"Point",coordinates:[7.07706112344971,50.760233423956294]},properties:{name:"Point 2"}}],k={type:E,features:M},K={title:"UiComponents/LayerList",component:l,argTypes:{},decorators:G},I=()=>{const[t,a]=o.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(d,{unmovableButtons:e.jsx(b,{variant:t?"contained":"outlined",onClick:()=>a(!t),children:"Sidebar"})}),e.jsx(L,{open:t,setOpen:a,name:"Layers",children:e.jsx(l,{children:e.jsxs(v,{visible:!0,name:"GeoJSON Layers",children:[e.jsx(s,{layerComponent:e.jsx(i,{geojson:g}),visible:!0,configurable:!1,type:"layer",name:"GeoJSON Layer"},"GeoJSONLayer"),e.jsx(s,{layerComponent:e.jsx(i,{geojson:f}),visible:!0,configurable:!0,type:"layer",name:"GeoJSON Layer 2",description:"A visualization of a GeoJSON LineString"},"GeoJSONLayer2")]})})})]})},p=I.bind({});p.parameters={};p.args={};const P=()=>{const[t,a]=o.useState(!0),[r,n]=o.useState({layerId:"openmaptiles",sourceOptions:{type:"vector",tiles:["https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf"]},layers:[...x.layers]});return o.useEffect(()=>{console.log(r)},[r]),e.jsxs(e.Fragment,{children:[e.jsx(d,{unmovableButtons:e.jsx(b,{variant:t?"contained":"outlined",onClick:()=>a(!t),children:"Sidebar"})}),e.jsx(L,{open:t,setOpen:a,name:"Vector Tile Layer",children:e.jsx(l,{children:e.jsx(s,{layerComponent:e.jsx(h,{...r}),setLayerState:n,visible:!0,configurable:!1,type:"layer",name:"Vector style"})})})]})},y=P.bind({});y.parameters={};y.args={};const V=()=>{const[t,a]=o.useState(!0),[r,n]=o.useState({layerId:"openmaptiles",sourceOptions:{type:"vector",tiles:["https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf"]},layers:[...x.layers]});return o.useEffect(()=>{console.log(r)},[r]),e.jsxs(e.Fragment,{children:[e.jsx(d,{unmovableButtons:e.jsx(b,{variant:t?"contained":"outlined",onClick:()=>a(!t),children:"Sidebar"})}),e.jsx(L,{open:t,setOpen:a,name:"Layer List",children:e.jsx(l,{children:e.jsx(s,{layerComponent:e.jsx(w,{url:"https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme",urlParameters:{layers:"nw_uraufnahme_rw"}}),setLayerState:n,visible:!0,configurable:!1,type:"layer",name:"WMS Layer"})})})]})},u=V.bind({});u.parameters={};u.args={};const z=()=>{const[t,a]=o.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(d,{unmovableButtons:e.jsx(b,{variant:t?"contained":"outlined",onClick:()=>a(!t),children:"Sidebar"})}),e.jsx(L,{open:t,setOpen:a,name:"Layers",children:e.jsxs(l,{children:[e.jsx(s,{layerComponent:e.jsx(i,{geojson:k}),visible:!0,configurable:!0,type:"layer",name:"Point GeoJSON Layer"}),e.jsx(s,{layerComponent:e.jsx(i,{geojson:g}),visible:!0,configurable:!0,type:"layer",name:"Line GeoJSON Layer"}),e.jsx(s,{layerComponent:e.jsx(i,{geojson:C}),visible:!0,configurable:!0,type:"layer",name:"Polygon GeoJSON Layer"})]})})]})},c=z.bind({});c.parameters={};c.args={};const W=()=>{const[t,a]=o.useState({geojson:g}),[r,n]=o.useState({geojson:f}),[O,j]=o.useState(!0);return o.useEffect(()=>{console.log(t,r)},[t,r]),e.jsxs(e.Fragment,{children:[e.jsx(d,{unmovableButtons:e.jsx(b,{variant:O?"contained":"outlined",onClick:()=>j(!O),children:"Sidebar"})}),e.jsx(L,{open:O,setOpen:j,name:"Layers",children:e.jsxs(l,{children:[e.jsx(s,{layerComponent:e.jsx(i,{...t}),setLayerState:a,visible:!0,configurable:!0,type:"layer",name:"GeoJSON Layer"}),e.jsx(s,{layerComponent:e.jsx(i,{...r}),setLayerState:n,visible:!0,configurable:!0,type:"layer",name:"configurable GeoJSON Layer",description:"A visualization of a GeoJSON LineString"})]})})]})},m=W.bind({});m.parameters={};m.args={};const A=()=>{const[t,a]=o.useState({geojson:g,type:"symbol",options:{layout:{"symbol-placement":"line","text-field":"{name}","text-justify":"auto","text-font":["Open Sans Regular"]},paint:{"text-color":"white"}}}),[r,n]=o.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(d,{unmovableButtons:e.jsx(b,{variant:r?"contained":"outlined",onClick:()=>n(!r),children:"Sidebar"})}),e.jsx(L,{open:r,setOpen:n,name:"Layers",children:e.jsx(l,{children:e.jsx(s,{layerComponent:e.jsx(i,{...t}),setLayerState:a,visible:!0,configurable:!0,type:"layer",name:"GeoJSON Layer"})})})]})},S=A.bind({});S.parameters={};S.args={};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return <>
            <TopToolbar unmovableButtons={<Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)}>
                        Sidebar
                    </Button>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
                <LayerList>
                    <LayerListFolder visible={true} name={'GeoJSON Layers'}>
                        <LayerListItem layerComponent={<MlGeoJsonLayer geojson={sample_geojson_1 as Feature} />} visible={true} configurable={false} type="layer" name="GeoJSON Layer" key="GeoJSONLayer" />
                        <LayerListItem layerComponent={<MlGeoJsonLayer geojson={sample_geojson_2 as Feature} />} visible={true} configurable={true} type="layer" name="GeoJSON Layer 2" description="A visualization of a GeoJSON LineString" key="GeoJSONLayer2" />
                    </LayerListFolder>
                </LayerList>
            </Sidebar>
        </>;
}`,...p.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [layerState, setLayerState] = useState({
    layerId: 'openmaptiles',
    sourceOptions: {
      type: 'vector' as const,
      tiles: ['https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf']
    },
    layers: [...style.layers] as LayerSpecification[]
  });
  useEffect(() => {
    console.log(layerState);
  }, [layerState]);
  return <>
            <TopToolbar unmovableButtons={<Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)}>
                        Sidebar
                    </Button>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Vector Tile Layer'}>
                <LayerList>
                    <LayerListItem layerComponent={<MlVectorTileLayer {...layerState} />} setLayerState={setLayerState} visible={true} configurable={false} type="layer" name="Vector style" />
                </LayerList>
            </Sidebar>
        </>;
}`,...y.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [layerState, setLayerState] = useState({
    layerId: 'openmaptiles',
    sourceOptions: {
      type: 'vector' as const,
      tiles: ['https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf']
    },
    layers: [...style.layers] as LayerSpecification[]
  });
  useEffect(() => {
    console.log(layerState);
  }, [layerState]);
  return <>
            <TopToolbar unmovableButtons={<Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)}>
                        Sidebar
                    </Button>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layer List'}>
                <LayerList>
                    <LayerListItem layerComponent={<MlWmsLayer url="https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme" urlParameters={{
          layers: 'nw_uraufnahme_rw'
        }} />} setLayerState={setLayerState} visible={true} configurable={false} type="layer" name="WMS Layer" />
                </LayerList>
            </Sidebar>
        </>;
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return <>
            <TopToolbar unmovableButtons={<Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)}>
                        Sidebar
                    </Button>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
                <LayerList>
                    <LayerListItem layerComponent={<MlGeoJsonLayer geojson={sample_geojson_points as FeatureCollection} />} visible={true} configurable={true} type="layer" name="Point GeoJSON Layer" />
                    <LayerListItem layerComponent={<MlGeoJsonLayer geojson={sample_geojson_1 as Feature} />} visible={true} configurable={true} type="layer" name="Line GeoJSON Layer" />
                    <LayerListItem layerComponent={<MlGeoJsonLayer geojson={sample_geojson_polygon as FeatureCollection} />} visible={true} configurable={true} type="layer" name="Polygon GeoJSON Layer" />
                </LayerList>
            </Sidebar>
        </>;
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const [layerOneState, setLayerOneState] = useState({
    geojson: sample_geojson_1 as Feature
  });
  const [layerTwoState, setLayerTwoState] = useState({
    geojson: sample_geojson_2 as Feature
  });
  const [openSidebar, setOpenSidebar] = useState(true);
  useEffect(() => {
    console.log(layerOneState, layerTwoState);
  }, [layerOneState, layerTwoState]);
  return <>
            <TopToolbar unmovableButtons={<Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)}>
                        Sidebar
                    </Button>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
                <LayerList>
                    <LayerListItem layerComponent={<MlGeoJsonLayer {...layerOneState} />} setLayerState={setLayerOneState} visible={true} configurable={true} type="layer" name="GeoJSON Layer" />
                    <LayerListItem layerComponent={<MlGeoJsonLayer {...layerTwoState} />} setLayerState={setLayerTwoState} visible={true} configurable={true} type="layer" name="configurable GeoJSON Layer" description="A visualization of a GeoJSON LineString" />
                </LayerList>
            </Sidebar>
        </>;
}`,...m.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const [layerOneState, setLayerOneState] = useState({
    geojson: sample_geojson_1 as Feature,
    type: 'symbol' as const,
    options: {
      layout: {
        'symbol-placement': 'line',
        'text-field': '{name}',
        'text-justify': 'auto',
        'text-font': ['Open Sans Regular']
      },
      paint: {
        'text-color': 'white'
      }
    }
  });
  const [openSidebar, setOpenSidebar] = useState(true);
  return <>
            <TopToolbar unmovableButtons={<Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)}>
                        Sidebar
                    </Button>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
                <LayerList>
                    <LayerListItem layerComponent={<MlGeoJsonLayer {...layerOneState as MlGeoJsonLayerProps} />} setLayerState={setLayerOneState} visible={true} configurable={true} type="layer" name="GeoJSON Layer" />
                </LayerList>
            </Sidebar>
        </>;
}`,...S.parameters?.docs?.source}}};const X=["FolderExample","VectortileExample","WmsLayerExample","GeoJsonLayerExample","ConfigurableExample","LabelExample"];export{m as ConfigurableExample,p as FolderExample,c as GeoJsonLayerExample,S as LabelExample,y as VectortileExample,u as WmsLayerExample,X as __namedExportsOrder,K as default};
