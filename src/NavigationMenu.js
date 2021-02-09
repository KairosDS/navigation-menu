import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { wcNameStyles } from './navigation-menu-style';
import { HTMLChildrenMixin } from './HTMLChildrenMixin';

/**
 * `navigation-menu`
 * NavigationMenu
 *
 * @customElement navigation-menu
 * @litElement
 * @demo demo/index.html
 */

export class NavigationMenu extends HTMLChildrenMixin(LitElement)  {
  static get is() {
    return 'navigation-menu';
  }

  static get styles() {
    return [ wcNameStyles ];
  }

  static get properties() {
    return {
      /**
       *
       * @property
       * @type { String }
       */
      language: {
        type: String,
      },
      /**
       *
       * @property
       * @type { }
       */
      menuItems: {
        type: Array,
      },
      /**
       *
       * @property
       * @type { }
       */
      mainMenu: {
        type: Array,
      },
      /**
       *
       * @property
       * @type { }
       */
      capacities: {
        type: Array,
      },
      /**
       *
       * @property
       * @type { }
       */
      countries: {
        type: Array,
      },
      /**
       *
       * @property
       * @type { }
       */
      selected: {
        type: String,
      },
      /**
       *
       * @property
       * @type { }
       */
      route: {
        type: String,
      },
      /**
       *
       * @property
       * @type { Boolean }
       */
      languageSelected: {
        type: Boolean,
        attribute: false,
      },
      /**
       *
       * @property
       * @type { String }
       */
      lang: {
        type: String,
      },
    };
  }


  constructor() {
    super();
    this.selected = '';
    this.menuItems = [];
    this.route = window.location.pathname;
    this.language = 'es';
    this.indexCounter = 0;
    this.hasDropMenu = false;
    this._allMenusInactive = this._allMenusInactive.bind(this);
  }

