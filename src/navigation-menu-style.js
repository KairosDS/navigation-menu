import { css } from 'lit-element';

export const wcNameStyles = css`
:host {
  display: block;
  font-family: sans-serif;
  height: 100%;
  width: 100%;

}
.navbar {
  padding-top: 30px;
  height: 100%;
  background-color: #464545;
}

.navbar-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
}

.dropdown-nav-li {
  padding-top: 14px;
  width: 100%;
}


ul {
  list-style: none;
  margin: 0;
  padding: 0;
}


ul li a {
  color: #FFFFFF;
  text-decoration: none;
  outline: none;
}

.dropdown-services-container {
  padding-left: 40px;
}

.navbar-list__title {
  color: #FFFFFF;
  text-decoration: none;
  outline: none;
}

.navbar-list__item {
  padding-bottom: 27px;

}

.icon-open-navigation {
  padding-left: 16px;
}

.icon-close-navigation {
  padding-right: 16px;
}

.inactive {
  display: none;
}


/* DESKTOP STYLES  */
@media all and (min-width: 1024px) {

  .navbar {
    padding-top: 0;
    background-color: #FFFFFF;
  }

  .navbar-list {
    margin: 0;
    padding: 0;
    font-size: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .navbar-list__item {
    cursor: pointer; 
    padding: 0  0 0 8px;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
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

  .navbar-list__item:focus {
    outline: none;
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
  
  ul li a {
    color: #4D4D4E;
  }

  .navbar-list__title {
    color: #4D4D4E;
    display: flex; 
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .dropdown-services-container {
    position: absolute;
    top: 22px;
    left: 0;
    min-width: 170px;
    box-shadow: 0px 2px 6px rgba(178, 176, 176, 0.5);
    background-color: white;
    box-sizing: border-box;
    padding: 24px 38px 38px 38px;
    max-width: 286px;
  }


  .icon-open-navigation {
    padding-left: 3px;
    height: 20px;
  }

  .icon-close-navigation {
    display: none; 
  }
  .animate-icon {
    transition: all 0.5s ease 0s;
  }
  .animate-icon.inactive {
    display: block;
    transform: rotate(180deg);
  }
}

@media all and (min-width: 1280px) {
  .navbar-list__item {
    padding: 0  0 0 16px;
  }
}
`;
