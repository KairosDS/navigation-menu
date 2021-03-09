/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, expect, oneEvent } from "@open-wc/testing";
import "../navigation-menu";

describe("NavigationMenu", () => {
  it("should have the basic template", async () => {
    const el = await fixture(
      html`
        <navigation-menu>
          <ul>
          <li id="item1" title="ITEM-1">
            <ul>
              <li id="subitem1"  title="subitem 1"><a href="https://subitem1.com/">SUB-ITEM-1</a></li>
              <li id="subitem2"  title="subitem 2"><a href="subtitem2.html">SUB-ITEM-2</a></li>
            </ul>
          </li>
          <li data-type="link" id="item3" title="item 3"><a href="item3.html" >ITEM-3</a></li>
          <li data-type="link" id="item4" title="item 4"><a href="https://item4/">ITEM-4</a></li>
          <li data-type="link" id="item5" title="item 5"><a href="item5.html">ITEM-5</a></li>
          </ul>
        </navigation-menu>
      `
    );
    const base = el.shadowRoot.querySelector(".navigation-menu");
    expect(base).not.to.be.null;
  });
  
  it('passes the a11y audit', async () => {
    const el = await fixture(html`
    <navigation-menu>
    <ul>
    <li id="item1" title="ITEM-1">
      <ul>
        <li id="subitem1"  title="subitem 1"><a href="https://subitem1.com/">SUB-ITEM-1</a></li>
        <li id="subitem2"  title="subitem 2"><a href="subtitem2.html">SUB-ITEM-2</a></li>
      </ul>
    </li>
    <li data-type="link" id="item3" title="item 3"><a href="item3.html" >ITEM-3</a></li>
    <li data-type="link" id="item4" title="item 4"><a href="https://item4/">ITEM-4</a></li>
    <li data-type="link" id="item5" title="item 5"><a href="item5.html">ITEM-5</a></li>
    </ul>
    </navigation-menu>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });

  it('can await an event', async () => {
  
    const el = await fixture(html`
    <navigation-menu>
      <ul>
      <li id="item1" title="ITEM-1">
        <ul>
          <li id="subitem1"  title="subitem 1"><a href="https://subitem1.com/">SUB-ITEM-1</a></li>
          <li id="subitem2"  title="subitem 2"><a href="subtitem2.html">SUB-ITEM-2</a></li>
        </ul>
      </li>
      <li data-type="link" id="item3" title="item 3"><a href="item3.html" >ITEM-3</a></li>
      <li data-type="link" id="item4" title="item 4"><a href="https://item4/">ITEM-4</a></li>
      <li data-type="link" id="item5" title="item 5"><a href="item5.html">ITEM-5</a></li>
      </ul>
    `);
  
    const func = el.hrefFormated('https://subitem1.com/');
    expect(func).to.equal('https://subitem1.com/');
  });

  it('can await an event', async () => {
  
    const el = await fixture(html`
    <navigation-menu>
      <ul>
      <li id="item1" title="ITEM-1">
        <ul>
          <li id="subitem1"  title="subitem 1"><a href="https://subitem1.com/">SUB-ITEM-1</a></li>
          <li id="subitem2"  title="subitem 2"><a href="subtitem2.html">SUB-ITEM-2</a></li>
        </ul>
      </li>
      <li data-type="link" id="item3" title="item 3"><a href="item3.html" >ITEM-3</a></li>
      <li data-type="link" id="item4" title="item 4"><a href="https://item4/">ITEM-4</a></li>
      <li data-type="link" id="item5" title="item 5"><a href="item5.html">ITEM-5</a></li>
      </ul>
    `);
  
    const func = el.hrefFormated('https://subitem1.com/');
    expect(func).to.equal('https://subitem1.com/');
  });

});
