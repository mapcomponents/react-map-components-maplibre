import{j as t}from"./index-BpemSb3a.js";import{r}from"./iframe-j72i5ZUO.js";import{ao as w,J as _,ay as R,O as V,N as $,y as J,aq as C,I as P,az as E,ar as G,at as A,k as u,aA as M,l as H,ab as W,b as N,B as D,c as F,S as U,aB as q,aC as K,V as Q,aD as X}from"./style-DWWhlVM-.js";import{m as Y}from"./MapContextDecorator-BZWIR0DB.js";import{s as Z}from"./sample_1-oyv3COlS.js";import{s as aa}from"./sample_2-BhnY8aTO.js";import"./index-C-CykIMM.js";import"./preload-helper-D9Z9MdNV.js";function ea(a){return _("MuiToggleButton",a)}const v=w("MuiToggleButton",["root","disabled","selected","standard","primary","secondary","sizeSmall","sizeMedium","sizeLarge","fullWidth"]),ta=r.createContext({}),oa=r.createContext(void 0);function sa(a,e){return e===void 0||a===void 0?!1:Array.isArray(e)?e.includes(a):a===e}const ra=a=>{const{classes:e,fullWidth:i,selected:s,disabled:l,size:n,color:p}=a,o={root:["root",s&&"selected",l&&"disabled",i&&"fullWidth",`size${C(n)}`,p]};return P(o,ea,e)},ia=$(E,{name:"MuiToggleButton",slot:"Root",overridesResolver:(a,e)=>{const{ownerState:i}=a;return[e.root,e[`size${C(i.size)}`]]}})(G(({theme:a})=>({...a.typography.button,borderRadius:(a.vars||a).shape.borderRadius,padding:11,border:`1px solid ${(a.vars||a).palette.divider}`,color:(a.vars||a).palette.action.active,[`&.${v.disabled}`]:{color:(a.vars||a).palette.action.disabled,border:`1px solid ${(a.vars||a).palette.action.disabledBackground}`},"&:hover":{textDecoration:"none",backgroundColor:a.alpha((a.vars||a).palette.text.primary,(a.vars||a).palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[{props:{color:"standard"},style:{[`&.${v.selected}`]:{color:(a.vars||a).palette.text.primary,backgroundColor:a.alpha((a.vars||a).palette.text.primary,(a.vars||a).palette.action.selectedOpacity),"&:hover":{backgroundColor:a.alpha((a.vars||a).palette.text.primary,`${(a.vars||a).palette.action.selectedOpacity} + ${(a.vars||a).palette.action.hoverOpacity}`),"@media (hover: none)":{backgroundColor:a.alpha((a.vars||a).palette.text.primary,(a.vars||a).palette.action.selectedOpacity)}}}}},...Object.entries(a.palette).filter(A()).map(([e])=>({props:{color:e},style:{[`&.${v.selected}`]:{color:(a.vars||a).palette[e].main,backgroundColor:a.alpha((a.vars||a).palette[e].main,(a.vars||a).palette.action.selectedOpacity),"&:hover":{backgroundColor:a.alpha((a.vars||a).palette[e].main,`${(a.vars||a).palette.action.selectedOpacity} + ${(a.vars||a).palette.action.hoverOpacity}`),"@media (hover: none)":{backgroundColor:a.alpha((a.vars||a).palette[e].main,(a.vars||a).palette.action.selectedOpacity)}}}}})),{props:{fullWidth:!0},style:{width:"100%"}},{props:{size:"small"},style:{padding:7,fontSize:a.typography.pxToRem(13)}},{props:{size:"large"},style:{padding:15,fontSize:a.typography.pxToRem(15)}}]}))),na=r.forwardRef(function(e,i){const{value:s,...l}=r.useContext(ta),n=r.useContext(oa),p=R({...l,selected:sa(e.value,s)},e),o=V({props:p,name:"MuiToggleButton"}),{children:c,className:k,color:B="standard",disabled:b=!1,disableFocusRipple:f=!1,fullWidth:j=!1,onChange:y,onClick:x,selected:z,size:T="medium",value:g,...I}=o,S={...o,color:B,disabled:b,disableFocusRipple:f,fullWidth:j,size:T},O=ra(S),L=m=>{x&&(x(m,g),m.defaultPrevented)||y&&y(m,g)},h=n||"";return t.jsx(ia,{className:J(l.className,O.root,k,h),disabled:b,focusRipple:!f,ref:i,onClick:L,onChange:y,value:g,ownerState:S,"aria-pressed":z,...I,children:c})}),la=u(t.jsx("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"})),pa=u(t.jsx("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7M2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2m4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3z"})),ca=u(t.jsx("path",{d:"M16.59 7.58 10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"})),da=u(t.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"})),Ca={title:"MapComponents/MlShareMapState",component:M,argTypes:{},decorators:Y},ua=()=>{const a=[Z,aa],[e,i]=r.useState(!0),s=H({mapId:"map_1"}),l=W({mapId:"map_1",watch:{viewport:!1,layers:!0,sources:!1},filter:{includeBaseLayers:!1}}),[n,p]=r.useState(!0);return r.useEffect(()=>{s.map&&s.map.map.flyTo({center:[7.100175528281227,50.73348799274236],zoom:15.5})},[s.map]),t.jsxs(t.Fragment,{children:[t.jsx(N,{buttons:t.jsx(D,{variant:n?"contained":"outlined",onClick:()=>p(!n),sx:{marginRight:{xs:"0px",sm:"10px"}},children:"Share Map State"})}),t.jsx(M,{active:e}),a.map((o,c)=>t.jsx(F,{layerId:"GeoJson_"+c,type:"line",geojson:o},"GeoJson_"+c)),t.jsxs(U,{open:n,setOpen:p,name:"Share Map State",children:[t.jsxs(na,{size:"small",selected:e,value:e,onChange:()=>{i(!e)},children:[e?t.jsx(ca,{}):t.jsx(da,{}),e?"active":"inactive"]}),t.jsx(q,{dense:!0,children:l.layers?.map(o=>t.jsx(K,{secondaryAction:t.jsx(X,{edge:"end","aria-label":"toggle visibility",onClick:()=>{if(o?.id){const c=s.map?.getLayer?.(o?.id)?.getLayoutProperty("visibility");s.map?.getLayer?.(o?.id)?.setLayoutProperty("visibility",c==="none"?"visible":"none"),s.map?.map.fire("zoom")}},children:o?.visible?t.jsx(la,{}):t.jsx(pa,{})}),children:t.jsx(Q,{primary:o?.id,secondary:""})},o?.id))},"layers")]})]})},d=ua.bind({});d.parameters={};d.args={};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const geoJsonArray = [sample_geojson_1, sample_geojson_2];
  const [watchState, setWatchState] = useState(true);
  const mapHook = useMap({
    mapId: 'map_1'
  });
  const mapState = useMapState({
    mapId: 'map_1',
    watch: {
      viewport: false,
      layers: true,
      sources: false
    },
    filter: {
      includeBaseLayers: false
    }
  });
  const [openSidebar, setOpenSidebar] = useState(true);
  useEffect(() => {
    if (!mapHook.map) return;
    mapHook.map.map.flyTo({
      center: [7.100175528281227, 50.73348799274236],
      zoom: 15.5
    });
  }, [mapHook.map]);
  return <>
            <TopToolbar buttons={<Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)} sx={{
      marginRight: {
        xs: '0px',
        sm: '10px'
      }
    }}>
                        Share Map State
                    </Button>} />
            <MlShareMapState active={watchState} />
            {geoJsonArray.map((el, i) => <MlGeoJsonLayer layerId={'GeoJson_' + i} type="line" geojson={el as unknown as Feature} key={'GeoJson_' + i} />)}
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Share Map State'}>
                <ToggleButton size="small" selected={watchState} value={watchState} onChange={() => {
        setWatchState(!watchState);
      }}>
                    {watchState ? <CheckCircleOutlineIcon /> : <ErrorOutlineIcon />}

                    {watchState ? 'active' : 'inactive'}
                </ToggleButton>
                <List dense key="layers">
                    {mapState.layers?.map(el => <ListItem key={el?.id} secondaryAction={<IconButton edge="end" aria-label="toggle visibility" onClick={() => {
          if (el?.id) {
            const currentVisibility = mapHook.map?.getLayer?.(el?.id)?.getLayoutProperty('visibility');
            mapHook.map?.getLayer?.(el?.id)?.setLayoutProperty('visibility', currentVisibility === 'none' ? 'visible' : 'none');
            mapHook.map?.map.fire('zoom');
          }
        }}>
                                    {el?.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>}>
                            <ListItemText primary={el?.id} secondary={''} />
                        </ListItem>)}
                </List>
            </Sidebar>
        </>;
}`,...d.parameters?.docs?.source}}};const Ma=["ExampleConfig"];export{d as ExampleConfig,Ma as __namedExportsOrder,Ca as default};
