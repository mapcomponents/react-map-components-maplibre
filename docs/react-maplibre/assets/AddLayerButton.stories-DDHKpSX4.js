import{j as t}from"./index-DtQ6Ei6g.js";import{r as a}from"./iframe-DNf3k_ah.js";import{b3 as i,b1 as d,b as g,B as c,S as u,b8 as p,b4 as S,b5 as x,b9 as m}from"./style-18SAlq8x.js";import{d as L}from"./EmptyMapDecorator-CkWxBCn2.js";import"./index-B8Aem304.js";import"./preload-helper-D9Z9MdNV.js";const j={title:"UiComponents/AddLayerButton",component:i,argTypes:{},decorators:L},b=()=>{const[n,y]=a.useState(!0),e=a.useContext(d);return a.useEffect(()=>{let r=localStorage.getItem("layers");r=r?JSON.parse(r):[],e.setLayers(r)},[]),a.useEffect(()=>{e.layers.length>0&&localStorage.setItem("layers",JSON.stringify(e.layers))},[e.layers]),t.jsxs(t.Fragment,{children:[t.jsx(g,{buttons:t.jsxs(t.Fragment,{children:[t.jsx(c,{variant:n?"contained":"outlined",onClick:()=>y(!n),sx:{marginRight:{xs:"0px",sm:"10px"}},children:"Sidebar"}),t.jsx(c,{onClick:()=>{localStorage.clear(),location.reload()},children:"reset"})]})}),t.jsxs(u,{open:n,setOpen:y,name:"Layers",children:[t.jsx(i,{onComplete:r=>e.setLayers(s=>[...s,r])}),t.jsx(p,{sx:{marginLeft:"5px"}}),t.jsx(S,{children:t.jsx(x,{layers:e.layers,setLayers:e.setLayers,insertBeforeLayer:"order-content",sortable:!0})})]})]})},o=b.bind({});o.parameters={};o.args={};const f=()=>{const[n,y]=a.useState(!0),e=a.useContext(d);return a.useEffect(()=>{let r=localStorage.getItem("layers");r=r?JSON.parse(r):[],e.setLayers(r)},[]),a.useEffect(()=>{e.layers.length>0&&localStorage.setItem("mc_background_style",JSON.stringify({backgroundLayers:e.backgroundLayers,symbolLayers:e.symbolLayers}))},[e.backgroundLayers,e.symbolLayers]),a.useEffect(()=>{const r=localStorage.getItem("mc_background_style"),s=r?JSON.parse(r):{backgroundLayers:[],symbolLayers:[]};s.backgroundLayers.length>0?(e.setBackgroundLayers(s?.backgroundLayers),e.setSymbolLayers(s?.symbolLayers)):e.updateStyle(m)},[]),a.useEffect(()=>{e.layers.length>0&&(console.log(e.layers),localStorage.setItem("layers",JSON.stringify(e.layers)))},[e.layers]),t.jsxs(t.Fragment,{children:[t.jsx(g,{buttons:t.jsxs(t.Fragment,{children:[t.jsx(c,{variant:n?"contained":"outlined",onClick:()=>y(!n),sx:{marginRight:{xs:"0px",sm:"10px"}},children:"Sidebar"}),t.jsx(c,{onClick:()=>{localStorage.clear(),location.reload()},children:"reset"})]})}),t.jsxs(u,{open:n,setOpen:y,name:"LayerListItemFactory",children:[t.jsx(i,{onComplete:r=>{e.setLayers(s=>(console.log([r,...s]),[r,...s]))}}),t.jsx(p,{sx:{marginLeft:"5px"}}),t.jsx(S,{children:t.jsx(x,{layers:e.layers,setLayers:e.setLayers})})]})]})},l=f.bind({});l.parameters={};l.args={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const layerContext = useContext(LayerContext);
  useEffect(() => {
    let _layers = localStorage.getItem('layers');
    _layers = _layers ? JSON.parse(_layers) : [];
    layerContext.setLayers(_layers as unknown as LayerConfig[]);
  }, []);
  useEffect(() => {
    if (layerContext.layers.length > 0) {
      localStorage.setItem('layers', JSON.stringify(layerContext.layers));
    }
  }, [layerContext.layers]);
  return <>
            <TopToolbar buttons={<>
                        <Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)} sx={{
        marginRight: {
          xs: '0px',
          sm: '10px'
        }
      }}>
                            Sidebar
                        </Button>
                        <Button onClick={() => {
        localStorage.clear();
        location.reload();
      }}>
                            reset
                        </Button>
                    </>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
                <AddLayerButton onComplete={config => layerContext.setLayers(current => [...current, config])} />
                <SelectStyleButton sx={{
        marginLeft: '5px'
      }} />
                <LayerList>
                    <LayerListItemFactory layers={layerContext.layers} setLayers={layerContext.setLayers} insertBeforeLayer="order-content" sortable={true} />
                </LayerList>
            </Sidebar>
        </>;
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const layerContext = useContext(LayerContext);
  useEffect(() => {
    let _layers = localStorage.getItem('layers');
    _layers = _layers ? JSON.parse(_layers) : [];
    layerContext.setLayers(_layers as unknown as LayerConfig[]);
  }, []);
  useEffect(() => {
    if (layerContext.layers.length > 0) {
      localStorage.setItem('mc_background_style', JSON.stringify({
        backgroundLayers: layerContext.backgroundLayers,
        symbolLayers: layerContext.symbolLayers
      }));
    }
  }, [layerContext.backgroundLayers, layerContext.symbolLayers]);
  useEffect(() => {
    const _bgStyle = localStorage.getItem('mc_background_style');
    const _parsedBgStyle: {
      [key: string]: LayerSpecification[];
    } = _bgStyle ? JSON.parse(_bgStyle) : {
      backgroundLayers: [],
      symbolLayers: []
    };
    if (_parsedBgStyle.backgroundLayers.length > 0) {
      layerContext.setBackgroundLayers(_parsedBgStyle?.backgroundLayers as unknown as LayerSpecification[]);
      layerContext.setSymbolLayers(_parsedBgStyle?.symbolLayers as unknown as LayerSpecification[]);
    } else {
      layerContext.updateStyle(GruvboxStyle as StyleSpecification);
    }
  }, []);
  useEffect(() => {
    if (layerContext.layers.length > 0) {
      console.log(layerContext.layers);
      localStorage.setItem('layers', JSON.stringify(layerContext.layers));
    }
  }, [layerContext.layers]);
  return <>
            <TopToolbar buttons={<>
                        <Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)} sx={{
        marginRight: {
          xs: '0px',
          sm: '10px'
        }
      }}>
                            Sidebar
                        </Button>
                        <Button onClick={() => {
        localStorage.clear();
        location.reload();
      }}>
                            reset
                        </Button>
                    </>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'LayerListItemFactory'}>
                <AddLayerButton onComplete={config => {
        layerContext.setLayers(current => {
          console.log([config, ...current]);
          return [config, ...current];
        });
      }} />
                <SelectStyleButton sx={{
        marginLeft: '5px'
      }} />
                <LayerList>
                    <LayerListItemFactory layers={layerContext.layers} setLayers={layerContext.setLayers} />
                </LayerList>
            </Sidebar>
        </>;
}`,...l.parameters?.docs?.source}}};const E=["FolderExample","StyleJsonExample"];export{o as FolderExample,l as StyleJsonExample,E as __namedExportsOrder,j as default};
