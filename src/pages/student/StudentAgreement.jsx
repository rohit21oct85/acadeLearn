import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import React, { useState } from 'react';
import {useHistory, useParams} from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';

export default function StudentAgreement(){
	const [ checked, setChecked ] = useState('false');
	const [ disabled, setDisabled ] = useState('disabled');
	const [ disabledCheck, setDisabledCheck ] = useState(true);
	
	const { addToast } = useToasts();
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

	const changeCheck = () => {
		var checkbox = document.getElementsByClassName("test-id");
		var counter = 0;
		for(var i=0;i<checkbox.length;i++) {
			if(!checkbox[i].checked){
				// addToast('Please read and select all checkboxes', { appearance: 'error',autoDismiss: true });
				// return;
			}else{
				counter++;
			}
		}
		if(counter != checkbox.length){
			setDisabledCheck(true)
			setDisabled('disabled')
			setChecked('false')
			document.getElementById('accepted').checked = false;
		}else{
			setDisabledCheck(false)
			// setDisabled('')
			// setChecked('true')
		}
	}

		function toggleFullScreen() {
			if (!document.fullscreenElement) {
				document.documentElement.requestFullscreen();
			} else {
				if (document.exitFullscreen) {
					// document.exitFullscreen();
				}
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
							<div className="">
								<div className="">
									<div className="col-md-8 ml-auto mr-auto card">
										<div className="test_assign_hlp">
											<h1>Important Guidelines And Instructions For Students</h1>
											<p>(Before starting the test, please read each instruction carefully and click on the boxes beside them.) 
											You are in an online examination system that is fully computerized, user-friendly and has advanced security features. Candidates can attempt the test from the safe and secure environment of his/her home using a computer and internet connection. 
											</p>
											<p>Candidates/Students are requested to complete the test honesty and ethically while following all the instructions.</p>
															
										</div>
											<div className="scrolling">
												<div className="test_assign_hlp pt-0">
																	<h2>Basic Instructions</h2> 
																	<ol>
																	<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>The student is not supposed to use his/her Textbook / Solution Manuals / Dictionary / Course Help / Calculator, nor receive help from any other outside source.</label> </div></li>
													<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>The examination will consist of objective-type Multiple-Choice Questions (MCQs).</label> </div></li>
													<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>All questions are compulsory, and students must attempt each of them.</label> </div></li>
													<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>Each multiple-choice question carries __ mark.</label> </div></li>
													<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>The total number of questions may vary based on the course. Please check the details available on your screen to know more about it.</label> </div></li>
													<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>The topics covered in the exam will be as per the syllables provided to you beforehand.</label> </div></li>
													<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>There will be no negative marking for wrong answers.</label> </div></li>
													</ol>
												</div>
												<div className="test_assign_hlp pt-0">
																		<h2>Exam-Related Instructions </h2> 
																		<ol>
																		<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>Each question has four options. The student has to click on the most appropriate option.</label> </div></li>
														<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>The student must click on one option only from the multiple choices/options provided under each question.</label> </div></li>
														<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>To move on to the next question, attempt the current question and click on the ‘Next’ button located below.</label> </div></li>
														<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>You cannot leave a question unattempted and proceed to the next.</label> </div></li>
														<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>After proceeding to the next question, you cannot return to or view the previous question.</label> </div></li>
														<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>You can submit your answers before the time expires.</label> </div></li>
														<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>However, please remember that if you fail to answer all the questions within the time limit, the incomplete test will be submitted automatically.</label> </div></li>
														</ol>
																		
												</div>
												<div className="test_assign_hlp pt-0">
																<h2>Technical Requirements And Instructions.</h2> 
																<ol>
																	<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>Students must have stable and high-speed internet connectivity.</label> </div></li>
																	<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>Every student will take the examination on a Laptop/Desktop Computer/Smartphone/Tablet.</label> </div></li>
																	<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>Please ensure that your device is adequately charged or connected to an active power connection throughout the test hours.<br/>
																	<strong>(Please note that the company will not be responsible for power cuts or other connectivity-related technical issues from the student’s side.)</strong></label> </div></li>
																	<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>Before starting your test, please ensure that all the background programs/browsers/tabs are closed, except the test window.</label> </div></li>
																	<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>If a student opens another tab or window he/she will not be able to resume the test.</label> </div></li>
																	<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>Students MUST NOT STOP the test session temporarily and come back later to continue.
																	<br/><strong>(This is especially important in the online environment because the system will show a time-out error and not let you re-enter the exam site.)</strong></label> </div></li>
																	<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>Students MUST NOT CLICK on the Back/Refresh/Close buttons of the browser while the test session is active. 
																	<strong>(If you do, you will not be able to re-enter the exam site.)</strong></label> </div></li>
																	<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>Students SHOULD NOT FORGET TO CLICK on the ‘Submit’ button after completing the test.</label> </div></li>
																	<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>Students will be able to view the scorecard after the test and score details only after the test window expires.</label> </div></li>
																	<li><div className="checkbox_dv"><input type="checkbox" className="test-id"  onClick={changeCheck}/><label>The test will continue in case the internet connection is interrupted but the students will be able to view the results only after the connection resumes.</label> </div></li>
																</ol>
												</div>
											</div>
						<div className="test_assign_hlp pt-0">
						<h5><strong>Click on the box below ONLY if you have read all the above instructions carefully.</strong></h5> 
						<div className="accepted_dv"> 
						<input disabled={disabledCheck} type="checkbox" id="accepted" name="accepted" onClick={change}/> 
					 	 <label htmlFor="accepted">  "I am ({localStorage.getItem('name')}), and I have read and hereby accepted all the instructions mentioned above. I, therefore, want to open the test portal, and my test starts now."</label>
						<button className={`${disabled} start_now_btn btn btn-warning btn-min-width sbmt_view_form btn_click2 mr-1 mb-1 mt-2`} onClick={()=>{
							if(disabled == ""){
								toggleFullScreen()
								history.push(`/student/student-attempt/${params.class_id}/${params.class_name}/${params.test_id}/${params.test_type}/?query=true`)
							}else{
								addToast('Kindly agree to the terms and conditions', { appearance: 'error',autoDismiss: true });
							}
						}} style={{color:"white"}} type="button">Start Now</button>
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