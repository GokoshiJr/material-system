import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppContext } from './AppContext';

IsLogged.propTypes = {
  children: PropTypes.element 
}

export default function IsLogged({ children }) {
  const auth = React.useContext(AppContext);

  const location = useLocation(); 

  // si ya estoy logeado no me muestres la vista login/register - redirección al loggear usuario
  if (auth.token) {
    return <Navigate to="/dashboard/app" state={{ from: location }} replace />
  }

  return children;
}
