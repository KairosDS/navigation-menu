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
        attribute: 'language'
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
       * @type { String }
       */
      iconDesktop: {
        type: String,
        attribute: 'icon-desktop'
      },
      /**
       *
       * @property
       * @type { String }
       */
      iconMobileClose: {
        type: String,
        attribute: 'icon-mobile-close'
      },
      /**
       *
       * @property
       * @type { String }
       */
      iconMobileOpen: {
        type: String,
        attribute: 'icon-mobile-open'
      },
      /**
       *
       * @property
       * @type { String }
       */
       urlBase: {
        type: String,
        attribute: 'url-base'
      },

    };
  }


  constructor() {
    super();
    this.selected = '';
    this.route = window.location.pathname;
    this.language = 'es';
    this.urlBase = '';
    this.indexCounter = 0;
    this.iconMobileOpen='';
    this.iconMobileClose='';
    this.iconDesktop='';
    this._allMenusInactive = this._allMenusInactive.bind(this);
  }

  _allMenusInactive(e) {
    const menus = this.shadowRoot.querySelectorAll('[id^="dropdown_container_"]');
    menus.forEach((menu) => {
      const menuID = menu.getAttribute('id');
      const menuIndex = menu.getAttribute('index');
      const eventID = `dropdown_container_${e.currentTarget.id.toLowerCase()}`;
      const iconMenuRight = this.shadowRoot.querySelector(`#icon-open-navigation_${menuIndex}`);
      const iconMenuLeft = this.shadowRoot.querySelector(`#icon-close-navigation_${menuIndex}`);
      if (!menu.classList.contains('inactive') && menuID !== eventID) {
        menu.classList.add('inactive');
        if(iconMenuLeft){
          iconMenuLeft.classList.add('inactive');
        }
        if(iconMenuRight){
          iconMenuRight.classList.remove('inactive');
        }
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
    const id = e.currentTarget.id.toLowerCase();
    const target = this.shadowRoot.querySelector(`#dropdown_container_${id}`);
    if (target !== null){
      target.classList.toggle('inactive');
      this.handlIconChange(target);
    }
  }

  handleClickEnter(e) {
    this._allMenusInactive(e);
    const id = e.currentTarget.id.toLowerCase();
    const indexIdString = e.currentTarget.id.indexOf('-')
    const idFormated = id.slice(indexIdString + 1)
    const target = this.shadowRoot.querySelector(`#dropdown_container_${idFormated}`);
    if (target !== null){
      target.classList.remove('inactive');
    }
  }

  handlIconChange(target) {
    const indexValue = target.attributes.index.value;
    const iconMenuRight = this.shadowRoot.querySelector(`#icon-open-navigation_${indexValue}`);
    const iconMenuLeft = this.shadowRoot.querySelector(`#icon-close-navigation_${indexValue}`);
    if(iconMenuRight){
      iconMenuRight.classList.toggle('inactive');
    }
    if(iconMenuLeft){
      iconMenuLeft.classList.toggle('inactive');  
    }
    
  }

  hrefFormated(linkPath) {
    const regExp= '^https?:\/\/(.*)'; 
    const findRegExp = linkPath.search(regExp);
    if(findRegExp === -1) {
      return this.hrefToIdFormated(linkPath)
    }
    return linkPath;
  }

  hrefToIdFormated (linkPath) {
  const hasURLBase = !this.urlBase ? `/${this.language}/${linkPath}` : `${this.urlBase}${this.language}/${linkPath}`;
  if(linkPath.indexOf('#') === 0){
    return `${this.route}${linkPath}`
  }else{
    return hasURLBase;
  }
   
  }

  renderDropdown(id, dropdownMenu) {
    const HTMLDropdown = [];
    const dropdownMenuKeys = Object.keys(dropdownMenu);
    dropdownMenuKeys.forEach((drodownMenuItem, index) => {
      const item = dropdownMenu[drodownMenuItem][0];
      const selfLink = item.href.includes('#');
      const linkHref = this.hrefFormated(item.href);
      HTMLDropdown.push(html`
      ${!selfLink ? html`
        <li part="nav-subitem" class="dropdown-nav-li" role="none" >
        <a class="drop__menu-link ${classMap({ selected: this.route === linkHref })}" part="${this.route === linkHref ? 'nav-link-selected' : 'nav-link'}"
            href="${`${linkHref}`}" rel="noopener noreferrer" target="${item.target || '_self'}"
            role="menuitem">
            ${item.content}
          </a>
        </li>` : html`
        <li class="dropdown-nav-li link-itself" id="item-${index}">
        <a class="drop__menu-link" href="${linkHref}" part="nav-link"
          target="${item.target || '_self'}"
          role="menuitem"
        >${item.content}</a>
      </li>`}
      `);
    });
    return html`
      <div id="dropdown_container_${id.toLowerCase()}" class="dropdown-services-container inactive" index="${this.indexCounter}" part="nav-dropdrown">
        <ul class="dropdown-nav dropdown-services" id="dropdown_services_${id.toLowerCase()}" role="menubar">
          ${HTMLDropdown.map((el) => el)}
        </ul>
      </div>`;
  }

  renderMenuItemComplex(menuItem) {
    const HTMLMenuItemComplex = [];
    HTMLMenuItemComplex.push(html`
      <span part="nav-link" index="${this.indexCounter}" tabindex="0" role="menuitem" id="${menuItem.id}" class="navbar-list__title" @click="${this.handleClick}">
      ${this.iconMobileOpen !== '' && window.innerWidth < 1029 ? html` <img id="icon-close-navigation_${this.indexCounter}" part="nav-icon"
        class="icon-close-navigation inactive ${menuItem.title.replace(/\s/g, '')}" src="${this.iconMobileClose}"
        alt="icono de acceso a submenu" index="${this.indexCounter}" />` : ''}
          ${menuItem.title}
        ${this.iconDesktop !== '' && window.innerWidth > 1029 ? html`<img id="icon-open-navigation_${this.indexCounter}"  part="nav-icon"
          class="icon-open-navigation ${menuItem.title.replace(/\s/g, '')} animate-icon"  src="${this.iconDesktop}" alt="=>"
          index="${this.indexCounter}" />` : ''}
        ${this.iconMobileOpen !== '' && window.innerWidth < 1029 ? html`<img id="icon-open-navigation_${this.indexCounter}"  part="nav-icon"
        class="icon-open-navigation ${menuItem.title.replace(/\s/g, '')}"  src="${this.iconMobileOpen}" alt="=>"
        index="${this.indexCounter}" />` : ''}
      </span> 
      ${this.renderDropdown(menuItem.id, menuItem[0])}`);
    this.indexCounter += 1;
    return html`${HTMLMenuItemComplex.map((el) => el)}`;
  }

  renderMenuItem(menuItem) {
    const menuItemlink = menuItem[0];
    const htmlMenu = html`
      ${menuItem['data-type'] === "link" ? html`
      <li class="navbar-list__item" id="li-${menuItem.id}" role="none" @keydown="${this.handleClickEnter}" part="nav-li" >
        <a class=${classMap({selected: this.route === this.hrefFormated(menuItemlink.href)})} 
        part="nav-link"
          href="${this.hrefFormated(menuItemlink.href)}"
          rel="noopener noreferrer" target="${menuItemlink.target || '_self'}"
          role="menuitem">
          ${menuItemlink.content}
        </a>
      </li>
      `
    : html` <li @keydown="${this.handleClickEnter}" role="none" id="li-${menuItem.id}" part="nav-li" class="navbar-list__item">${this.renderMenuItemComplex(menuItem)}</li>`}`;
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
      <nav  role="navigation" class="navigation-menu navbar"  part="nav-bar">
        <ul class="navbar-list" role="menubar" part="nav-ul">
          ${this.renderMainMenu()}
        </ul>
      </nav>
    `;
  }
}