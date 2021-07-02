import {useHistory, useParams, useLocation} from 'react-router-dom'
import React, { useState } from 'react';
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import AttemptCard from '../../components/student/AttemptCard'
import LastTestScore from '../../components/student/LastTestScore'
import CumilativeTestScore from '../../components/student/CumilativeTestScore'
import useClassSubjectList from '../../pages/student/hooks/useClassSubjectList'
import useTestList from '../../pages/student/hooks/useTestList'
import useCreateAttemptTest from '../student/hooks/useCreateAttemptTest'
import useLastTestScore from '../student/hooks/useLastTestScore'
import useCumulativeScore from '../student/hooks/useCumulativeScore'

export default function StudentDashboard(){
    const [section, setSection] = useState('tab1');
    const [formData, setFormData] = useState('');
    const changeSection = (value) => {
        setSection(value)
    }
    const history = useHistory();

    const params = useParams();
    let form = ''; 
    // let assign_test_id = ''; 
    const createMutation = useCreateAttemptTest(form);

    const handleAttempt = async(id, assign_test_id, start_time, test_window, test_duration) => {
        localStorage.setItem('test_test_time',start_time)
        localStorage.setItem('test_test_window',test_window)
        localStorage.setItem('test_test_duration',test_duration)
        localStorage.setItem('test_test_attempt_time',new Date())
        await createMutation.mutate({id:id, assign_test_id:assign_test_id});
        // await createMutation.mutate({id:id, assign_test_id:assign_test_id, subject_id:subject_id});
        // history.push(`/student/student-agreement/${params.class_id}/${params.class_name}/${subject_id}/${id}`)
        history.push(`/student/student-agreement/${params.class_id}/${params.class_name}/${id}`)
    }

    const handleChangeSubject = (e) => {
        if(e.target.value != 999 ){
            if(e.target.value==9999){
                history.push(`/student/student-dashboard/${params.class_id}/${params.class_name}`)
            }else{
                history.push(`/student/student-dashboard/${params.class_id}/${params.class_name}/${e.target.value}`)
            }
        }
    }

    const handleClick = (attempt_id,t) => {
        history.push(`/student/student-result/${params.class_id}/${params.class_name}/${t}/${attempt_id}`)
    }

    const {data:subjects, subjectLoading} = useClassSubjectList();
    const {data:tests, testLoading} = useTestList();
    const {data:lastScore, lastScoreLoading} = useLastTestScore();
    const {data:cumulativeScore, cumulativeScoreLoading} = useCumulativeScore();
    

    return(
        <>
        <Head/>
        <HeaderNav/>
        <div className="app-content content mt-5">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <div className="content-header row">
                    <div className="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                    <h3 className="content-header-title mb-0 d-inline-block">Student</h3>
                    <div className="row breadcrumbs-top d-inline-block">
                        <div className="breadcrumb-wrapper col-12">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="">Home</a>
                                </li>
                                <li className="breadcrumb-item"><a href="#">Dashboard</a>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-body">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="card-title"><strong>Class {localStorage.getItem('class_name')} - {localStorage.getItem('section')}</strong></h4>
                    </div>
                    <div className="col-md-6">
                        <form className="form">
                            <div className="form-body">
                                <div className="row">
                                {section == "tab3" && <div className="form-group col-md-4 mb-0 ml-auto"> 
                                    <select className="form-control" onChange={handleChangeSubject} value={params.subject_id ? params.subject_id : 9999}>
                                        {/* <option value="999">--Select Subject-- </option> */}
                                        <option value="9999">All</option>
                                        {subjects && subjects.map((subject, key)=>{
                                            return (
                                                <option value={subject.subject_id} key={key}>{subject.subject_name} </option>
                                            )
                                        })}
                                    </select>
                                </div>}
                                {/* <div className="form-group col-md-3 mb-0"> 
                                    <button type="button" className="btn btn-warning btn-min-width sbmt_view_form btn_click2 mr-1 mb-1 mt-0">Search</button> 
                                </div> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                    {/* <!-- Slaes & Purchase Order --> */}
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 mt-2">
                            <div className="card">
                                <div className="card-header">
                                <h4 className="card-title rpt1" style={{display: section == "tab1" ? "block" : 'none'}}>Attempt Tests </h4>
                                <h4 className="card-title rpt2" style={{display: section == "tab2" ? "block" : 'none'}}>Last Test Score </h4>
                                <h4 className="card-title rpt3" style={{display: section == "tab3" ? "block" : 'none'}}>Cumulative Test Scores</h4>
                                </div>
                                <div className="card-content">
                                <div className="card-body pt-0">
                                    <p className="rpt1" style={{display: section == "tab1" ? "block" : 'none'}}>Here, select a subject to view the test assigned by your teacher.</p>
                                    <p className="rpt2" style={{display: section == "tab2" ? "block" : 'none'}}>Here you can view the scores of all the previous tests that you attempted.</p>
                                    <p className="rpt3" style={{display: section == "tab3" ? "block" : 'none'}}>Here, you can view the average score of all the tests you have attempted for the different subjects.</p>
                                    <ul className="nav nav-tabs nav-linetriangle no-hover-bg">
                                        <li className="nav-item">
                                            <a className={section == "tab1" ? "nav-link active" : 'nav-link'}  data-toggle="tab" aria-controls="tab41" href="#tab41" aria-expanded="true" onClick={()=>{changeSection('tab1')}}>  Attempt Test  </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={section == "tab2" ? "nav-link active" : 'nav-link'}  data-toggle="tab" aria-controls="tab42" href="#tab42" aria-expanded="false" onClick={()=>{changeSection('tab2')}}>Last Test Score  </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={section == "tab3" ? "nav-link active" : 'nav-link'}  data-toggle="tab" aria-controls="tab43" href="#tab43" aria-expanded="false" onClick={()=>{changeSection('tab3')}}>Cumulative Test Score  </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content px-1 pt-1">
                                        <div role="tabpanel" className={section == "tab1" ? "tab-pane active" : 'tab-pane'} aria-expanded="true" aria-labelledby="base-tab41">
                                            <div className="tab-pane active" id="comp-order-tab" aria-expanded="true" role="tablist" aria-labelledby="complete-order">
                                                <div className="card mb-0">
                                                    <div className="card-header">
                                                        <h4 className="mb-0"><strong>  Attempt Test  </strong></h4>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    {tests && tests.map((test, key)=>{
                                                        return (
                                                            <AttemptCard test={test} key={key} fun={()=>{ handleAttempt(test.unit_table_id, test.assign_table_id, test.start_date, test.test_window, test.test_duration) }}/>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={section == "tab2" ? "tab-pane active" : 'tab-pane'} aria-labelledby="base-tab42">
                                            <div className="card mb-0">
                                                <div className="card-header">
                                                    <h4 className="mb-0"><strong>  Last Test Score    </strong></h4>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {lastScore && <LastTestScore score={lastScore} fun={handleClick}/>}
                                            </div>
                                        </div>
                                        <div className={section == "tab3" ? "tab-pane active" : 'tab-pane'} aria-labelledby="base-tab43">
                                            <div className="card mb-0">
                                            <div className="card-header">
                                                <h4 className="mb-0"><strong> Cumulative Test Score  </strong></h4>
                                            </div>
                                            </div>
                                            {/* <div className="row"> */}
                                                {cumulativeScore?.length>0 && <CumilativeTestScore score={cumulativeScore}/>}
                                            {/* </div> */}
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