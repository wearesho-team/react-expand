import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { OuterContextProvider, ExpandControl, ExpandController, ExpandContextTypes } from "../../../src";

describe("<OuterContextProvider/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    const context = (new ExpandController({})).getChildContext();

    beforeEach(() => {
        wrapper = mount(
            <OuterContextProvider context={context}>
                <ExpandControl expandId="" />
            </OuterContextProvider>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should not throw error about missing context", () => {
        expect(wrapper.render).to.not.throw;
    });
});
