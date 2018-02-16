import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { Header, TabsContext } from "../../../src/Components/Tabs";

describe("<Header/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    const id = "header";

    const commonHandler = () => undefined;

    let activeTab;
    const context: TabsContext = {
        changeActiveTab: (tabId) => activeTab = tabId,
        unregisterTab: commonHandler,
        registerTab: commonHandler
    };

    beforeEach(() => {
        commonHandler();
        wrapper = mount(
            <Header tabId={id} />,
            { context }
        );
    });

    afterEach(() => {
        wrapper.unmount();
        activeTab = undefined;
    });

    it("Should change active tab on click", () => {
        wrapper.simulate("click");

        expect(activeTab).to.equal(id);
    });

    it("Should not change active tab on click when default prevented", () => {
        wrapper.unmount();

        const handle = (e) => {
            e.preventDefault();
        }

        wrapper = mount(
            <Header tabId={id} onClick={handle}/>,
            { context }
        );

        wrapper.simulate("click");

        expect(activeTab).to.be.undefined;
    });
});
