import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ComponentWithContext } from "../helpers/ComponentWithContext";

import { ExpandContext, ExpandController, ExpandContextTypes } from "../../../src/Components/ExpandController";

describe("<ExpandController/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    let context: ExpandContext;

    beforeEach(() => {
        wrapper = mount(
            <ExpandController>
                <ComponentWithContext expandKey="expand" data-expand="expand" />,
            </ExpandController>
        );

        document.querySelector("#root").appendChild(wrapper.getDOMNode());
        context = wrapper.find(ComponentWithContext).instance().context;
    });

    afterEach(() => {
        document.querySelector("#root").removeChild(wrapper.getDOMNode());
    });

    it("Should return `false` on `isExpanded` if element not expanded", () => {
        expect(context.isExpanded("expand")).to.be.false;
    });

    it("Should change expand element state on `changeExpandState`", () => {
        context.changeExpandState("expand")();
        expect(context.isExpanded("expand")).to.be.true;

        context.changeExpandState("expand")();
        expect(context.isExpanded("expand")).to.be.false;

        context.changeExpandState("expand", false)();
        expect(context.isExpanded("expand")).to.be.false;

        context.changeExpandState("expand", true)();
        expect(context.isExpanded("expand")).to.be.true;
    });

    it("Should return passed expand state", () => {
        context.changeExpandState("expand")();
        expect(context.getState("expand")).to.be.undefined;

        const state = {
            test: "test"
        };

        context.changeExpandState("expand", true, state)();
        expect(context.getState("expand")).to.equal(state);
    });

    it("Should change expand state on clicking button with `changeExpandState` event", () => {
        expect(context.isExpanded("expand")).to.be.false;
        wrapper.find(".expand-button").simulate("click");
        expect(context.isExpanded("expand")).to.be.true;
    });

    it("Should change expand state to false if click event triggered on element without data attribute", () => {
        wrapper.find(".expand-button").simulate("click");
        expect(context.isExpanded("expand")).to.be.true;
        document.body.click();
        expect(context.isExpanded("expand")).to.be.false;
    });

    it("Shoudld not change state if click event triggered on element when `data-expand-keep` passed", () => {
        document.querySelector("#root").removeChild(wrapper.getDOMNode());

        wrapper = mount(
            <ExpandController>
                <ComponentWithContext expandKey="expand-keep" data-expand-keep="expand-keep" />,
            </ExpandController>
        );

        document.querySelector("#root").appendChild(wrapper.getDOMNode());
        context = wrapper.find(ComponentWithContext).instance().context;

        wrapper.find(".expand-button").simulate("click");
        expect(context.isExpanded("expand-keep")).to.be.true;
        document.body.click();
        expect(context.isExpanded("expand-keep")).to.be.true;
        wrapper.find(".expand-button").simulate("click");
        expect(context.isExpanded("expand-keep")).to.be.false;
    });
});
