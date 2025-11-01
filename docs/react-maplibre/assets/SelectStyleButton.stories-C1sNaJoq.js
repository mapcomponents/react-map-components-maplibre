import{j as e}from"./index-CmvxiA_N.js";import{r}from"./iframe-BZf6mwbH.js";import{b9 as o,b2 as i,bd as p,b as c,B as l,S,b5 as d,b6 as m}from"./style-DGSU19-Y.js";import{d as u}from"./EmptyMapDecorator-xes2IYqI.js";import"./index-NYlob9aH.js";import"./preload-helper-D9Z9MdNV.js";const B={title:"UiComponents/SelectStyleButton",component:o,argTypes:{},decorators:u},x=()=>{const s=r.useContext(i),[n,a]=r.useState(!0);return r.useEffect(()=>{s.updateStyle(p)},[]),e.jsxs(e.Fragment,{children:[e.jsx(c,{buttons:e.jsx(l,{variant:n?"contained":"outlined",onClick:()=>a(!n),sx:{marginRight:{xs:"0px",sm:"10px"}},children:"Sidebar"})}),e.jsxs(S,{open:n,setOpen:a,name:"Layers",children:[e.jsx(o,{}),e.jsx(d,{children:e.jsx(m,{layers:[]})})]})]})},t=x.bind({});t.parameters={};t.args={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  const layerContext = useContext(LayerContext);
  const [openSidebar, setOpenSidebar] = useState(true);
  useEffect(() => {
    layerContext.updateStyle(MonokaiStyle as StyleSpecification);
  }, []);
  return <>
            <TopToolbar buttons={<Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)} sx={{
      marginRight: {
        xs: '0px',
        sm: '10px'
      }
    }}>
                        Sidebar
                    </Button>} />
            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
                <SelectStyleButton />
                <LayerList>
                    <LayerListItemFactory layers={[]} />
                </LayerList>
            </Sidebar>
        </>;
}`,...t.parameters?.docs?.source}}};const g=["SelectStyleButtonExample"];export{t as SelectStyleButtonExample,g as __namedExportsOrder,B as default};
