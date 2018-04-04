import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { Header, TabsController } from "../../../src/Components/Tabs";
import { ExpandController, ExpandControlDefaultProps } from "../../../src";

describe("<Header/>", () => {
    let wrapper: ReactWrapper<{}, {}>;
    const id = "header";

    beforeEach(() => {
        wrapper = mount(
            <ExpandController>
                <TabsController>
                    <Header expandId={id} />
                </TabsController>
            </ExpandController>
        );
    });

    afterEach(() => wrapper.unmount());

    it("Should change active tab on click", () => {
        wrapper.find(Header).simulate("click");

        expect(wrapper.find(`.${ExpandControlDefaultProps.activeClassName}`)).to.have.length(1);
    });

    it("Should call prop `onClick` if it passed", () => {
        let onClickCalled = false;

        const handler = () => onClickCalled = true;
        wrapper.unmount();
        wrapper = mount(
            <ExpandController>
                <TabsController>
                    <Header expandId={id} onClick={handler} />
                </TabsController>
            </ExpandController>
        );

        wrapper.find(Header).simulate("click");
        expect(onClickCalled).to.be.true;
    });
});
