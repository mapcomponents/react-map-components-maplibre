import React, { useContext } from "react";
import { configure } from "enzyme";
import "jest-enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MapContext, MapComponentsProvider } from "map-components-core";
import { mount, configure } from "enzyme";

configure({ adapter: new Adapter() });
