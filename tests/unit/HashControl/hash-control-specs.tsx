import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ExpandController, ExpandContext, HashControl, HashControlDefaultProps } from "../../../src";

describe("<HasControl/>", () => {
    let wrapper: ReactWrapper<{}, {}>;
    let context: ExpandContext;

    beforeEach(() => {
        wrapper = mount(
            <ExpandController>
                <HashControl href="path/#userHash1/path/#userHash2" >
                    test
                </HashControl>
            </ExpandController>
        );

        context = wrapper.find(HashControl).instance().context;
    });

    afterEach(() => wrapper.unmount());

    it("Should set active className when expanded key exist in href", () => {
        context.changeExpandState("userHash1", true)();
        expect(
            wrapper.find(HashControl).getDOMNode().classList.contains(HashControlDefaultProps.activeClassName)
        ).to.be.true;

        context.changeExpandState("userHash1", false)();
        context.changeExpandState("userHash2", true)();
        expect(
            wrapper.find(HashControl).getDOMNode().classList.contains(HashControlDefaultProps.activeClassName)
        ).to.be.true;

        context.changeExpandState("userHash1", true)();
        expect(
            wrapper.find(HashControl).getDOMNode().classList.contains(HashControlDefaultProps.activeClassName)
        ).to.be.true;
    });

    it("Should not set active className when expanded key is not exist in href", () => {
        wrapper.unmount();

        wrapper = mount(
            <ExpandController>
                <HashControl href="">
                    test
                </HashControl>
            </ExpandController>
        );

        context = wrapper.find(HashControl).instance().context;

        context.changeExpandState("userHash1", true)();
        expect(
            wrapper.find(HashControl).getDOMNode().classList.contains(HashControlDefaultProps.activeClassName)
        ).to.be.false;
    });

});
