import{j as e}from"./index-BpemSb3a.js";import{r as n}from"./iframe-j72i5ZUO.js";import{ao as E,J as H,O as U,ap as O,N as z,y as X,aq as k,I as _,ar as j,as as q,at as J,k as V,Y as A,l as Y,b as K,B as R,S as Q,au as W,ai as tt}from"./style-DWWhlVM-.js";import{d as ot}from"./NoNavToolsDecorator-D1rycj_v.js";import"./index-C-CykIMM.js";import"./preload-helper-D9Z9MdNV.js";function et(t){return H("MuiSwitch",t)}const s=E("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),st=t=>{const{classes:o,edge:a,size:d,color:T,checked:l,disabled:N}=t,h={root:["root",a&&`edge${k(a)}`,`size${k(d)}`],switchBase:["switchBase",`color${k(T)}`,l&&"checked",N&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},y=_(h,et,o);return{...o,...y}},at=z("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(t,o)=>{const{ownerState:a}=t;return[o.root,a.edge&&o[`edge${k(a.edge)}`],o[`size${k(a.size)}`]]}})({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,[`& .${s.thumb}`]:{width:16,height:16},[`& .${s.switchBase}`]:{padding:4,[`&.${s.checked}`]:{transform:"translateX(16px)"}}}}]}),rt=z(q,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(t,o)=>{const{ownerState:a}=t;return[o.switchBase,{[`& .${s.input}`]:o.input},a.color!=="default"&&o[`color${k(a.color)}`]]}})(j(({theme:t})=>({position:"absolute",top:0,left:0,zIndex:1,color:t.vars?t.vars.palette.Switch.defaultColor:`${t.palette.mode==="light"?t.palette.common.white:t.palette.grey[300]}`,transition:t.transitions.create(["left","transform"],{duration:t.transitions.duration.shortest}),[`&.${s.checked}`]:{transform:"translateX(20px)"},[`&.${s.disabled}`]:{color:t.vars?t.vars.palette.Switch.defaultDisabledColor:`${t.palette.mode==="light"?t.palette.grey[100]:t.palette.grey[600]}`},[`&.${s.checked} + .${s.track}`]:{opacity:.5},[`&.${s.disabled} + .${s.track}`]:{opacity:t.vars?t.vars.opacity.switchTrackDisabled:`${t.palette.mode==="light"?.12:.2}`},[`& .${s.input}`]:{left:"-100%",width:"300%"}})),j(({theme:t})=>({"&:hover":{backgroundColor:t.alpha((t.vars||t).palette.action.active,(t.vars||t).palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(t.palette).filter(J(["light"])).map(([o])=>({props:{color:o},style:{[`&.${s.checked}`]:{color:(t.vars||t).palette[o].main,"&:hover":{backgroundColor:t.alpha((t.vars||t).palette[o].main,(t.vars||t).palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${s.disabled}`]:{color:t.vars?t.vars.palette.Switch[`${o}DisabledColor`]:`${t.palette.mode==="light"?t.lighten(t.palette[o].main,.62):t.darken(t.palette[o].main,.55)}`}},[`&.${s.checked} + .${s.track}`]:{backgroundColor:(t.vars||t).palette[o].main}}}))]}))),nt=z("span",{name:"MuiSwitch",slot:"Track"})(j(({theme:t})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:t.transitions.create(["opacity","background-color"],{duration:t.transitions.duration.shortest}),backgroundColor:t.vars?t.vars.palette.common.onBackground:`${t.palette.mode==="light"?t.palette.common.black:t.palette.common.white}`,opacity:t.vars?t.vars.opacity.switchTrack:`${t.palette.mode==="light"?.38:.3}`}))),it=z("span",{name:"MuiSwitch",slot:"Thumb"})(j(({theme:t})=>({boxShadow:(t.vars||t).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),lt=n.forwardRef(function(o,a){const d=U({props:o,name:"MuiSwitch"}),{className:T,color:l="primary",edge:N=!1,size:h="medium",sx:y,slots:c={},slotProps:r={},...P}=d,i={...d,color:l,edge:N,size:h},p=st(i),M={slots:c,slotProps:r},[G,D]=O("root",{className:X(p.root,T),elementType:at,externalForwardedProps:M,ownerState:i,additionalProps:{sx:y}}),[F,m]=O("thumb",{className:p.thumb,elementType:it,externalForwardedProps:M,ownerState:i}),$=e.jsx(F,{...m}),[L,I]=O("track",{className:p.track,elementType:nt,externalForwardedProps:M,ownerState:i});return e.jsxs(G,{...D,children:[e.jsx(rt,{type:"checkbox",icon:$,checkedIcon:$,ref:a,ownerState:i,...P,classes:{...p,root:p.switchBase},slots:{...c.switchBase&&{root:c.switchBase},...c.input&&{input:c.input}},slotProps:{...r.switchBase&&{root:typeof r.switchBase=="function"?r.switchBase(i):r.switchBase},input:{role:"switch"},...r.input&&{input:typeof r.input=="function"?r.input(i):r.input}}}),e.jsx(L,{...I})]})}),Z=V(e.jsx("path",{d:"m22.7 19-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4"})),Bt={title:"MapComponents/MlNavigationTools",component:A,argTypes:{url:{},layer:{}},decorators:ot},u=t=>e.jsx(A,{...t}),ct=()=>{const t=Y(),[o,a]=n.useState(!0),[d,T]=n.useState(!1),[l,N]=n.useState(!1),[h,y]=n.useState(!1),[c,r]=n.useState(!0),[P,i]=n.useState(!1),[p,M]=n.useState(!1),[G,D]=n.useState(!1),F=[{text:"Alternative Position",const:G,setter:D},{text:"Show 2D/3D Button",const:d,setter:T},{text:"Show Globe Button",const:l,setter:N},{text:"Show CenterLocation Button",const:h,setter:y},{text:"Show Zoom Buttons",const:c,setter:r},{text:"Show FollowGPS Button",const:P,setter:i},{text:"Add a custom Button",const:p,setter:M}];return n.useEffect(()=>{l&&t.map&&t.map.easeTo({zoom:2})},[l,t.map]),e.jsxs(e.Fragment,{children:[e.jsx(K,{buttons:e.jsx(e.Fragment,{children:e.jsx(R,{variant:o?"contained":"outlined",onClick:()=>a(!o),sx:{marginRight:{xs:"0px",sm:"10px"}},children:"Options"})})}),e.jsx(Q,{open:o,setOpen:a,name:"Navigation Tools",children:e.jsx(W,{children:F.map((m,$)=>e.jsx(tt,{control:e.jsx(lt,{checked:m.const,onChange:()=>m.setter(L=>!L)}),label:m.text},$))})}),e.jsx(A,{sx:G?{top:"80px"}:void 0,show3DButton:d,showGlobeButton:l,showCenterLocationButton:h,showZoomButtons:c,showFollowGpsButton:P,children:p?e.jsx(R,{variant:"navtools",onClick:()=>{},sx:{color:m=>m.palette.navigation.buttonColor},children:e.jsx(Z,{sx:{fontSize:{xs:"1.4em",md:"1em"}}})}):e.jsx(e.Fragment,{})})]})},g=u.bind({});g.parameters={};g.args={};const B=u.bind({});B.parameters={};B.args={show3DButton:!1};const w=u.bind({});w.parameters={};w.args={showGlobeButton:!0};const S=u.bind({});S.parameters={};S.args={showFollowGpsButton:!1,showCenterLocationButton:!0};const b=u.bind({});b.parameters={};b.args={sx:{top:"10px"}};const v=u.bind({});v.parameters={};v.args={showZoomButtons:!1};const x=u.bind({});x.parameters={};x.args={showFollowGpsButton:!1};const f=u.bind({});f.parameters={};f.args={children:e.jsx(R,{variant:"navtools",onClick:()=>{},sx:{color:t=>t.palette.navigation.buttonColor},children:e.jsx(Z,{sx:{fontSize:{xs:"1.4em",md:"1em"}}})})};const C=ct.bind({});C.parameters={};C.args={};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"(props: MlNavigationToolsProps) => <MlNavigationTools {...props} />",...g.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:"(props: MlNavigationToolsProps) => <MlNavigationTools {...props} />",...B.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:"(props: MlNavigationToolsProps) => <MlNavigationTools {...props} />",...w.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:"(props: MlNavigationToolsProps) => <MlNavigationTools {...props} />",...S.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:"(props: MlNavigationToolsProps) => <MlNavigationTools {...props} />",...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:"(props: MlNavigationToolsProps) => <MlNavigationTools {...props} />",...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"(props: MlNavigationToolsProps) => <MlNavigationTools {...props} />",...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:"(props: MlNavigationToolsProps) => <MlNavigationTools {...props} />",...f.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  const mapHook = useMap();
  const [openSidebar, setOpenSidebar] = useState(true);
  const [threeDButton, setThreeDButton] = useState(false);
  const [globeButton, setGlobeButton] = useState(false);
  const [centerLocationButton, setCenterLocationButton] = useState(false);
  const [zoomButtons, setZoomButtons] = useState(true);
  const [followGpsButton, setFollowGpsButton] = useState(false);
  const [showCustomButton, setShowCustomButton] = useState(false);
  const [alternativePosition, setAlternativePosition] = useState(false);
  const tools = [{
    text: 'Alternative Position',
    const: alternativePosition,
    setter: setAlternativePosition
  }, {
    text: 'Show 2D/3D Button',
    const: threeDButton,
    setter: setThreeDButton
  }, {
    text: 'Show Globe Button',
    const: globeButton,
    setter: setGlobeButton
  }, {
    text: 'Show CenterLocation Button',
    const: centerLocationButton,
    setter: setCenterLocationButton
  }, {
    text: 'Show Zoom Buttons',
    const: zoomButtons,
    setter: setZoomButtons
  }, {
    text: 'Show FollowGPS Button',
    const: followGpsButton,
    setter: setFollowGpsButton
  }, {
    text: 'Add a custom Button',
    const: showCustomButton,
    setter: setShowCustomButton
  }];
  useEffect(() => {
    if (globeButton && mapHook.map) {
      mapHook.map.easeTo({
        zoom: 2
      });
    }
  }, [globeButton, mapHook.map]);
  return <>
            <TopToolbar buttons={<>
                        <Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)} sx={{
        marginRight: {
          xs: '0px',
          sm: '10px'
        }
      }}>
                            Options
                        </Button>
                    </>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Navigation Tools'}>
                <FormGroup>
                    {tools.map((tool, text) => <FormControlLabel key={text} control={<Switch checked={tool.const} onChange={() => tool.setter(current => !current)} />} label={tool.text} />)}
                </FormGroup>
            </Sidebar>
            <MlNavigationTools sx={alternativePosition ? {
      top: '80px'
    } : undefined} show3DButton={threeDButton} showGlobeButton={globeButton} showCenterLocationButton={centerLocationButton} showZoomButtons={zoomButtons} showFollowGpsButton={followGpsButton}>
                {showCustomButton ? <Button variant="navtools" onClick={() => {}} sx={{
        color: theme => theme.palette.navigation.buttonColor
      }}>
                        <BuildIcon sx={{
          fontSize: {
            xs: '1.4em',
            md: '1em'
          }
        }} />
                    </Button> : <></>}
            </MlNavigationTools>
        </>;
}`,...C.parameters?.docs?.source}}};const wt=["DefaultConfig","No3dButton","ShowGlobeButton","ShowCenterLocationButton","AlternativePosition","NoZoomButtons","NoFollowGpsButton","CustomButton","CatalogueDemo"];export{b as AlternativePosition,C as CatalogueDemo,f as CustomButton,g as DefaultConfig,B as No3dButton,x as NoFollowGpsButton,v as NoZoomButtons,S as ShowCenterLocationButton,w as ShowGlobeButton,wt as __namedExportsOrder,Bt as default};
