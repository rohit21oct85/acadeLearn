import React,{useReducer} from 'react'

const name =  localStorage.getItem('name');
const user_id =  localStorage.getItem('user_id');
const email = localStorage.getItem('email');
const role = localStorage.getItem('role');
const user_type = localStorage.getItem('user_type');
const class_name = localStorage.getItem('class_name');
const class_id = localStorage.getItem('class_id');
const section = localStorage.getItem('section');
const school_id = localStorage.getItem('school_id');
const school_slug = localStorage.getItem('school_slug');
const school_logo = localStorage.getItem('school_logo');
const created_at = localStorage.getItem('created_at');
const isLoggedIn = localStorage.getItem('isLoggedIn')
const access_token =  localStorage.getItem('access_token');
const refresh_token =  localStorage.getItem('refresh_token');

const initialState = {
    isLoggedIn: isLoggedIn ? isLoggedIn : false,
    name: name? name: null,
    user_id: user_id? user_id: null,
    email: email ? email : null,
    role: role ? role : null,
    user_type: user_type ? user_type : null,
    school_id: school_id ? school_id : null,
    section: section ? section : null,
    class_name: class_name ? class_name : null,
    class_id: class_id ? class_id: null,
    created_at: created_at ? created_at : null,
    access_token: access_token? access_token: null,
    refresh_token: refresh_token? refresh_token: null,
    school_slug: school_slug ? school_slug : null,
    school_logo: school_logo ? school_logo : null,
}
export const AuthContext = React.createContext(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn, 
                name: action.payload.name, 
                user_id: action.payload.user_id, 
                email: action.payload.email, 
                role: action.payload.role, 
                user_type: action.payload.user_type, 
                section: action.payload.section, 
                class_name: action.payload.class_name, 
                school_id: action.payload.school_id, 
                class_id: action.payload.class_id, 
                created_at: action.payload.created_at, 
                access_token: action.payload.access_token, 
                refresh_token: action.payload.refresh_token, 
                username: action.payload.username, 
            }
            
           
        case 'LOGOUT':
            localStorage.clear();
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('name');
            localStorage.removeItem('user_id');
            localStorage.removeItem('email');    
            localStorage.removeItem('username');    
            localStorage.removeItem('user_type');    
            localStorage.removeItem('created_at');
            localStorage.removeItem('isLoggedIn');
            
            return {
                ...state,
                isLoggedIn: false,
                fullname: null,
                email: null,
                access_token: null,
                refresh_token: null,
            }    
        default:
            return state;
    }  
}

function AuthProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AuthContext.Provider value={{ state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
