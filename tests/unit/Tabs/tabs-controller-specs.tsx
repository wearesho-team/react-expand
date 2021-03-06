import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ExpandController, TabsController, Tab, Header } from "../../../src";

describe("<TabsController/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    beforeEach(() => {
        wrapper = mount(
            <ExpandController>
                <TabsController>
                    <Header expandId="tab_1" />
                    <Header expandId="tab_2" />
                    <Tab expandId="tab_1">
                        Tab one
                    </Tab>
                    <Tab expandId="tab_2">
                        Tab two
                    </Tab>
                </TabsController>
            </ExpandController>
        );
    });

    afterEach(() => wrapper.unmount());

    it("Should change active tab according to user choise", () => {
        wrapper.find(Tab).forEach((node) => {
            switch (node.props().expandId) {
                case "tab_1":
                    expect(node.getDOMNode()).to.be.null;
                    break;
                case "tab_2":
                    expect(node.getDOMNode()).to.exist;
                    break;
            }
        });
        wrapper.find(Header).first().simulate("click");

        wrapper.find(Tab).forEach((node) => {
            switch (node.props().expandId) {
                case "tab_1":
                    expect(node.getDOMNode()).to.exist;
                    break;
                case "tab_2":
                    expect(node.getDOMNode()).to.be.null;
                    break;
            }
        });
    });

    it("Should change active tab on mount if according prop passed", () => {
        wrapper.unmount();
        wrapper = mount(
            <ExpandController>
                <TabsController defaultOpened="tab_1">
                    <Header expandId="tab_1" />
                    <Header expandId="tab_2" />
                    <Tab expandId="tab_1">
                        Tab one
                    </Tab>
                    <Tab expandId="tab_2">
                        Tab two
                    </Tab>
                </TabsController>
            </ExpandController>
        );

        wrapper.find(Tab).forEach((node) => {
            switch (node.props().expandId) {
                case "tab_1":
                    expect(node.getDOMNode()).to.exist;
                    break;
                case "tab_2":
                    expect(node.getDOMNode()).to.be.null;
                    break;
            }
        });
    });
});
