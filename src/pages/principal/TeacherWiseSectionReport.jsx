import { useParams, Link } from "react-router-dom";
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import useStudentAttemptedTests from '../../pages/principal/hooks/useStudentAttemptedTests'

export default function TeacherWiseSectionReport(){
    const params = useParams();

    const {data:attempted, studentAttempted} = useStudentAttemptedTests();
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
                    <li><Link to={`/principal/principal-teacher-wise-report/${params.school_id}/${params.teacher_id}`}><img src="/images/left-arrow.png" className="img-fluid" alt="back-arrow"/> Back</Link></li>
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

                                                        <th scope="col">Name</th>
                                                        <th scope="col">Time Taken</th>
                                                        <th scope="col">Score</th>
                                                        <th scope="col">Percentage</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {attempted && attempted.map((item, key)=>{
                                                            return (
                                                                <tr key={key}>
                                                                  <td className="text-truncate">
                                                                     {/* <span className="avatar avatar-xs">
                                                                     <img className="box-shadow-2" src="/images/portrait/small/avatar-s-4.png" alt="avatar"/>
                                                                     </span>  */}
                                                                     <span>{item.student_name}</span>
                                                                  </td>
                                                                  <td>{item && item.time_taken && new Date(item?.time_taken * 1000)?.toISOString()?.substr(11, 8)} </td>
                                                                  <td>{item.correctAnswers}/{item.totalMarks} </td>
                                                                  <td width="10%">{item.cScorePercentage?.toFixed(2)} %  </td>
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