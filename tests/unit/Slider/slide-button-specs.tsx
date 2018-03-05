import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import {
    Direction,
    SlideButton,
    SliderControllerContext
} from "../../../src/Components/Slider";

describe("<SlideButton>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    const commonHandler = () => undefined;

    let nextSlideActivated = false;
    let prevSlideActivated = false;

    const context: SliderControllerContext = {
        registerSlide: commonHandler,
        setAsActive: commonHandler,
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
        slidesList: []
    };

    beforeEach(() => {
        commonHandler();
        wrapper = mount(
            <SlideButton direction={Direction.next}>
                <span>test</span>
            </SlideButton>,
            { context }
        );
    });

    afterEach(() => {
        nextSlideActivated = false;
        prevSlideActivated = false;
        wrapper.unmount();
    });

    it("Should trigget context event according to `direction` prop", () => {
        wrapper.simulate("click");
        expect(nextSlideActivated).to.be.true;

        wrapper.setProps({
            direction: Direction.prev
        });
        wrapper.update();

        wrapper.simulate("click");
        expect(prevSlideActivated).to.be.true;
    });

    it("Should not trigget context event if default prevented", () => {
        wrapper.simulate("click", {
            defaultPrevented: true
        });
        expect(nextSlideActivated).to.be.false;
    });

    it("Should call `onClick` event from props if it passed", () => {
        let onClickTriggered = false;
        wrapper.setProps({
            onClick: () => onClickTriggered = true
        });
        wrapper.update();

        wrapper.simulate("click");

        expect(onClickTriggered).to.be.true;
    });
});
