import{j as e}from"./index-D_jt9QYA.js";import{r as a}from"./iframe-B-5v0xel.js";import{k as B,af as f,S as j,R as T,s as h,o as i,p as x,b as q,B as P,ag as _,Q as I,ah as $,ai as y,aj as O,U as G,ak as Q,al as J,P as N}from"./style-BToUMRiZ.js";import{m as W}from"./MapContextDecorator-BM3FNXbA.js";import"./index-lrHrizay.js";import"./preload-helper-D9Z9MdNV.js";const X=B(e.jsx("path",{d:"M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2z"})),Y=B(e.jsx("path",{d:"m17.66 17.66-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L9.7 9.7l-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L4 4v14c0 1.1.9 2 2 2h14zM7 17v-5.76L12.76 17z"})),ue={title:"MapComponents/MlMeasureTool",component:f,argTypes:{},decorators:W},Z=()=>{const[t,r]=a.useState(!0),[l,n]=a.useState("meters"),u=o=>{n(o.target.value)};return e.jsx(e.Fragment,{children:e.jsxs(j,{open:t,setOpen:r,name:"Measure Tool",children:[e.jsxs(T,{name:"units",onChange:u,label:"Unit for measurement",defaultValue:"kilometers",children:[e.jsx(h,{value:"kilometers",children:"Kilometers"}),e.jsx(h,{value:"miles",children:"Miles"})]}),e.jsxs(i,{style:{fontFamily:"sans-serif",marginTop:"20px"},children:[e.jsx(Y,{sx:{float:"left",marginTop:"4px",marginRight:"5px"}}),e.jsx(x,{variant:"h5",children:"Measure Polygon"})]}),e.jsxs(i,{style:{fontFamily:"sans-serif",marginTop:"20px"},children:["Area: ",e.jsx(f,{measureType:"polygon",unit:l})]})]})})},ee=({openSidebar:t,setOpenSidebar:r})=>{const l=_(),[n,u]=a.useState("measure-distance"),[o,S]=a.useState("meters"),[U,M]=a.useState(0),[b,v]=a.useState(!0),[L,d]=a.useState(!1),[C,g]=a.useState(!1),[R,k]=a.useState(!1),V=["meters","millimeters","centimeters","kilometers","acres","miles","nauticalmiles","inches","yards","feet","hectares"],w=s=>{const F=s.target.value;u(F),F==="measure-distance"&&(o==="acres"||o==="hectares")&&S("meters"),d(!1),g(!1)},z=s=>{S(s.target.value)},A=()=>{M(s=>s+1),d(!1),g(!1)},D=s=>{v(s.target.checked)};a.useEffect(()=>{t&&(v(!0),d(!1),g(!1)),u("measure-distance"),S("meters"),M(t?s=>s+1:0)},[t]);const E=s=>{d(!0),s.geojson.geometry.coordinates[0].length==2&&n=="measure-area"?k(!0):k(!1)},K=()=>{d(!1),g(!0)},H=()=>L?R?"Click to add node.":"Click to add node. Double click to complete drawing.":"Click on the map to start.";return e.jsxs(e.Fragment,{children:[e.jsxs(j,{open:t,setOpen:r,name:"Measure Tool",children:[e.jsx(i,{style:{fontFamily:"sans-serif",marginTop:"20px"},children:e.jsxs(I,{children:[e.jsxs($,{name:"measure-type-select",value:n,onChange:w,children:[e.jsx(y,{value:"measure-distance",control:e.jsx(O,{}),label:"Measure distance"}),e.jsx(y,{value:"measure-area",control:e.jsx(O,{}),label:"Measure area"})]}),e.jsx(y,{control:e.jsx(G,{checked:b,onChange:D}),label:"Show instructions"})]})}),e.jsx(i,{sx:{fontFamily:"sans-serif",marginTop:"20px"},children:e.jsxs(I,{sx:{m:1,width:300},children:[e.jsx(Q,{children:"Unit"}),e.jsx(T,{value:o,onChange:z,input:e.jsx(J,{label:"Unit"}),MenuProps:{PaperProps:{style:{maxHeight:48*4.5+8,width:250}}},children:V.map(s=>e.jsx(h,{value:s,disabled:(s==="hectares"||s==="acres")&&n==="measure-distance",children:s},s))})]})}),e.jsxs(i,{style:{fontFamily:"sans-serif",marginTop:"20px"},sx:{height:120,bgcolor:l.palette.mode==="dark"?"#444246":"#f6f6f6",padding:"10px"},children:[e.jsx(x,{children:e.jsx("b",{children:n==="measure-distance"?"Distance":"Area"})}),e.jsx(x,{variant:"h6",children:e.jsx(f,{measureType:n==="measure-distance"?"line":"polygon",unit:o,onFinish:K,onChange:E},`${n}-${U}`)})]}),C&&e.jsx(i,{sx:{display:"flex",justifyContent:"flex-end",marginTop:"10px"},children:e.jsx(P,{size:"small",variant:"contained",onClick:A,children:"Restart"})})]}),t&&b&&!C&&e.jsx(N,{sx:{position:"fixed",bottom:"20px",left:"50%",borderColor:l.palette.mode==="dark"?"#313131":"#f6f6f6",padding:"10px",zIndex:101},children:e.jsx(x,{variant:"body1",align:"center",sx:{color:l.palette.mode==="dark"?"#ffffff":"#000000"},children:H()})})]})},se=()=>{const[t,r]=a.useState(!0),[l,n]=a.useState("kilometers"),u=o=>{n(o.target.value)};return e.jsx(e.Fragment,{children:e.jsxs(j,{open:t,setOpen:r,name:"Measure Tool",children:[e.jsxs(T,{name:"units",onChange:u,label:"Unit for measurement",defaultValue:"kilometers",children:[e.jsx(h,{value:"kilometers",children:" Kilometers"}),e.jsx(h,{value:"miles",children:" Miles"})]}),e.jsxs(i,{style:{fontFamily:"sans-serif",marginTop:"20px"},children:[e.jsx(X,{sx:{float:"left",marginTop:"4px",marginRight:"5px"}}),e.jsx(x,{variant:"h5",children:"Measure Line"})]}),e.jsxs(i,{style:{fontFamily:"sans-serif",marginTop:"20px"},children:["Length: ",e.jsx(f,{measureType:"line",unit:l})]})]})})},te=()=>{const[t,r]=a.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(q,{unmovableButtons:e.jsx(e.Fragment,{children:e.jsx(P,{variant:t?"contained":"outlined",onClick:()=>r(!t),children:"Measure Tool"})})}),e.jsx(ee,{openSidebar:t,setOpenSidebar:r})]})},c=se.bind({});c.parameters={};c.args={};const m=Z.bind({});m.parameters={};m.args={};const p=te.bind({});p.parameters={};p.args={};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [unit, setUnit] = useState<MlMeasureToolProps['unit']>('kilometers');
  const handleChange = (event: SelectChangeEvent<MlMeasureToolProps['unit']>) => {
    setUnit(event.target.value as MlMeasureToolProps['unit']);
  };
  return <>
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Measure Tool'}>
                <Select name={'units'} onChange={handleChange} label={'Unit for measurement'} defaultValue={'kilometers'}>
                    <MenuItem value={'kilometers'}> Kilometers</MenuItem>
                    <MenuItem value={'miles'}> Miles</MenuItem>
                </Select>

                <Box style={{
        fontFamily: 'sans-serif',
        marginTop: '20px'
      }}>
                    <StraightenOutlinedIcon sx={{
          float: 'left',
          marginTop: '4px',
          marginRight: '5px'
        }} />
                    <Typography variant="h5">Measure Line</Typography>
                </Box>
                <Box style={{
        fontFamily: 'sans-serif',
        marginTop: '20px'
      }}>
                    Length: <MlMeasureTool measureType={'line'} unit={unit} />
                </Box>
            </Sidebar>
        </>;
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [unit, setUnit] = useState<MlMeasureToolProps['unit']>('meters');
  const handleChange = (event: SelectChangeEvent<MlMeasureToolProps['unit']>) => {
    setUnit(event.target.value as MlMeasureToolProps['unit']);
  };
  return <>
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Measure Tool'}>
                <Select name={'units'} onChange={handleChange} label={'Unit for measurement'} defaultValue={'kilometers'}>
                    <MenuItem value={'kilometers'}>Kilometers</MenuItem>
                    <MenuItem value={'miles'}>Miles</MenuItem>
                </Select>

                <Box style={{
        fontFamily: 'sans-serif',
        marginTop: '20px'
      }}>
                    <SquareFootOutlinedIcon sx={{
          float: 'left',
          marginTop: '4px',
          marginRight: '5px'
        }} />
                    <Typography variant="h5">Measure Polygon</Typography>
                </Box>
                <Box style={{
        fontFamily: 'sans-serif',
        marginTop: '20px'
      }}>
                    Area: <MlMeasureTool measureType={'polygon'} unit={unit} />
                </Box>
            </Sidebar>
        </>;
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return <>
            {/* <Box
                sx={{
                    mousePosition: 'fixed',
                    width: { xs: '100%', sm: 'auto' },
                    top: { xs: '62px', sm: '22px' },
                    right: { xs: '0px', sm: '120px', md: '145px', lg: '155px', xl: '175px' },
                    paddingRight: { xs: '20px', sm: '0px' },
                    color: '#009ee0',
                    backgroundColor: '#fff',
                    textAlign: 'right',
                    fontSize: '16px',
                    fontFamily: 'sans-serif',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    zIndex: 5000,
                }}
             ></Box> */}
            <TopToolbar unmovableButtons={<>
                        <Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)}>
                            Measure Tool
                        </Button>
                    </>} />
            <CatalogueSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        </>;
}`,...p.parameters?.docs?.source}}};const ce=["MeasureLine","MeasurePolygon","CatalogueDemo"];export{p as CatalogueDemo,c as MeasureLine,m as MeasurePolygon,ce as __namedExportsOrder,ue as default};
