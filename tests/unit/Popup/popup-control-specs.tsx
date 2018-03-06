import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ExpandContext, ExpandController } from "../../../src/Components/ExpandController";

import {PopupControl, TriggerEvents} from "../../../src/Components/Popup";

describe("<Modal/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    let context: ExpandContext;
    const popupId = "popup-id";

    beforeEach(() => {
        wrapper = mount(
            <ExpandController>
                <PopupControl
                    popupId={popupId}
                    triggerEvent={TriggerEvents.hover}
                >
                    <div/>
                </PopupControl>
            </ExpandController>
        );

        context = wrapper.find(PopupControl).instance().context;
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should change context only on mouse over when trigger event is `hover`", () => {
        expect(context.isExpanded(popupId)).to.be.false;
        wrapper.simulate("click");
        expect(context.isExpanded(popupId)).to.be.false;
        wrapper.simulate("mouseover");
        expect(context.isExpanded(popupId)).to.be.true;
    });

    it("Should change context only on click when trigger event is `click`", () => {
        wrapper.unmount();

        wrapper = mount(
            <ExpandController>
                <PopupControl
                    popupId={popupId}
                    triggerEvent={TriggerEvents.click}
                >
                    <div/>
                </PopupControl>
            </ExpandController>
        );
        context = wrapper.find(PopupControl).instance().context;

        expect(context.isExpanded(popupId)).to.be.false;
        wrapper.simulate("mouseover");
        expect(context.isExpanded(popupId)).to.be.false;
        wrapper.simulate("click");
        expect(context.isExpanded(popupId)).to.be.true;
    });
});
