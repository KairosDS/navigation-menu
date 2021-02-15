# navigation-menu

Lit-Element web component navigation menu.

## Demo

```
<h2>Basic navigation-menu Demo</h2>
<h3>Demo</h3>
<navigation-menu language="es" icon-mobile-open="/assets/images/icon.svg" icon-mobile-close="/assets/images/icon.svg" icon-desktop="/assets/images/icon.svg">
  <ul>
    <li id="item1" title="ITEM-1">
      <ul>
        <li id="subitem1"  title="subitem 1">
          <a href="https://subitem1.com/" aria-label="Abre misma ventana página SubItem1" target="_self">SUB-ITEM-1</a>
        </li>
        <li id="subitem2"  title="subitem 2">
          <a href="subtitem2.html" aria-label="Abre misma ventana página SubItem2" target="_self">SUB-ITEM-2</a>
        </li>
      </ul>
    </li>
    <li id="item2" title="ITEM-2">
      <ul>
        <li id="subitem3"  title="subitem 3">
          <a href="subtitem3.html" aria-label="Abre misma ventana página SubItem3" target="_self">SUB-ITEM-3</a>
        </li>
        <li id="subitem4"  title="subitem 4">
          <a href="subtitem4.html" aria-label="Abre misma ventana página SubItem4" target="_self">SUB-ITEM-4</a>
        </li>
      </ul>
    </li>
    <li data-type="link" id="item3" title="item 3">
      <a href="item3.html" aria-label="Abre misma ventana página Item3" target="_self">ITEM-3</a>
    </li>
    <li data-type="link" id="item4" title="item 4">
      <a href="https://item4.com/" aria-label="Abre misma ventana página Item4"  target="_self">ITEM-4</a>
    </li>
    <li data-type="link" id="item5" title="item 5">
      <a href="item5.html" aria-label="Abre misma ventana página Item5" target="_self">ITEM-5</a>
    </li>
  </ul>
</navigation-menu>

```
<!---
```
<custom-element-demo>
  <template>
    <link rel="import" href="navigation-menu.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->

```html
<navigation-menu></navigation-menu>
```

## Properties

|                 |  Attribute            |  Type    | Description			                               |                 
|-----------------|-----------------------|----------|-------------------------------------------------|
|language		      |  language             |string    |Set the component language                       |
|iconMobileOpen   |  icon-mobile-open     |string    |Path of the opening icon image in mobile version |
|iconMobileClose  |  icon-mobile-close    |string 	 |Path of the close icon image in mobile version   |
|iconDesktop	    |  icon-desktop         |string	   |Path of the icon image in desktop version        |


## CSS Shadow Parts

|      Name       |  Description                          
|-----------------|---------------------------------------------------------------|
|nav-bar		      |  The nav bar                                                  |
|nav-ul           |  The list container                                           |
|nav-li           |  The items wrapper displayed into the navigation menu         |
|nav-item   	    |  The items  displayed into the navigation                     |
|nav-subitem   	  |  The items wrapper displayed into the secondary drop down menu|
|nav-dropdrown   	|  The container that drop down in desktop view                 |




## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ npm run start
```

## Running Tests

```
$ npm run test
```

## Build
```
$ npm run build
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.

##Author
**KairósDS Team**

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details