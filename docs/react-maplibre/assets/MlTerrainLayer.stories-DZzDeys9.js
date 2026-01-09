import{j as e}from"./index-DtQ6Ei6g.js";import{r as o}from"./iframe-DNf3k_ah.js";import{aM as s,l as p,b as n,B as i}from"./style-18SAlq8x.js";import{m as c}from"./MapContextDecorator-BjqxFiZL.js";import"./index-B8Aem304.js";import"./preload-helper-D9Z9MdNV.js";const T={title:"MapComponents/MlTerrainLayer",component:s,argTypes:{},decorators:c},u=()=>{const[r,m]=o.useState(!0),a=p({mapId:"map_1"});return o.useEffect(()=>{a.map&&(a.map.map.setCenter([11.200688,47.427417]),a.map.map.setZoom(12),a.map.map.setPitch(60))},[a.map]),e.jsxs(e.Fragment,{children:[e.jsx(n,{unmovableButtons:e.jsx(e.Fragment,{children:e.jsx(i,{variant:r?"contained":"outlined",className:"terrainLayerButton",onClick:()=>m(!r),children:"Terrain Layer"})})}),r&&e.jsx(e.Fragment,{children:e.jsx(s,{sourceOptions:{tiles:["https://wms.wheregroup.com/dem_tileserver/raster_dem/{z}/{x}/{y}.webp"]}})})]})},t=u.bind({});t.parameters={};t.args={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  const [active, setActive] = useState<boolean>(true);
  const mapHook = useMap({
    mapId: 'map_1'
  });
  useEffect(() => {
    if (!mapHook.map) return;
    mapHook.map.map.setCenter([11.200688, 47.427417]);
    mapHook.map.map.setZoom(12);
    mapHook.map.map.setPitch(60);
  }, [mapHook.map]);
  return <>
            <TopToolbar unmovableButtons={<>
                        <Button variant={active ? 'contained' : 'outlined'} className="terrainLayerButton" onClick={() => setActive(!active)}>
                            Terrain Layer
                        </Button>
                    </>} />
            {active && <>
                    <MlTerrainLayer sourceOptions={{
        tiles: ['https://wms.wheregroup.com/dem_tileserver/raster_dem/{z}/{x}/{y}.webp']
      }} />
                </>}
        </>;
}`,...t.parameters?.docs?.source}}};const g=["ExampleConfig"];export{t as ExampleConfig,g as __namedExportsOrder,T as default};
