import{j as s}from"./index-DtQ6Ei6g.js";import{ae as e}from"./style-18SAlq8x.js";import{m as i}from"./MapContextDecorator-BjqxFiZL.js";import"./iframe-DNf3k_ah.js";import"./preload-helper-D9Z9MdNV.js";import"./index-B8Aem304.js";const u={title:"MapComponents/MlMarker",component:e,decorators:i,parameters:{docs:{description:{component:"A customizable marker component for MapLibre maps that supports rich HTML content."}}},argTypes:{lng:{control:{type:"number",step:1e-4}},lat:{control:{type:"number",step:1e-4}},contentOffset:{control:{type:"range",min:0,max:20,step:1}},markerStyle:{control:{type:"object"}},containerStyle:{control:{type:"object"}},iframeStyle:{control:{type:"object"}},iframeBodyStyle:{control:{type:"object"}},passEventsThrough:{control:{type:"boolean"}}}},t=a=>s.jsx(e,{...a}),r=t.bind({});r.args={lng:7.0851268,lat:50.73884,mapId:"map_1",content:`
    <div style="padding: 12px; font-family: Arial, sans-serif; max-width: 220px;">
      <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #3b82f6;">WhereGroup</div>
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <span style="color: #6b7280; font-size: 14px;">Bonn, Germany</span>
      </div>
      <p>
        Geospatial technologies and open-source GIS solutions.
      </p>
      <div style="font-size: 13px; color: #6b7280;">
        <div>📍 50.73884, 7.0851268</div>
      </div>
    </div>
  `,containerStyle:{borderRadius:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.1)",overflow:"hidden",backgroundColor:"white"}};const o=t.bind({});o.args={lng:7.0851268,lat:50.73884,anchor:"top-right",passEventsThrough:!1,markerStyle:{width:"15px",height:"15px",background:"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",border:"2px solid rgba(255, 255, 255, 0.7)",borderRadius:"50%",boxShadow:"0 6px 12px rgba(90,0,0,0.2), 0 0 0 4px rgba(240,147,251,0.2)"},containerStyle:{backgroundColor:"rgba(255, 255, 255, 0.9)",boxShadow:"4px 12px 24px rgba(0,0,0,0.15)",borderRadius:"14px",border:"1px solid rgba(200, 200, 200, 0.3)",backdropFilter:"blur(12px)",maxWidth:"300px"},iframeBodyStyle:{fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, sans-serif"},iframeStyle:{borderRadius:"14px",overflow:"hidden"},content:`
    <style>
      .custom-marker-container {
        padding: 16px;
        color: #444;
      }
      .custom-marker-header {
        font-size: 18px;
        font-weight: 600;
        color: #f5576c;
        margin-bottom: 10px;
      }
      .custom-marker-details {
        display: flex;
        margin-bottom: 12px;
        align-items: center;
      }
      .custom-marker-icon {
        width: 38px;
        height: 38px;
        background: #ffe0ed;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
      }
      .custom-marker-icon-content {
        color: #f5576c;
        font-size: 16px;
      }
      .custom-marker-info {
        font-weight: 500;
      }
      .custom-marker-subinfo {
        font-size: 13px;
        color: #777;
        margin-top: 2px;
      }
      .custom-marker-box {
        background: #ffe0ed;
        border-radius: 8px;
        padding: 10px;
        font-size: 13px;
      }
      .custom-marker-box div {
        margin-bottom: 4px;
      }
      .custom-marker-status {
        color: #22c55e;
      }
    </style>
    <div class="custom-marker-container">
      <div class="custom-marker-header">Location Details</div>
      <div class="custom-marker-details">
        <div class="custom-marker-icon">
          <div class="custom-marker-icon-content">📍</div>
        </div>
        <div>
          <div class="custom-marker-info">WhereGroup Headquarters</div>
          <div class="custom-marker-subinfo">Bonn, Germany</div>
        </div>
      </div>
      <div class="custom-marker-box">
        <div><strong>Coordinates:</strong> 50.73884, 7.0851268</div>
        <div><strong>Status:</strong> <span class="custom-marker-status">Active</span></div>
        <div><strong>Last updated:</strong> Today</div>
      </div>
    </div>
  `};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"(args: MlMarkerProps) => <MlMarker {...args} />",...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"(args: MlMarkerProps) => <MlMarker {...args} />",...o.parameters?.docs?.source}}};const g=["ExampleConfig","CustomStyledMarker"];export{o as CustomStyledMarker,r as ExampleConfig,g as __namedExportsOrder,u as default};
