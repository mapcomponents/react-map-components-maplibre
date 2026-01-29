import{j as o}from"./index-D_jt9QYA.js";import{r as m}from"./iframe-B-5v0xel.js";import{l,c as i}from"./style-BToUMRiZ.js";import{m as n}from"./MapContextDecorator-BM3FNXbA.js";import{s as p}from"./sample_2-BhnY8aTO.js";import"./index-lrHrizay.js";import"./preload-helper-D9Z9MdNV.js";function s(e){const t=l({mapId:e.mapId});return m.useEffect(()=>{if(!(!t.map||!e.layerId||!e.filter)&&t.map.map.getLayer(e.layerId)){const a=e.layerId;return t.map.map.setFilter(a,e.filter),()=>{t.map&&t.map.map.setFilter(a,null)}}},[e,t.map]),{}}const x={title:"hooks/useLayerFilter",component:s,argTypes:{},decorators:n},f=e=>(s({layerId:"filter_test",filter:["==","name",e.filter_name]}),o.jsx(i,{layerId:"filter_test",geojson:p})),r=f.bind({});r.parameters={};r.args={filter_name:"Mauspfad"};r.argTypes={filter_name:{options:["Mauspfad","Windeckstraße","Münsterplatz","Postrstraße","In der Sürst","Remiglustraße"],control:{type:"radio"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`(args: {
  filter_name: string;
}) => {
  useLayerFilter({
    layerId: 'filter_test',
    filter: ['==', 'name', args.filter_name]
  });
  return <MlGeoJsonLayer layerId="filter_test" geojson={sample as FeatureCollection} />;
}`,...r.parameters?.docs?.source}}};const E=["ExampleConfig"];export{r as ExampleConfig,E as __namedExportsOrder,x as default};
