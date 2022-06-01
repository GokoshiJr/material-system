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
    const { data } = await getMe(auth.token)
    auth.setLoggedUser(data.user)
    console.log(auth.token)
    console.log(data.user)  
  }

  if (!auth.loggedUser) {
    getUser()
  }

  // se ejecuta al recargar la pag
  React.useEffect(() => {
    axios({
      headers: {"x-access-token": auth.token},
      url: `${API_URL}/auth/isLogged`,
      method: 'POST'
    })
    .then((res)=>{   
      console.log(res)
      console.log('todo bien');
    })
    .catch((err) => {
      console.log(err)
      console.log('Log out')
      auth.signout()
    })
  }, []);

  if (!auth.token) {    
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;  
}
