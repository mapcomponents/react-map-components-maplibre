import{j as e}from"./index-BpemSb3a.js";import{r as a}from"./iframe-j72i5ZUO.js";import{aF as l,aG as D,l as h,b as S,B as n,a1 as M,S as k,a0 as C}from"./style-DWWhlVM-.js";import{M as O,a as B,b as v,D as P}from"./Metadata-CGBeUAsU.js";import{m as E}from"./MapContextDecorator-BZWIR0DB.js";import"./index-C-CykIMM.js";import"./preload-helper-D9Z9MdNV.js";import"./Instructions-DO4J1X8Z.js";const _={title:"MapComponents/MlSpatialElevationProfile",component:l,argTypes:{options:{control:{type:"object"}}},decorators:E},L=()=>{const[i,r]=a.useState(),u=D({data:i}),[d,m]=a.useState(!1),[g,x]=a.useState(!1),[b,f]=a.useState([]),o=h({mapId:"map_1"}),[p,c]=a.useState(!0),G=()=>{m(!d)},j=()=>{x(!0),setTimeout(()=>{x(!1)},9e3)};return a.useEffect(()=>{o.map&&o.map.map.getPitch()!=60&&o.map.map.setPitch(60)},[o.map]),e.jsxs(e.Fragment,{children:[e.jsx(O,{open:g}),e.jsx(S,{buttons:e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:p?"contained":"outlined",onClick:()=>c(!p),sx:{marginRight:{xs:"0px",sm:"10px"}},children:"Informations"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(M,{setData:r,buttonComponent:e.jsx(n,{variant:"contained",sx:{marginRight:{xs:"0px",sm:"10px"}},children:"Upload"})}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(n,{variant:"contained",onClick:G,sx:{marginRight:{xs:"0px",sm:"10px"}},children:"Demo Mode"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(n,{variant:"contained",onClick:j,sx:{display:"none"},children:"Guide me through"})]})}),e.jsx(B,{open:d,close:()=>m(!1),setGpx:r}),e.jsx(k,{open:p,setOpen:c,name:"GPX Informations",children:e.jsx(v,{metadata:b})}),e.jsx(P,{setData:s=>r(s)}),e.jsx(C,{gpxData:i,onParseGpxData:s=>f(s.metadata?s.metadata:[])}),e.jsx(l,{geojson:u.geojson})]})},t=L.bind({});t.parameters={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  const [gpxData, setGpxData] = useState<string | undefined>();
  const parsedGpx = useGpx({
    data: gpxData
  });
  const [demoLoaderOpen, setDemoLoaderOpen] = useState(false);
  const [guide, setGuide] = useState(false);
  const [metadata, setMetadata] = useState<MetadataType[]>([]);
  const mapHook = useMap({
    mapId: 'map_1'
  });
  const [openSidebar, setOpenSidebar] = useState(true);
  const handleClick1 = () => {
    setDemoLoaderOpen(!demoLoaderOpen);
  };
  const handleClick2 = () => {
    setGuide(true);
    setTimeout(() => {
      setGuide(false);
    }, 9000);
  };
  useEffect(() => {
    if (!mapHook.map) return;
    if (mapHook.map.map.getPitch() != 60) {
      mapHook.map.map.setPitch(60);
    }
  }, [mapHook.map]);
  return <>
            <MlGpxViewerInstructions open={guide} />
            <TopToolbar buttons={<>
                        <Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)} sx={{
        marginRight: {
          xs: '0px',
          sm: '10px'
        }
      }}>
                            Informations
                        </Button>
                        <br />
                        <br />
                        <UploadButton setData={setGpxData} buttonComponent={<Button variant="contained" sx={{
        marginRight: {
          xs: '0px',
          sm: '10px'
        }
      }}>
                                    Upload
                                </Button>} />
                        <br />
                        <br />
                        <Button variant="contained" onClick={handleClick1} sx={{
        marginRight: {
          xs: '0px',
          sm: '10px'
        }
      }}>
                            Demo Mode
                        </Button>
                        <br />
                        <br />
                        <Button variant="contained" onClick={handleClick2} sx={{
        display: 'none'
      }}>
                            Guide me through
                        </Button>
                    </>} />
            <MlGpxDemoLoader open={demoLoaderOpen} close={() => setDemoLoaderOpen(false)} setGpx={setGpxData} />

            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'GPX Informations'}>
                <Metadata metadata={metadata} />
            </Sidebar>
            <Dropzone setData={data => setGpxData(data)} />
            <MlGpxViewer gpxData={gpxData} onParseGpxData={parsedGpx => setMetadata(parsedGpx.metadata ? parsedGpx.metadata : [])} />
            <MlSpatialElevationProfile geojson={parsedGpx.geojson} />
        </>;
}`,...t.parameters?.docs?.source}}};const F=["ExampleConfig"];export{t as ExampleConfig,F as __namedExportsOrder,_ as default};
