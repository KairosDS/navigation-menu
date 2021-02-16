/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, expect } from "@open-wc/testing";
import "../navigation-menu";

describe("NavigationMenu", () => {
  it("should have the basic template", async () => {
    const el = await fixture(
      html`
        <navigation-menu></navigation-menu>
      `
    );
    const base = el.shadowRoot.querySelector(".navigation-menu");

    expect(base).not.to.be.null;
    expect(el).dom.to.equalSnapshot();
  });
});
