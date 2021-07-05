import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import React, { useState } from 'react';
import {useHistory, useParams} from 'react-router-dom'

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
											<h1>Important Guidelines And Instructions For Students</h1>
											<p>(Please read the following section carefully before accepting them and starting the online test). 
											You are in an online examination system that is fully computerized, user-friendly and has advanced security features. Candidates can attempt the test from the safe and secure environment of his/her home using a computer and internet connection. 
											</p>
											<p>Candidates/Students are requested to complete the test honesty and ethically while following all the instructions.</p>
															
											</div>
											<div className="test_assign_hlp pt-0">
																<h2>Basic Instructions</h2> 
																<ol>
																<li>The student is not supposed to use his/her Textbook / Solution Manuals / Dictionary / Course Help / Calculator, nor receive help from any other outside source.</li>
												<li>The examination will consist of objective-type Multiple-Choice Questions (MCQs).</li>
												<li>All questions are compulsory, and students must attempt each of them.</li>
												<li>Each multiple-choice question carries __ mark.</li>
												<li>The total number of questions may vary based on the course. Please check the details available on your screen to know more about it.</li>
												<li>The topics covered in the exam will be as per the syllables provided to you beforehand.</li>
												<li>There will be no negative marking for wrong answers.</li>
												</ol>
											</div>
											<div className="test_assign_hlp pt-0">
																	<h2>Exam-Related Instructions </h2> 
																	<ol>
																	<li>Each question has four options. The student has to click on the most appropriate option.</li>
													<li>The student must click on one option only from the multiple choices/options provided under each question.</li>
													<li>To move on to the next question, attempt the current question and click on the ‘Next’ button located below.</li>
													<li>You cannot leave a question unattempted and proceed to the next.</li>
													<li>After proceeding to the next question, you cannot return to or view the previous question.</li>
													<li>You can submit your answers before the time expires.</li>
													<li>However, please remember that if you fail to answer all the questions within the time limit, the incomplete test will be submitted automatically.</li>
													</ol>
																	
											</div>
											<div className="test_assign_hlp pt-0">
															<h2>Technical Requirements And Instructions.</h2> 
															<ol>
																<li>Students must have stable and high-speed internet connectivity.</li>
																<li>Every student will take the examination on a Laptop/Desktop Computer/Smartphone/Tablet.</li>
																<li>Please ensure that your device is adequately charged or connected to an active power connection throughout the test hours.<br/>
																<strong>(Please note that the company will not be responsible for power cuts or other connectivity-related technical issues from the student’s side.)</strong></li>
																<li>Before starting your test, please ensure that all the background programs/browsers/tabs are closed, except the test window.</li>
																<li>Students MUST NOT STOP the test session temporarily and come back later to continue.
																<br/><strong>(This is especially important in the online environment because the system will show a time-out error and not let you re-enter the exam site.)</strong></li>
																<li>Students MUST NOT CLICK on the Back/Refresh/Close buttons of the browser while the test session is active. 
																<strong>(If you do, you will not be able to re-enter the exam site.)</strong></li>
																<li>Students SHOULD NOT FORGET TO CLICK on the ‘Submit’ button after completing the test.</li>
															</ol>
											</div>
						<div className="test_assign_hlp pt-0">
						<h5><strong>Click on the box below ONLY if you have read all the above instructions carefully.</strong></h5> 
						<div className="accepted_dv"> 
						<input type="checkbox" id="accepted" name="accepted" onClick={change}/>
						<label htmlFor="accepted"> “I am ({localStorage.getItem('name')}), and I have read and hereby accepted all the instructions mentioned above. I, therefore, want to open the test portal, and my test starts now.</label>
						<button className={`${disabled} start_now_btn btn btn-warning btn-min-width sbmt_view_form btn_click2 mr-1 mb-1 mt-2`} onClick={()=>{
							if(disabled == ""){
								history.push(`/student/student-attempt/${params.class_id}/${params.class_name}/${params.test_id}?query=true`)
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