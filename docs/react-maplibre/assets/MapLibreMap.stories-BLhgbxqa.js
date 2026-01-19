import{j as e}from"./index-BpemSb3a.js";import{r as l}from"./iframe-j72i5ZUO.js";import{g as m,M as c,T as g,a as p,b as u,B as y,c as d}from"./style-DWWhlVM-.js";import{s as x}from"./sample_1-oyv3COlS.js";import"./index-C-CykIMM.js";import"./preload-helper-D9Z9MdNV.js";const h=[(s,t)=>{const n=l.useMemo(()=>m(t?.globals?.theme),[t?.globals?.theme]);return e.jsx("div",{className:"fullscreen_map",children:e.jsx(c,{children:e.jsx(g,{theme:n,children:e.jsx(s,{})})})})}],L={title:"Core/MapLibreMap",component:p,argTypes:{options:{control:{type:"object"}}},decorators:h,parameters:{sourceLink:"components/MapLibreMap/MapLibreMap.tsx"}},M=s=>e.jsx(p,{options:{...s.options}}),r=M.bind({});r.args={options:{style:"https://wms.wheregroup.com/tileserver/style/osm-bright.json",center:[8.607,53.1409349],zoom:14}};const i=[{name:"OSM-Bright",url:"https://wms.wheregroup.com/tileserver/style/osm-bright.json"},{name:"OSM-Fiord-Color",url:"https://wms.wheregroup.com/tileserver/style/osm-fiord-color.json"}],j=s=>{const[t,n]=l.useState(i[1].url);return e.jsxs(e.Fragment,{children:[e.jsx(u,{buttons:e.jsx(e.Fragment,{children:i.map(a=>e.jsx(y,{variant:t===a.url?"contained":"outlined",onClick:()=>{n(a.url)},sx:{marginRight:"10px",marginTop:{xs:"10px",sm:"0px"}},children:a.name},a.name))})}),e.jsx(p,{options:{...s.options,style:t}}),e.jsx(d,{type:"line",geojson:x})]})},o=j.bind({});o.args={options:{zoom:14.5,center:[7.0851268,50.73884]}};o.parameters={};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`(args: MapLibreMapProps) => {
  return <MapLibreMap options={{
    ...args.options
  }} />;
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`(args: MapLibreMapProps) => {
  const [activeStyle, setActiveStyle] = useState(styles[1].url);
  return <>
            <TopToolbar buttons={<>
                        {styles.map(style => <Button key={style.name} variant={activeStyle === style.url ? 'contained' : 'outlined'} onClick={() => {
        setActiveStyle(style.url);
      }} sx={{
        marginRight: '10px',
        marginTop: {
          xs: '10px',
          sm: '0px'
        }
      }}>
                                {style.name}
                            </Button>)}
                    </>} />
            <MapLibreMap options={{
      ...args.options,
      style: activeStyle
    }} />
            <MlGeoJsonLayer type="line" geojson={sample_geojson_1 as FeatureCollection} />
        </>;
}`,...o.parameters?.docs?.source}}};const _=["ExampleConfig","StyleChangeConfig"];export{r as ExampleConfig,o as StyleChangeConfig,_ as __namedExportsOrder,L as default};
