// tslint:disable:no-submodule-imports
import "regenerator-runtime/runtime"

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

const container = document.createElement("div");
container.id = "root";

document.body.appendChild(container);

Enzyme.configure({adapter: new Adapter()});