  _allMenusInactive(e) {
    const menus = this.shadowRoot.querySelectorAll('[id^="dropdown_container_"]');
    menus.forEach((menu) => {
      const menuID = menu.getAttribute('id');
      const eventID = `dropdown_container_${e.currentTarget.id.toLowerCase()}`;
      if (!menu.classList.contains('inactive') && menuID !== eventID) {
        menu.classList.add('inactive');
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    const childNodes = this._HTMLChildren();
    [this.mainMenu]= childNodes;
    document.body.addEventListener('click', this._allMenusInactive);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.removeEventListener('click', this._allMenusInactive);
  }

  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this._allMenusInactive(e);
    const id = e.target.id.toLowerCase();
    const target = this.shadowRoot.querySelector(`#dropdown_container_${id}`);
    target.classList.toggle('inactive');
    if (window.innerWidth < 1024) {
      this.handlIconChange(e);
    }
  }

  handleClickEnter(e) {
    this._allMenusInactive(e);
    const id = e.currentTarget.id.toLowerCase();
    const indexIdString = e.currentTarget.id.indexOf('-')
    const idFormated = id.slice(indexIdString + 1)
    const target = this.shadowRoot.querySelector(`#dropdown_container_${idFormated}`);
    if (target !== null) {
      target.classList.remove('inactive');
    }
  }

  handlIconChange(e) {
    const menus = this.shadowRoot.querySelectorAll('[id^="dropdown_container_"]');
    menus.forEach((menu, index) => {
      const arrowMenuRight = this.shadowRoot.querySelector(`#arrow-right-navigation_${index}`);
      const arrowMenuLeft = this.shadowRoot.querySelector(`#arrow-left-navigation_${index}`);
      const indexMenu = menu.getAttribute('index');
      const indexValue = e.currentTarget.attributes.index.value;
      if (!menu.classList.contains('inactive') && indexMenu === indexValue) {
        arrowMenuRight.classList.add('inactive');
        arrowMenuLeft.classList.remove('inactive');
      } else {
        arrowMenuRight.classList.remove('inactive');
        arrowMenuLeft.classList.add('inactive');
      }
    });
  }



  renderDropdown(id, dropdownMenu) {
    const HTMLDropdown = [];
    const dropdownMenuKeys = Object.keys(dropdownMenu);
    dropdownMenuKeys.forEach((drodownMenuItem) => {
      const item = dropdownMenu[drodownMenuItem][0];
      HTMLDropdown.push(html`
        <li part="nav-subitem" class="dropdown-nav-li" role="menuitem">
        <a class="drop__menu-link ${classMap({ selected: this.route === item.href })}"
            href="/${this.language}/${item.href}" rel="noopener noreferrer" target="${item.target || '_self'}">
            ${item.content}
          </a>
        </li>` 
      );
    });
    return html`
      <div id="dropdown_container_${id.toLowerCase()}" class="dropdown-services-container inactive" index="${this.indexCounter}">
        <ul class="dropdown-nav dropdown-services" id="dropdown_services_${id.toLowerCase()}" role="menubar">
          ${HTMLDropdown.map((el) => el)}
        </ul>
      </div>`;
  }

  renderMenuItemComplex(menuItem) {
    const HTMLMenuItemComplex = [];
    HTMLMenuItemComplex.push(html`
     <img id="arrow-left-navigation_${this.indexCounter}"
        class=" arrow-left-navigation inactive ${menuItem.title.replace(/\s/g, '')}" src="../demo/assets/images/arrow-left-icon.svg"
        alt="flecha de acceso a submenu" index="${this.indexCounter}" />
      <span part="nav-item" index="${this.indexCounter}" tabindex="0" role="menuitem" id="${menuItem.id}" @click="${this.handleClick}">
        ${menuItem.title}
       <img class="${window.innerWidth < 1024 ? 'inactive' : 'arrow-down-dropdown'}" src="../demo/assets/images/arrow_down.svg"
          alt="=>"/>
      </span>
      ${window.innerWidth < 1024 ? html` 
      <img id="arrow-right-navigation_${this.indexCounter}"
        class="arrow-right-navigation  ${menuItem.title.replace(/\s/g, '')}"  src="../demo/assets/images/arrow-right-icon.svg" alt="=>"
        index="${this.indexCounter}" />`
    : html``}
      ${this.renderDropdown(menuItem.id, menuItem[0])}`);
    this.indexCounter += 1;
    return html`${HTMLMenuItemComplex.map((el) => el)}`;
  }

  renderMenuItem(menuItem) {
    const menuItemlink = menuItem[0];
    this.hasDropMenu = menuItem['data-type'] === "link";
    const linkItem = `/${this.language}/${menuItemlink.href}`;
    const htmlMenu = html`
      ${menuItem['data-type'] === "link" ? html`
      <li class="navbar-list__item" id="li-${menuItem.id}" role="none" @keydown="${this.handleClickEnter}" >
        <a class=${classMap({selected: this.route === menuItem.href})} 
          href=${linkItem}
          rel="noopener noreferrer" target="${menuItemlink.target || '_self'}"
          role="menuitem" >
          ${menuItemlink.content}
        </a>
      </li>
      `
    : html` <li @keydown="${this.handleClickEnter}" role="none" id="li-${menuItem.id}" class="navbar-list__item">${this.renderMenuItemComplex(menuItem)}</li>`}`;
    return htmlMenu;
  }

  renderMainMenu() {
    const HTMLMainMenu = [];
    const menuItemKeys = Object.keys(this.mainMenu);
    menuItemKeys.forEach((menuItem) => {
      HTMLMainMenu.push(this.renderMenuItem(this.mainMenu[menuItem]));
    });
    return html`${HTMLMainMenu.map((el) => el)}`;
  }

  render() {
    return html`
      <div class="navbar-container"part="nav-bar-container">
        <input type="checkbox" class="navbar__input" id="toggleMenu" />
        <label tabindex="0" class="navbar-menu-icon" for="toggleMenu"></label>
        <nav  role="navigation" class="navbar"  part="nav-bar">
          <ul class="navbar-list" role="menubar">
           ${this.renderMainMenu()}
          </ul>
        </nav>

      </div>
    `;
  }
}