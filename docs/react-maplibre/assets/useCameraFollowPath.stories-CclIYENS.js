import{j as e}from"./index-DtQ6Ei6g.js";import{r as p}from"./iframe-DNf3k_ah.js";import{b6 as h,b as j,B as R,S as w,s,p as r,c as k,X as u}from"./style-18SAlq8x.js";import{m as M}from"./MapContextDecorator-BjqxFiZL.js";import"./index-B8Aem304.js";import"./preload-helper-D9Z9MdNV.js";const L={title:"Hooks/useCameraFollowPath",component:h,argTypes:{},decorators:M},g={type:"Feature",properties:{},geometry:{type:"LineString",coordinates:[[7.10942788610961,50.708209240168],[7.10966149846967,50.7088867160122],[7.10910082880551,50.7108256986007],[7.10856352037736,50.7126945974813],[7.1083532692533,50.7142598002937],[7.10814301812924,50.7160118929942],[7.10793276700518,50.7169463424345],[7.10776923835314,50.7176004570426],[7.10713848498096,50.718838602551],[7.10699831756492,50.7199599418793],[7.106900786313568,50.72118132611057]]}},P=[{value:15,label:"15"},{value:16,label:"16"},{value:17,label:"17"},{value:18,label:"18"},{value:19,label:"19"},{value:20,label:"20"}],z=()=>{const[a,i]=p.useState({pause:!0,zoom:18,speed:1,pitch:60}),c=h({route:g,pause:a.pause,pitch:a.pitch,zoom:a.zoom,speed:a.speed}),[l,x]=p.useState(!0),[d,m]=p.useState(!0),S=()=>m(t=>!t),y=()=>{i(t=>({...t,pause:!t.pause}))},b=()=>{i({pause:!0,zoom:18,speed:1,pitch:60}),setTimeout(()=>{c.reset()},50)},v=t=>{i(o=>({...o,zoom:t}))},C=t=>{i(o=>({...o,speed:t}))},T=()=>{i(t=>({...t,pitch:t.pitch===0?60:0}))};return e.jsxs(e.Fragment,{children:[e.jsx(j,{buttons:e.jsx(R,{variant:d?"contained":"outlined",onClick:S,sx:{marginRight:{xs:"0px",sm:"10px"}},children:"Camera Settings"})}),e.jsxs(w,{open:d,setOpen:m,name:"Camera Settings",children:[e.jsx(s,{onClick:()=>x(t=>!t),children:e.jsx(r,{children:l?"Hide route":"Show route"})}),l&&e.jsx(k,{geojson:g,type:"line",options:{paint:{"line-width":2,"line-color":"blue"}}}),e.jsx(s,{onClick:y,children:e.jsx(r,{children:a.pause?"Start":"Pause"})}),e.jsx(s,{onClick:b,children:e.jsx(r,{children:"Reset"})}),e.jsxs(s,{children:[e.jsx(r,{id:"discrete-slider",style:{marginLeft:"10px",marginRight:"10px"},children:"Zoom:"}),e.jsx(u,{value:a.zoom,onChange:(t,o)=>v(o),getAriaValueText:t=>t.toString(),"aria-labelledby":"discrete-slider",step:1,marks:P,min:15,max:20,sx:{marginTop:"20px",paddingBottom:"20px",marginRight:"10px",maxWidth:"200px",minWidth:"150px"}})]}),e.jsxs(s,{children:[e.jsx(r,{id:"discrete-slider2",style:{marginLeft:"10px",marginRight:"10px"},children:"Speed:"}),e.jsx(u,{value:a.speed,onChange:(t,o)=>C(o),getAriaValueText:t=>t.toString(),"aria-labelledby":"discrete-slider2",step:.1,marks:!0,min:.1,max:2,sx:{marginRight:"10px",maxWidth:"200px",minWidth:"150px"}})]}),e.jsx(s,{onClick:T,children:e.jsx(r,{children:a.pitch===0?"3D":"2D"})})]})]})},n=z.bind({});n.parameters={};n.args={};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  const [state, setState] = useState({
    pause: true,
    zoom: 18,
    speed: 1,
    pitch: 60
  });
  const CameraFollowPath = useCameraFollowPath({
    route: routeJson,
    pause: state.pause,
    pitch: state.pitch,
    zoom: state.zoom,
    speed: state.speed
  });
  const [showRoute, setShowRoute] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(true);

  // Toggle sidebar visibility
  const toggleSidebar = () => setOpenSidebar(prev => !prev);

  // Handle start/pause toggle
  const togglePause = () => {
    setState(prev => ({
      ...prev,
      pause: !prev.pause
    }));
  };

  // Handle reset to default state
  const resetCameraSettings = () => {
    setState({
      pause: true,
      zoom: 18,
      speed: 1,
      pitch: 60
    });
    setTimeout(() => {
      CameraFollowPath.reset();
    }, 50);
  };

  // Handle zoom change
  const handleZoomChange = (value: number) => {
    setState(prev => ({
      ...prev,
      zoom: value
    }));
  };

  // Handle speed change
  const handleSpeedChange = (value: number) => {
    setState(prev => ({
      ...prev,
      speed: value
    }));
  };

  // Toggle pitch between 2D and 3D
  const togglePitch = () => {
    setState(prev => ({
      ...prev,
      pitch: prev.pitch === 0 ? 60 : 0
    }));
  };
  return <>
            <TopToolbar buttons={<Button variant={openSidebar ? 'contained' : 'outlined'} onClick={toggleSidebar} sx={{
      marginRight: {
        xs: '0px',
        sm: '10px'
      }
    }}>
                        Camera Settings
                    </Button>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Camera Settings'}>
                <MenuItem onClick={() => setShowRoute(prev => !prev)}>
                    <Typography>{showRoute ? 'Hide route' : 'Show route'}</Typography>
                </MenuItem>
                {showRoute && <MlGeoJsonLayer geojson={routeJson} type="line" options={{
        paint: {
          'line-width': 2,
          'line-color': 'blue'
        }
      }} />}
                <MenuItem onClick={togglePause}>
                    <Typography>{state.pause ? 'Start' : 'Pause'}</Typography>
                </MenuItem>
                <MenuItem onClick={resetCameraSettings}>
                    <Typography>Reset</Typography>
                </MenuItem>

                <MenuItem>
                    <Typography id="discrete-slider" style={{
          marginLeft: '10px',
          marginRight: '10px'
        }}>
                        Zoom:
                    </Typography>
                    <Slider value={state.zoom} onChange={(_ev, value) => handleZoomChange(value)} getAriaValueText={value => value.toString()} aria-labelledby="discrete-slider" step={1} marks={marks} min={15} max={20} sx={{
          marginTop: '20px',
          paddingBottom: '20px',
          marginRight: '10px',
          maxWidth: '200px',
          minWidth: '150px'
        }} />
                </MenuItem>
                <MenuItem>
                    <Typography id="discrete-slider2" style={{
          marginLeft: '10px',
          marginRight: '10px'
        }}>
                        Speed:
                    </Typography>
                    <Slider value={state.speed} onChange={(_ev, value) => handleSpeedChange(value)} getAriaValueText={value => value.toString()} aria-labelledby="discrete-slider2" step={0.1} marks min={0.1} max={2} sx={{
          marginRight: '10px',
          maxWidth: '200px',
          minWidth: '150px'
        }} />
                </MenuItem>
                <MenuItem onClick={togglePitch}>
                    <Typography>{state.pitch === 0 ? '3D' : '2D'}</Typography>
                </MenuItem>
            </Sidebar>
        </>;
}`,...n.parameters?.docs?.source}}};const O=["ExampleConfig"];export{n as ExampleConfig,O as __namedExportsOrder,L as default};
