import{j as e}from"./index-BpemSb3a.js";import{r as l}from"./iframe-j72i5ZUO.js";import{ax as r,b as m,u as c,o as x}from"./style-DWWhlVM-.js";import{m as d}from"./MapContextDecorator-BZWIR0DB.js";import"./index-C-CykIMM.js";import"./preload-helper-D9Z9MdNV.js";const w={title:"MapComponents/MlScaleReference",component:r,argTypes:{url:{},layer:{}},decorators:d},f=o=>e.jsx(m,{unmovableButtons:e.jsx(r,{...o})}),b=o=>{const[a,i]=l.useState(!0),u=c(p=>p.breakpoints.down("md"));return l.useEffect(()=>{const p=setTimeout(()=>{i(!1)},7e3);return()=>clearTimeout(p)},[]),e.jsxs(e.Fragment,{children:[a&&e.jsx(x,{sx:{position:"fixed",right:{xs:"105px",md:"175px"},color:"#009ee0",backgroundColor:"#fff",top:{xs:"20px",md:"22px"},fontSize:"16px",fontFamily:"sans-serif",display:"flex",flexDirection:"column",gap:"5px",zIndex:5e3},children:u?"Use Zoom to view functionality ➤":"Use Zoom to explore functionality ➤"}),e.jsx(m,{unmovableButtons:e.jsx(r,{...o})}),";"]})},T=o=>{const a=c(i=>i.breakpoints.down("md"));return e.jsx("div",{style:{position:"absolute",zIndex:1e3,bottom:a?"38px":"8px",left:"10px"},children:e.jsx(r,{...o})})},t=f.bind({});t.args={};const n=T.bind({});n.args={};const s=b.bind({});s.args={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`(props: MlScaleReferenceProps) => {
  return <TopToolbar unmovableButtons={<MlScaleReference {...props} />} />;
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`(props: MlScaleReferenceProps) => {
  const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  return <div style={{
    position: 'absolute',
    zIndex: 1000,
    bottom: mediaIsMobile ? '38px' : '8px',
    left: '10px'
  }}>
            <MlScaleReference {...props} />
        </div>;
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`(props: MlScaleReferenceProps) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);
  return <>
            {showTooltip && <Box sx={{
      position: 'fixed',
      right: {
        xs: '105px',
        md: '175px'
      },
      color: '#009ee0',
      backgroundColor: '#fff',
      top: {
        xs: '20px',
        md: '22px'
      },
      fontSize: '16px',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      zIndex: 5000
    }}>
                    {mediaIsMobile ? 'Use Zoom to view functionality ➤' : 'Use Zoom to explore functionality ➤'}
                </Box>}
            <TopToolbar unmovableButtons={<MlScaleReference {...props} />} />;
        </>;
}`,...s.parameters?.docs?.source}}};const j=["Toolbar","Overlay","CatalogueDemo"];export{s as CatalogueDemo,n as Overlay,t as Toolbar,j as __namedExportsOrder,w as default};
