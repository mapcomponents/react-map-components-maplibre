import{j as e}from"./index-DtQ6Ei6g.js";import{r as t}from"./iframe-DNf3k_ah.js";import{a0 as u,b as G,B as s,a1 as g,S as j}from"./style-18SAlq8x.js";import{m as h}from"./MapContextDecorator-BjqxFiZL.js";import{M as O,a as M,b as C,D as L}from"./Metadata-B-Tovspx.js";import"./index-B8Aem304.js";import"./preload-helper-D9Z9MdNV.js";import"./Instructions-DnqDZWRQ.js";const P={title:"MapComponents/MlGpxViewer",component:u,argTypes:{options:{control:{type:"object"}}},decorators:h},m={marginRight:{xs:"0px",sm:"10px"},width:"140px"},B=()=>{const[x,r]=t.useState(),[d,l]=t.useState(!1),[b,c]=t.useState(!1),[i,f]=t.useState([]),[p,o]=t.useState(!1),S=()=>{l(!d)},D=()=>{c(!0),setTimeout(()=>{c(!1)},9e3)};return t.useEffect(()=>{i.length===0?o(!1):o(!0)},[i]),e.jsxs(e.Fragment,{children:[e.jsx(O,{open:b}),e.jsx(M,{open:d,close:()=>l(!1),setGpx:r}),e.jsx(G,{buttons:e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:p?"contained":"outlined",onClick:()=>o(!p),sx:m,children:"Informations"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(g,{setData:r,buttonComponent:e.jsx(s,{variant:"contained",sx:m,children:"Upload"}),accept:".gpx"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(s,{variant:d?"contained":"outlined",onClick:S,sx:m,children:"Demo Mode"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(s,{variant:"contained",onClick:D,sx:{display:"none"},children:"Guide me through"})]})}),e.jsx(j,{open:p,setOpen:o,name:"GPX Informations",children:e.jsx(C,{metadata:i})}),e.jsx(L,{setData:n=>r(n)}),e.jsx(u,{gpxData:x,onParseGpxData:n=>f(n.metadata?n.metadata:[])})]})},a=B.bind({});a.parameters={};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  const [gpxData, setGpxData] = useState<string | ArrayBuffer | undefined>();
  const [demoLoaderOpen, setDemoLoaderOpen] = useState(false);
  const [guide, setGuide] = useState(false);
  const [metadata, setMetadata] = useState<MetadataType[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const demoLoader = () => {
    setDemoLoaderOpen(!demoLoaderOpen);
  };
  const handleClick2 = () => {
    setGuide(true);
    setTimeout(() => {
      setGuide(false);
    }, 9000);
  };
  useEffect(() => {
    if (metadata.length === 0) {
      setOpenSidebar(false);
    } else {
      setOpenSidebar(true);
    }
  }, [metadata]);
  return <>
            <MlGpxViewerInstructions open={guide} />
            <MlGpxDemoLoader open={demoLoaderOpen} close={() => setDemoLoaderOpen(false)} setGpx={setGpxData} />
            <TopToolbar buttons={<>
                        <Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)} sx={buttonStyle}>
                            Informations
                        </Button>
                        <br />
                        <br />
                        <UploadButton setData={setGpxData} buttonComponent={<Button variant="contained" sx={buttonStyle}>
                                    Upload
                                </Button>} accept=".gpx" />
                        <br />
                        <br />
                        <Button variant={demoLoaderOpen ? 'contained' : 'outlined'} onClick={demoLoader} sx={buttonStyle}>
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
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'GPX Informations'}>
                <Metadata metadata={metadata} />
            </Sidebar>
            <Dropzone setData={data => setGpxData(data)} />
            <MlGpxViewer gpxData={gpxData as string | undefined} onParseGpxData={parsedGpx => setMetadata(parsedGpx.metadata ? parsedGpx.metadata : [])} />
        </>;
}`,...a.parameters?.docs?.source}}};const U=["ExampleConfig"];export{a as ExampleConfig,U as __namedExportsOrder,P as default};
