import React, { useContext } from "react";
import "jest-enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { mount, configure } from "enzyme";

configure({ adapter: new Adapter() });

window.URL.createObjectURL = function () {};
window.HTMLCanvasElement.prototype.getContext = () => {};
