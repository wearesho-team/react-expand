import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ExpandContext, ExpandController } from "../../../src/Components/ExpandController";

import { Popup } from "../../../src/Components/Popup";

describe("<Modal/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    let context: ExpandContext;
    const popupId = "popup-id";

    beforeEach(() => {
        wrapper = mount(
            <ExpandController>
                <Popup popupId={popupId}/>
            </ExpandController>
        );

        context = wrapper.find(Popup).instance().context;
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should not show popup when popupId is not expanded", () => {
        expect(context.isExpanded(popupId)).to.be.false;
        expect(wrapper.getDOMNode()).to.be.null;
    });

    it("Should show popup when popupId is expanded", () => {
        context.changeExpandState(popupId, true)();
        expect(context.isExpanded(popupId)).to.be.true;
        expect(wrapper.getDOMNode()).not.to.be.null;
    });

    it("Should close popup on mouse over event", () => {
        context.changeExpandState(popupId, true)();
        expect(context.isExpanded(popupId)).to.be.true;
        wrapper.simulate("mouseout");
        expect(context.isExpanded(popupId)).to.be.false;
    });
});
