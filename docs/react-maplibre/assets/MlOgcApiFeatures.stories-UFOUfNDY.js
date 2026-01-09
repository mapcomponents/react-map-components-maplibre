import{j as e}from"./index-DtQ6Ei6g.js";import{r,R}from"./iframe-DNf3k_ah.js";import{m as G}from"./MapContextDecorator-BjqxFiZL.js";import{av as O,l as I,S as k,B as x,Q as A,j as E,p as m,R as U,s as g,W as w,X as P,b as B,q as z}from"./style-18SAlq8x.js";import"./index-B8Aem304.js";import"./preload-helper-D9Z9MdNV.js";const Q={title:"MapComponents/MlOgcApiFeatures",component:O,argTypes:{},decorators:G},F=a=>{const[o,n]=r.useState(!0),t=I({mapId:a.mapId}),d=r.useRef(!1);return r.useEffect(()=>{!t.map||d.current||(d.current=!0,t.map.map.jumpTo({center:[7.100175528281227,50.73487992742369],zoom:8}))},[t.map]),e.jsxs(e.Fragment,{children:[e.jsx(k,{open:a.openSidebar,setOpen:a.setOpenSidebar,name:"OGC API Feature Points",children:e.jsx(x,{color:"primary",variant:o?"contained":"outlined",onClick:()=>n(!o),children:"OGC API Feature Points"})}),e.jsx(O,{visible:o,ogcApiUrl:a.ogcApiUrl,mapId:a.mapId,ogcApiFeatureParams:a.ogcApiFeatureParams,reloadFeaturesOnMapMove:!0,mlGeoJsonLayerProps:{defaultPaintOverrides:{circle:{"circle-color":"#CF003D"}}}})]})},c=F.bind({});c.parameters={};c.args={ogcApiUrl:"https://geo.kreis-viersen.de/ows/osm-daten/wfs3/collections/hoflaeden_nrw/items.json",mapId:"map_1",ogcApiFeatureParams:{limit:100},openSidebar:!0};const j=a=>{const o=[{value:0,label:"0%"},{value:.25,label:"25%"},{value:.5,label:"50%"},{value:.75,label:"75%"},{value:1,label:"100%"}],n=[{value:0,label:"0"},{value:5,label:"5"},{value:10,label:"10"}],[t,d]=r.useState("#0E8A0E"),[l,y]=r.useState(.8),[i,v]=r.useState("fill"),[b,S]=r.useState(6),[s,L]=r.useState("https://demo.ldproxy.net/vineyards/collections/vineyards/items?f=json&limit=100&region=Rheinhessen"),f=I({mapId:a.mapId}),T=r.useRef(!1);r.useEffect(()=>{!f.map||T.current||(T.current=!0,f.map.map.jumpTo({center:[8.1186,49.8487],zoom:10}))},[f.map]);const M=p=>{d(p)};return e.jsxs(e.Fragment,{children:[e.jsxs(k,{open:a.openSidebar,setOpen:a.setOpenSidebar,name:"OGC API Feature Loader",children:[e.jsx(A,{fullWidth:!0,sx:{marginTop:"10px"},children:e.jsx(E,{label:"OGC API Features URL",variant:"standard",value:s,onChange:p=>L(p.target.value),sx:{marginBottom:"10px"}})}),e.jsx(m,{variant:"h5",children:"Style Feature"}),e.jsxs(A,{children:[e.jsx(m,{children:"Geometry type:"}),e.jsxs(U,{value:i,onChange:p=>{v(p.target.value)},children:[e.jsx(g,{value:"fill",children:"fill"},1),e.jsx(g,{value:"circle",children:"circle"},2),e.jsx(g,{value:"line",children:"line"},3)]})]}),e.jsx(m,{children:"Display color:"}),e.jsx(w,{value:t,onChange:M}),e.jsx(m,{children:"Opacity:"}),e.jsx(P,{defaultValue:1,"aria-label":"Default",value:l,max:1,min:0,step:.01,marks:o,onChange:(p,C)=>{y(C)}}),e.jsx(m,{paddingTop:4,children:"Stroke:"}),e.jsx(P,{value:b,"aria-label":"Default",max:10,min:0,step:1,marks:n,onChange:(p,C)=>{S(C)},disabled:i!=="line"})]}),(()=>{try{return!!new URL(s)}catch{return!1}})()&&e.jsx(O,{ogcApiUrl:new URL(s),mapId:a.mapId,mlGeoJsonLayerProps:{defaultPaintOverrides:{fill:{"fill-color":t,"fill-opacity":l},circle:{"circle-color":t,"circle-opacity":l},line:{"line-color":t,"line-opacity":l,"line-width":b}},type:i}})]})},u=j.bind({});u.parameters={};u.args={mapId:"map_1",openSidebar:!0};const H=()=>{const a={points:"OGC API Feature Points",featureLoader:"OGC API Feature Loader"},[o,n]=r.useState(!0),[t,d]=r.useState("points"),[l,y]=R.useState(null),i=!!l,v=s=>{y(s.currentTarget)},b=()=>{y(null)},S=s=>{d(s)};return e.jsxs(e.Fragment,{children:[e.jsx(B,{unmovableButtons:e.jsxs(e.Fragment,{children:[e.jsx(m,{variant:"h6",color:"ButtonText",marginRight:"20px",children:a[t]}),e.jsx(x,{variant:o?"contained":"outlined",sx:{marginRight:"10px"},onClick:()=>n(!o),children:"Sidebar"}),e.jsx(x,{id:"basic-button",variant:"contained","aria-controls":i?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":i?"true":void 0,onClick:v,children:"Examples"}),e.jsxs(z,{id:"basic-menu",anchorEl:l,open:i,onClose:b,MenuListProps:{"aria-labelledby":"basic-button"},children:[e.jsx(g,{onClick:()=>S("points"),children:"OGC API Feature Points"}),e.jsx(g,{onClick:()=>S("featureLoader"),children:"OGC API Feature Loader"})]})]})}),t==="points"&&e.jsx(F,{...c.args,openSidebar:o,setOpenSidebar:n}),t==="featureLoader"&&e.jsx(j,{...u.props,openSidebar:o,setOpenSidebar:n})]})},h=H.bind({});h.parameters={};h.args={mapId:"map_1"};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`(props: TemplateProps) => {
  const [showLayer, setShowLayer] = useState(true);
  const mapHook = useMap({
    mapId: props.mapId
  });
  const initializedRef = useRef(false);
  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    initializedRef.current = true;
    mapHook.map.map.jumpTo({
      center: [7.100175528281227, 50.73487992742369],
      zoom: 8
    });
  }, [mapHook.map]);
  return <>
            <Sidebar open={props.openSidebar} setOpen={props.setOpenSidebar} name={'OGC API Feature Points'}>
                <Button color="primary" variant={showLayer ? 'contained' : 'outlined'} onClick={() => setShowLayer(!showLayer)}>
                    OGC API Feature Points
                </Button>
            </Sidebar>
            <MlOgcApiFeatures visible={showLayer} ogcApiUrl={props.ogcApiUrl} mapId={props.mapId} ogcApiFeatureParams={props.ogcApiFeatureParams} reloadFeaturesOnMapMove={true} mlGeoJsonLayerProps={{
      defaultPaintOverrides: {
        circle: {
          'circle-color': '#CF003D'
        }
      }
    }}></MlOgcApiFeatures>
        </>;
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`(props: TemplateProps) => {
  interface Mark {
    value: number;
    label: string;
  }
  const marks: Mark[] = [{
    value: 0,
    label: '0%'
  }, {
    value: 0.25,
    label: '25%'
  }, {
    value: 0.5,
    label: '50%'
  }, {
    value: 0.75,
    label: '75%'
  }, {
    value: 1,
    label: '100%'
  }];
  const widthMarks: Mark[] = [{
    value: 0,
    label: '0'
  }, {
    value: 5,
    label: '5'
  }, {
    value: 10,
    label: '10'
  }];
  const [color, setColor] = useState<string>('#0E8A0E');
  const [opacity, setOpacity] = useState<number>(0.8);
  const [geomType, setGeomType] = useState<'fill' | 'circle' | 'line'>('fill');
  const [lineWidth, setLineWidth] = useState<number>(6);
  const [ogcApiUrl, setOgcApiUrl] = useState('https://demo.ldproxy.net/vineyards/collections/vineyards/items?f=json&limit=100&region=Rheinhessen');
  const mapHook = useMap({
    mapId: props.mapId
  });
  const initializedRef = useRef(false);
  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    initializedRef.current = true;
    mapHook.map.map.jumpTo({
      center: [8.1186, 49.8487],
      zoom: 10
    });
  }, [mapHook.map]);
  const handleColorChange = (value: string) => {
    setColor(value);
  };
  return <>
            <Sidebar open={props.openSidebar} setOpen={props.setOpenSidebar} name={'OGC API Feature Loader'}>
                <FormControl fullWidth sx={{
        marginTop: '10px'
      }}>
                    <TextField label="OGC API Features URL" variant="standard" value={ogcApiUrl} onChange={ev => setOgcApiUrl(ev.target.value)} sx={{
          marginBottom: '10px'
        }} />
                </FormControl>

                <Typography variant={'h5'}>Style Feature</Typography>
                <FormControl>
                    <Typography>Geometry type:</Typography>
                    <Select value={geomType} onChange={e => {
          setGeomType(e.target.value as 'fill' | 'circle' | 'line');
        }}>
                        <MenuItem value={'fill'} key={1}>
                            fill
                        </MenuItem>
                        <MenuItem value={'circle'} key={2}>
                            circle
                        </MenuItem>
                        <MenuItem value={'line'} key={3}>
                            line
                        </MenuItem>
                    </Select>
                </FormControl>
                <Typography>Display color:</Typography>
                <ColorPicker value={color} onChange={handleColorChange} />
                <Typography>Opacity:</Typography>
                <Slider defaultValue={1} aria-label="Default" value={opacity} max={1} min={0} step={0.01} marks={marks} onChange={(_, v) => {
        setOpacity(v as number);
      }} />
                <Typography paddingTop={4}>Stroke:</Typography>
                <Slider value={lineWidth} aria-label="Default" max={10} min={0} step={1} marks={widthMarks} onChange={(_e, v) => {
        setLineWidth(v as number);
      }} disabled={geomType !== 'line'} />
            </Sidebar>
            {
    //only render if valid url
    (() => {
      try {
        return !!new URL(ogcApiUrl);
      } catch {
        return false;
      }
    })() && <MlOgcApiFeatures ogcApiUrl={new URL(ogcApiUrl)} mapId={props.mapId} mlGeoJsonLayerProps={{
      defaultPaintOverrides: {
        fill: {
          'fill-color': color,
          'fill-opacity': opacity
        },
        circle: {
          'circle-color': color,
          'circle-opacity': opacity
        },
        line: {
          'line-color': color,
          'line-opacity': opacity,
          'line-width': lineWidth
        }
      },
      type: geomType
    }}></MlOgcApiFeatures>}
        </>;
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const configTitles = {
    points: 'OGC API Feature Points',
    featureLoader: 'OGC API Feature Loader'
  };
  const [openSidebar, setOpenSidebar] = useState(true);
  const [selectedStory, setSelectedStory] = useState<string>('points');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleStorySelect = (story: string) => {
    setSelectedStory(story);
  };
  return <>
            <TopToolbar unmovableButtons={<>
                        <Typography variant="h6" color={'ButtonText'} marginRight={'20px'}>
                            {(configTitles as {
          [key: string]: any;
        })[selectedStory]}
                        </Typography>
                        <Button variant={openSidebar ? 'contained' : 'outlined'} sx={{
        marginRight: '10px'
      }} onClick={() => setOpenSidebar(!openSidebar)}>
                            Sidebar
                        </Button>
                        <Button id="basic-button" variant="contained" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                            Examples
                        </Button>
                        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}>
                            <MenuItem onClick={() => handleStorySelect('points')}>
                                OGC API Feature Points
                            </MenuItem>
                            <MenuItem onClick={() => handleStorySelect('featureLoader')}>
                                OGC API Feature Loader
                            </MenuItem>
                        </Menu>
                    </>} />

            {selectedStory === 'points' && <PointTemplate {...Point.args} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />}
            {selectedStory === 'featureLoader' && <OGCLoaderTemplate {...OgcApiLoader.props} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />}
        </>;
}`,...h.parameters?.docs?.source}}};const X=["Point","OgcApiLoader","CatalogueDemo"];export{h as CatalogueDemo,u as OgcApiLoader,c as Point,X as __namedExportsOrder,Q as default};
