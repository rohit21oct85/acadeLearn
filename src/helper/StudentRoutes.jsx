import React,{useContext} from 'react';
import { Route, Redirect } from "react-router-dom"
import {AuthContext} from '../context/AuthContext.jsx';

const StudentRoutes = ({ component: Component, ...rest }) => {
    const {state} = useContext(AuthContext);
    return (
                <Route {...rest} render={props => (
                state.isLoggedIn && state.user_type == "student" ?  <Component {...props} /> : <Redirect to={{ pathname: '/student/login' }} />
            )} />
    )
    
}
export default StudentRoutes;