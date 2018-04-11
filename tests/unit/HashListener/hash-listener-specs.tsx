import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { HashListener, ExpandController, ExpandContext, TabsController, Tab } from "../../../src";

describe("<HashListener/>", () => {
    let wrapper: ReactWrapper<{}, {}>;
    let context: ExpandContext;

    beforeEach(() => {
        window.location.hash = "#mountExpand";

        wrapper = mount(
            <ExpandController>
                <HashListener>
                    <TabsController>
                        <Tab expandId="mountExpand">
                            <span/>
                        </Tab>
                        <Tab expandId="someAnotherExpand">
                            <span/>
                        </Tab>
                    </TabsController>
                </HashListener>
            </ExpandController>
        );

        context = wrapper.find(HashListener).instance().context;
    });

    afterEach(() => wrapper.unmount());

    it("Should change expand state on mount if hash exist", () => {
        expect(context.isExpanded("mountExpand")).to.be.true;
    });

    it("Should change expand state on click link", () => {
        window.location.hash = "#userHash1#userHash2";
        // location does not have any callback for hashChange
        (wrapper.find(HashListener).instance() as any).handleHashChange();

        expect(context.isExpanded("userHash1")).to.be.true;
        expect(context.isExpanded("userHash2")).to.be.true;
    });
});
