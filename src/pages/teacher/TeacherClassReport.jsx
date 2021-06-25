import {useHistory, useParams, useLocation, Link} from 'react-router-dom'
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
export default function TeacherClassReport(){
    return(
        <>
        <Head/>
        <HeaderNav/>
        <div className="app-content content mt-5">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <div className="content-header row">
                <div className="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                    <h3 className="content-header-title mb-0 d-inline-block">ClassName 6th </h3>
                    <div className="row breadcrumbs-top d-inline-block">
                        <div className="breadcrumb-wrapper col-12">
                            <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item"><a href="#">Teacher</a>
                            </li>
                            <li className="breadcrumb-item">Class 6th 
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
                        <li><a href="teacher.php"><img src="../images/left-arrow.png" className="img-fluid" alt="back-arrow"/> Back</a></li>
                    </ul>
                </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="col-md-12">
                                    <div className="table-responsive first_lbl_show">
                                        <h4><strong>ClassName Wise Reports</strong></h4>
                                        <table className="table table-striped table-bordered lavel_select_sction">
                                        {/* <!--zero-configuration--> */}
                                        <thead>
                                            <tr>
                                                <th>Section   </th>
                                                <th>No of Students   </th>
                                                <th>Last Test Attendance    </th>
                                                <th>Cumulative Test Attendance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><Link to="/teacher/teacher-class-section-report" className="sbject_sw">A </Link></td>
                                                <td>50  </td>
                                                <td>34/50 </td>
                                                <td>35% </td>
                                            </tr>
                                            <tr>
                                                <td><Link to="/teacher/teacher-class-section-report" className="sbject_sw">B </Link></td>
                                                <td>60  </td>
                                                <td>25/60 </td>
                                                <td>45%</td>
                                            </tr>
                                            <tr>
                                                <td><Link to="/teacher/teacher-class-section-report" className="sbject_sw">C </Link></td>
                                                <td>40 </td>
                                                <td>36/40</td>
                                                <td>70%</td>
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
        <Footer/>
        <Foot/>
    </>
    )
}