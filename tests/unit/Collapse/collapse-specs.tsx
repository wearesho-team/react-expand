import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { ExpandContext, ExpandController } from "../../../src/Components/ExpandController";

import { Collapse } from "../../../src/Components/Collapse";

describe("<Collapse/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    const controlElement = (arg) => <i onClick={arg.onClick} />
    const id = "collpase";

    let context: ExpandContext;

    beforeEach(() => {
        wrapper = mount(
            <ExpandController>
                <Collapse controlElement={controlElement} collapseId={id}/>
            </ExpandController>
        );

        context = wrapper.find(Collapse).instance().context;
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should set default state according to prop", () => {
        expect(context.isExpanded(id)).to.be.false;

        wrapper.unmount();

        wrapper = mount(
            <ExpandController>
                <Collapse controlElement={controlElement} collapseId={id} defaultOpened/>
            </ExpandController>
        );

        context = wrapper.find(Collapse).instance().context;
        expect(context.isExpanded(id)).to.be.true;
    });
});
