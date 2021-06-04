import Head from '../components/common/Head'
import Footer from '../components/common/Footer'
import Foot from '../components/common/Foot'
import { Link } from 'react-router-dom'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { apiUrl } from "../config/config";
import axios from "axios";

export default function Login(){
    const params = useParams();
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const {dispatch, state } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const submitForm = async (e,dus) => {
        const user_type = params.user_type;
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(email === ''){
            // addToast('Please enter email address', { appearance: 'error',autoDismiss: true });
            return false;
        }else if(password === ''){
            // addToast('Please enter password', { appearance: 'error',autoDismiss: true });
            passwordRef.current.focus()
            return false;
        }else{
            setLoading(true);
            const formData = {email: emailRef.current.value , password: passwordRef.current.value};
            console.log(formData)
            const response = await axios.post(`${apiUrl}v1/${user_type}/login`, formData);
            if(response?.data?.status === 401){
                // addToast(`${response?.data?.message}`, { appearance: 'error',autoDismiss: true });
                setLoading(false);
            }else{
                let access_token = response?.data?.accessToken
                let refresh_token = response?.data?.refreshToken
                let first_name = user_type == "student" ? response?.data?.student?.first_name : (user_type == "teacher") ? response?.data?.teacher?.first_name : response?.data?.principal?.first_name
                let last_name = user_type == "student" ? response?.data?.student?.last_name : (user_type == "teacher") ? response?.data?.teacher?.last_name : response?.data?.principal?.last_name
                let email = user_type == "student" ? response?.data?.student?.email : (user_type == "teacher") ? response?.data?.teacher?.email : response?.data?.principal?.email
                let username = user_type == "student" ? response?.data?.student?.username : (user_type == "teacher") ? response?.data?.teacher?.username : response?.data?.principal?.username
                let created_at = user_type == "student" ? response?.data?.student?.created_at : (user_type == "teacher") ? response?.data?.teacher?.created_at : response?.data?.principal?.created_at
                let school_id = user_type == "student" ? response?.data?.student?.school_id : (user_type == "teacher") ? response?.data?.teacher?.school_id : response?.data?.principal?.school_id

                let isLoggedIn = true;
                localStorage.setItem('access_token', access_token)
                localStorage.setItem('refresh_token', refresh_token);
                localStorage.setItem('first_name', first_name);
                localStorage.setItem('last_name', last_name);
                localStorage.setItem('email', email);
                localStorage.setItem('username', username);
                localStorage.setItem('user_type', user_type);
                localStorage.setItem('created_at', created_at);
                localStorage.setItem('isLoggedIn', isLoggedIn);
                const payloadData = {
                    isLoggedIn,
                    first_name,
                    last_name,
                    email,
                    username,
                    user_type,
                    created_at,
                    access_token,
                    refresh_token
                }
                if(isLoggedIn){
                    dispatch({type: 'LOGIN', payload: payloadData});
                    if(user_type=== 'student'){
                        history.push('/student/student-dashboard')
                    }
                    else if(user_type === 'teacher'){
                        history.push('/teacher/teacher-dashboard')
                    }
                    else if(user_type === 'principal'){
                        history.push('/principal/principal-dashboard')
                    }
                    // history.push('/student/student-dashboard');
                }
            }
            setLoading(false);
        }   
    }

    useEffect(checkLoggedInUser,[state]);
    async function checkLoggedInUser(){
        if(state?.isLoggedIn === true){
            if(state?.user_type === "student"){
                history.push(`/student/student-dashboard`)
            }else if(state?.user_type === "teacher"){
                history.push('/teacher/teacher-dashboard')
            }else if(state?.user_type === "principal"){
                history.push('/principal/principal-dashboard')
            }
        }else{
            if(params.user_type == "student"){
                history.push('/student/login');
            }else if(params.user_type == "teacher"){
                history.push('/teacher/login');
            }else if(params.user_type == "principal"){
                history.push('/principal/login');
            }
        }
    }

    return(
        <>  
            <Head/>
            <section className="top-logo1">
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-12">
                <Link to="/"><img src="/images/logo/logo.png" className="img-fluid"/> AcadeLearn</Link>
                </div>
                </div>
            </div>
        </section>
        {/* <!-- BEGIN: Content--> */}
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="content-wrapper learningschool-wrapper">
                <div className="content-header row">
                </div>
                <div className="content-body">
                <div id="crypto-stats-3" className="row">
                    <div className="col-xl-12">
                        <div className="">
                            <div className="card-content">
                            <div className="card-body pb-0">
                                <div className="row">
                                    <div className="col-md-6 mt-4">
                                        <span className="education1"><img src="/images/education.png" className="img-fluid" alt=""/></span>  
                                    </div>
                                    <div className="col-md-6 mt-4"> 
                                        
                                        <div className="school_text login_as login_as3">
                                        <div className="back_page back_page2  mb-1"><Link to="/"><i className="fas fa-reply"></i> Back</Link></div>
                                        <h2 className="next_btn1">
                                            Fill in your details
                                        </h2>
                                        
                                        <p className="next_btn1">Welcome to Acadelearn. To log in, enter your username and password assigned by your school.</p>
                                        
                                        <div className="">
                                            <div className="bot-20">&nbsp;</div>
                                            <form className="school_name_form" onSubmit={submitForm}>
                                                <div className="form-group floatlabel">
                                                {/* <!-- <label className="label" for="email">Enter your Mobile Number or Email Address</label>--> */}
                                                    <input type="text" className="form-control" name="email" required id="email" ref={emailRef} placeholder="Enter Your Username"/>
                                                </div>
                                                <div className="form-group floatlabel">
                                                    {/* <!--<label className="label" for="password">Enter Password</label>--> */}
                                                    <input type="password" className="form-control" name="password" required id="password" ref={passwordRef} placeholder="Enter Password"/>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <div className="row">
                                                    <div className="form-group col-md-6 form-check">
                                                        <label className="form-check-label">
                                                        <input className="form-check-input" type="checkbox"/> Remember me
                                                        </label>
                                                    </div>
                                                    <div className="form-group col-md-6 form-check  text-right">
                                                        <div className="forgot_password"><a href="#">Forgot Password? </a> </div>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="search_button">
                                                    {/* <Link to="/student/student-dashboard"> */}
                                                        <button className="btn next_btn next_btn1" type="submit">
                                                            { loading ? "logging in" : "Log in" }
                                                        </button>
                                                    {/* </Link>  */}
                                                </div>
                                            </form>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Candlestick Multi Level Control Chart --> */}
                </div>
            </div>
        </div>
        <Footer/>
        <Foot/>
        </>
    )
}