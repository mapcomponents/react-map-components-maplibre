import{j as e}from"./index-BpemSb3a.js";import{aE as d,b as u,B as m,S as h,P as b,p as k}from"./style-DWWhlVM-.js";import{m as T}from"./MapContextDecorator-BZWIR0DB.js";import{r as i}from"./iframe-j72i5ZUO.js";import"./index-C-CykIMM.js";import"./preload-helper-D9Z9MdNV.js";const _={title:"MapComponents/MlSketchTool",component:d,argTypes:{},decorators:T},w=()=>{const[n,o]=i.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(u,{buttons:e.jsx(e.Fragment,{children:e.jsx(m,{variant:n?"contained":"outlined",onClick:()=>o(!n),sx:{marginRight:{xs:"0px",sm:"10px"}},children:"Sketch Tool"})})}),e.jsx(h,{open:n,setOpen:o,name:"Sketch Tool",children:e.jsx(d,{onChange:c=>console.log(c)})})]})},C=()=>{const[n,o]=i.useState(!0),[c,g]=i.useState("Select a sketch tool."),[l,x]=i.useState(!0),S=(r,a)=>{if(r==="simple_select"&&a)return`Edit ${a.geometry.type}: Click the geometry to edit.`;switch(r){case"draw_point":return"Click to draw point.";case"draw_line_string":return"Click to add vertices. Double-click to finish drawing.";case"draw_polygon":return"Click to add vertices. Double-click to finish drawing.";default:return"Select a sketch tool."}};return e.jsxs(e.Fragment,{children:[e.jsx(u,{buttons:e.jsx(e.Fragment,{children:e.jsx(m,{variant:n?"contained":"outlined",onClick:()=>o(!n),sx:{marginRight:{xs:"0px",sm:"10px"}},children:"Sketch Tool"})})}),e.jsx(h,{open:n,setOpen:o,name:"Sketch Tool",children:e.jsx(d,{showInstruction:l,onShowInstructionChange:x,onChange:r=>{const{drawMode:a,selectedGeoJson:p}=r;g(S(a,p))}})}),l&&e.jsx(b,{sx:{position:"fixed",bottom:"25px",left:"50%",padding:"10px",zIndex:101},children:e.jsx(k,{children:c})})]})},t=w.bind({});t.parameters={};t.args={};const s=C.bind({});s.args={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return <>
            <TopToolbar buttons={<>
                        <Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)} sx={{
        marginRight: {
          xs: '0px',
          sm: '10px'
        }
      }}>
                            Sketch Tool
                        </Button>
                    </>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Sketch Tool'}>
                <MlSketchTool onChange={state => console.log(state)} />
            </Sidebar>
        </>;
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  // const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  // const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const [openSidebar, setOpenSidebar] = useState(true);
  const [instructionText, setInstructionText] = useState('Select a sketch tool.');
  const [showInstruction, setShowInstruction] = useState(true);
  const getInstructionText = (drawMode?: keyof MapboxDraw.Modes, selectedGeoJson?: Feature) => {
    if (drawMode === 'simple_select' && selectedGeoJson) {
      const geoType = selectedGeoJson.geometry.type;
      return \`Edit \${geoType}: Click the geometry to edit.\`;
    }
    switch (drawMode) {
      case 'draw_point':
        return 'Click to draw point.';
      case 'draw_line_string':
        return 'Click to add vertices. Double-click to finish drawing.';
      case 'draw_polygon':
        return 'Click to add vertices. Double-click to finish drawing.';
      default:
        return 'Select a sketch tool.';
    }
  };
  return <>
            <TopToolbar buttons={<>
                        <Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)} sx={{
        marginRight: {
          xs: '0px',
          sm: '10px'
        }
      }}>
                            Sketch Tool
                        </Button>
                    </>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Sketch Tool'}>
                <MlSketchTool showInstruction={showInstruction} onShowInstructionChange={setShowInstruction} onChange={state => {
        const {
          drawMode,
          selectedGeoJson
        } = state;
        setInstructionText(getInstructionText(drawMode, selectedGeoJson));
      }} />
            </Sidebar>

            {showInstruction && <Paper sx={{
      position: 'fixed',
      bottom: '25px',
      left: '50%',
      padding: '10px',
      zIndex: 101
    }}>
                    <Typography>
                        {/* {mediaIsMobile
                         ? 'Zum Beenden erneut auf denselben Punkt klicken.'
                         : 'Die Zeichnung kann beendet werden, indem erneut auf den zuletzt gezeichneten Punkt geklickt wird.'} */}
                        {instructionText}
                    </Typography>
                </Paper>}
        </>;
}`,...s.parameters?.docs?.source}}};const D=["ExampleConfig","CatalogueDemo"];export{s as CatalogueDemo,t as ExampleConfig,D as __namedExportsOrder,_ as default};
