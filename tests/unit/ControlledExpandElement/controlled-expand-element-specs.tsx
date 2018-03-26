import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ExpandContext, ExpandController } from "../../../src/Components/ExpandController";
import { ControlledExpandElement } from "../../../src/Components/ControlledExpandElement";

describe("<ControlledExpandElement/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    let context: ExpandContext;
    const expandId = "expand-id";

    beforeEach(() => {
        wrapper = mount(
            <ExpandController>
                <ControlledExpandElement
                    expandId={expandId}
                    closeOnOutside
                >
                    <div />
                </ControlledExpandElement>
            </ExpandController>
        );

        context = wrapper.find(ControlledExpandElement).instance().context;
    });

    afterEach(() => wrapper.unmount());

    it("Should close on click outside element when according prop passed", () => {
        context.changeExpandState(expandId, true)();
        expect( wrapper.find(ControlledExpandElement).getDOMNode().getAttribute("data-expand-keep")).to.be.null;

        wrapper.unmount();
        wrapper = mount(
            <ExpandController>
                <ControlledExpandElement expandId={expandId}>
                    <div />
                </ControlledExpandElement>
            </ExpandController>
        );
        context = wrapper.find(ControlledExpandElement).instance().context;
        context.changeExpandState(expandId, true)();

        expect( wrapper.find(ControlledExpandElement).getDOMNode().getAttribute("data-expand-keep")).to.exist;
    });
})
