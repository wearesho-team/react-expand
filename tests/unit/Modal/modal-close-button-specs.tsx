import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ModalCloseButton, ModalContext } from "../../../src/Components/Modal";

describe("<ModalCloseButton/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    let onCloseTriggered = false;
    const context: ModalContext = {
        onClose: () => onCloseTriggered = true
    }

    beforeEach(() => {
        wrapper = mount(
            <ModalCloseButton />,
            { context }
        );
    });

    afterEach(() => {
        wrapper.unmount();
        onCloseTriggered = false;
    });

    it("Should trigger context property `onClose` on click", () => {
        wrapper.simulate("click");
        expect(onCloseTriggered).to.be.true;
    });

    it("Should not trigger context property `onClose` on click when default prevented", () => {
        wrapper.unmount();

        const handle = (e) => {
            e.preventDefault();
        }

        wrapper = mount(
            <ModalCloseButton onClick={handle}/>,
            { context }
        );

        wrapper.simulate("click");
        expect(onCloseTriggered).to.be.false;
    })
});
