import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { Tab, TabsContext } from "../../../src/Components/Tabs";
import { ExpandController, ExpandContext } from "../../../src";

describe("<Tab/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    const id = "tab";

    const commonHandler = () => undefined;

    let registeredId;
    const context: TabsContext & ExpandContext = {
        changeActiveTab: commonHandler,
        unregisterTab: (tabId) => registeredId = tabId,
        registerTab: (tabId) => registeredId = tabId,
        ...(new ExpandController({})).getChildContext()
    }

    beforeEach(() => {
        commonHandler();
        wrapper = mount(
            <Tab tabId={id} />,
            { context }
        );
    });

    afterEach(() => {
        wrapper.unmount();
        registeredId = undefined;
    });

    it("Should trigger context prop `registerTab` on mount", () => {
        expect(registeredId).to.equal(id);
    });

    it("Should trigger context prop `unregisterTab` on unmount", () => {
        registeredId = undefined;
        wrapper.unmount();
        expect(registeredId).to.equal(id);
    });
});
