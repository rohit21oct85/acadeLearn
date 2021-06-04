import Head from '../components/common/Head'
import Footer from '../components/common/Footer'
import Foot from '../components/common/Foot'
import { Link } from 'react-router-dom'
import {useHistory, useParams, useLocation} from 'react-router-dom'
import { baseUrl } from "../config/config";

export default function SearchSchool(){
    const history = useHistory();
    const params  = useParams();
    const location = useLocation();

    return(
        <>
        <Head/>
            <section className="top-logo1 home_header_top">
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-6">
                    <a href="index.php"><img src="/images/logo/logo.png" className="img-fluid"/> AcadeLearn</a>
                </div>
                <div className="col-md-6 text-right top_login_btn">
                    <a href="select-login.php"><i className="fa fa-user"></i> Log In</a>
                </div>
                </div>
            </div>
            </section>
            {/* <!-- BEGIN: Content--> */}
            <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="content-wrapper learningschool-wrapper p-0">
                <section className="home_banner">
                <div className="container-fluid custom_container">
                <div className="row">
                <div className="col-md-6">
                <div className="banner_text_top"> 
                                        <h2>Welcome To AcadeLearn!</h2>
                                        <h3>Assessments have never been easier</h3>
                                        <p>Login & Access our Extensive Online Library of Bespoke Assessments</p>
                                        <div className="">
                                            <div className="bot-20">&nbsp;</div>
                                            <form className="school_name_form">
                                                <div className="form-group floatlabel">
                                                {/* <!-- <label className="label" for="school-name">Enter your school name</label>--> */}
                                                    <input type="text" className="form-control" name="school-name" id="school-name" placeholder="Enter Your School Name"/>
                                                </div>
                                                <div className="search_button">
                                                    <Link to={`subdomain.${baseUrl}/`}><button className="btn next_btn btn_school_next" type="button">Next</button></Link>
                                                </div>
                                            </form>
                                        </div>
                                        
                </div>
                </div>
                <div className="col-md-6">
                <div className="banner_img_top">
                <span><img src="/images/banner_img.png" className="img-fluid" alt=""/></span>
                </div>
                </div>
                </div>
                </div>
                </section>

                
                <section className="expenses section1 ">
                <div className="container-fluid custom_container"> 
                <div className="col-md-12 bg_color_befr pt-5 pb-5">
                <div className="row">
                <div className="col-md-4 expenses-img">
                <span><img src="/images/expenses-img.png" className="img-fluid" alt=""/></span>
                </div>
                <div className="col-md-5 expenses-img">
                <div className="expenses-text">
                <h2>With us, conducting tests is quick and easy.</h2>
                <p>Schools can choose our -</p>
                <ul>
                <li> Multiple chapter-wise tests for Science, Mathematics and Social Science for classNamees 6 to 10</li>
                <li> Verified tests for Physics, Chemistry, Mathematics and Biology for classNamees 11 and 12.</li>
                <li> Authentic mid-term and yearly tests.</li> 


                </ul>
                <button type="button" className="Sign-Up-Free">Register Now</button>
                </div>
                </div>
                <div className="col-md-3">
                <span className="circle_home_page"></span>
                </div>
                
                </div>
                </div> 
                </div>
                </section>
                
                
                
                <section className="expenses section2 transparent_bg mt-5 mb-5">
                <div className="container-fluid custom_container"> 
                <div className="col-md-12 bg_color_befr pt-5 pb-5">
                <div className="row"> 
                <div className="col-md-3">
                <span className="circle_home_page2"></span>
                </div>
                <div className="col-md-5 expenses-img text-left">
                <div className="expenses-text">
                <h2>We are more than just an assessment platform.</h2>
                <p>Schools also receive -</p>
                <ul>
                <li> Detailed test-wise, student-wise, className-wise, and subject wise reports.</li>
                <li> Cumulative reports analyzing the entire school's performance during an academic year.</li>
                <li> Separate portals for principals, teachers and students.</li> 
                </ul>
                <button type="button" className="Sign-Up-Free">Register Now</button>
                </div>
                </div>
                <div className="col-md-4 expenses-img">
                <span><img src="/images/transparent-img.png" className="img-fluid" alt=""/></span>
                </div>
                </div>
                </div> 
                </div>
                </section>  
            </div>
            </div>
            <Footer/>
            <Foot/>
        </>
    )
}