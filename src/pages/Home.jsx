import Head from '../components/common/Head'
import Footer from '../components/common/Footer'
import Foot from '../components/common/Foot'
import { Link } from 'react-router-dom'

export default function Home(){
    return(
        <>
            <Head/>
            <section className="top-logo1 home_header_top">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/"><img src="/images/logo/logo.png" className="img-fluid" alt=""/> AcadeLearn</Link>
                        </div>
                    </div>
                </div>
            </section>
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper learningschool-wrapper bg_img1 bg_img2"> 
                    <div className="content-body">
                        <div id="crypto-stats-3" className="row">
                            <div className="col-xl-12">
                                <div className="">
                                    <div className="card-content">
                                        <div className="card-body pb-0">
                                            <div className="row mt-2">
                                                <div className="col-md-6 text-center">
                                                    <div className="online_classes">
                                                        <span><img src="/images/learning-online-class2.jpg" className="img-fluid" alt="learning-online-className"/></span> 
                                                            <h2>Let us learn together online even <span>though we are apart!</span></h2>
                                                        <Link to="/search-school">Get Started</Link>
                                                    </div>
                                                </div> 
                                                <div className="col-md-6 text-center">
                                                    <div className="online_classes">
                                                        <span><img src="/images/online-assessment2.jpg" className="img-fluid" alt="learning-online-className"/></span> 
                                                            <h2>Assign and attempt assessments online! <span></span></h2>
                                                        <Link to="/search-school">Get Started</Link>
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
            </div> 
            <Footer/>
            <Foot/>
        </>
    )
}