import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchOpen: false,
      searchText: '',
      isMobileMenuOpen: false
    };
    this.searchRef = React.createRef();
  }

  toggleSearch = () => {
    this.setState((prevState) => ({
      isSearchOpen: !prevState.isSearchOpen
    }), () => {
      if (this.state.isSearchOpen) {
        this.searchRef.current.focus();
      }
    });
  };

  handleSearchChange = (event) => {
    this.setState({
      searchText: event.target.value
    });
  };

  handleClickOutside = (event) => {
    if (this.searchRef.current && !this.searchRef.current.contains(event.target)) {
      this.setState({
        isSearchOpen: false
      });
    }
  };

  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen
    }));
  };

  closeMobileMenu = () => {
    this.setState({
      isMobileMenuOpen: false
    });
  };

  render() {
    const { isSearchOpen, searchText, isMobileMenuOpen } = this.state;
    const { isLoggedIn, handleLogout } = this.props;
    return (
      <header className="header" style={{ background: '#f1f1f1' }}>
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between max-w-screen-xl">
          <Link to={'/'} className="flex cursor-pointer title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-3xl font-bold">CAMBALACHESSS</span>
          </Link>
          <nav className="flex items-center text-base justify-end ml-12">
            <Link to={'/Home'} className="mr-4 hover:text-gray-900">Inicio</Link>
            <Link to={'/products'} className="mr-4 hover:text-gray-900">Productos</Link>
            <Link to={'/contact'} className="mr-4 hover:text-gray-900">Contactanos</Link>
            <Link to={'/about'} className="mr-4 hover:text-gray-900">Nosotros</Link>
          </nav>
          <div className="flex items-center">
            <div className="relative">
              <button
                className="search-toggle bg-gray-200 text-gray-900 rounded border-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 py-2 px-4 mr-2"
                onClick={this.toggleSearch}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 19l-6-6m0 0l-6 6m6-6l6-6" />
                </svg>
              </button>
              {isSearchOpen && (
                <input
                  ref={this.searchRef}
                  className="search-input absolute top-0 right-0 bg-gray-200 text-gray-900 rounded border-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 py-2 px-4 mr-2"
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={this.handleSearchChange}
                />
              )}
            </div>
            {isLoggedIn ? (
              <>
                <Link to={'/cart'} className="btn bg-black text-white hover:bg-white hover:text-black rounded py-2 px-4 ml-2">
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </Link>
                <button className="btn bg-red-500 text-white hover:bg-red-700 hover:text-white rounded py-2 px-4 ml-2" onClick={handleLogout}>
                  Cerrar
                </button>
              </>
            ) : (
              <>
                <Link to={'/register'} className="btn bg-black text-white hover:bg-white hover:text-black rounded py-2 px-4 mr-2" onClick={this.closeMobileMenu}>
                  Registro
                </Link>
                <Link to={'/login'} className="btn bg-black text-white hover:bg-white hover:text-black rounded py-2 px-4 mr-2" onClick={this.closeMobileMenu}>
                  Entrar
                </Link>
                <Link to={'/cart'} className="btn bg-black text-white hover:bg-white hover:text-black rounded py-2 px-4 ml-2">
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </Link>
              </>
            )}
          </div>
          <button className="md:hidden" onClick={this.toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
