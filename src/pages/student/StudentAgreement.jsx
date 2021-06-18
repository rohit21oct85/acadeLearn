import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import React, { useState } from 'react';
import {useHistory, useParams, useLocation} from 'react-router-dom'

export default function StudentAgreement(){
	const [ checked, setChecked ] = useState('false');
	const [ disabled, setDisabled ] = useState('disabled');
	
	const history = useHistory();
	const params = useParams();

	const change = () => {
		if(checked == "true"){
			setDisabled('disabled')
			setChecked('false')
		}else{
			setDisabled('')
			setChecked('true')
		}
	}

  	return(
		<>
		<Head/>
		<HeaderNav/>
			<div className="app-content content mt-5">
				<div className="content-overlay"></div>
					<div className="content-wrapper">
						<div className="content-body">
							<div className="row">
								<div className="card">
									<div className="col-md-12">
										<div className="test_assign_hlp">
											<h1>Important Guidelines and Instructions for Students </h1>
											<p>(Please read the following section carefully before accepting them and starting your online test)
												You are in an ‘Online Examination’ system, which is fully computerized, user-friendly, and has advanced security features. Candidates can take the test from the safe and secure environment of his/her home, with a computer and internet connection. 
											</p>
											<p>Candidates / Students are requested to take the test honestly, ethically while following all instructions. </p>
															
											</div>
											<div className="test_assign_hlp pt-0">
																<h2>Basic Instructions  </h2> 
																<ol>
																<li>The student is NOT SUPPOSED TO USE his or her Textbook / Solution Manuals / Dictionary / Course Help / Calculator, nor receive help from any other outside source.</li>
												<li>The examination will consist of Objective-type ‘Multiple Choice Questions’ (MCQs) </li>
												<li>All questions are compulsory, and students need to answer all of them. </li>
												<li>Each Multiple Choice Question carries ___ mark.</li>
												<li>The total number of questions might vary based on the course. Please check out the details available on your screen to know about that.</li>
												<li>The subjects or topics covered in the exam will be as per the syllabus, provided to you beforehand.</li>
												<li>There will be NO NEGATIVE MARKING for the wrong answers.</li>
												</ol>
											</div>
											<div className="test_assign_hlp pt-0">
																	<h2>Exam-Related Instructions </h2> 
																	<ol>
																	<li>For Multiple Choice Questions, each question has 4 options. The student has to click on the appropriate option.</li>
													<li>You just need to click on the Right Choice or the Correct option from the multiple choices / options given to you under each question.</li>
													<li>If you want to move on to the next question, click on the ‘NEXT’ button located below.</li>
													<li>You can submit your answers before the timer expires. </li>
													<li>However, please remember that if you fail to answer all the questions within the test duration hours, the timer will automatically submit your test application.</li>
													</ol>
																	
											</div>
											<div className="test_assign_hlp pt-0">
															<h2>Technical Requirements and Instructions </h2> 
															<ol>
																<li>Students must have stable and high-speed internet connectivity.</li>
																<li>Every student will take the examination on a Laptop / Desktop Computer / Smartphone / Tablet.</li>
																<li>Please ensure that your device is adequately charged or connected to any active power connection throughout the test hours.<br/>
																<strong>(Please note that the company will not be responsible for power cuts or other connectivity-related technical issues from the student’s side)</strong></li>
																<li>Before you start your test, please ensure that all background programs / browsers / tabs are closed except the test program.</li>
																<li>Students MUST NOT STOP the test session temporarily and come back later to continue. 
																<br/><strong>(This is especially important in the online environment because the system will show a ‘TIME-OUT’ error and won’t allow you to re-enter the exam site)</strong></li>
																<li>Students MUST NOT CLICK on the browser’s ‘Back’ / ‘Refresh’ / ‘Close’ buttons while the test session is active. 
																<strong>(If you do, you won’t be allowed to re-enter the exam site)</strong></li>
																<li>Students SHOULD NOT FORGET TO CLICK on the ‘Finish’ button after completing the test.</li>
															</ol>
											</div>
						<div className="test_assign_hlp pt-0">
						<h5><strong>Click on the box below ONLY if you have read all the above instructions carefully.</strong></h5> 
						<div className="accepted_dv"> 
						<input type="checkbox" id="accepted" name="accepted" onClick={change}/>
						<label htmlFor="accepted"> “I am [student_name], and I have read and hereby accepted all the instructions mentioned above. I therefore want to open the test portal and my 03:00 hours test duration will start from now on.”</label>
						<button className={`${disabled} start_now_btn btn btn-warning btn-min-width sbmt_view_form btn_click2 mr-1 mb-1 mt-2`} onClick={()=>{
							if(disabled == ""){
								console.log(params)
								history.push(`/student/student-attempt/${params.subject_id}/${params.test_id}`)
							}else{
								alert('Kindly agree to the terms and conditions');
							}
						}}>Start Now</button>
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