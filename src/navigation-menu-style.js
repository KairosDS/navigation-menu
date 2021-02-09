import { css } from 'lit-element';

export const wcNameStyles = css`
:host {
  display: block;
  font-family: sans-serif;
  height: 100%;

}
.navbar {
  width: 92vw;
  height: 90vh;
  cursor: hand;
  position: fixed;
  top: 60px;
  right: -120%;
  background-color: #464545;
  transition: all 0.75s ease;
  font-size: 16px;
}


.navbar-menu-icon {
  width: 14px;
  height: 14px;
  position: absolute;
  top: 17px;
  right: 17px;
  background: url(/demo/assets/images/menu-navigation-xs.svg) no-repeat center;
  background-size: 100%;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
}

.navbar__input {
  display: none;
}

.navbar__input:checked ~ .navbar-menu-icon {
  transform: rotate(90deg);
  background-image: url(/demo/assets/images/menu-nav-close.svg);
}

.navbar__input:checked ~ .navbar {
  right: 0;
}


.navbar-list {
  flex-direction: column;
  justify-content: space-around;
  display: flex;
  width: 94%;
  height: 50vh;
  align-items: flex-start;
  padding: 0;
  margin-top: 30px;
}

ul {
  list-style: none;
}

ul li {
  margin-right: 10px;
}

ul li a, span {
  color: #FFFFFF;
  text-decoration: none;
  outline: none;
}

.navbar-list__item {
  padding-left: 50px;

}

.navbar__btn-lang-mobile--show {
  width: 100%;
  position: absolute;
  bottom: -1px;
  right: 0%;
  heigth: 48px;
  background-color: #F5F6FA;
}

.navbar__btn-lang-desktop--hide {
  display: none;
}

.navbar-logo__link {
  text-decoration: none;
}

.navbar-logo {
  padding-left: 1%;
}

.arrow-right-navigation{
  padding-left: 16px;
}

.arrow-left-navigation{
  padding-right: 16px;
}

.inactive {
  display: none;
}
.active {
  display: flex;
  position: absolute;
  top: 90px;
  width: 100%;
  height: 100%;
  border-top: 2px solid white;
  background-color: #464545;
  transition: all 0.75s ease;
  color: #FFFFFF;
}



/* DESKTOP STYLES  */
@media all and (min-width: 1024px) {
  .navbar-container {
    justify-content: space-between;
    height: 100%;
    justify-content: center;
  }

  .navbar {
    width: auto;
    min-width: 700px;
    height: 100%;
    margin-right: 10%;
    position: static;
    transition: none;
    background-color: transparent;
  }

  .navbar-list {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .navbar-list__item {
    padding: 0  0 0 8px;
    cursor: pointer; 
  }

  ul li {
    margin: 0;
   
  }

  ul li a:hover{
    border-bottom: 2px solid #4F4F50;
  }

  ul li a:focus{
    border-bottom: 2px solid #4F4F50;
  }

  ul li a.selected {
    color: #f5a623;
    
  }
  ul li a:active {
    border-bottom: 2px solid #FF7900;
  }

  ul li span:hover {
    border-bottom: 2px solid #4F4F50;
  }

  ul li span:focus-visible  {
    border-bottom: 2px solid #4F4F50;
  } 
  
  ul li span:active {
    border-bottom: 2px solid #FF7900;
  }

  .drop__menu-link:hover {
    border-bottom: 2px solid #FF7900;
  }

  .drop__menu-link:focus {
    border-bottom: 2px solid #FF7900;
  } 

  .drop__menu-link:active {
    border-bottom: 2px solid #4F4F50;
  }
  
  .dropdown-nav-li {
    padding-top: 14px;
  }

  .navbar-list__item:focus {
    outline: none;
  }


  .navbar-menu-icon {
    display: none;
  }

  .navbar-list {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  
  ul li a, span {
    color: #4D4D4E;
  }

  .navbar-list__item {
    padding: 0  0 0 8px;
    height: 100%;
    display: flex;
    align-items: center;
  }


  .dropdown-services-container {
    position: absolute;
    top: 60px;
    box-shadow: 0px 2px 6px rgba(178, 176, 176, 0.5);
  }

  .dropdown-about-container {
    position: absolute;
    top: 40px;
    right: 40%;
  }

  .dropdown-capacities-container {
    position: absolute;
    top: 0px;
    left: 220px;
  }

  .dropdown-nav {
    background-color: white;
    box-sizing: border-box;
    padding: 24px 38px 38px 38px;
    max-width: 286px;
  }

  
  .arrow-down-dropdown {
    padding-left: 3px;
    height: 20px;
  }
}

@media all and (min-width: 1280px) {

  .navbar-list__item {
    padding: 0  0 0 16px;
  }
}
`;
