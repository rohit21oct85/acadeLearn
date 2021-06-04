import React,{useContext} from 'react';
import { Route, Redirect } from "react-router-dom"
import {AuthContext} from '../context/AuthContext.jsx';

const PrincipalRoutes = ({ component: Component, ...rest }) => {
    const {state} = useContext(AuthContext);
    return (
                <Route {...rest} render={props => (
                state.isLoggedIn && state.user_type == "principal" ?  <Component {...props} /> : <Redirect to={{ pathname: '/principal/login' }} />
            )} />
    )
    
}
export default PrincipalRoutes;