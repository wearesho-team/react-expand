import { expect } from "chai";
import * as React from "react";
import { ReactWrapper, mount } from "enzyme";

import { StaticContainer } from "../../../src";

describe("<StaticContainer/>", () => {
    let wrapper: ReactWrapper<{}, {}>;

    const children = <div />;

    beforeEach(() => {
        wrapper = mount(
            <StaticContainer>
                {children}
            </StaticContainer>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should return children on `staticRender`", () => {
        expect(StaticContainer.renderStatic()).to.equal(children);
        expect(StaticContainer.childrenLength).to.equal(1);
    });
});
