import React from "react";

import MlMarker, { MlMarkerProps } from "./MlMarker";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlMarker",
  component: MlMarker,
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args: MlMarkerProps) => <MlMarker {...args} />;

export const ExampleConfig = Template.bind({});
ExampleConfig.args = {
  content: '<b>WhereGroup</b>',
  lng: 7.0851268,
  lat: 50.73884,
  mapId: 'map_1',
};

export const CustomStyledMarker = Template.bind({});
CustomStyledMarker.args = {
  lng: 7.0851268,
  lat: 50.73884,
  anchor: "top-right",
  markerStyle: {
    width: "15px",
    height: "15px",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    border: "2px solid rgba(255, 255, 255, 0.7)",
    borderRadius: "50%",
    boxShadow: "0 6px 12px rgba(90,0,0,0.2), 0 0 0 4px rgba(240,147,251,0.2)"
  },
  containerStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "4px 12px 24px rgba(0,0,0,0.15)",
    borderRadius: "14px",
    border: "1px solid rgba(200, 200, 200, 0.3)",
    backdropFilter: "blur(12px)",
    maxWidth: "300px"
  },
  iframeBodyStyle: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  iframeStyle: {
    borderRadius: "14px",
    overflow: "hidden"
  },
  content: `
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
  `
};
