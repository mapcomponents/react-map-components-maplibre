import{j as e}from"./index-BpemSb3a.js";import{r as t}from"./iframe-j72i5ZUO.js";import{aW as a,l as s,c as m}from"./style-DWWhlVM-.js";import{d as p}from"./LowZoomDecorator-DCXz2Wx-.js";import{w as i}from"./wg_locations-B60eotrt.js";import"./index-C-CykIMM.js";import"./preload-helper-D9Z9MdNV.js";const c=""+new URL("marker-CmU96LOu.png",import.meta.url).href,L={title:"hooks/useAddImage",component:a,argTypes:{},decorators:p},g=n=>{const r=s({mapId:void 0});return a({imageId:"wgLogo",imagePath:c}),t.useEffect(()=>{r.map?.flyTo({center:[10.251805123900311,51.11826171422632],zoom:5})},[r.map]),e.jsx(e.Fragment,{children:e.jsx(m,{layout:{"icon-image":"wgLogo","icon-size":{property:"Mitarbeitende",stops:[[3,.02],[26,.15]]},"icon-anchor":"bottom"},...n})})},o=g.bind({});o.parameters={};o.args={geojson:i,type:"symbol"};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`(props: MlGeoJsonLayerProps) => {
  const mapHook = useMap({
    mapId: undefined
  });
  useAddImage({
    imageId: 'wgLogo',
    imagePath: wg_marker
  });
  useEffect(() => {
    mapHook.map?.flyTo({
      center: [10.251805123900311, 51.11826171422632],
      zoom: 5
    });
  }, [mapHook.map]);
  return <>
            <MlGeoJsonLayer layout={{
      'icon-image': 'wgLogo',
      'icon-size': {
        property: 'Mitarbeitende',
        stops: [[3, 0.02], [26, 0.15]]
      } as DataDrivenPropertyValueSpecification<number>,
      'icon-anchor': 'bottom'
    }} {...props} />
        </>;
}`,...o.parameters?.docs?.source}}};const k=["ExampleConfig"];export{o as ExampleConfig,k as __namedExportsOrder,L as default};
