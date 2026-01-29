import{j as r}from"./index-D_jt9QYA.js";import{a3 as s,a4 as m}from"./style-BToUMRiZ.js";import{d as o}from"./MultiMapContextDecorator-DYnDEfu2.js";import"./iframe-B-5v0xel.js";import"./preload-helper-D9Z9MdNV.js";import"./index-lrHrizay.js";const y={title:"MapComponents/MlLayerMagnify",component:s,argTypes:{},decorators:o},i=e=>r.jsxs(r.Fragment,{children:[r.jsx(m,{url:"https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme",urlParameters:{layers:"nw_uraufnahme_rw"},sourceOptions:{type:"raster",minzoom:13,maxzoom:20},mapId:e.wmsLayerMapId}),r.jsx(s,{map1Id:"map_1",map2Id:"map_2",magnifierStyle:{border:"2px solid grey"},magnifierRadius:e.magnifierRadius})]}),a=i.bind({});a.parameters={};a.args={wmsLayerMapId:"map_2",magnifierRadius:200};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`(args: TemplateProps) => <>
        {/* WMS Layer with the provided URL and options */}
        <MlWmsLayer url="https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme" urlParameters={{
    layers: 'nw_uraufnahme_rw'
  }} sourceOptions={{
    type: 'raster',
    minzoom: 13,
    maxzoom: 20
  }} mapId={args.wmsLayerMapId} // Passing dynamic mapId
  />
        {/* Magnification layer with style and radius */}
        <MlLayerMagnify map1Id="map_1" map2Id="map_2" magnifierStyle={{
    border: '2px solid grey'
  }} magnifierRadius={args.magnifierRadius} />
    </>`,...a.parameters?.docs?.source}}};const g=["ExampleConfig"];export{a as ExampleConfig,g as __namedExportsOrder,y as default};
