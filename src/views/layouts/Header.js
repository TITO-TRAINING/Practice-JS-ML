import icon from '../../resources/assets/home-icon.svg';

function Header() {
  return `
    <header id="headerContainer">
      <div class="header bg-dark">
        <div class="container">
          <div class="d-flex pt-3 pb-3  align-items-center">
            <div class="navbar-brand">
              <img src="${icon}" alt="logo-icon" />
            </div>
            <h1 class="mx-1 text-sm-start text-white">Logo</h1>
          </div>
        </div>
      </div>
    </header>
  `;
}

export default Header;
