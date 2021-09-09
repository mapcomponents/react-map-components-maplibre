import { layerRemovalTest, sourceRemovalTest } from "../../util";
import { waitFor } from "@testing-library/react";
import { mount } from "enzyme";

import {
  MapContext,
  MapComponentsProvider,
  SimpleDataProvider,
} from "react-map-components-core";
import MlIconLayer from "./MlIconLayer";

import * as d3 from "d3";

jest.mock("d3");

const mockData = {
  time: 1631198270,
  states: [
    [
      "e49406",
      "GLO1233 ",
      "Brazil",
      1631198269,
      1631198269,
      -49.7538,
      -26.9181,
      11277.6,
      false,
      220.36,
      28.9,
      0,
      null,
      11803.38,
      null,
      false,
      0,
    ],
  ],
};

const testComponent = <MlIconLayer />;

const createWrapper = (TestComponent) => {
  return mount(
    <MapComponentsProvider>
      <SimpleDataProvider
        format="json"
        url="fake_url"
        formatData={(d) => ({
          callsign: d[1],
          lon: d[5],
          lat: d[6],
          longitude: d[5],
          latitude: d[6],
          velocity: d[9],
          altitude: d[13],
          origin_country: d[2],
          true_track: -d[10],
          interpolatePos: () => [d[5], d[6]],
        })}
        data_property="states"
      >
        <TestComponent />
      </SimpleDataProvider>
    </MapComponentsProvider>
  );
};
layerRemovalTest(
  "<MlIconLayer />",
  testComponent,
  /^.*\"icondeckgl\-layer\".*$/,
  "icondeckgl-layer",
  () => {
    d3.json.mockResolvedValue(mockData);
  },
  async () => {
    await waitFor(() => expect(d3.json).toHaveBeenCalledTimes(1));
  },
  createWrapper
);
