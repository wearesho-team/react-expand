import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { SliderController, SliderControllerContext, Slide, SlideDefaultProps } from "../../../src/Components/Slider";
import { ExpandContext, ExpandController } from "../../../src/Components/ExpandController";

describe("<Slide>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    const commonHandler = () => undefined;
    const id = "id";

    let slideRegistered = false;
    let slideActivated = false;
    let nextSlideActivated = false;
    let prevSlideActivated = false;

    const context: ExpandContext & SliderControllerContext = {
        registerSlide: () => {
            slideRegistered = true;
            return id;
        },
        setAsActive: () => {
            slideActivated = true;
        },
        unregisterSlide: commonHandler,
        slideControl: {
            next: {
                disabled: false,
                setAsActive: () => nextSlideActivated = true
            },
            prev: {
                disabled: false,
                setAsActive: () => prevSlideActivated = true
            }
        },
        slidesList: [],
        ...(new ExpandController({})).getChildContext()
    };

    beforeEach(() => {
        wrapper = mount(
            <Slide initial>
                test
            </Slide>,
            { context }
        );
    });

    afterEach(() => {
        nextSlideActivated = false;
        prevSlideActivated = false;
        slideRegistered = false;
        slideActivated = false;
        wrapper.unmount();
    });

    it("Should not set slide active if `initial` prop equals false on mount", () => {
        slideRegistered = false;
        slideActivated = false;
        wrapper.unmount();

        wrapper = mount(
            <Slide>
                <span>test</span>
            </Slide>,
            { context }
        );

        expect(slideRegistered).to.be.true;
        expect(slideActivated).to.be.false;
    });

    it("Should return null in render if element not expanded", () => {
        expect(wrapper.getDOMNode()).to.not.exist;

        context.changeExpandState(id, true)();
        wrapper.instance().forceUpdate();

        expect(wrapper.getDOMNode()).to.exist;
    });

    it("Should ignore drag when `disableDrag` prop passed", () => {
        wrapper = mount(
            <Slide disableDrag>
                <span>test</span>
            </Slide>,
            { context }
        );

        wrapper.simulate("mouseDown", {
            clientX: SlideDefaultProps.dragSensitive * 2
        });

        wrapper.simulate("mouseUp", {
            clientX: 0
        });

        expect(nextSlideActivated).to.be.false;
        expect(prevSlideActivated).to.be.false;
    });

    it("Should set prev slide active on drag to left", () => {
        wrapper.simulate("mouseDown", {
            clientX: 0
        });

        wrapper.simulate("mouseUp", {
            clientX: SlideDefaultProps.dragSensitive * 2
        });

        expect(prevSlideActivated).to.be.true;
        prevSlideActivated = false;

        wrapper.simulate("touchStart", {
            changedTouches: [{
                clientX: 0
            }]
        });

        wrapper.simulate("touchEnd", {
            changedTouches: [{
                clientX: SlideDefaultProps.dragSensitive * 2
            }]
        });

        expect(prevSlideActivated).to.be.true;
    });

    it("Should set next slide active on drag to right", () => {
        wrapper.simulate("mouseDown", {
            clientX: SlideDefaultProps.dragSensitive * 2
        });

        wrapper.simulate("mouseUp", {
            clientX: 0
        });

        expect(nextSlideActivated).to.be.true;
        nextSlideActivated = false;

        wrapper.simulate("touchStart", {
            changedTouches: [{
                clientX: SlideDefaultProps.dragSensitive * 2
            }]
        });

        wrapper.simulate("touchEnd", {
            changedTouches: [{
                clientX: 0
            }]
        });

        expect(nextSlideActivated).to.be.true;
    });

    it("Should ignore drag less that sensitive", () => {
        wrapper.simulate("mouseDown", {
            clientX: SlideDefaultProps.dragSensitive / 2
        });

        wrapper.simulate("mouseUp", {
            clientX: 0
        });

        expect(nextSlideActivated).to.be.false;
        expect(prevSlideActivated).to.be.false;
    });
});
