import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { TabsController, Tab, Header } from "../../../src/Components/Tabs";
import { ExpandController } from "../../../src";

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

    afterEach(() =>  wrapper.unmount());

    it("Should change active tab accordint to user choise", () => {
        wrapper.find(Tab).forEach((node) => {
            switch (node.getDOMNode().getAttribute("data-expand-keep")) {
                case "tab_1": {
                    expect(node.getDOMNode().innerHTML).to.equal("");
                    break;
                }
                case "tab_2": {
                    expect(node.getDOMNode().innerHTML).to.equal("Tab two");
                    break;
                }
            }
        });

        wrapper.find(Header).first().simulate("click");

        wrapper.find(Tab).forEach((node) => {
            switch (node.getDOMNode().getAttribute("data-expand-keep")) {
                case "tab_1": {
                    expect(node.getDOMNode().innerHTML).to.equal("Tab one");
                    break;
                }
                case "tab_2": {
                    expect(node.getDOMNode().innerHTML).to.equal("");
                    break;
                }
            }
        });
    });
});
