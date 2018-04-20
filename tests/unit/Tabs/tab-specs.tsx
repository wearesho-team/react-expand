import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ExpandController, Tab, TabsController } from "../../../src";

describe("<Tab/>", () => {
    let wrapper: ReactWrapper<{}, {}>;
    const id = "tab";

    beforeEach(() => {
        wrapper = mount(
            <ExpandController>
                <TabsController>
                    <Tab expandId={id} />
                </TabsController>
            </ExpandController>
        );
    });

    afterEach(() => wrapper.unmount());

    it("Should register tab on mount", () => {
        expect(wrapper.find(TabsController).instance().state.tabs.has(id)).to.be.true;
    });

    it("Should unregister tab on unmount", () => {
        wrapper.find(Tab).instance().componentWillUnmount();
        expect(wrapper.find(TabsController).instance().state.tabs.has(id)).to.be.false;
    });
});
