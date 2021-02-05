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
    console.log(childNodes)
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
    const id = e.currentTarget.id.toLowerCase();
    const target = this.shadowRoot.querySelector(`#dropdown_container_${id}`);
    target.classList.toggle('inactive');
    if (window.innerWidth < 1024) {
      this.handleClickBack(e);
    }
  }

  handleClickEnter(e) {
    this._allMenusInactive(e);
    const id = e.currentTarget.id.toLowerCase();
    const target = this.shadowRoot.querySelector(`#dropdown_container_${id}`);
    if (target !== null) {
      target.classList.remove('inactive');
    }
  }

  handleClickBack(e) {
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
    console.log(dropdownMenu)
    const HTMLDropdown = [];
    const dropdownMenuKeys = Object.keys(dropdownMenu);
    console.log(dropdownMenuKeys)
    dropdownMenuKeys.forEach((drodownMenuItem) => {
      const item = dropdownMenu[drodownMenuItem][0];
      console.log(item)
      HTMLDropdown.push(html`
        <li part="nav-subitem" class="dropdown-nav-li">
        <a class="drop__menu-link ${classMap({ selected: this.route === item.href })}"
            href="/${this.language}/${item.href}" rel="noopener noreferrer" target="${item.target || '_self'}">
            ${item.content}
          </a>
        </li>` 
      );
    });
    return html`
      <div id="dropdown_container_${id.toLowerCase()}" class="dropdown-services-container inactive" index="${this.indexCounter}">
        <ul class="dropdown-nav dropdown-services" id="dropdown_services_${id.toLowerCase()}">
          ${HTMLDropdown.map((el) => el)}
        </ul>
      </div>`;
  }

  renderMenuItemComplex(menuItem) {
    const HTMLMenuItemComplex = [];
    HTMLMenuItemComplex.push(html`
     <img id="arrow-left-navigation_${this.indexCounter}"
        class=" arrow-left-navigation inactive ${menuItem.title.replace(/\s/g, '')}" src="../demo/assets/images/arrow_left.svg"
        alt="flecha de acceso a submenu" @click="${this.handleClickBack}" index="${this.indexCounter}" />
      <span part="nav-item" id="${menuItem.id}" role="menuItem" @click="${this.handleClick}" index="${this.indexCounter}"  tabindex="0" class="${classMap({span_icon_decoration: !this.hasDropMenu})}">
        ${menuItem.title}
       <img class="${window.innerWidth < 1024 ? 'inactive' : 'arrow-down-dropdown'}" src="../demo/assets/images/arrow_down.svg"
          alt="=>"/>
      </span>
      ${window.innerWidth < 1024 ? html` 
      <img id="arrow-right-navigation_${this.indexCounter}"
        class="arrow-right-navigation ${menuItem.title.replace(/\s/g, '')}" src="" alt="=>"
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
      <li @keydown="${this.handleClickEnter}" id="${menuItem.id}" class="navbar-list__item" >
        <a class=${classMap({selected: this.route === menuItem.href})} 
          href=${linkItem}
          rel="noopener noreferrer" target="${menuItemlink.target || '_self'}">
          ${menuItemlink.content}
        </a>
      </li>
      `
    : html` <li @keydown="${this.handleClickEnter}" id="${menuItem.id}" class="navbar-list__item">${this.renderMenuItemComplex(menuItem)}</li>`}`;
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
          <ul class="navbar-list">
           ${this.renderMainMenu()}
          </ul>
        </nav>

      </div>
    `;
  }
}