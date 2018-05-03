import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { Transition } from "../../../src";

describe("<Modal/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    beforeEach(() => {
        wrapper = mount(
            <Transition status={true} timeout={0}>
                <div id="test" />
            </Transition>
        );

    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should render child without class name if timeout equals 0", () => {
        expect(wrapper.find("#test").getDOMNode().classList).to.have.length(0);
    });

    it("Should render child class name if timeout more then 0", () => {
        wrapper.setProps({
            timeout: 150
        });
        expect(wrapper.find("#test").getDOMNode().classList).to.have.length(0);
    });

});
