import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { SliderController, SliderControllerContext, Dots, DotsDefaultProps } from "../../../src/Components/Slider";
import { ExpandContext, ExpandController } from "../../../src/Components/ExpandController";

describe("<Dots>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    const commonHandler = () => undefined;

    const slidesList = ["1", "2", "3", "4"];
    let activatedId;

    const context: ExpandContext & SliderControllerContext = {
        registerSlide: commonHandler,
        setAsActive: (id) => activatedId = id,
        unregisterSlide: commonHandler,
        slideControl: {
            next: {
                disabled: false,
                setAsActive: commonHandler
            },
            prev: {
                disabled: false,
                setAsActive: commonHandler
            }
        },
        slidesList,
        disableDrag: false,
        dragSensitive: 150,
        ...(new ExpandController({})).getChildContext()
    };

    beforeEach(() => {
        commonHandler();
        wrapper = mount(
            <Dots>
                dot
            </Dots>,
            { context }
        );
    });

    afterEach(() => {
        activatedId = undefined;
        wrapper.unmount();
    });

    it("Should render dots according to `context.slidesList` count", () => {
        expect(wrapper.find("button")).to.have.length(slidesList.length);
    });

    it("Should set active class name to active dot", () => {
        wrapper.setContext({
            isExpanded: () => true
        });
        wrapper.update();

        expect(wrapper.find("button").get(0).props.className).to.equal(DotsDefaultProps.activeClassName);
    });

    it("Should trigger `context.setAsActive` with accodring id on click", () => {
        wrapper.find("button").get(0).props.onClick({ defaultPrevented: false });

        expect(activatedId).to.equal(slidesList[0]);
    });

    it("Should not trigger `context.setAsActive` when default prevented", () => {
        wrapper.find("button").get(0).props.onClick({ defaultPrevented: true });

        expect(activatedId).to.be.undefined;
    });

    it("Should call `onClick` prop if it passed", () => {
        let onClickTriggered = false;
        wrapper.setProps({
            onClick: () => onClickTriggered = true
        });
        wrapper.update();
        wrapper.find("button").get(0).props.onClick({ defaultPrevented: true });

        expect(onClickTriggered).to.be.true;
    });
});
