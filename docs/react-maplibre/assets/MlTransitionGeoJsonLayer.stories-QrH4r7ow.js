import{j as t}from"./index-D_jt9QYA.js";import{r as o}from"./iframe-B-5v0xel.js";import{aN as u,l as g,b as j,B as x}from"./style-BToUMRiZ.js";import{m as b}from"./MapContextDecorator-BM3FNXbA.js";import"./index-lrHrizay.js";import"./preload-helper-D9Z9MdNV.js";const y="Feature",T={name:"sample1"},_={type:"LineString",coordinates:[[7.1074676513671875,50.74340774029213],[7.0992279052734375,50.756441089372665],[7.079315185546874,50.764693667025014],[7.045669555664062,50.77945780529241],[7.030563354492187,50.79161300845443],[7.0291900634765625,50.80940599750376],[7.0236968994140625,50.820685846099174],[7.0085906982421875,50.825891011253546],[6.9879913330078125,50.826758482363275],[6.97906494140625,50.835432306955276],[6.9824981689453125,50.84583876895451],[6.9962310791015625,50.85147463352982],[7.012023925781249,50.85710981721644],[7.021636962890625,50.86664473085768],[7.0367431640625,50.872278081520406],[7.0477294921875,50.877044231111014],[7.052536010742187,50.88397594225127]]},l={type:y,properties:T,geometry:_},R="Feature",S={name:"sample2"},B={type:"LineString",coordinates:[[7.0635223388671875,50.71385204707258],[7.06146240234375,50.709721458354075],[7.063865661621094,50.70298129536074],[7.064552307128906,50.69906720767511],[7.059059143066406,50.69428287906098],[7.05596923828125,50.68797551838366],[7.0580291748046875,50.680797145321655],[7.062835693359375,50.67514068397085],[7.060432434082031,50.6686131506577],[7.051849365234375,50.659255436656736],[7.044639587402344,50.6512019574539],[7.0484161376953125,50.64271166020676],[7.0566558837890625,50.63748609931014]]},E={type:R,properties:S,geometry:B},h={title:"MapComponents/MlTransitionGeoJsonLayer",component:u,argTypes:{url:{},layer:{}},decorators:b},k=c=>{const s=g({mapId:"map_1"}),[n,a]=o.useState(l),r=o.useRef(!1),[f,i]=o.useState(!0);o.useEffect(()=>{m(6e3)},[]),o.useEffect(()=>{!s.map||r.current||(r.current=!0,s.map.setCenter({lng:7.137609868988648,lat:50.74746799549129}),s.map.setZoom(9.5),setTimeout(()=>{p()},3e3))},[n,s.map]);function p(){n?.properties?.name==="sample1"?a(E):n?.properties?.name==="sample2"&&a(l)}function m(d){setTimeout(()=>{i(!1)},d)}return t.jsxs(t.Fragment,{children:[t.jsx(j,{unmovableButtons:t.jsx(x,{variant:"outlined",onClick:()=>{p(),i(!0),m(2800)},sx:{marginRight:{xs:"5px",sm:"10px"}},disabled:f,children:"Restart"})}),t.jsx(u,{type:"line",geojson:n,transitionTime:2e3,...c})]})},e=k.bind({});e.parameters={};e.args={paint:{"line-color":"red","line-width":4}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`(props: MlTransitionGeoJsonLayerProps) => {
  const mapHook = useMap({
    mapId: 'map_1'
  });
  const [geojson, setGeojson] = useState<Feature>(sample_geojson_1 as Feature);
  const initializedRef = useRef(false);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    enableButton(6000);
  }, []);
  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    initializedRef.current = true;
    mapHook.map.setCenter({
      lng: 7.137609868988648,
      lat: 50.74746799549129
    });
    mapHook.map.setZoom(9.5);
    setTimeout(() => {
      toogleSource();
    }, 3000);
  }, [geojson, mapHook.map]);
  function toogleSource() {
    if (geojson?.properties?.name === 'sample1') {
      setGeojson(sample_geojson_2 as Feature);
    } else if (geojson?.properties?.name === 'sample2') {
      setGeojson(sample_geojson_1 as Feature);
    }
  }
  function enableButton(time: number) {
    setTimeout(() => {
      setDisabled(false);
    }, time);
  }
  return <>
            <TopToolbar unmovableButtons={<Button variant="outlined" onClick={() => {
      toogleSource();
      setDisabled(true);
      enableButton(2800);
    }} sx={{
      marginRight: {
        xs: '5px',
        sm: '10px'
      }
    }} disabled={disabled}>
                        Restart
                    </Button>} />
            <MlTransitionGeoJsonLayer type="line" geojson={geojson} transitionTime={2000} {...props} />
        </>;
}`,...e.parameters?.docs?.source}}};const D=["ExampleConfig"];export{e as ExampleConfig,D as __namedExportsOrder,h as default};
