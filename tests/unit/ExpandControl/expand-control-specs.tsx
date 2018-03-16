import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ExpandContext, ExpandController } from "../../../src/Components/ExpandController";
import { ExpandControl } from "../../../src/Components/ExpandControl";

describe("<ExpandControl/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    let context: ExpandContext;
    const expandId = "expand-id";

    beforeEach(() => {
        wrapper = mount(
            <ExpandController>
                <ExpandControl
                    expandId={expandId}
                    triggerEvent="hover"
                >
                    <div />
                </ExpandControl>
            </ExpandController>
        );

        context = wrapper.find(ExpandControl).instance().context;
    });

    afterEach(() => wrapper.unmount());

    it("Should switch expand state on hover  (and on touch) when prop `triggerEvent` equals `hover`", () => {
        expect(context.isExpanded(expandId)).to.be.false;
        wrapper.simulate("click");
        expect(context.isExpanded(expandId)).to.be.false;

        wrapper.simulate("mouseOver");
        expect(context.isExpanded(expandId)).to.be.true;
        wrapper.simulate("mouseLeave");
        expect(context.isExpanded(expandId)).to.be.false;

        wrapper.simulate("touchStart");
        expect(context.isExpanded(expandId)).to.be.true;
        wrapper.simulate("touchStart");
        expect(context.isExpanded(expandId)).to.be.false;
    });

    it("Should switch expand state on click when prop `triggerEvent` equals `click`", () => {
        wrapper.unmount();

        wrapper = mount(
            <ExpandController>
                <ExpandControl expandId={expandId}>
                    <div />
                </ExpandControl>
            </ExpandController>
        );
        context = wrapper.find(ExpandControl).instance().context;

        expect(context.isExpanded(expandId)).to.be.false;
        wrapper.simulate("mouseover");
        expect(context.isExpanded(expandId)).to.be.false;
        wrapper.simulate("mouseleave");
        expect(context.isExpanded(expandId)).to.be.false;
        wrapper.simulate("click");
        expect(context.isExpanded(expandId)).to.be.true;
        wrapper.simulate("click");
        expect(context.isExpanded(expandId)).to.be.false;
    });

    it("Should call prop event if it passed", () => {
        wrapper.unmount();

        let onClickEvent = false;
        let onMouseOverEvent = false;
        let onMouseLeaveEvent = false;
        let onTouchStartEvent = false;

        // tslint:disable:jsx-no-lambda
        wrapper = mount(
            <ExpandController>
                <ExpandControl
                    expandId={expandId}
                    onClick={() => onClickEvent = true}
                    onMouseOver={() => onMouseOverEvent = true}
                    onMouseLeave={() => onMouseLeaveEvent = true}
                    onTouchStart={() => onTouchStartEvent = true}
                    triggerEvent="hover"
                >
                    <div />
                </ExpandControl>
            </ExpandController>
        );
        // tslint:enable:jsx-no-lambda
        wrapper.find(ExpandControl).simulate("click");
        wrapper.find(ExpandControl).simulate("mouseover");
        wrapper.find(ExpandControl).simulate("mouseleave");
        wrapper.find(ExpandControl).simulate("touchStart");

        expect(onClickEvent).to.be.true;
        expect(onMouseOverEvent).to.be.true;
        expect(onMouseLeaveEvent).to.be.true;
        expect(onTouchStartEvent).to.be.true;
    });

    it("Should set trigger event as `click` if prop is invalid", () => {
        wrapper.unmount();

        wrapper = mount(
            <ExpandController>
                <ExpandControl
                    expandId={expandId}
                    triggerEvent={"invalid prop" as any}
                >
                    <div />
                </ExpandControl>
            </ExpandController>
        );
        context = wrapper.find(ExpandControl).instance().context;

        wrapper.find(ExpandControl).simulate("click");
        expect(context.isExpanded(expandId)).to.be.true;
        wrapper.simulate("mouseover");
        expect(context.isExpanded(expandId)).to.be.true;
        wrapper.simulate("mouseleave");
        expect(context.isExpanded(expandId)).to.be.true;
        wrapper.simulate("click");
        expect(context.isExpanded(expandId)).to.be.false;
        wrapper.simulate("click");
        expect(context.isExpanded(expandId)).to.be.true;
    });

    it("Should always set expand state accodring to prop `staticState` if it passed", () => {
        wrapper.unmount();

        wrapper = mount(
            <ExpandController>
                <ExpandControl
                    expandId={expandId}
                    staticState={false}
                >
                    <div />
                </ExpandControl>
            </ExpandController>
        );
        context = wrapper.find(ExpandControl).instance().context;

        wrapper.find(ExpandControl).simulate("click");
        expect(context.isExpanded(expandId)).to.be.false;
        wrapper.simulate("mouseover");
        expect(context.isExpanded(expandId)).to.be.false;
        wrapper.simulate("mouseleave");
        expect(context.isExpanded(expandId)).to.be.false;
    });

    it("Should set initial state as `true` if prop `activeOnMount` is passed", () => {
        wrapper.unmount();

        wrapper = mount(
            <ExpandController>
                <ExpandControl
                    expandId={expandId}
                    activeOnMount
                >
                    <div />
                </ExpandControl>
            </ExpandController>
        );
        context = wrapper.find(ExpandControl).instance().context;

        expect(context.isExpanded(expandId)).to.be.true;
        wrapper.find(ExpandControl).simulate("click");
    });
});
