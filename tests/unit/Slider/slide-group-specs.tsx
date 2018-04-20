import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import {
    Slide,
    SlideGroup,
    ExpandContext,
    ExpandController,
    SliderController,
    ExpandContextTypes,
    SliderControllerContext,
    SliderControllerContextTypes,
} from "../../../src";

describe("<SlideGroup>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    const commonHandler = () => undefined;

    const context: ExpandContext & SliderControllerContext = {
        registerSlide: commonHandler,
        setAsActive: commonHandler,
        unregisterSlide: commonHandler,
        slideControl: {
            next: {
                disabled: false,
                setAsActive: commonHandler,
            },
            prev: {
                disabled: false,
                setAsActive: commonHandler,
            }
        },
        slidesList: [],
        ...(new ExpandController({})).getChildContext()
    };

    const children = [
        <span key={1}>1</span>,
        <span key={2}>2</span>,
        <span key={3}>3</span>,
        <span key={4}>4</span>
    ]
    beforeEach(() => {
        wrapper = mount(
            <SlideGroup groupSize={1}>
                {children}
            </SlideGroup>,
            { context, childContextTypes: { ...SliderControllerContextTypes, ...ExpandContextTypes } }
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should create group according to `groupSize` prop", () => {
        expect(wrapper.find(Slide)).to.have.length(children.length);

        wrapper.setProps({
            groupSize: 2
        });
        wrapper.update();

        expect(wrapper.find(Slide)).to.have.length(children.length / 2);

        wrapper.setProps({
            groupSize: 3
        });
        wrapper.update();

        expect(wrapper.find(Slide)).to.have.length(Math.ceil(children.length / 3));
    });

    it("Should pass `initial` prop to Slide when `initialGroup` prop passed", () => {
        wrapper.setProps({
            initialGroup: 1
        });
        wrapper.update();

        expect(wrapper.find(Slide).get(0).props.initial).to.be.true;
    });
});
