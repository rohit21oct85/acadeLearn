import { useHistory, Link } from 'react-router-dom'
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { authAxios, apiUrl } from '../../config/config';

export default function HeaderNav(){
    const [searchState, setSearchState] = useState('');
    const [showDrop, setShowDrop] = useState('');
    const [showLang, setShowLang] = useState('');
    const {dispatch} = useContext(AuthContext);
    const history = useHistory();


    const openSearch = () => {
        if(searchState == 'open'){
            setSearchState('')
        }else{
            setSearchState('open')
        }
    }
    const changeDrop = () => {
        if(showDrop == 'show'){
            setShowDrop('')
        }else{
            setShowDrop('show')
        }
    }

    const changeLanguage = () => {
        if(showLang == 'show'){
            setShowLang('')
        }else{
            setShowLang('show')
        }
    }

    const logout = async() => {
        const user_type = localStorage.getItem('user_type');
        let formData = {user_type: localStorage.getItem('user_type') , user_id: localStorage.getItem('user_id')};
        await authAxios.post(`${apiUrl}v1/${user_type}/logout`, formData).then(response =>{
            if(response){
                dispatch({ type: 'LOGOUT' })
                history.push('/');
            }
        })
        
    }

    return(
        <>
            <nav className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light bg-info navbar-shadow nav_styl">
                <div className="navbar-wrapper">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav flex-row">
                            <li className="nav-item mobile-menu d-md-none mr-auto"><a className="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i className="ft-menu font-large-1"></i></a></li>
                            <li className="nav-item logo_1"><a className="navbar-brand" href="#"><img className="brand-logo" alt="modern admin logo" src="/images/logo/logo.png"/>
                                <h3 className="brand-text">AcadeLearn</h3></a></li>
                            <li className="nav-item d-md-none"><a className="nav-link open-navbar-container" data-toggle="collapse" data-target="#navbar-mobile"><i className="la la-ellipsis-v"></i></a></li>
                        </ul>
                    </div>
                    <div className="navbar-container content">
                        <div className="collapse navbar-collapse" id="navbar-mobile">
                            <ul className="nav navbar-nav mr-auto float-left">
                            {/* <!--<li className="nav-item d-none d-md-block"><a className="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i className="ft-menu"></i></a></li>--> */}
                            <li className="nav-item d-none d-lg-block"><a className="nav-link nav-link-expand" href="#"><i className="ficon ft-maximize"></i></a></li>
                            
                            <li className="nav-item nav-search" onClick={openSearch}><a className="nav-link nav-link-search" href="#"><i className="ficon ft-search"></i></a>
                                <div className={`search-input ${searchState}`}>
                                <input className="input" type="text" placeholder="Explore Modern..." tabIndex="0" data-search="template-list"/>
                                <div className="search-input-close" onClick={openSearch}><i className="ft-x"></i></div>
                                <ul className="search-list"></ul>
                                </div>
                            </li>
                            </ul>
                            <ul className="nav navbar-nav float-right">
                            <li className={`dropdown dropdown-language nav-item ${showLang}`} onClick={changeLanguage}><a className="dropdown-toggle nav-link" id="dropdown-flag" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="flag-icon flag-icon-gb"></i><span className="selected-language"></span></a>
                                <div className={`dropdown-menu ${showLang}`} aria-labelledby="dropdown-flag"><a className="dropdown-item" href="#" data-language="en"><i className="flag-icon flag-icon-us"></i> English</a><a className="dropdown-item" href="#" data-language="fr"><i className="flag-icon flag-icon-fr"></i> French</a><a className="dropdown-item" href="#" data-language="pt"><i className="flag-icon flag-icon-pt"></i> Portuguese</a><a className="dropdown-item" href="#" data-language="de"><i className="flag-icon flag-icon-de"></i> German</a></div>
                            </li>
                            <li className={`dropdown dropdown-user nav-item ${showDrop}`} onClick={changeDrop}><a className="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown"><span className="mr-1 user-name text-bold-700">{localStorage.getItem('name')}</span><span className="avatar avatar-online"><img src="/images/portrait/small/avatar-s-19.png" alt="avatar"/><i></i></span></a>
                                <div className={`dropdown-menu dropdown-menu-right ${showDrop}`}><Link className="dropdown-item" to="/student/profile"><i className="ft-user"></i> Edit Profile</Link>
                                {/* <!--<a className="dropdown-item" href="#"><i className="ft-clipboard"></i> Todo</a><a className="dropdown-item" href="#"><i className="ft-check-square"></i> Task</a>--> */}
                                <div className="dropdown-divider" ></div><a className="dropdown-item" href="#" onClick={logout}><i className="ft-power"></i> Logout</a>
                                </div>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}