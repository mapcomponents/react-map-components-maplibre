import{j as r}from"./index-D_jt9QYA.js";import{aO as i,aP as l,l as u,ab as S,b as x,B as g}from"./style-BToUMRiZ.js";import{r as p}from"./iframe-B-5v0xel.js";import{M as I}from"./MlGeojsonLayerWithSource-DvfYD7lM.js";import{d as v}from"./MapContextDecoratorHooks-BSLuojF7.js";import"./index-lrHrizay.js";import"./preload-helper-D9Z9MdNV.js";const b="Feature",h={type:"Point",coordinates:[7.0851268,50.73884],properties:{title:"Bonn"}},j={type:b,geometry:h},k="https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf",O={title:"Hooks/useSource",component:i,argTypes:{},decorators:v},w=o=>{const{source:e}=i({...o});return l({mapId:o.mapId,layerId:"layer1",options:{source:e?.id?e.id:"",type:"circle",paint:{"circle-radius":6,"circle-color":"red"}}}),l({mapId:o.mapId,layerId:"layer2",options:{source:e?.id?e.id:"",type:"circle",paint:{"circle-radius":4,"circle-color":"green"}}}),r.jsx(r.Fragment,{})},E=o=>{i({...o});const e=u({mapId:o.mapId});return p.useEffect(()=>{e.map&&(e.map.addLayer({id:"vector-lineLayer",type:"line",source:o.sourceId,minzoom:0,maxzoom:22,"source-layer":"landuse",layout:{"line-cap":"round","line-join":"round"},paint:{"line-width":2,"line-color":"#ff0000"}}),e.map.addLayer({id:"vector-FillLayer",type:"fill",source:o.sourceId,minzoom:0,maxzoom:22,"source-layer":"landuse",paint:{"fill-color":"#32a850","fill-opacity":.4}}))},[e.map]),r.jsx(r.Fragment,{})},H=o=>{i({...o});const e=u({mapId:o.mapId});return p.useEffect(()=>{e.map&&e.map.addLayer({id:"raster-wms",type:"raster",source:o.sourceId,minzoom:0,maxzoom:22})},[e.map]),r.jsx(r.Fragment,{})},L=o=>{const[e,d]=p.useState(!0),[m,y]=p.useState([]),a=u({mapId:o.mapId}),f=S({mapId:o.mapId,watch:{viewport:!1,layers:!0,sources:!0},filter:{includeBaseLayers:!1}});return p.useEffect(()=>{a.map&&a.map.map.on("sourcedata",()=>{a?.map?.map?.style.sourceCaches&&y(Object.keys(a?.map?.map?.style.sourceCaches))})},[a.map]),r.jsxs(r.Fragment,{children:[r.jsx(x,{buttons:r.jsx(g,{color:"primary",variant:e?"contained":"outlined",onClick:()=>d(!e),children:"Ml GeoJsonLayer With Source JSX Active?"})}),e&&r.jsx(I,{}),r.jsx("div",{style:{position:"fixed",zIndex:1290,display:"flex",flexWrap:"wrap",top:"62px",left:0,right:0,bottom:0,maxHeight:"100VH",backgroundColor:"rgba(80,80,80,.8)",padding:"50px",fontSize:"20px",color:"#51ff09",overflow:"hidden",pointerEvents:"none"},children:m?.length>0&&r.jsxs("div",{children:["Active sources: ",r.jsx("br",{})," ",JSON.stringify(m,null,"  "),r.jsx("br",{})," ",r.jsx("br",{})," Active layers : ",r.jsx("pre",{children:JSON.stringify(f,null,"  ")})]})})]})},s=w.bind({});s.args={mapId:"map_1",sourceId:"geojson-source",source:{type:"geojson",data:j}};const t=E.bind({});t.args={mapId:"map_1",sourceId:"vector-source",source:{type:"vector",tiles:[k],tilesize:512,attribution:""}};const n=H.bind({});n.args={mapId:"map_1",sourceId:"raster-source",source:{type:"raster",tiles:["https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&styles=&layers=nw_uraufnahme_rw"],tilesize:256,attribution:""}};const c=L.bind({});c.args={mapId:"map_1"};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`(args: any) => {
  const {
    source
  } = useSource({
    ...args
  });
  useLayer({
    mapId: args.mapId,
    layerId: 'layer1',
    options: {
      source: source?.id ? source.id : '',
      type: 'circle',
      paint: {
        'circle-radius': 6,
        'circle-color': 'red'
      }
    }
  });
  useLayer({
    mapId: args.mapId,
    layerId: 'layer2',
    options: {
      source: source?.id ? source.id : '',
      type: 'circle',
      paint: {
        'circle-radius': 4,
        'circle-color': 'green'
      }
    }
  });
  return <></>;
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`(args: any) => {
  useSource({
    ...args
  });
  const mapHook = useMap({
    mapId: args.mapId
  });
  useEffect(() => {
    if (!mapHook.map) return;
    mapHook.map.addLayer({
      id: 'vector-lineLayer',
      type: 'line',
      source: args.sourceId,
      minzoom: 0,
      maxzoom: 22,
      'source-layer': 'landuse',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-width': 2,
        'line-color': '#ff0000'
      }
    });
    mapHook.map.addLayer({
      id: 'vector-FillLayer',
      type: 'fill',
      source: args.sourceId,
      minzoom: 0,
      maxzoom: 22,
      'source-layer': 'landuse',
      paint: {
        'fill-color': '#32a850',
        'fill-opacity': 0.4
      }
    });
  }, [mapHook.map]);
  return <></>;
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`(args: any) => {
  useSource({
    ...args
  });
  const mapHook = useMap({
    mapId: args.mapId
  });
  useEffect(() => {
    if (!mapHook.map) return;
    mapHook.map.addLayer({
      id: 'raster-wms',
      type: 'raster',
      source: args.sourceId,
      minzoom: 0,
      maxzoom: 22
    });
  }, [mapHook.map]);
  return <></>;
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`(args: any) => {
  const [sourceStatus, setSourceStatus] = useState(true);
  const [activeSources, setActiveSources] = useState<string[]>([]);
  const mapHook = useMap({
    mapId: args.mapId
  });
  const mapState = useMapState({
    mapId: args.mapId,
    watch: {
      viewport: false,
      layers: true,
      sources: true
    },
    filter: {
      includeBaseLayers: false
    }
  });
  useEffect(() => {
    if (!mapHook.map) {
      return;
    }
    mapHook.map.map.on('sourcedata', () => {
      if (mapHook?.map?.map?.style.sourceCaches) {
        setActiveSources(Object.keys(mapHook?.map?.map?.style.sourceCaches));
      }
    });
  }, [mapHook.map]);
  return <>
            <TopToolbar buttons={<Button color="primary" variant={sourceStatus ? 'contained' : 'outlined'} onClick={() => setSourceStatus(!sourceStatus)}>
                        Ml GeoJsonLayer With Source JSX Active?
                    </Button>} />
            {sourceStatus && <MlGeojsonLayerWithSource></MlGeojsonLayerWithSource>}
            <div style={{
      position: 'fixed',
      zIndex: 1290,
      display: 'flex',
      flexWrap: 'wrap',
      top: '62px',
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: '100VH',
      backgroundColor: 'rgba(80,80,80,.8)',
      padding: '50px',
      fontSize: '20px',
      color: '#51ff09',
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
                {activeSources?.length > 0 && <div>
                        Active sources: <br></br> {JSON.stringify(activeSources, null, '  ')}
                        <br></br> <br></br> Active layers : {}
                        <pre>{JSON.stringify(mapState, null, '  ')}</pre>
                    </div>}
            </div>
        </>;
}`,...c.parameters?.docs?.source}}};const W=["UseGeojsonSourceExample","UseVectorSourceExample","UseRasterSourceExample","RemoveSourceExample"];export{c as RemoveSourceExample,s as UseGeojsonSourceExample,n as UseRasterSourceExample,t as UseVectorSourceExample,W as __namedExportsOrder,O as default};
