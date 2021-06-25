import { useParams, Link } from "react-router-dom";
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'

export default function TeacherWiseReport(){
    return(
        <>
            <Head/>
            <HeaderNav/>
            <div className="app-content content mt-5">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                    <div className="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                        <h3 className="content-header-title mb-0 d-inline-block">Amar Kaushik Reports </h3>
                        <div className="row breadcrumbs-top d-inline-block">
                            <div className="breadcrumb-wrapper col-12">
                                <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html">Home</a>
                                </li>
                                <li className="breadcrumb-item"><a href="#">Principal</a>
                                </li>
                                <li className="breadcrumb-item"><a href="#">Teacher Wise Reports</a>
                                </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="content-body">
                    {/* <!-- Slaes & Purchase Order --> */}
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card">
                            <div className="col-xl-12 col-lg-12 left-arrow1">
                    <ul> 
                    <li><a href="principal.php"><img src="/images/left-arrow.png" className="img-fluid" alt="back-arrow"/> Back</a></li>
                    </ul>
                    </div>
                                <div className="card-content">
                                <div className="card-body">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-md-12">
                                            <div className="table-responsive mt-2 second_lbl_show">
                                                <h4 className="pb-2"><strong>Amar Kaushik Reports</strong></h4>
                                                <table className="table table-striped table-bordered">
                                                    <thead>
                                                        <tr>
                                                        <th scope="col">S.No</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Subject	</th>
                                                        <th scope="col">Classes	</th>
                                                        <th scope="col">Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                        <th scope="row">1</th>
                                                        <td className="text-truncate sorting_1">
                                                            <span className="avatar avatar-xs">
                                                            <img className="box-shadow-2" src="/images/portrait/small/avatar-s-9.png" alt="avatar"/> 
                                                            </span> <span>Amar Kaushik</span>
                                                        </td>
                                                        <td>Science  </td>
                                                        <td>Class 6th</td>
                                                        <td><Link to="principal-teacher-wise-section-report">View</Link></td>
                                                        </tr>
                                                        <tr>
                                                        <th scope="row">2</th>
                                                        <td className="text-truncate sorting_1">
                                                            <span className="avatar avatar-xs">
                                                            <img className="box-shadow-2" src="/images/portrait/small/avatar-s-9.png" alt="avatar"/> 
                                                            </span> <span>Amar Kaushik</span>
                                                        </td>
                                                        <td>Science  </td>
                                                        <td>Class 7th	</td>
                                                        <td><Link to="principal-teacher-wise-section-report">View</Link></td>
                                                        </tr>
                                                        <tr>
                                                        <th scope="row">3</th>
                                                        <td className="text-truncate sorting_1">
                                                            <span className="avatar avatar-xs">
                                                            <img className="box-shadow-2" src="/images/portrait/small/avatar-s-9.png" alt="avatar"/> 
                                                            </span> <span>Amar Kaushik</span>
                                                        </td>
                                                        <td>Science  </td>
                                                        <td>Class 8th	</td>
                                                        <td><Link to="principal-teacher-wise-section-report">View</Link></td>
                                                        </tr>
                                                        <tr>
                                                        <th scope="row">4</th>
                                                        <td className="text-truncate sorting_1">
                                                            <span className="avatar avatar-xs">
                                                            <img className="box-shadow-2" src="/images/portrait/small/avatar-s-9.png" alt="avatar"/> 
                                                            </span> <span>Amar Kaushik</span>
                                                        </td>
                                                        <td>Science  </td>
                                                        <td>Class 9th	</td>
                                                        <td><Link to="principal-teacher-wise-section-report">View</Link></td>
                                                        </tr>
                                                        <tr>
                                                        <th scope="row">5</th>
                                                        <td className="text-truncate sorting_1">
                                                            <span className="avatar avatar-xs">
                                                            <img className="box-shadow-2" src="/images/portrait/small/avatar-s-9.png" alt="avatar"/> 
                                                            </span> <span>Amar Kaushik</span>
                                                        </td>
                                                        <td>Science  </td>
                                                        <td>Class 10th	</td>
                                                        <td><Link to="principal-teacher-wise-section-report">View</Link></td>
                                                        </tr>
                                                        <tr>
                                                        <th scope="row">6</th>
                                                        <td className="text-truncate sorting_1">
                                                            <span className="avatar avatar-xs">
                                                            <img className="box-shadow-2" src="/images/portrait/small/avatar-s-9.png" alt="avatar"/> 
                                                            </span> <span>Amar Kaushik</span>
                                                        </td>
                                                        <td>Science  </td>
                                                        <td>Class 11th	</td>
                                                        <td><Link to="principal-teacher-wise-section-report">View</Link></td>
                                                        </tr>
                                                        <tr>
                                                        <th scope="row">7</th>
                                                        <td className="text-truncate sorting_1">
                                                            <span className="avatar avatar-xs">
                                                            <img className="box-shadow-2" src="/images/portrait/small/avatar-s-9.png" alt="avatar"/> 
                                                            </span> <span>Amar Kaushik</span>
                                                        </td>
                                                        <td>Science  </td>
                                                        <td>Class 12th	</td>
                                                        <td><Link to="principal-teacher-wise-section-report">View</Link></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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
            </div>
            <Footer/>
            <Foot/>
        </>
    )
}