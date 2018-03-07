import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ExpandContext, ExpandController } from "../../../src/Components/ExpandController";
import { ExpandControl, TriggerEvents } from "../../../src/Components/ExpandControl";

describe("<ExpandControl/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    let context: ExpandContext;
    const expandId = "expand-id";

    beforeEach(() => {
        wrapper = mount(
            <ExpandController>
                <ExpandControl
                    expandId={expandId}
                    triggerEvent={TriggerEvents.hover}
                >
                    <div/>
                </ExpandControl>
            </ExpandController>
        );

        context = wrapper.find(ExpandControl).instance().context;
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should change context only on mouse over when trigger event is `hover`", () => {
        expect(context.isExpanded(expandId)).to.be.false;
        wrapper.simulate("click");
        expect(context.isExpanded(expandId)).to.be.false;
        wrapper.simulate("mouseover");
        expect(context.isExpanded(expandId)).to.be.true;
    });

    it("Should change context only on click when trigger event is `click`", () => {
        wrapper.unmount();

        wrapper = mount(
            <ExpandController>
                <ExpandControl expandId={expandId}>
                    <div/>
                </ExpandControl>
            </ExpandController>
        );
        context = wrapper.find(ExpandControl).instance().context;

        expect(context.isExpanded(expandId)).to.be.false;
        wrapper.simulate("mouseover");
        expect(context.isExpanded(expandId)).to.be.false;
        wrapper.simulate("click");
        expect(context.isExpanded(expandId)).to.be.true;
    });

    it("Should change context from true to false on click event", () => {
        wrapper.unmount();

        wrapper = mount(
            <ExpandController>
                <ExpandControl expandId={expandId} state={false}>
                    <div/>
                </ExpandControl>
            </ExpandController>
        );
        context = wrapper.find(ExpandControl).instance().context;

        context.changeExpandState(expandId, true)();
        expect(context.isExpanded(expandId)).to.be.true;

        wrapper.simulate("mouseover");
        expect(context.isExpanded(expandId)).to.be.true;
        wrapper.simulate("click");
        expect(context.isExpanded(expandId)).to.be.false;
    });

    it("Should change context from true to false on hover event", () => {
        wrapper.unmount();

        wrapper = mount(
            <ExpandController>
                <ExpandControl
                    expandId={expandId}
                    state={false}
                    triggerEvent={TriggerEvents.hover}
                >
                    <div/>
                </ExpandControl>
            </ExpandController>
        );
        context = wrapper.find(ExpandControl).instance().context;

        context.changeExpandState(expandId, true)();
        expect(context.isExpanded(expandId)).to.be.true;

        wrapper.simulate("click");
        expect(context.isExpanded(expandId)).to.be.true;
        wrapper.simulate("mouseover");
        expect(context.isExpanded(expandId)).to.be.false;
    });
});
