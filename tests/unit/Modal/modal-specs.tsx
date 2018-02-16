import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ExpandContext, ExpandController } from "../../../src/Components/ExpandController";

import { Modal } from "../../../src/Components/Modal";

describe("<Modal/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    let context: ExpandContext;
    const modalId = "modal-id";

    beforeEach(() => {
        wrapper = mount(
            <ExpandController>
                <Modal defaultOpened modalId={modalId}>
                    <div className="modal-content">Modal content</div>
                </Modal>
            </ExpandController>
        );

        context = wrapper.find(Modal).instance().context;
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should create container in body if it not exist", () => {
        expect(document.getElementById(Modal.containerName)).to.exist;
    });

    it("Should open modal on mount if `defaultOpened` props passed", () => {
        expect(context.isExpanded(modalId)).to.be.true;
        expect(document.body.className).to.equal("modal-open");
    });

    it("Should close modal on outside click if `closeOnOutside` prop passed", () => {
        expect(context.isExpanded(modalId)).to.be.true;
        document.body.click();
        expect(context.isExpanded(modalId)).to.be.true;

        wrapper.unmount();

        wrapper = mount(
            <ExpandController>
                <Modal defaultOpened modalId={modalId} closeOnOutside>
                    <div className="modal-content">Modal content</div>
                </Modal>
            </ExpandController>
        );

        context = wrapper.find(Modal).instance().context;

        expect(context.isExpanded(modalId)).to.be.true;
        document.body.click();
        expect(context.isExpanded(modalId)).to.be.false;
    });

    it("Should change body class name according to state", () => {
        expect(document.body.className).to.equal("modal-open");
        context.changeExpandState(modalId)();
        expect(document.body.className).to.equal("");
    });
});
