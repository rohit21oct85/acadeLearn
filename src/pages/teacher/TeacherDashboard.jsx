import {useHistory, useParams, useLocation} from 'react-router-dom'
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import { Link } from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import AssignmentCard  from "../../components/teacher/AssignmentCard";
import useClassList from '../../pages/teacher/hooks/useClassList'
import useTeacherSubject from '../../pages/teacher/hooks/useTeacherSubject'
import useUnitTestList from '../../pages/teacher/hooks/useUnitTestList'
import { apiUrl, authAxios } from '../../config/config'
import {AuthContext} from '../../context/AuthContext'
import useUpdateUnitTestList from '../../pages/teacher/hooks/useUpdateUnitTestList'

export default function TeacherDashboard(){
    const [section, setSection] = useState('tab1');

	const { state } = useContext(AuthContext);

    const changeSection = (value) => {
        setSection(value)
    }
    const params = useParams();
    const history = useHistory();

    const {data:classes, classLoading} = useClassList();
    const {data:teacherSubject, teacherSubjectLoading} = useTeacherSubject();
    const {data:unitTests, unitTestLoading} = useUnitTestList();

   const handleChange = (e) => {
      if(e.target.value!=999){
         history.push(`/teacher/teacher-dashboard/${e.target.value}`)
      }
   }
   
	let id = '';
	const updateMutation = useUpdateUnitTestList(id);

    const updateAssignment = async (id, date) => {
		var today = new Date();
		if(today.toISOString().substring(0, 10) == date.substr(0,10)){
			await updateMutation.mutate(id);
		}else{
			alert(`Tests can only be assigned on the same date of the test, Test Date: ${date.substr(0,10)}`);
		}
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
                        <h3 className="content-header-title mb-0 d-inline-block">Teacher - {localStorage.getItem('subject_name')}</h3>
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
                  <div className="col-xl-12 col-lg-12">
                     <div className="card">
                           <div className="card-header">
                              <h4 className="card-title rpt1">Assign Tests </h4>
                              {/* <h4 className="card-title rpt2" style="display:none">Student-wise Reports</h4>
                              <h4 className="card-title rpt3" style="display:none">Subject-wise Reports</h4>
                              <h4 className="card-title rpt4" style="display:none">ClassName-wise Reports</h4> */}
                           </div>
                           <div className="card-content">
                              <div className="card-body pt-0">
                                 <p className="rpt1">Select a particular className and subject to assign test to your students.</p>
                                 {/* <p className="rpt2" style="display:none">Select the className, section, and subject to view the performance of each of your students.</p>
                                 <p className="rpt3" style="display:none">Select a className and subject to view a detailed report of the subject-wise performance of your className.</p>
                                 <p className="rpt4" style="display:none">This section will show you the overall performance of all the classNamees.</p> */}
                                 <ul className="nav nav-tabs nav-linetriangle no-hover-bg">
                                    <li className="nav-item">
                                       <a className={section == "tab1" ? "nav-link active" : 'nav-link'} id="base-tab1" data-toggle="tab" aria-controls="tab1" href="#tab1" aria-expanded="true" onClick={()=>{changeSection('tab1')}}> Assign Test  </a>
                                    </li>
                                    <li className="nav-item">
                                       <a className={section == "tab2" ? "nav-link active" : 'nav-link'} id="base-tab2" data-toggle="tab" aria-controls="tab2" href="#tab2" aria-expanded="false" onClick={()=>{changeSection('tab2')}}>Student-wise Reports  </a>
                                    </li>
                                    <li className="nav-item">
                                       <a className={section == "tab3" ? "nav-link active" : 'nav-link'} id="base-tab3" data-toggle="tab" aria-controls="tab3" href="#tab3" aria-expanded="false" onClick={()=>{changeSection('tab3')}}>Subject-wise Reports  </a>
                                    </li>
                                    <li className="nav-item">
                                       <a className={section == "tab4" ? "nav-link active" : 'nav-link'} id="base-tab4" data-toggle="tab" aria-controls="tab4" href="#tab4" aria-expanded="false" onClick={()=>{changeSection('tab4')}}>ClassName-wise Reports  </a>
                                    </li>
                                 </ul>
                                 <div className="tab-content px-1 pt-1">
                                    <div role="tabpanel" className={section == "tab1" ? "tab-pane container-fluid active" : 'tab-pane container-fluid'} aria-expanded="true" aria-labelledby="base-tab1">
                                       <div className="row mb-5 pt-1">
                                          <div className="col-md-6">
                                             <h4 className="card-title"><strong> Assign Test  </strong></h4>
                                          </div>
                                          <div className="col-md-6">
                                                         <form className="form">
                                                            <div className="form-body">
                                                               <div className="row">
                                                               <div className="form-group col-md-4 mb-0 ml-auto">
                                                                  <select className="form-control" onChange={handleChange} value={params.class_id ? params.class_id : 999}>
                                                                        <option value="999">--Select ClassName-- </option>
                                                                        {classes && classes.map((item,key)=>{
                                                                           return(
                                                                              <option value={item._id} data-class_name={item.class_name} key={key} >{item.class_name + ' th'} </option>
                                                                           )
                                                                        })}
                                                                     </select>
                                                                  </div>
                                                                  {/* <div className="form-group col-md-4 mb-0">
                                                                     <select className="form-control">
                                                                        <option value="">--Select Subject-- </option>
                                                                        <option value="">Science </option>
                                                                        <option value="">Mathematics </option>
                                                                        <option value="">Social Science </option>
                                                                        <option value="">Physics</option>
                                                                        <option value="">Chemistry</option>
                                                                        <option value="">Biology </option>
                                                                     </select>
                                                                  </div> */}
                                                                  <div className="form-group col-md-3 mb-0">
                                                                     <button type="button" className="btn btn-warning btn-min-width sbmt_view_form btn_click2 mr-1 mb-1 mt-0">Search</button>
                                                                  </div>
                                                               </div>
                                                            </div>
                                                         </form>
                                                         </div>
                                                         </div>
                                       <div className="row">
                                          {unitTests && unitTests.map(test =>{
                                             return(<>
                                                <AssignmentCard test={test} fun={()=>updateAssignment(test.assign_table_id, test.test_date)}/>
                                             </>)
                                          })}
                                       </div>
                                    </div>
                                    <div className={section == "tab2" ? "tab-pane container-fluid active" : 'tab-pane container-fluid'} id="tab2" aria-labelledby="base-tab2">
                                       <div className="row">
                                          <div className="col-md-12">
                                             <div className="card mb-0">
                                                <div className="card-header pL_rT">
                                                   <div className="row">
                                                      <div className="col-md-12 bg_grey1">
                                                      {/* <!-- <button type="button" className="btn blue_drk_btn btn-min-width mr-1 mb-1">  <strong>Student-wise Reports   </strong></button>--> */}
                                                         <form className="form">
                                                            <div className="form-body">
                                                               <div className="row">
                                                                  <div className="form-group col-md-3 mb-2">
                                                                     {/* <!-- <label className="">Select ClassName </label>--> */}
                                                                     <select className="form-control">
                                                                        <option value="999">--Select ClassName-- </option>
                                                                        {classes && classes.map((item,key)=>{
                                                                           return(
                                                                              <option value={item._id} data-class_name={item.class_name} key={key}>{item.class_name + ' th'} </option>
                                                                           )
                                                                        })}
                                                                     </select>
                                                                  </div>
                                                                  <div className="form-group col-md-2 mb-2">
                                                                     {/* <!-- <label className="">Select Section </label>--> */}
                                                                     <select className="form-control">
                                                                        <option value="">--Select Section-- </option>
                                                                        <option value="">ClassName 6th A</option>
                                                                        <option value="">ClassName 6th B</option>
                                                                        <option value="">ClassName 6th C</option>
                                                                        <option value="">ClassName 6th D</option>
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
                                                                     <button type="button" className="btn btn-warning btn-min-width sbmt_view_form btn_click1 mr-1 mb-1 mt-0">Search</button>
                                                                  </div>
                                                               </div>
                                                            </div>
                                                         </form>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="table-responsive mt-2 thr_lbl_show" style={{display:"none"}}>
                                                   <table className="table table-striped table-bordered zero-configuration">
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
                                    <div className={section == "tab3" ? "tab-pane active" : 'tab-pane'} id="tab3" aria-labelledby="base-tab3">
                                       <div className="row">
                                          <div className="col-md-12">
                                             <div className="card mb-0">
                                                <div className="card-header pL_rT">
                                                   <div className="row">
                                                      <div className="col-md-12 bg_grey1">
                                                      {/* <!-- <button type="button" className="btn blue_drk_btn btn-min-width mr-1 mb-1">  <strong>Subject-wise Reports </strong></button>--> */}
                                                         <form className="form">
                                                            <div className="form-body">
                                                               <div className="row">
                                                                  <div className="form-group col-md-3 mb-2">
                                                                     {/* <!--<label className="">Select ClassName </label>--> */}
                                                                     <select className="form-control">
                                                                        <option value="999">--Select ClassName-- </option>
                                                                        {classes && classes.map((item,key)=>{
                                                                           return(
                                                                              <option value={item._id} data-class_name={item.class_name} key={key}>{item.class_name + ' th'} </option>
                                                                           )
                                                                        })}
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
                                                                     <button type="button" className="btn btn-warning btn-min-width sbmt_view_form btn_click2 mr-1 mb-1 mt-0">Search</button>
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
                                                            <th>Last Test Attendance    </th>
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
                                                   <h4 className="pb-2"><strong>Second Level</strong></h4>
                                                   <table className="table table-striped table-bordered zero-configuration">
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
                                    <div className={section == "tab4" ? "tab-pane active" : 'tab-pane'} id="tab4" aria-labelledby="base-tab4">
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
                                                                  <td><a href="className-report.php">View</a></td>
                                                               </tr>
                                                               <tr>
                                                                  <td>2</td>
                                                                  <td>ClassName 7th</td>
                                                                  <td>3</td>
                                                                  <td>160</td>
                                                                  <td>02/05/2021</td>
                                                                  <td><a href="className-report.php">View</a></td>
                                                               </tr>
                                                               <tr>
                                                                  <td>3</td>
                                                                  <td>ClassName 8th</td>
                                                                  <td>4	</td>
                                                                  <td>160</td>
                                                                  <td>02/05/2021</td>
                                                                  <td><a href="className-report.php">View</a></td>
                                                               </tr>
                                                               <tr>
                                                                  <td>4</td>
                                                                  <td>ClassName 9th</td>
                                                                  <td>5	</td>
                                                                  <td>200</td>
                                                                  <td>02/05/2021</td>
                                                                  <td><a href="className-report.php">View</a></td>
                                                               </tr>
                                                               <tr>
                                                                  <td>5</td>
                                                                  <td>ClassName 10th</td>
                                                                  <td>3</td>
                                                                  <td>120</td>
                                                                  <td>02/05/2021</td>
                                                                  <td><a href="className-report.php">View</a></td>
                                                               </tr>
                                                               <tr>
                                                                  <td>6</td>
                                                                  <td>ClassName 11th</td>
                                                                  <td>4	</td>
                                                                  <td>160</td>
                                                                  <td>02/05/2021</td>
                                                                  <td><a href="className-report.php">View</a></td>
                                                               </tr>
                                                               <tr>
                                                                  <td>7</td>
                                                                  <td>ClassName 12th</td>
                                                                  <td>3	</td>
                                                                  <td>120</td>
                                                                  <td>02/05/2021</td>
                                                                  <td><a href="className-report.php">View</a></td>
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
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* <!-- END: Content--> */}

      {/* <!-- Syllabus Start Popup--> */}
   <div className="modal fade" id="syllabus_modal">
      <div className="modal-dialog modal-lg">
         <div className="modal-content">

         {/* <!-- Modal Header --> */}
         <div className="modal-header border-0 mb-1">
            <h4 className="modal-title"> Syllabus</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
         </div>

         {/* <!-- Modal body --> */}
         <div className="modal-body container">
         <div className="row">
         <div className="col-md-12 best_luck_text">
            <h3><span className="best_luck"><img src="/images/best_luck.jpg" className="img-fluid"/></span> Best of luck</h3>
            <h4>Your Syllabus</h4>
            <ul>
            <li> Syllabus for Test Paper :  Free Sample Test-jeea-ClassName XI   </li>
            <li>Test Type :  <span>Sample Test</span></li>
            <li className="full_syllabuss">Full Syllabus</li>
            </ul>
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