import { useParams, Link } from "react-router-dom";
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import useTeacherAssignedTests from '../../pages/principal/hooks/useTeacherAssignedTests'
import {GetName} from '../../utils/utils'

export default function TeacherWiseReport(){
    const params = useParams();
    
    const {data:tests, testsListLoading} = useTeacherAssignedTests();
    return(
        <>
            <Head/>
            <HeaderNav/>
            <div className="app-content content mt-5">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                    <div className="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                        <h3 className="content-header-title mb-0 d-inline-block">{localStorage.getItem('teacher_details')} Reports </h3>
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
                    <li><Link to={`/principal/principal-dashboard/${params.school_id}`}><img src="/images/left-arrow.png" className="img-fluid" alt="back-arrow"/> Back</Link></li>
                    </ul>
                    </div>
                                <div className="card-content">
                                <div className="card-body">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-md-12">
                                            <div className="table-responsive mt-2 second_lbl_show">
                                                <h4 className="pb-2"><strong>{localStorage.getItem('teacher_details')} Reports</strong></h4>
                                                <table className="table table-striped table-bordered">
                                                    <thead>
                                                        <tr>
                                                        <th scope="col">S.No</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Subject	</th>
                                                        <th scope="col">Classes	</th>
                                                        <th scope="col">Start Time</th>
                                                        <th scope="col">End Time</th>
                                                        <th scope="col">Duration</th>
                                                        <th scope="col">Details</th>
                                                        {/* <th scope="col">Details</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {tests && tests.map((item, key)=>{
                                                            let start_time = new Date(item?.start_date);
                                                            let test_window = new Date(item?.start_date)
                                                            test_window.setMinutes( test_window.getMinutes() + item?.test_window );
                                                            return(
                                                                <tr key={key}>
                                                                    <th scope="row">1</th>
                                                                    <td className="text-truncate sorting_1">
                                                                        {/* <span className="avatar avatar-xs">
                                                                        <img className="box-shadow-2" src="/images/portrait/small/avatar-s-9.png" alt="avatar"/> 
                                                                        </span>  */}
                                                                        <span>{ item.test_name }</span>
                                                                    </td>
                                                                    <td>{ item.assigned ? "Assigned" : "Not Assigned" } </td>
                                                                    <td>
                                                                        {item.test_subjects.map((it, i) => {
                                                                            return(
                                                                                it.subject_name
                                                                            )
                                                                        })}
                                                                    </td>
                                                                    <td>{ item.class_name }</td>
                                                                    <td>{ start_time?.toLocaleString() }</td>
                                                                    <td>{ test_window?.toLocaleString() }</td>
                                                                    <td>{ item.test_duration } min</td>
                                                                    <td><Link to={`/principal/principal-teacher-wise-section-report/${params.school_id}/${item.teacher_id}/${item.class_id}/${item.test_id}`}>View</Link></td>
                                                                </tr>
                                                            )
                                                        })}
                                                        
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