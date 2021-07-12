import Head from '../../components/common/Head'
import HeaderNav from '../../components/common/HeaderNav'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import {useParams, Link} from 'react-router-dom'
import useFetchResult from './hooks/useFetchResults'
import { useEffect } from 'react'

export default function StudentResult(){
    const params  = useParams();
    const {data: result, resultLoading} = useFetchResult();

    useEffect(()=>{
        localStorage.removeItem('COUNTER');
        localStorage.removeItem('test_test_duration');
        localStorage.removeItem('test_test_window');
        localStorage.removeItem('test_test_time');
        localStorage.removeItem('test_test_attempt_time');
        localStorage.removeItem('tabSwitchCount');
    },[])
    
    return(
        <>
        <Head/>
        <HeaderNav/>
        <div className="app-content content mt-5">
            <div className="content-overlay"></div>
            <div className="content-wrapper"> 
                <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-xl-12 col-lg-12 mt-2">
                        <div className="card">
                        <div className="card-header">
                            <h4 className="card-title Scores">Score </h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body pt-0"> 
                            <div className="row">
                                <div className="col-md-6 ml-auto mr-auto">
                                <div className="card pull-up attempt_text">
                                    <div className="table-responsive">
                                    <table className="table table-striped table-bordered ">
                                        <tbody>
                                        {result == undefined ? "Loading ..." :
                                        <>
                                        <tr>
                                            <th colSpan="2" className="head-result">Result</th>
                                        </tr>
                                        <tr>
                                                <th>Total Questions </th>
                                                <td>{result?.totalQuestions}</td>
                                            </tr>
                                            <tr>
                                                <th>Attempted Questions </th>
                                                <td>{result?.attemptedQuestions}</td>
                                            </tr>
                                            <tr>
                                                <th>Score </th>
                                                <td> {result?.correctAnswers}/{result?.totalQuestions}</td>
                                            </tr>
                                            <tr>
                                                <th className="percent">Percentage </th>
                                                <th className="percent"> {((result?.correctAnswers/result?.totalQuestions)*100).toFixed(2)} %</th>
                                            </tr>
                                            </>
                                            }
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                </div>
                                <div className="col-md-12 text-center"> <Link to={`/student/student-dashboard/${params.class_id}/${params.class_name}`} className="btn btn-info"> Go To Dashboard</Link><Link to={`/student/student-last-report/${params.class_id}/${params.class_name}/${params.attempt_id}`} className="btn btn-info ml-1"> View Details</Link></div>
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