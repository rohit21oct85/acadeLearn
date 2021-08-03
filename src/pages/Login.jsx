import Head from '../components/common/Head'
import Footer from '../components/common/Footer'
import Foot from '../components/common/Foot'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router-dom'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { apiUrl } from "../config/config";
import axios from "axios";

export default function Login(){
    const parsedData = window.location.host.split(".");
    const subDomain = parsedData[0];
    
    const params = useParams();
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const {dispatch, state } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
            const formData = {email: emailRef.current.value , password: passwordRef.current.value, sub_domain: subDomain};
            await axios.post(`${apiUrl}v1/${user_type}/login`, formData).then(
                response=>{
                    if(response?.data?.status ===203){
                        setErrorMessage('Password Mismatch!');
                    }else if(response.status == 200){
                        let access_token = response?.data?.accessToken
                        let refresh_token = response?.data?.refreshToken
                        let user_id = user_type == "student" ? response?.data?.student?._id : (user_type == "teacher") ? response?.data?.teacher?._id : response?.data?.principal?._id
                        let gender = user_type == "student" ? response?.data?.student?.gender : (user_type == "teacher") ? response?.data?.teacher?.gender : response?.data?.principal?.gender
                        let address = user_type == "student" ? response?.data?.student?.address : (user_type == "teacher") ? response?.data?.teacher?.address : response?.data?.principal?.address
                        let name = user_type == "student" ? response?.data?.student?.name : (user_type == "teacher") ? response?.data?.teacher?.name : response?.data?.principal?.name
                        let email = user_type == "student" ? response?.data?.student?.email : (user_type == "teacher") ? response?.data?.teacher?.email : response?.data?.principal?.email
                        let created_at = user_type == "student" ? response?.data?.student?.created_at : (user_type == "T") ? response?.data?.teacher?.created_at : response?.data?.principal?.created_at
                        let school_id = user_type == "student" ? response?.data?.student?.school_id : (user_type == "teacher") ? response?.data?.teacher?.school_id : response?.data?.principal?.school_id
                        let class_name = user_type == "student" ? response?.data?.student?.class : response?.data?.teacher?.class
                        let class_id = user_type == "student" ? response?.data?.student?.class_id : response?.data?.teacher?.class_id
                        let section = user_type == "student" ? response?.data?.student?.section : response?.data?.teacher?.section
                        let subject_id = user_type == "teacher" && response?.data?.teacher?.subject_id
                        let subject_name = user_type == "teacher" && response?.data?.teacher?.subject_name
                        let isLoggedIn = true;
                        let role = "";
                        localStorage.setItem('access_token', access_token)
                        localStorage.setItem('refresh_token', refresh_token);
                        localStorage.setItem('name', name);
                        localStorage.setItem('user_id', user_id);
                        localStorage.setItem('email', email);
                        localStorage.setItem('school_id', school_id);
                        localStorage.setItem('class_name', class_name);
                        localStorage.setItem('class_id', class_id);
                        localStorage.setItem('section', section);
                        localStorage.setItem('user_type', user_type);
                        localStorage.setItem('created_at', created_at);
                        localStorage.setItem('isLoggedIn', isLoggedIn);
                        localStorage.setItem('subject_name',subject_name);
                        localStorage.setItem('subject_id',subject_id);
                        localStorage.setItem('gender',gender);
                        localStorage.setItem('address',address);
                        const payloadData = {
                            isLoggedIn,
                            name,
                            user_id,
                            email,
                            role,
                            user_type,
                            section,
                            class_name,
                            school_id,
                            class_id,
                            created_at,
                            access_token,
                            refresh_token,
                            gender,
                            address
                        }
                        if(isLoggedIn){
                            dispatch({type: 'LOGIN', payload: payloadData});
                            if(user_type=== 'student'){
                                history.push(`/student/student-dashboard/${class_id}/${class_name}`)
                            }
                            else if(user_type === 'teacher'){
                                history.push(`/teacher/teacher-dashboard/tab0`)
                            }
                            else if(user_type === 'principal'){
                                history.push(`/principal/principal-dashboard/${school_id}`)
                            }
                        }
                    }
            }).catch(error =>{
                if(error.response && error.response.status == 401){
                    // addToast(`${response?.data?.message}`, { appearance: 'error',autoDismiss: true });
                    setErrorMessage('Unauthorized!');
                }else if(error.response && error.response.status == 403){
                    setErrorMessage('Account not Active!');
                }
            })
            
            setLoading(false);
        }   
    }    
    // useEffect(checkLoggedInUser,[state]);
    
    // async function checkLoggedInUser(){
    //     if(state?.isLoggedIn == true){
    //         if(state?.user_type == "student"){
    //             history.push(`/student/student-dashboard/${state.class_id}/${state.class_name}`)
    //         }else if(state?.user_type == "teacher"){
    //             history.push(`/teacher/teacher-dashboard/tab0`)
    //         }else if(state?.user_type == "principal"){
    //             history.push(`/principal/principal-dashboard/${state.school_id}`)
    //         }
    //     }else if(state?.isLoggedIn != true){
    //         if(params.user_type == "student"){
    //             history.push('/student/login');
    //         }else if(params.user_type == "teacher"){
    //             history.push('/teacher/login');
    //         }else if(params.user_type == "principal"){
    //             history.push('/principal/login');
    //         }
    //     }
    // }

    useEffect(()=>{
        async function checkLoggedInUser(){
            if(state?.isLoggedIn == true || state?.isLoggedIn == "true"){
                if(state?.user_type == "student"){
                    history.push(`/student/student-dashboard/${state.class_id}/${state.class_name}`)
                }else if(state?.user_type == "teacher"){
                    history.push(`/teacher/teacher-dashboard/tab0`)
                }else if(state?.user_type == "principal"){
                    history.push(`/principal/principal-dashboard/${state.school_id}`)
                }
            }else if(state?.isLoggedIn != true || state?.isLoggedIn != "true"){
                if(params.user_type == "student"){
                    history.push('/student/login');
                }else if(params.user_type == "teacher"){
                    history.push('/teacher/login');
                }else if(params.user_type == "principal"){
                    history.push('/principal/login');
                }
            }
        }
        checkLoggedInUser();
    },[])

    return(
        <>  
            <Head/>
            <section className="top-logo1 logo_details">
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
            <div className="content-wrapper learningschool-wrapper pt-5 m-2">
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
                                        <p className="next_btn1">
                                            {params.user_type == "student" ? 
                                            "Welcome to Acadelearn. To log in, enter your username and password assigned by your school."
                                            : params.user_type == "teacher" ? "Welcome to Acadelearn. Please enter your username and password to log in and assign tests.":
                                            "We welcome you to Acadelearn. Please enter your username and password to log in to the assessment portal that solves all test needs of your school."}
                                            </p>
                                        
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
                                                {errorMessage && (
                                                    <p className="danger"> {errorMessage} </p>
                                                )}
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