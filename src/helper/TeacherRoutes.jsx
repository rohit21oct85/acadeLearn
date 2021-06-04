import React,{useContext} from 'react';
import { Route, Redirect } from "react-router-dom"
import {AuthContext} from '../context/AuthContext.jsx';

const TeacherRoutes = ({ component: Component, ...rest }) => {
    const {state} = useContext(AuthContext);
    return (
                <Route {...rest} render={props => (
                state.isLoggedIn && state.user_type == "teacher" ?  <Component {...props} /> : <Redirect to={{ pathname: '/teacher/login' }} />
            )} />
    )
    
}
export default TeacherRoutes;