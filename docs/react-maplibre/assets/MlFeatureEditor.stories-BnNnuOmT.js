import{j as e}from"./index-BpemSb3a.js";import{r as m,R as w}from"./iframe-j72i5ZUO.js";import{n as h,u as v,o as D,b as j,p as C,B as k,q as T,s as l}from"./style-DWWhlVM-.js";import{m as S}from"./MapContextDecorator-BZWIR0DB.js";import"./index-C-CykIMM.js";import"./preload-helper-D9Z9MdNV.js";const A={title:"MapComponents/MlFeatureEditor",component:h,argTypes:{},decorators:S},L={EditPolygon:"Edit Polygon",EditPoint:"Edit Point",EditLinestring:"Edit Linestring",DrawPolygon:"Draw Polygon",DrawPoint:"Draw Point",DrawLinestring:"Draw Linestring"},t=p=>{const[r,x]=m.useState(!0);return m.useEffect(()=>{r||setTimeout(()=>{x(!0)},750)},[r]),e.jsxs(e.Fragment,{children:[r&&e.jsx(h,{...p,onChange:n=>{console.log(n)}}),";"]})},F=()=>{const p=v(E=>E.breakpoints.down("md")),[r,x]=m.useState(!0),[n,a]=m.useState("EditPolygon"),[f,P]=w.useState(null),b=!!f,y=E=>{P(E.currentTarget)},M=()=>{P(null)};return m.useEffect(()=>{r||setTimeout(()=>{x(!0)},750)},[r]),e.jsxs(e.Fragment,{children:[e.jsx(D,{sx:{position:"fixed",width:{xs:"100%",xl:"auto"},top:{xs:"62px",sm:"64px",xl:"22px"},right:{xs:"0px",xl:"415px"},paddingRight:{xs:"20px",xl:"0px"},color:"#009ee0",backgroundColor:"#fff",textAlign:"right",fontSize:"16px",fontFamily:"sans-serif",display:"flex",flexDirection:"column",gap:"5px",zIndex:5e3},children:p?"Zum Beenden erneut auf denselben Punkt klicken.":"Die Zeichnung kann beendet werden, indem erneut auf den zuletzt gezeichneten Punkt geklickt wird."}),e.jsx(j,{unmovableButtons:e.jsxs(e.Fragment,{children:[e.jsx(C,{variant:"h6",color:"ButtonText",marginRight:"20px",marginTop:"1px",children:L[n]}),e.jsx(k,{id:"basic-button",variant:"contained","aria-controls":b?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":b?"true":void 0,onClick:y,children:"Example Configs"}),e.jsxs(T,{id:"basic-menu",anchorEl:f,open:b,onClose:M,MenuListProps:{"aria-labelledby":"basic-button"},children:[e.jsx(l,{onClick:()=>a("EditPolygon"),children:"Edit Polygon"}),e.jsx(l,{onClick:()=>a("EditPoint"),children:"Edit Point"}),e.jsx(l,{onClick:()=>a("EditLinestring"),children:"Edit Linestring"}),e.jsx(l,{onClick:()=>a("DrawPolygon"),children:"Draw Polygon"}),e.jsx(l,{onClick:()=>a("DrawPoint"),children:"Draw Point"}),e.jsx(l,{onClick:()=>a("DrawLinestring"),children:"Draw Linestring"})]})]})}),n==="EditPolygon"&&e.jsx(t,{mode:o.args.mode,geojson:o.args.geojson}),n==="EditPoint"&&e.jsx(t,{mode:s.args.mode,geojson:s.args.geojson}),n==="EditLinestring"&&e.jsx(t,{mode:i.args.mode,geojson:i.args.geojson}),n==="DrawPolygon"&&e.jsx(t,{mode:d.args.mode}),n==="DrawPoint"&&e.jsx(t,{mode:u.args.mode}),n==="DrawLinestring"&&e.jsx(t,{mode:c.args.mode})]})},o=t.bind({});o.args={mode:"simple_select",geojson:{type:"Feature",properties:{},geometry:{coordinates:[[[7.0904979943736635,50.73948334574527],[7.087554458473562,50.73827346433987],[7.093562913197076,50.73723639825727],[7.096294028980594,50.7387727842636],[7.0904979943736635,50.73948334574527]]],type:"Polygon"}}};const s=t.bind({});s.args={mode:"simple_select",geojson:{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[7.0851268,50.73884]}}};const i=t.bind({});i.args={mode:"simple_select",geojson:{type:"Feature",properties:{},geometry:{coordinates:[[7.0904979943736635,50.73948334574527],[7.087554458473562,50.73827346433987],[7.093562913197076,50.73723639825727],[7.096294028980594,50.7387727842636]],type:"LineString"}}};const d=t.bind({});d.args={mode:"draw_polygon"};const u=t.bind({});u.args={mode:"draw_point"};const c=t.bind({});c.args={mode:"draw_line_string"};const g=F.bind({});g.parameters={};g.args={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`(args: useFeatureEditorProps) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisible(true);
      }, 750);
    }
  }, [visible]);
  return <>
            {visible && <MlFeatureEditor {...args} onChange={features => {
      console.log(features);
    }} />}
            ;
        </>;
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`(args: useFeatureEditorProps) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisible(true);
      }, 750);
    }
  }, [visible]);
  return <>
            {visible && <MlFeatureEditor {...args} onChange={features => {
      console.log(features);
    }} />}
            ;
        </>;
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`(args: useFeatureEditorProps) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisible(true);
      }, 750);
    }
  }, [visible]);
  return <>
            {visible && <MlFeatureEditor {...args} onChange={features => {
      console.log(features);
    }} />}
            ;
        </>;
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`(args: useFeatureEditorProps) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisible(true);
      }, 750);
    }
  }, [visible]);
  return <>
            {visible && <MlFeatureEditor {...args} onChange={features => {
      console.log(features);
    }} />}
            ;
        </>;
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`(args: useFeatureEditorProps) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisible(true);
      }, 750);
    }
  }, [visible]);
  return <>
            {visible && <MlFeatureEditor {...args} onChange={features => {
      console.log(features);
    }} />}
            ;
        </>;
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`(args: useFeatureEditorProps) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisible(true);
      }, 750);
    }
  }, [visible]);
  return <>
            {visible && <MlFeatureEditor {...args} onChange={features => {
      console.log(features);
    }} />}
            ;
        </>;
}`,...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [visible, setVisible] = useState(true);
  const [selectedMode, setSelectedMode] = useState<string>('EditPolygon');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisible(true);
      }, 750);
    }
  }, [visible]);
  return <>
            <Box sx={{
      position: 'fixed',
      width: {
        xs: '100%',
        xl: 'auto'
      },
      top: {
        xs: '62px',
        sm: '64px',
        xl: '22px'
      },
      right: {
        xs: '0px',
        xl: '415px'
      },
      paddingRight: {
        xs: '20px',
        xl: '0px'
      },
      color: '#009ee0',
      backgroundColor: '#fff',
      textAlign: 'right',
      fontSize: '16px',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      zIndex: 5000
    }}>
                {mediaIsMobile ? 'Zum Beenden erneut auf denselben Punkt klicken.' : 'Die Zeichnung kann beendet werden, indem erneut auf den zuletzt gezeichneten Punkt geklickt wird.'}
            </Box>
            <TopToolbar unmovableButtons={<>
                        <Typography variant="h6" color={'ButtonText'} marginRight={'20px'} marginTop={'1px'}>
                            {(configTitles as {
          [key: string]: any;
        })[selectedMode]}
                        </Typography>
                        <Button id="basic-button" variant="contained" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                            Example Configs
                        </Button>
                        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}>
                            <MenuItem onClick={() => setSelectedMode('EditPolygon')}>Edit Polygon</MenuItem>
                            <MenuItem onClick={() => setSelectedMode('EditPoint')}>Edit Point</MenuItem>
                            <MenuItem onClick={() => setSelectedMode('EditLinestring')}>Edit Linestring</MenuItem>
                            <MenuItem onClick={() => setSelectedMode('DrawPolygon')}>Draw Polygon</MenuItem>
                            <MenuItem onClick={() => setSelectedMode('DrawPoint')}>Draw Point</MenuItem>
                            <MenuItem onClick={() => setSelectedMode('DrawLinestring')}>Draw Linestring</MenuItem>
                        </Menu>
                    </>} />
            {selectedMode === 'EditPolygon' && <Template mode={EditPolygon.args.mode} geojson={EditPolygon.args.geojson} />}
            {selectedMode === 'EditPoint' && <Template mode={EditPoint.args.mode} geojson={EditPoint.args.geojson} />}
            {selectedMode === 'EditLinestring' && <Template mode={EditLinestring.args.mode} geojson={EditLinestring.args.geojson} />}
            {selectedMode === 'DrawPolygon' && <Template mode={DrawPolygon.args.mode} />}
            {selectedMode === 'DrawPoint' && <Template mode={DrawPoint.args.mode} />}
            {selectedMode === 'DrawLinestring' && <Template mode={DrawLinestring.args.mode} />}
        </>;
}`,...g.parameters?.docs?.source}}};const Z=["EditPolygon","EditPoint","EditLinestring","DrawPolygon","DrawPoint","DrawLinestring","CatalogueDemo"];export{g as CatalogueDemo,c as DrawLinestring,u as DrawPoint,d as DrawPolygon,i as EditLinestring,s as EditPoint,o as EditPolygon,Z as __namedExportsOrder,A as default};
