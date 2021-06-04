import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import { Link } from 'react-router-dom'

export default function TeacherLogin(){
    return(
        <>  
            <Head/>
            <section className="top-logo1">
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-12">
                    <a href="index.php"><img src="/images/logo/logo.png" className="img-fluid"/> AcadeLearn</a>
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
                                        <div className="back_page back_page2  mb-1"><Link to="select-login"><i className="fas fa-reply"></i> Back</Link></div>
                                        <h2 className="next_btn1">
                                            Fill in your details
                                        </h2>
                                        
                                        <p className="next_btn1">Welcome to Acadelearn. To log in, enter your username and password assigned by your school.</p>
                                        
                                        <div className="">
                                            <div className="bot-20">&nbsp;</div>
                                            <form className="school_name_form">
                                                <div className="form-group floatlabel">
                                                {/* <!-- <label className="label" for="email">Enter your Mobile Number or Email Address</label>--> */}
                                                    <input type="text" className="form-control" name="email" id="email"  placeholder="Enter Your Username"/>
                                                </div>
                                                <div className="form-group floatlabel">
                                                    {/* <!--<label className="label" for="password">Enter Password</label>--> */}
                                                    <input type="text" className="form-control" name="password" id="password"  placeholder="Enter Password"/>
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
                                                <Link to="/teacher/teacher"><button className="btn next_btn next_btn1" type="button">Log In</button></Link>
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