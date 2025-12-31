import{j as s}from"./index-DtQ6Ei6g.js";import{r as c}from"./iframe-DNf3k_ah.js";import{ab as i}from"./style-18SAlq8x.js";import{d}from"./MapContextDecoratorHooks-DBqzXSqp.js";import"./index-B8Aem304.js";import"./preload-helper-D9Z9MdNV.js";const h={title:"Hooks/useMapState",component:i,argTypes:{},decorators:d},o=l=>{const p=i({...l});return c.useEffect(()=>{},[p.layers]),s.jsx(s.Fragment,{children:s.jsx("div",{style:{position:"fixed",zIndex:1e4,display:"flex",flexWrap:"wrap",top:0,left:0,right:0,bottom:0,maxHeight:"100VH",backgroundColor:"rgba(80,80,80,.8)",padding:"50px",fontSize:"20px",color:"#51ff09",overflow:"hidden",pointerEvents:"none"},children:s.jsx("pre",{children:JSON.stringify(p,null,"	")})})})},e=o.bind({});e.parameters={};e.args={mapId:"map_1",watch:{viewport:!0,layers:!1,sources:!1}};const n=o.bind({});n.parameters={};n.args={mapId:"map_1",watch:{viewport:!1,layers:!0,sources:!1},filter:{includeBaseLayers:!0}};const r=o.bind({});r.parameters={};r.args={mapId:"map_1",watch:{viewport:!1,layers:!0,sources:!1},filter:{includeBaseLayers:!0,matchLayerIds:"water"}};const a=o.bind({});a.parameters={};a.args={mapId:"map_1",watch:{viewport:!1,layers:!0,sources:!1},filter:{includeBaseLayers:!0,matchLayerIds:"water"}};const t=o.bind({});t.parameters={};t.args={mapId:"map_1",watch:{viewport:!1,layers:!0,sources:!1},filter:{includeBaseLayers:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`(props: {
  mapId?: string;
  watch?: {
    layers?: boolean;
    sources?: boolean;
    viewport?: boolean;
  };
  filter?: {
    includeBaseLayers?: boolean;
    matchLayerIds?: RegExp | string;
    matchSourceIds?: RegExp | string;
  };
}) => {
  const mapState = useMapState({
    ...props
  });
  useEffect(() => {
    // Your useEffect logic here
  }, [mapState.layers]);
  return <>
            <div style={{
      position: 'fixed',
      zIndex: 10000,
      display: 'flex',
      flexWrap: 'wrap',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: '100VH',
      backgroundColor: 'rgba(80,80,80,.8)',
      padding: '50px',
      fontSize: '20px',
      color: '#51ff09',
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
                <pre>{JSON.stringify(mapState, null, '\\t')}</pre>
            </div>
        </>;
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`(props: {
  mapId?: string;
  watch?: {
    layers?: boolean;
    sources?: boolean;
    viewport?: boolean;
  };
  filter?: {
    includeBaseLayers?: boolean;
    matchLayerIds?: RegExp | string;
    matchSourceIds?: RegExp | string;
  };
}) => {
  const mapState = useMapState({
    ...props
  });
  useEffect(() => {
    // Your useEffect logic here
  }, [mapState.layers]);
  return <>
            <div style={{
      position: 'fixed',
      zIndex: 10000,
      display: 'flex',
      flexWrap: 'wrap',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: '100VH',
      backgroundColor: 'rgba(80,80,80,.8)',
      padding: '50px',
      fontSize: '20px',
      color: '#51ff09',
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
                <pre>{JSON.stringify(mapState, null, '\\t')}</pre>
            </div>
        </>;
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`(props: {
  mapId?: string;
  watch?: {
    layers?: boolean;
    sources?: boolean;
    viewport?: boolean;
  };
  filter?: {
    includeBaseLayers?: boolean;
    matchLayerIds?: RegExp | string;
    matchSourceIds?: RegExp | string;
  };
}) => {
  const mapState = useMapState({
    ...props
  });
  useEffect(() => {
    // Your useEffect logic here
  }, [mapState.layers]);
  return <>
            <div style={{
      position: 'fixed',
      zIndex: 10000,
      display: 'flex',
      flexWrap: 'wrap',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: '100VH',
      backgroundColor: 'rgba(80,80,80,.8)',
      padding: '50px',
      fontSize: '20px',
      color: '#51ff09',
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
                <pre>{JSON.stringify(mapState, null, '\\t')}</pre>
            </div>
        </>;
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`(props: {
  mapId?: string;
  watch?: {
    layers?: boolean;
    sources?: boolean;
    viewport?: boolean;
  };
  filter?: {
    includeBaseLayers?: boolean;
    matchLayerIds?: RegExp | string;
    matchSourceIds?: RegExp | string;
  };
}) => {
  const mapState = useMapState({
    ...props
  });
  useEffect(() => {
    // Your useEffect logic here
  }, [mapState.layers]);
  return <>
            <div style={{
      position: 'fixed',
      zIndex: 10000,
      display: 'flex',
      flexWrap: 'wrap',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: '100VH',
      backgroundColor: 'rgba(80,80,80,.8)',
      padding: '50px',
      fontSize: '20px',
      color: '#51ff09',
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
                <pre>{JSON.stringify(mapState, null, '\\t')}</pre>
            </div>
        </>;
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`(props: {
  mapId?: string;
  watch?: {
    layers?: boolean;
    sources?: boolean;
    viewport?: boolean;
  };
  filter?: {
    includeBaseLayers?: boolean;
    matchLayerIds?: RegExp | string;
    matchSourceIds?: RegExp | string;
  };
}) => {
  const mapState = useMapState({
    ...props
  });
  useEffect(() => {
    // Your useEffect logic here
  }, [mapState.layers]);
  return <>
            <div style={{
      position: 'fixed',
      zIndex: 10000,
      display: 'flex',
      flexWrap: 'wrap',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: '100VH',
      backgroundColor: 'rgba(80,80,80,.8)',
      padding: '50px',
      fontSize: '20px',
      color: '#51ff09',
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
                <pre>{JSON.stringify(mapState, null, '\\t')}</pre>
            </div>
        </>;
}`,...t.parameters?.docs?.source}}};const S=["ViewportOnly","IncludeBaseLayers","MatchLayerIdString","MatchLayerIdRegexp","NonBaseLayersOnly"];export{n as IncludeBaseLayers,a as MatchLayerIdRegexp,r as MatchLayerIdString,t as NonBaseLayersOnly,e as ViewportOnly,S as __namedExportsOrder,h as default};
