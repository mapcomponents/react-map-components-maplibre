import { layerRemovalTest, sourceRemovalTest } from "../../util";
import { waitFor } from "@testing-library/react";

import MlDeckGlLayer from "./MlDeckGlLayer";
import * as d3 from "d3";

jest.mock("d3");

const mockData = [{ LAT: 33, LON: 33, Verspätungsminuten: 33 }];

const testComponent = <MlDeckGlLayer />;

let testParams = [
  "<MlDeckGlLayer />",
  testComponent,
  /^.*\"deckgl\-layer\".*$/,
  "deckgl-layer",
  () => {
    d3.csv.mockResolvedValue(mockData);
  },
  async () => {
    await waitFor(() => expect(d3.csv).toHaveBeenCalledTimes(1));
  },
];

layerRemovalTest(...testParams);
