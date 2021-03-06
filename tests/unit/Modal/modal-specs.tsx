import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { Modal, ModalContainer, ExpandContext, ExpandController, StaticContainer } from "../../../src";

describe("<Modal/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    let context: ExpandContext;
    const modalId = "modal-id";
    const container = document.createElement("div");
    container.id = ModalContainer.containerId;

    const originWindow = window;

    beforeEach(() => {
        document.body.appendChild(container);

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
        window = originWindow;
        wrapper.unmount();
    });

    it("Should create container in body if it not exist", () => {
        expect(document.getElementById(ModalContainer.containerId)).to.exist;
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

    it("Should create modal container if it does not exist in DOM on mount", () => {
        wrapper.unmount();
        container.remove();
        wrapper.mount();

        expect(document.getElementById(ModalContainer.containerId)).to.exist;
    });

    it("Should render modal even when window does not exist", () => {
        window = undefined;
        wrapper.find(Modal).instance().render();
        expect(wrapper.find(".modal-content")).to.have.length(1);
    });
});
