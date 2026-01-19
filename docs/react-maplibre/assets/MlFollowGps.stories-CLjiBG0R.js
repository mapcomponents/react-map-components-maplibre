import{j as o}from"./index-BpemSb3a.js";import{r as l}from"./iframe-j72i5ZUO.js";import{v as p,u as a}from"./style-DWWhlVM-.js";import{d as m}from"./NoNavToolsDecorator-D1rycj_v.js";import"./index-C-CykIMM.js";import"./preload-helper-D9Z9MdNV.js";const M={title:"MapComponents/MlFollowGps",component:p,argTypes:{},decorators:m},x=s=>{const n=a(i=>i.breakpoints.down("md"));return o.jsx(o.Fragment,{children:o.jsx("div",{style:{position:"fixed",right:"11px",bottom:n?"130px":"45px",display:"flex",flexDirection:"column",gap:"5px",zIndex:1e3},children:o.jsx(p,{...s})})})},c=s=>{const n=a(r=>r.breakpoints.down("md")),[i,d]=l.useState(!0);return l.useEffect(()=>{const r=setTimeout(()=>{d(!1)},7e3);return()=>clearTimeout(r)},[]),o.jsxs(o.Fragment,{children:[i&&o.jsx("div",{style:{position:"fixed",right:n?"70px":"46px",color:"#009ee0",backgroundColor:"#fff",bottom:n?"56px":"48px",fontSize:"20px",display:"flex",fontFamily:"sans-serif",flexDirection:"column",gap:"5px",zIndex:1e3},children:"MlFollowGPS Button ➤"}),o.jsx("div",{style:{position:"fixed",right:"11px",bottom:n?"130px":"45px",display:"flex",flexDirection:"column",gap:"5px",zIndex:1e3},children:o.jsx(p,{...s})})]})},e=x.bind({});e.parameters={};e.args={followUserPosition:!1};const t=c.bind({});t.parameters={};t.args={followUserPosition:!1};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`(props: MlFollowGpsProps) => {
  const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  return <>
            <div style={{
      position: 'fixed',
      right: '11px',
      bottom: mediaIsMobile ? '130px' : '45px',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      zIndex: 1000
    }}>
                <MlFollowGps {...props} />
            </div>
        </>;
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`(props: MlFollowGpsProps) => {
  const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [showTooltip, setShowTooltip] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);
  return <>
            {showTooltip && <div style={{
      position: 'fixed',
      right: mediaIsMobile ? '70px' : '46px',
      color: '#009ee0',
      backgroundColor: '#fff',
      bottom: mediaIsMobile ? '56px' : '48px',
      fontSize: '20px',
      display: 'flex',
      fontFamily: 'sans-serif',
      flexDirection: 'column',
      gap: '5px',
      zIndex: 1000
    }}>
                    MlFollowGPS Button ➤
                </div>}

            <div style={{
      position: 'fixed',
      right: '11px',
      bottom: mediaIsMobile ? '130px' : '45px',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      zIndex: 1000
    }}>
                <MlFollowGps {...props} />
            </div>
        </>;
}`,...t.parameters?.docs?.source}}};const y=["StandardConfig","CatalogueDemo"];export{t as CatalogueDemo,e as StandardConfig,y as __namedExportsOrder,M as default};
