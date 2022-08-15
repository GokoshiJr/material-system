import * as React from 'react';
import PropTypes from 'prop-types';

const AppContext = React.createContext(null);

AppProvider.propTypes = {
  children: PropTypes.element
}

function AppProvider({ children }) {

  const [token, setToken] = React.useState(window.localStorage.getItem('token'));
  const [loggedUser, setLoggedUser] = React.useState(null);
  const [loggedEmployee, setLoggedEmployee] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [products, setProducts] = React.useState(null);

  const signout = () => {
    window.localStorage.setItem("token", "")
    setToken("");
  }

  const value = {
    token,
    setToken,
    loggedUser,
    setLoggedUser,
    isAdmin,
    setIsAdmin,
    products,
    setProducts,
    signout,
    loggedEmployee,
    setLoggedEmployee
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider }
