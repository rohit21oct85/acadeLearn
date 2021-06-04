import { useHistory, useParams, useLocation } from 'react-router-dom'
import React, { useState, useEffect, useRef, useContext } from 'react';
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

export default function StudentDashboard(){
    const [section, setSection] = useState('tab1');
    const changeSection = (value) => {
        setSection(value)
    }
    const params = useParams();
    
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
                                <li className="breadcrumb-item"><a href="index.html">Home</a>
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
                        <h4 className="card-title"><strong>Class IX</strong></h4>
                    </div>
                    <div className="col-md-6">
                        <form className="form">
                            <div className="form-body">
                                <div className="row">
                                
                                <div className="form-group col-md-4 mb-0 ml-auto"> 
                                    <select className="form-control">
                                        <option value="">--Select Subject-- </option>
                                        <option value="">Science </option>
                                        <option value="">Mathematics </option>
                                        <option value="">Social Science </option>
                                        <option value="">Physics</option>
                                        <option value="">Chemistry</option>
                                        <option value="">Biology </option>
                                    </select>
                                </div>
                                <div className="form-group col-md-3 mb-0"> 
                                    <button type="button" className="btn btn-warning btn-min-width sbmt_view_form btn_click2 mr-1 mb-1 mt-0">Search</button> 
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* <!-- Slaes & Purchase Order --> */}
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 mt-2">
                            <div className="card">
                                <div className="card-header">
                                <h4 className="card-title rpt1">Attempt Tests </h4>
                                {/* <h4 className="card-title rpt2" style={{display:"none"}}>Last Test Score </h4>
                                <h4 className="card-title rpt3" style={{display:"none"}}>Cumulative Test Scores</h4> */}
                                </div>
                                <div className="card-content">
                                <div className="card-body pt-0">
                                    <p className="rpt1">Here, select a subject to view the test assigned by your teacher.</p>
                                    {/* <p className="rpt2" style={{display:"none"}}>Here, select a subject to view the score of the last test that you have attempted.</p>
                                    <p className="rpt3" style={{display:"none"}}    >Here, select a subject to find out your average performance.</p> */}
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
                                                <div className="col-md-6">
                                                    <div className="card pull-up attempt_text">
                                                        <div className="card-header">
                                                        <div className="float-left">
                                                            <a href="#" className="btn btn-info">07 May, 2021</a>
                                                        </div>
                                                        </div>
                                                        <div className="card-content live_text">
                                                        <div className="card-body text_set_attemp container">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <ul>
                                                                    <li><a href="#">live</a></li>
                                                                    <li><i className="fa fa-clock"></i> 45 MIN Mathematics</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="col-md-6 text-right">
                                                                    <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> SYLLABUS</a>
                                                                    <a href="#" className="btn btn-info"> ATTEMPT</a> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="card pull-up attempt_text">
                                                        <div className="card-header">
                                                        <div className="float-left">
                                                            <a href="#" className="btn btn-info">07 May, 2021</a>
                                                        </div>
                                                        </div>
                                                        <div className="card-content live_text">
                                                        <div className="card-body text_set_attemp container">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <ul>
                                                                    <li><a href="#">live</a></li>
                                                                    <li><i className="fa fa-clock"></i> 45 MIN Mathematics</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="col-md-6 text-right">
                                                                    <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> SYLLABUS</a>
                                                                    <a href="#" className="btn btn-info"> ATTEMPT</a> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="card pull-up attempt_text">
                                                        <div className="card-header">
                                                        <div className="float-left">
                                                            <a href="#" className="btn btn-info">07 May, 2021</a>
                                                        </div>
                                                        </div>
                                                        <div className="card-content live_text">
                                                        <div className="card-body text_set_attemp container">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <ul>
                                                                    <li><a href="#">live</a></li>
                                                                    <li><i className="fa fa-clock"></i> 45 MIN Mathematics</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="col-md-6 text-right">
                                                                    <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> SYLLABUS</a>
                                                                    <a href="#" className="btn btn-info"> ATTEMPT</a> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                                            <div className="col-md-6">
                                                <div className="card pull-up attempt_text">
                                                    <div className="card-header">
                                                        <div className="float-left">
                                                        <a href="#" className="btn btn-info">07 May, 2021</a>
                                                        </div>
                                                        <div className="float-right">
                                                        </div>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="card-body py-0 text_set_attemp">
                                                        <div className="d-flex justify-content-between lh-condensed">
                                                            <div className="order-details">
                                                                <h4 className="my-0">Total Score </h4>
                                                                <p>0/72</p>
                                                            </div>
                                                            <div className="order-details">
                                                                <h4 className="my-0">Total Time Taken</h4>
                                                                <p className="text-muted">1 hr 30 min </p>
                                                            </div>
                                                            <div className="order-details">
                                                                <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> View full result</a>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card pull-up attempt_text">
                                                    <div className="card-header">
                                                        <div className="float-left">
                                                        <a href="#" className="btn btn-info">07 May, 2021</a>
                                                        </div>
                                                        <div className="float-right">
                                                        </div>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="card-body py-0 text_set_attemp">
                                                        <div className="d-flex justify-content-between lh-condensed">
                                                            <div className="order-details">
                                                                <h4 className="my-0">Total Score </h4>
                                                                <p>0/72</p>
                                                            </div>
                                                            <div className="order-details">
                                                                <h4 className="my-0">Total Time Taken</h4>
                                                                <p className="text-muted">1 hr 30 min </p>
                                                            </div>
                                                            <div className="order-details">
                                                                <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> View full result</a>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card pull-up attempt_text">
                                                    <div className="card-header">
                                                        <div className="float-left">
                                                        <a href="#" className="btn btn-info">07 May, 2021</a>
                                                        </div>
                                                        <div className="float-right">
                                                        </div>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="card-body py-0 text_set_attemp">
                                                        <div className="d-flex justify-content-between lh-condensed">
                                                            <div className="order-details">
                                                                <h4 className="my-0">Total Score </h4>
                                                                <p>0/72</p>
                                                            </div>
                                                            <div className="order-details">
                                                                <h4 className="my-0">Total Time Taken</h4>
                                                                <p className="text-muted">1 hr 30 min </p>
                                                            </div>
                                                            <div className="order-details">
                                                                <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> View full result</a>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className={section == "tab3" ? "tab-pane active" : 'tab-pane'} aria-labelledby="base-tab43">
                                            <div className="card mb-0">
                                            <div className="card-header">
                                                <h4 className="mb-0"><strong> Cumulative Test Score  </strong></h4>
                                            </div>
                                            </div>
                                            <div className="row">
                                            <div className="col-md-6">
                                                <div className="card pull-up attempt_text">
                                                    <div className="card-header">
                                                        <div className="float-left">
                                                        <a href="#" className="btn btn-info">07 May, 2021</a>
                                                        </div>
                                                    </div>
                                                    <div className="card-content live_text">
                                                        <div className="card-body text_set_attemp container">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <ul>
                                                                    <li><a href="#">Previous Tests</a></li>
                                                                    <li><i className="fa fa-clock"></i> 45 MIN Mathematics</li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-6 text-right">
                                                                {/* <!-- <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> SYLLABUS</a>--> */}
                                                                <a href="#" className="btn btn-info"> Score: 0/72 <i className="fa fa-angle-double-right"></i> </a> 
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card pull-up attempt_text">
                                                    <div className="card-header">
                                                        <div className="float-left">
                                                        <a href="#" className="btn btn-info">07 May, 2021</a>
                                                        </div>
                                                    </div>
                                                    <div className="card-content live_text">
                                                        <div className="card-body text_set_attemp container">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <ul>
                                                                    <li><a href="#">Previous Tests</a></li>
                                                                    <li><i className="fa fa-clock"></i> 45 MIN Mathematics</li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-6 text-right">
                                                                {/* <!-- <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> SYLLABUS</a>--> */}
                                                                <a href="#" className="btn btn-info"> Score: 0/72 <i className="fa fa-angle-double-right"></i> </a> 
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card pull-up attempt_text">
                                                    <div className="card-header">
                                                        <div className="float-left">
                                                        <a href="#" className="btn btn-info">07 May, 2021</a>
                                                        </div>
                                                    </div>
                                                    <div className="card-content live_text">
                                                        <div className="card-body text_set_attemp container">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <ul>
                                                                    <li><a href="#">Previous Tests</a></li>
                                                                    <li><i className="fa fa-clock"></i> 45 MIN Mathematics</li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-6 text-right">
                                                                {/* <!-- <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> SYLLABUS</a>--> */}
                                                                <a href="#" className="btn btn-info"> Score: 0/72 <i className="fa fa-angle-double-right"></i> </a>
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