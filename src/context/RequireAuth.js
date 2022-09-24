import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AppContext } from './AppContext';
import { getMe } from '../utils/api';

const API_URL = process.env.REACT_APP_API_URL;

RequireAuth.propTypes = {
  children: PropTypes.element
}

export default function RequireAuth({ children }) {

  const auth = React.useContext(AppContext);
  const location = useLocation();

  const getUser = async () => {
    
    try {
      const { data } = await getMe(auth.token);
      
      if (data === "logout") {
        auth.signout()
        return <Navigate to="/login" state={{ from: location }} replace />
      } 

      auth.setLoggedUser(data.user);
      data.employee.userId = data.employee.userId.email;
      auth.setLoggedEmployee(data.employee);  
      
      
      
    } catch (error) {
      console.log(error)
    }
    
  }

  if (!auth.loggedUser && auth.token) {
    getUser();
  }

  // se ejecuta al recargar la pag / renderizar el provider
  /* axios({
    headers: {"x-access-token": auth.token},
    url: `${API_URL}/auth/isLogged`,
    method: 'POST'
  })
  .then((res)=>{
    console.log(`isLogged: ${res.statusText}`);
  })
  .catch((err) => {
    console.log(err)
    console.log('Log out')
    auth.signout()
  }) */

  if (!auth.token) {
    // logout
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
}
