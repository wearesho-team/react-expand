import { expect } from "chai";
import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { ReactWrapper, mount } from "enzyme";

import { ComponentWithContext } from "../helpers/ComponentWithContext";

import { ExpandContext, ExpandController } from "../../../src/Components/ExpandController";

describe("<ExpandController/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    let context: ExpandContext;

    const container = document.createElement("div");
    container.id = "content";
    document.body.appendChild(container);

    beforeEach(() => {
        context = (new ExpandController({})).getChildContext();
        wrapper = mount(
            <ComponentWithContext expandKey="expand" />,
            { context }
        );

        render(
            <ExpandController>
                <ComponentWithContext expandKey="expand" />
            </ExpandController>,
            document.body.querySelector("#content")
        );
    });

    afterEach(() => {
        unmountComponentAtNode(document.body.querySelector("#content"));
        wrapper.unmount();
        context = undefined;
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
        const parent = document.querySelector(".component-with-context");

        expect(parent.getAttribute("data-is-open")).to.equals("false");
        document.querySelector<HTMLButtonElement>(".expand-button").click();
        expect(parent.getAttribute("data-is-open")).to.equals("true");
    });

    it("Should not change expand state on click button without data attribute", () => {
        const parent = document.querySelector(".component-with-context");

        expect(parent.getAttribute("data-is-open")).to.equals("false");
        document.querySelector<HTMLButtonElement>(".not-expand-button").click();
        expect(parent.getAttribute("data-is-open")).to.equals("false");
    });
});
