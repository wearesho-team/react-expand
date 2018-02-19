import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ExpandContext, ExpandController } from "../../../src/Components/ExpandController";

import { ModalOpenButton } from "../../../src/Components/Modal";

describe("<ModalOpenButton/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    const id = "modal";

    let openModalId;
    const context: ExpandContext = {
        ...(new ExpandController({})).getChildContext(),
        changeExpandState: (modalId) => () => openModalId = modalId
    }

    beforeEach(() => {
        wrapper = mount(
            <ModalOpenButton modalId={id}/>,
            { context }
        );
    });

    afterEach(() => {
        wrapper.unmount();
        openModalId = undefined;
    });

    it("Should change expand state on click", () => {
        wrapper.simulate("click");
        expect(openModalId).to.equal(id);
    });

    it("Should not change expand state on click when default prevented", () => {
        wrapper.unmount();

        const handle = (e) => {
            e.preventDefault();
        }

        wrapper = mount(
            <ModalOpenButton modalId={id} onClick={handle}/>,
            { context }
        );

        wrapper.simulate("click");
        expect(openModalId).to.be.undefined;
    })
});
