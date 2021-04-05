/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, expect, oneEvent } from "@open-wc/testing";
import "../navigation-menu";
import sinon from 'sinon';

describe("NavigationMenu", () => {
  it("should have the basic template", async () => {
    const el = await fixture(
      html`
        <navigation-menu>
        <ul>
        <li id="item1" title="ITEM-1">
          <ul>
            <li id="subitem1"  title="subitem 1"><a href="https://subitem1.com/" aria-label="Abre misma ventana página SubItem1" target="_self">SUB-ITEM-1</a></li>
            <li id="subitem2"  title="subitem 2"><a href="subtitem2.html" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM-2</a></li>
            <li id="subitem3"  title="subitem 3"><a href="#punto" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM32</a></li>
          </ul>
        </li>
        <li id="item2" title="ITEM-2">
          <ul>
            <li id="subitem3"  title="subitem 3"><a href="subtitem3.html" aria-label="Abre misma ventana página SubItem3" target="_self">SUB-ITEM-3</a></li>
            <li id="subitem4"  title="subitem 4"><a href="sub-item.html#punto2" aria-label="Abre misma ventana página SubItem4" target="_self">SUB-ITEM-4</a></li>
          </ul>
        </li>
        <li data-type="link" id="item3" title="item 3"><a href="sub-item.html" aria-label="Abre misma ventana página Item3" target="_self">ITEM-3</a></li>
        <li data-type="link" id="item4" title="item 4"><a href="index.html" aria-label="Abre misma ventana página Item4"  target="_self">ITEM-4</a></li>
        <li data-type="link" id="item5" title="item 5"><a href="https://item5.html" aria-label="Abre misma ventana página Item5" target="_self">ITEM-5</a></li>
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
                <li id="subitem1"  title="subitem 1"><a href="https://subitem1.com/" aria-label="Abre misma ventana página SubItem1" target="_self">SUB-ITEM-1</a></li>
                <li id="subitem2"  title="subitem 2"><a href="subtitem2.html" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM-2</a></li>
                <li id="subitem3"  title="subitem 3"><a href="#punto" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM32</a></li>
              </ul>
            </li>
            <li id="item2" title="ITEM-2">
              <ul>
                <li id="subitem3"  title="subitem 3"><a href="subtitem3.html" aria-label="Abre misma ventana página SubItem3" target="_self">SUB-ITEM-3</a></li>
                <li id="subitem4"  title="subitem 4"><a href="sub-item.html#punto2" aria-label="Abre misma ventana página SubItem4" target="_self">SUB-ITEM-4</a></li>
              </ul>
            </li>
            <li data-type="link" id="item3" title="item 3"><a href="sub-item.html" aria-label="Abre misma ventana página Item3" target="_self">ITEM-3</a></li>
            <li data-type="link" id="item4" title="item 4"><a href="index.html" aria-label="Abre misma ventana página Item4"  target="_self">ITEM-4</a></li>
            <li data-type="link" id="item5" title="item 5"><a href="https://item5.html" aria-label="Abre misma ventana página Item5" target="_self">ITEM-5</a></li>
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
        <li id="subitem1"  title="subitem 1"><a href="https://subitem1.com/" aria-label="Abre misma ventana página SubItem1" target="_self">SUB-ITEM-1</a></li>
        <li id="subitem2"  title="subitem 2"><a href="subtitem2.html" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM-2</a></li>
        <li id="subitem3"  title="subitem 3"><a href="#punto" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM32</a></li>
      </ul>
    </li>
    <li id="item2" title="ITEM-2">
      <ul>
        <li id="subitem3"  title="subitem 3"><a href="subtitem3.html" aria-label="Abre misma ventana página SubItem3" target="_self">SUB-ITEM-3</a></li>
        <li id="subitem4"  title="subitem 4"><a href="sub-item.html#punto2" aria-label="Abre misma ventana página SubItem4" target="_self">SUB-ITEM-4</a></li>
      </ul>
    </li>
    <li data-type="link" id="item3" title="item 3"><a href="sub-item.html" aria-label="Abre misma ventana página Item3" target="_self">ITEM-3</a></li>
    <li data-type="link" id="item4" title="item 4"><a href="index.html" aria-label="Abre misma ventana página Item4"  target="_self">ITEM-4</a></li>
    <li data-type="link" id="item5" title="item 5"><a href="https://item5.html" aria-label="Abre misma ventana página Item5" target="_self">ITEM-5</a></li>
  </ul>
    `);
  
    const func = el.hrefFormated('https://subitem1.com/');
    expect(func).to.equal('https://subitem1.com/');
  });

  it('User click on menu: Called handlIconChange method', async () => {
      const el = await fixture(
        html`
        <navigation-menu icon-mobile-open="/demo/assets/images/plus-8-24.png" icon-mobile-close="/demo/assets/images/x-mark-24.png">
        <ul>
        <li id="item1" title="ITEM-1">
          <ul>
            <li id="subitem1"  title="subitem 1"><a href="https://subitem1.com/" aria-label="Abre misma ventana página SubItem1" target="_self">SUB-ITEM-1</a></li>
            <li id="subitem2"  title="subitem 2"><a href="subtitem2.html" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM-2</a></li>
            <li id="subitem3"  title="subitem 3"><a href="#punto" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM32</a></li>
          </ul>
        </li>
        <li id="item2" title="ITEM-2">
          <ul>
            <li id="subitem3"  title="subitem 3"><a href="subtitem3.html" aria-label="Abre misma ventana página SubItem3" target="_self">SUB-ITEM-3</a></li>
            <li id="subitem4"  title="subitem 4"><a href="sub-item.html#punto2" aria-label="Abre misma ventana página SubItem4" target="_self">SUB-ITEM-4</a></li>
          </ul>
        </li>
        <li data-type="link" id="item3" title="item 3"><a href="sub-item.html" aria-label="Abre misma ventana página Item3" target="_self">ITEM-3</a></li>
        <li data-type="link" id="item4" title="item 4"><a href="index.html" aria-label="Abre misma ventana página Item4"  target="_self">ITEM-4</a></li>
        <li data-type="link" id="item5" title="item 5"><a href="https://item5.html" aria-label="Abre misma ventana página Item5" target="_self">ITEM-5</a></li>
      </ul>
        <navigation-menu>
        `
      );
      const options = el.shadowRoot.querySelector('#dropdown_container_item1');
      const spy = sinon.spy();
      options.click();
      el.handlIconChange(options);
      const arrowOpen= el.shadowRoot.querySelector('#icon-open-navigation_0');
      const classArrowOpen = arrowOpen.getAttribute('class');
      const arrowClose= el.shadowRoot.querySelector('#icon-close-navigation_0');
      const classArrowClose = arrowClose.getAttribute('class');
      expect(spy.called);
      expect(classArrowOpen).to.contain('inactive');
      expect(classArrowClose).to.not.contain('inactive');
  
  });

  it('User click on menu: Called handlClick method', async () => {
    const el = await fixture(
      html`
      <navigation-menu>
      <ul>
      <li id="item1" title="ITEM-1">
        <ul>
          <li id="subitem1"  title="subitem 1"><a href="https://subitem1.com/" aria-label="Abre misma ventana página SubItem1" target="_self">SUB-ITEM-1</a></li>
          <li id="subitem2"  title="subitem 2"><a href="subtitem2.html" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM-2</a></li>
          <li id="subitem3"  title="subitem 3"><a href="#punto" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM32</a></li>
        </ul>
      </li>
      <li id="item2" title="ITEM-2">
        <ul>
          <li id="subitem3"  title="subitem 3"><a href="subtitem3.html" aria-label="Abre misma ventana página SubItem3" target="_self">SUB-ITEM-3</a></li>
          <li id="subitem4"  title="subitem 4"><a href="sub-item.html#punto2" aria-label="Abre misma ventana página SubItem4" target="_self">SUB-ITEM-4</a></li>
        </ul>
      </li>
      <li data-type="link" id="item3" title="item 3"><a href="sub-item.html" aria-label="Abre misma ventana página Item3" target="_self">ITEM-3</a></li>
      <li data-type="link" id="item4" title="item 4"><a href="index.html" aria-label="Abre misma ventana página Item4"  target="_self">ITEM-4</a></li>
      <li data-type="link" id="item5" title="item 5"><a href="https://item5.html" aria-label="Abre misma ventana página Item5" target="_self">ITEM-5</a></li>
    </ul>
      <navigation-menu>
      `
    );
    const options = el.shadowRoot.querySelector('.navbar-list__title');
    const spy = sinon.spy(el, 'handleClick');
    options.click();
    const target = el.shadowRoot.querySelector(`#dropdown_container_item2`);
    expect(spy.called);
    expect(target).to.not.contain('inactive');

});

it('User click on menu: Called handlClickEnter method', async () => {
  const el = await fixture(
    html`
    <navigation-menu>
    <ul>
    <li id="item1" title="ITEM-1">
      <ul>
        <li id="subitem1"  title="subitem 1"><a href="https://subitem1.com/" aria-label="Abre misma ventana página SubItem1" target="_self">SUB-ITEM-1</a></li>
        <li id="subitem2"  title="subitem 2"><a href="subtitem2.html" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM-2</a></li>
        <li id="subitem3"  title="subitem 3"><a href="#punto" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM32</a></li>
      </ul>
    </li>
    <li id="item2" title="ITEM-2">
      <ul>
        <li id="subitem3"  title="subitem 3"><a href="subtitem3.html" aria-label="Abre misma ventana página SubItem3" target="_self">SUB-ITEM-3</a></li>
        <li id="subitem4"  title="subitem 4"><a href="sub-item.html#punto2" aria-label="Abre misma ventana página SubItem4" target="_self">SUB-ITEM-4</a></li>
      </ul>
    </li>
    <li data-type="link" id="item3" title="item 3"><a href="sub-item.html" aria-label="Abre misma ventana página Item3" target="_self">ITEM-3</a></li>
    <li data-type="link" id="item4" title="item 4"><a href="index.html" aria-label="Abre misma ventana página Item4"  target="_self">ITEM-4</a></li>
    <li data-type="link" id="item5" title="item 5"><a href="https://item5.html" aria-label="Abre misma ventana página Item5" target="_self">ITEM-5</a></li>
  </ul>
    <navigation-menu>
    `
  );
  const options = el.shadowRoot.querySelector('#li-item1');
 
  const spy = sinon.spy(el, 'handleClickEnter');
  const target = el.shadowRoot.querySelector(`#dropdown_container_item2`);

  expect(spy.called);
  expect(target).to.not.contain('inactive');

});

});
