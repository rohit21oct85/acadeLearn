import { useParams } from "react-router-dom";
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'

export default function PrincipalDashboard(){
    const [section, setSection] = useState('tab1');

    const changeSection = (value) => {
        setSection(value)
    }
    return(
        <>
        <Head/>
        <HeaderNav/>
        <div className="app-content content mt-5">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                <div className="content-header row">
                    <div className="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                        <h3 className="content-header-title mb-0 d-inline-block">Principal</h3>
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
                    {/* <!-- Slaes & Purchase Order --> */}
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card">
                            <div className="card-header">
                                <h4 className="card-title rpt1">ClassName-wise Reports</h4>
                                {/* <h4 className="card-title rpt2" style="display:none;">Teacher-wise Reports</h4>
                                <h4 className="card-title rpt3" style="display:none;">Subject-wise Reports</h4> */}
                            </div>
                            <div className="card-content">
                                <div className="card-body pt-0">
                                    <p className="rpt1">Here you can view the performance of your entire school. </p>
                                    <p className="rpt2" style={{display:"none"}}>Here you can analyze the performance of all the teachers in your institute.<br/> 
                                    Select a subject and enter the name of the teacher to view the details. </p>
                                    <p className="rpt3" style={{display:"none"}}>Here you can view a detailed analysis of the performance of students across different subjects.<br/> Select a particular className and subject to access the report.</p>
                                    <ul className="nav nav-tabs nav-linetriangle no-hover-bg">
                                        <li className="nav-item">
                                        <a className={section == "tab1" ? "nav-link active" : 'nav-link'} id="base-tab41" data-toggle="tab" aria-controls="tab41" href="#tab41" aria-expanded="true" onClick={()=>{changeSection('tab1')}}> ClassName-wise Reports </a>
                                        </li>
                                        <li className="nav-item">
                                        <a className={section == "tab2" ? "nav-link active" : 'nav-link'} id="base-tab42" data-toggle="tab" aria-controls="tab42" href="#tab42" aria-expanded="false" onClick={()=>{changeSection('tab2')}}>Teacher-wise Reports </a>
                                        </li>
                                        <li className="nav-item">
                                        <a className={section == "tab3" ? "nav-link active" : 'nav-link'} id="base-tab43" data-toggle="tab" aria-controls="tab43" href="#tab43" aria-expanded="false" onClick={()=>{changeSection('tab3')}}>Subject-wise Reports </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content px-1 pt-1">
                                        <div role="tabpanel" className={section == "tab1" ? "tab-pane container-fluid active" : 'tab-pane container-fluid'} id="tab41" aria-expanded="true" aria-labelledby="base-tab41">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                    <strong>ClassName-wise Reports</strong> 
                                                    </div>
                                                    <div className="card-content collapse show">
                                                    <div className="">
                                                        <div className="table-responsive">
                                                            <table className="table table-striped table-bordered ">
                                                                <thead>
                                                                <tr>
                                                                    <th>S.No</th>
                                                                    <th>ClassName	</th>
                                                                    <th>No. of Sections	</th>
                                                                    <th>No. of Students</th>
                                                                    <th>Last Updated</th>
                                                                    <th>Details</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>ClassName 6th</td>
                                                                    <td>5</td>
                                                                    <td>200</td>
                                                                    <td>01/05/2021</td>
                                                                    <td><a href="className-report1.php">View</a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>ClassName 7th</td>
                                                                    <td>3</td>
                                                                    <td>160</td>
                                                                    <td>02/05/2021</td>
                                                                    <td><a href="className-report1.php">View</a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>ClassName 8th</td>
                                                                    <td>4	</td>
                                                                    <td>160</td>
                                                                    <td>02/05/2021</td>
                                                                    <td><a href="className-report1.php">View</a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>ClassName 9th</td>
                                                                    <td>5	</td>
                                                                    <td>200</td>
                                                                    <td>02/05/2021</td>
                                                                    <td><a href="className-report1.php">View</a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>ClassName 10th</td>
                                                                    <td>3</td>
                                                                    <td>120</td>
                                                                    <td>02/05/2021</td>
                                                                    <td><a href="className-report1.php">View</a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>6</td>
                                                                    <td>ClassName 11th</td>
                                                                    <td>4	</td>
                                                                    <td>160</td>
                                                                    <td>02/05/2021</td>
                                                                    <td><a href="className-report1.php">View</a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>7</td>
                                                                    <td>ClassName 12th</td>
                                                                    <td>3	</td>
                                                                    <td>120</td>
                                                                    <td>02/05/2021</td>
                                                                    <td><a href="className-report1.php">View</a></td>
                                                                </tr>
                                                                </tbody>
                                                                <tfoot>
                                                                <tr>
                                                                    <th>Total</th>
                                                                    <th></th>
                                                                    <th>27</th>
                                                                    <th>1120 </th>
                                                                    <th> </th>
                                                                    <th> </th>
                                                                </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className={section == "tab2" ? "tab-pane container-fluid active" : 'tab-pane container-fluid'} id="tab42" aria-labelledby="base-tab42">
                                        <div className="row staff-grid-row leader-scroll pt-1">
                                            <div className="col-md-6 col-sm-12 col-12 col-lg-6 col-xl-6">
                                                <h4 className="card-title"><strong>Teacher-wise Reports</strong> </h4>
                                            </div>
                                            <div className="col-md-6 col-sm-12 col-12 col-lg-6 col-xl-6">
                                                <div className="select_tcr_wis_rpt">
                                                    <fieldset>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text slt_sbjt">
                                                                <select className="form-control">
                                                                <option>-Select Subject-</option>
                                                                <option value="">Science </option>
                                                                <option value="">Mathematics </option>
                                                                <option value="">Social Science </option>
                                                                <option value="">Physics</option>
                                                                <option value="">Chemistry</option>
                                                                <option value="">Biology </option>
                                                                </select>
                                                            </span>
                                                        </div>
                                                        <input type="text" className="form-control border-right-0" placeholder="Enter Teacher Name" aria-describedby="basic-addon2"/>
                                                        <div className="input-group-append">
                                                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-search"></i></span>
                                                        </div>
                                                    </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="profile-widget">
                                                    <div className="profile-img">
                                                    <a href="#" className="avatar"><img alt="" src="/images/avatar-19.jpg"/></a>
                                                    </div>
                                                    <p className="user-name m-t-10 mb-0 text-teachet1">Teacher 1</p>
                                                    <h5 className="user-name m-t-10 mb-0 text-subject"><a href="#">Science  </a></h5>
                                                    <div className="View_Detail text-muted"><a href="teacher-wise-reports.php">View Details </a></div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="profile-widget">
                                                    <div className="profile-img">
                                                    <a href="#" className="avatar"><img alt="" src="/images/avatar-16.jpg"/></a>
                                                    </div>
                                                    <p className="user-name m-t-10 mb-0 text-teachet1">Teacher 2</p>
                                                    <h5 className="user-name m-t-10 mb-0 text-subject"><a href="#">Mathematics </a></h5>
                                                    <div className="View_Detail text-muted"><a href="teacher-wise-reports.php">View Details </a></div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="profile-widget">
                                                    <div className="profile-img">
                                                    <a href="#" className="avatar"><img src="/images/avatar-07.jpg" alt=""/></a>
                                                    </div>
                                                    <p className="user-name m-t-10 mb-0 text-teachet1">Teacher 3</p>
                                                    <h5 className="user-name m-t-10 mb-0 text-subject"><a href="#">Social Science</a></h5>
                                                    <div className="View_Detail text-muted"><a href="teacher-wise-reports.php">View Details </a></div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="profile-widget">
                                                    <div className="profile-img">
                                                    <a href="#" className="avatar"><img src="/images/avatar-06.jpg" alt=""/></a>
                                                    </div>
                                                    <p className="user-name m-t-10 mb-0 text-teachet1">Teacher 4</p>
                                                    <h5 className="user-name m-t-10 mb-0 text-subject"><a href="#">Physics </a></h5>
                                                    <div className="View_Detail text-muted"><a href="teacher-wise-reports.php">View Details </a></div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="profile-widget">
                                                    <div className="profile-img">
                                                    <a href="#" className="avatar"><img src="/images/avatar-06.jpg" alt=""/></a>
                                                    </div>
                                                    <p className="user-name m-t-10 mb-0 text-teachet1">Teacher 5</p>
                                                    <h5 className="user-name m-t-10 mb-0 text-subject"><a href="#">Chemistry </a></h5>
                                                    <div className="View_Detail text-muted"><a href="teacher-wise-reports.php">View Details </a></div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="profile-widget">
                                                    <div className="profile-img">
                                                    <a href="#" className="avatar"><img src="/images/avatar-06.jpg" alt=""/></a>
                                                    </div>
                                                    <p className="user-name m-t-10 mb-0 text-teachet1">Teacher 6</p>
                                                    <h5 className="user-name m-t-10 mb-0 text-subject"><a href="#">Math  </a></h5>
                                                    <div className="View_Detail text-muted"><a href="teacher-wise-reports.php">View Details </a></div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <div className="profile-widget">
                                                    <div className="profile-img">
                                                    <a href="#" className="avatar"><img src="/images/avatar-06.jpg" alt=""/></a>
                                                    </div>
                                                    <p className="user-name m-t-10 mb-0 text-teachet1">Teacher 7</p>
                                                    <h5 className="user-name m-t-10 mb-0 text-subject"><a href="#">Biology  </a></h5>
                                                    <div className="View_Detail text-muted"><a href="teacher-wise-reports.php">View Details </a></div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className={section == "tab3" ? "tab-pane container-fluid active" : 'tab-pane container-fluid'} id="tab43" aria-labelledby="base-tab43">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card mb-0">
                                                    <div className="card-header pL_rT">
                                                    <div className="row">
                                                        <div className="col-md-12 bg_grey1"> 
                                                            <form className="form">
                                                                <div className="form-body">
                                                                <div className="row">
                                                                    <div className="form-group col-md-3 mb-2">
                                                                        {/* <!-- <label className="">Select ClassName </label>--> */}
                                                                        <select className="form-control">
                                                                            <option value="">--Select ClassName-- </option>
                                                                            <option value="">ClassName 6th </option>
                                                                            <option value="">ClassName 7th </option>
                                                                            <option value="">ClassName 8th </option>
                                                                            <option value="">ClassName 9th </option>
                                                                            <option value="">ClassName 10th </option>
                                                                            <option value="">ClassName 11th </option>
                                                                            <option value="">ClassName 12th </option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group col-md-3 mb-2">
                                                                        {/* <!--  <label className="" >Select Subject  </label>--> */}
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
                                                                    <div className="form-group col-md-3 mb-2"> 
                                                                        <button type="button" className="btn btn-warning btn-min-width sbmt_view_form mr-1 mb-1 mt-0">Search</button> 
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div className="table-responsive first_lbl_show"  style={{display:"none"}}>
                                                    <h4><strong>First Level</strong></h4>
                                                    <table className="table table-striped table-bordered lavel_select_sction">
                                                        {/* <!--zero-configuration--> */}
                                                        <thead>
                                                            <tr>
                                                                <th>Section   </th>
                                                                <th>No of Students   </th>
                                                                <th>Last Text Attendance    </th>
                                                                <th>Cumulative Test Attendance</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td><a href="#" className="sbject_sw">A </a></td>
                                                                <td>50  </td>
                                                                <td>34/50 </td>
                                                                <td>35% </td>
                                                            </tr>
                                                            <tr>
                                                                <td><a href="#" className="sbject_sw">B </a></td>
                                                                <td>60  </td>
                                                                <td>25/60 </td>
                                                                <td>45%</td>
                                                            </tr>
                                                            <tr>
                                                                <td><a href="#" className="sbject_sw">C </a></td>
                                                                <td>40 </td>
                                                                <td>36/40</td>
                                                                <td>70%</td>
                                                            </tr>
                                                            </tbody>
                                                    </table>
                                                    </div>
                                                    <div className="table-responsive mt-2 second_lbl_show" style={{display:"none"}}>
                                                    <h4><strong>Second Level</strong></h4>
                                                    <table className="table table-striped table-bordered">
                                                        {/* <!--zero-configuration--> */}
                                                        <thead>
                                                            <tr>
                                                                <th>Student Name </th>
                                                                <th>Subject </th>
                                                                <th>Last Test Performance</th>
                                                                <th>Cumulative Test Performance</th>
                                                            </tr>
                                                        </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="text-truncate">
                                                                    <span className="avatar avatar-xs">
                                                                    <img className="box-shadow-2" src="/images/portrait/small/avatar-s-4.png" alt="avatar"/> 
                                                                    </span> <span>Rachna Thitte</span>
                                                                    </td>
                                                                    <td>Science   </td>
                                                                    <td> 65%   </td>
                                                                    <td>35% </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="text-truncate">
                                                                    <span className="avatar avatar-xs">
                                                                    <img className="box-shadow-2" src="/images/portrait/small/avatar-s-5.png" alt="avatar"/> 
                                                                    </span> <span>Pankaj Mittal</span>
                                                                    </td>
                                                                    <td>Science   </td>
                                                                    <td> 20%    </td>
                                                                    <td>45%   </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="text-truncate">
                                                                    <span className="avatar avatar-xs">
                                                                    <img className="box-shadow-2" src="/images/portrait/small/avatar-s-9.png" alt="avatar"/> 
                                                                    </span> <span>Amar Kaushik</span>
                                                                    </td>
                                                                    <td>Science   </td>
                                                                    <td> 30%      </td>
                                                                    <td>70%   </td>
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
                </div>
            </div>    
        <Footer/>
        <Foot/>
        </>       
    )
}