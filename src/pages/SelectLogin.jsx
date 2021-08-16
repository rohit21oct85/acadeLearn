import Head from '../components/common/Head'
import Footer from '../components/common/Footer'
import Foot from '../components/common/Foot'
import { Link } from 'react-router-dom'
import {useHistory, useParams, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { authAxios, apiUrl, baseUrl } from '../config/config'

export default function SelectLogin(){
    const history = useHistory();
    const params  = useParams();
    const location = useLocation();
    const [image, setImage] = useState();

    const handleClick = () => {
        history.push(`${baseUrl}/search-school`)
    }

    useEffect(()=>{
        const parsedData = window.location.host.split(".");

        if(parsedData.length >= 3){
            const subDomain = parsedData[0];
            getSchoolLogo(subDomain)
        }
        async function getSchoolLogo(sub_domain){
            const data = await authAxios.get(`${apiUrl}v1/web/get-school-logo/${sub_domain}`)
            const image = `https://drive.google.com/uc?export=view&id=${data?.data?.data?.school_logo}`
            localStorage.setItem('schoolImageUrl',image);
            localStorage.setItem('schoolName', data?.data?.data?.school_name);
            setImage(data?.data?.data?.school_logo)
        }
        }, [])
    
    return(
        <>
        <Head/>
            <section className="top-logo1 home_header_top">
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-12">
                    <Link to="" onClick={handleClick}><img src="/images/logo/logo.png" className="img-fluid"/> AcadeLearn</Link>
                </div>
                </div>
            </div>
        </section>
        {/* <!-- BEGIN: Content--> */}
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="content-wrapper learningschool-wrapper bg_img1 bg_img3"> 
                <div className="content-body">
                <div id="crypto-stats-3" className="row">
                    <div className="col-xl-12">
                        <div className="">
                            <div className="card-content">
                            <div className="card-body pb-0">
                                <div className="row mt-0">
                                    <div className="col-md-12 text-center select_you_are">
                                    <span className="logo_school"><img src={`https://drive.google.com/uc?export=view&id=${image}`} alt=""/></span>
                                    <h2>Welcome to the online assessment portal of AcadeLearn!
                                    <span>Here, you can Log In as </span></h2>
                                    {/* <p>Login As</p> */}
                                    <ul>
                                        <li><Link to="/student/login"><img src="/images/student-img1.png" className=""/><span> Student</span></Link></li> 
                                        <li><Link to="/teacher/login"><img src="/images/teacher-img1.png" className=""/> <span>Teacher</span></Link></li>
                                        <li><Link to="/principal/login"><img src="/images/principal-img1.png" className=""/> <span>Principal</span></Link></li>
                                    </ul>
                                    </div> 
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div> 
                </div>
            </div>
        </div>
        <Footer/>
        <Foot/>
      </>
    )
}