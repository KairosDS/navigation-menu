export const HTMLChildrenMixin = (SuperClass) => {
  return class extends SuperClass {
    constructor() {
      super();
      this.HTMLAttributesToExtract = ['A', 'IMG', 'LI', 'VIDEO'];
    }
  
    extractHTMLDataAttributes(el) {
      this.HTMLAttr = {};
      const dataAttrArr = Object.keys(el.dataset);
      dataAttrArr.forEach((dataAttr) => {
        this.HTMLAttr[dataAttr] = el.dataset[dataAttr];
      });
      return this.HTMLAttr;
    }
  
    extractHTMLAttributes(el) {
      this.HTMLAttr = {};
      const attrs = Array.prototype.slice.call(el.attributes);
      attrs.forEach((attr) => {
        this.HTMLAttr[attr.name] = attr.value;
      });
      if (!el.querySelectorAll('*').length) {
        this.HTMLAttr.content = el.textContent.trim();
      }
      return this.HTMLAttr;
    }

    /**
     * Método para leer del DOM los elementos e insertarlos
     * como propiedades del componentes que luego se renderizan
     * en el shadowRoot.
     * De esta manera el SEO interpreta los elementos HTML del DOM
     * Por otro si fallase la carga del componentes se visualizaria el contenido, aunque sin CSS
     */
    _HTMLChildren(node = this) {
      const childNodes = [...node.querySelectorAll('*')];
      const childArr = [];
      let idCounter = 0;
      if (childNodes) {
        childNodes.forEach((el) => {
          if (el.parentNode === node) {
            const id = el.id || idCounter;
            idCounter = (el.id) ? idCounter : idCounter + 1;
            if (!el.querySelectorAll('*').length) {
              if (this.HTMLAttributesToExtract.includes(el.tagName)) {
                childArr[id] = this.extractHTMLAttributes(el);
              } else {
                childArr[id] = el.innerHTML;
              }
            } else {
              let elAttr = {};
              if (this.HTMLAttributesToExtract.includes(el.tagName)) {
                elAttr = this.extractHTMLAttributes(el);
              }
              const objChildren = this._HTMLChildren(el);
              childArr[id] = { ...elAttr, ...objChildren };
            }
          }
        });
      }
      return childArr;
    }
  }
}
