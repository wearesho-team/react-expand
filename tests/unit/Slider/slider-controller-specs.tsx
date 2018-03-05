import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";
import { useFakeTimers, SinonFakeTimers } from "sinon";

import {
    SliderController,
    SliderControllerContext,
    SliderControllerDefaultProps
} from "../../../src/Components/Slider";
import { ExpandContext, ExpandController } from "../../../src/Components/ExpandController";

describe("<SliderController/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    let context: SliderControllerContext;
    let timer: SinonFakeTimers;

    let slideOne: string;
    let slideTwo: string;

    beforeEach(() => {
        wrapper = mount(
            <SliderController>
                <div />
            </SliderController>,
            { context: (new ExpandController({})).getChildContext() }
        );

        context = (wrapper.instance() as any).getChildContext();
        slideOne = context.registerSlide();
        slideTwo = context.registerSlide();

        timer = useFakeTimers();
    });

    afterEach(() => {
        timer.restore();

        context.unregisterSlide(slideOne);
        context.unregisterSlide(slideTwo);

        wrapper.unmount();
    });

    it("Should set first slide active if no active slides on mount", () => {
        wrapper.context().changeExpandState(slideOne, false)();
        wrapper.instance().componentDidMount();
        expect(wrapper.context().isExpanded(slideOne)).to.be.true;
    });

    it("Should set first slide active if no active slides on update", () => {
        wrapper.context().changeExpandState(slideOne, false)();
        wrapper.instance().forceUpdate();

        expect(wrapper.context().isExpanded(slideOne)).to.be.true;
    });

    it("Should ignore tryings to change active slide if no slides registered", () => {
        context.unregisterSlide(slideOne);
        context.unregisterSlide(slideTwo);

        wrapper.instance().forceUpdate();
        expect((wrapper.instance().state as any).activeSlide).to.equal(-1);

        wrapper.unmount();
        wrapper.mount();

        expect((wrapper.instance().state as any).activeSlide).to.equal(-1);
    });

    it("Should set next slide active on `context.context.slideControl.next.setAsActive`", () => {
        context.slideControl.next.setAsActive();
        expect(wrapper.context().isExpanded(slideTwo)).to.be.true;
        expect(wrapper.context().isExpanded(slideOne)).to.be.false;
    });

    it("Should ignore `context.context.slideControl.next.setAsActive` if active slide is last", () => {
        context.slideControl.next.setAsActive();
        expect(wrapper.context().isExpanded(slideTwo)).to.be.true;
        expect(wrapper.context().isExpanded(slideOne)).to.be.false;

        context.slideControl.next.setAsActive();
        expect(wrapper.context().isExpanded(slideTwo)).to.be.true;
        expect(wrapper.context().isExpanded(slideOne)).to.be.false;
    });

    it("Should ignore `context.context.slideControl.prev.setAsActive` if active slide is first", () => {
        context.slideControl.prev.setAsActive();
        expect(wrapper.context().isExpanded(slideTwo)).to.be.false;
        expect(wrapper.context().isExpanded(slideOne)).to.be.true;

        context.slideControl.prev.setAsActive();
        expect(wrapper.context().isExpanded(slideTwo)).to.be.false;
        expect(wrapper.context().isExpanded(slideOne)).to.be.true;
    });

    it("Should set prev slide active on `context.context.slideControl.prev.setAsActive`", () => {
        context.slideControl.next.setAsActive();
        expect(wrapper.context().isExpanded(slideTwo)).to.be.true;
        expect(wrapper.context().isExpanded(slideOne)).to.be.false;

        context.slideControl.prev.setAsActive();
        expect(wrapper.context().isExpanded(slideTwo)).to.be.false;
        expect(wrapper.context().isExpanded(slideOne)).to.be.true;
    });

    it("Should create time interval when `autoPlay` prop passed on mount", () => {
        wrapper.unmount();

        wrapper = mount(
            <SliderController autoPlay>
                <div />
            </SliderController>,
            { context: (new ExpandController({})).getChildContext() }
        );

        expect((wrapper.instance() as any).timer).to.be.not.undefined;
    });

    it("Should changing active slide by one if `autoPlay` prop equal true", () => {
        wrapper.unmount();

        wrapper = mount(
            <SliderController autoPlay>
                <div />
            </SliderController>,
            { context: (new ExpandController({})).getChildContext() }
        );

        expect((wrapper.instance() as any).timer).to.be.not.undefined;

        context = (wrapper.instance() as any).getChildContext();
        slideOne = context.registerSlide();
        slideTwo = context.registerSlide();

        timer.tick(SliderControllerDefaultProps.autoPlayDelay);
        expect(wrapper.context().isExpanded(slideTwo)).to.be.true;
        expect(wrapper.context().isExpanded(slideOne)).to.be.false;

        timer.tick(SliderControllerDefaultProps.autoPlayDelay);
        expect(wrapper.context().isExpanded(slideTwo)).to.be.false;
        expect(wrapper.context().isExpanded(slideOne)).to.be.true;
    });
});
