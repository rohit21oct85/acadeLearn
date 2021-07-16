import Head from '../../components/common/Head'
import HeaderNav from '../../components/common/HeaderNav'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import { useState, useEffect } from 'react'
import {useHistory, useParams } from 'react-router-dom'
import useRandomQuestion from '../../pages/student/hooks/useRandomQuestion'
import useQuestionList from '../../pages/student/hooks/useQuestionList'
import useUpdateAttemptTest from '../../pages/student/hooks/useUpdateAttemptTest'
import useQuestionPaper from '../../pages/student/hooks/useQuestionPaper'
import { useToasts } from 'react-toast-notifications';

export default function StudentAttempt(){
    const history = useHistory();
    const params  = useParams();

	const { addToast } = useToasts();

	const [counts, setCounts] = useState(0);
	const [attemptId, setAttemptId] = useState();
	const [duration, setDuration] = useState();
	const [formData, setFormData] = useState('');
	const [loading, setLoading] = useState(false);
	const [questLoading, setQuestLoading] = useState(false);
	const [opt, setOpt] = useState('');
	
	const set = (e, option, id) => {
		setOpt(option)
		let answer = "";
		// if(params.test_type == "mock-test"){
		// 	if(e.target.value == "yes"){
		// 		answer = "a";
		// 	}else{
		// 		answer = "b"
		// 	}
		// 	if(counts-1 == questions?.length-1){
		// 		setFormData({...formData,  ['answer'] : answer, ['option']: option, ['question_id']:id, ['completion_status'] : "completed" });
		// 	}else{
		// 		setFormData({...formData, ['answer'] : answer, ['option']: option, ['question_id']:id,});
		// 	}
		// }else{
			if(counts-1 == questions?.length-1){
				setFormData({...formData,  ['answer'] : e.target.value, ['option']: option, ['question_id']:id, ['completion_status'] : "completed" });
			}else{
				setFormData({...formData, ['answer'] : e.target.value, ['option']: option, ['question_id']:id,});
			}
		// }
		
	}

	useEffect(() => {
        const script = document.createElement("script");
        script.id = 'editor';
        script.src = "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image";
        script.async = true;
        document.body.appendChild(script);
    },[attemptId])

	useEffect(()=>{
		const current_time = new Date();
		const sTime = new Date(localStorage.getItem('test_test_time'));
		const attemptTime = localStorage.getItem('test_test_attempt_time');
		const tWindow = localStorage.getItem('test_test_window')
		let tDuration = localStorage.getItem('test_test_duration')
		let allowedTime = new Date(localStorage.getItem('test_test_time'));
		allowedTime.setMinutes( allowedTime.getMinutes() + parseInt(tWindow));
		if(current_time > allowedTime){
			setFormData({...formData, ['completion_status'] : "timeover"});
				endTest();
		}else{
			const difference = (Math.abs(allowedTime  - new Date(attemptTime))/1000)/60
			if(difference < tDuration){
				tDuration = difference;
				localStorage.setItem('test_test_duration', difference)
			}
			setDuration(parseFloat(tDuration)?.toFixed(2));
		}
	},[])

	useEffect(()=>{
		let search = window.location.search;
		let query = new URLSearchParams(search);
		let foo = query.get('query');
		if(foo){
			localStorage.removeItem('COUNTER');
			history.push(`/student/student-attempt/${params.class_id}/${params.class_name}/${params.test_id}/${params.test_type}`);
		}
		timer()
	},[attemptId])

	var count = 0 ;
	const {data: question, questionLoading} = useRandomQuestion();
	const {data: questions, questionsLoading} = useQuestionList();
	const {data: questionPaper, questionPaperLoading} = useQuestionPaper();
	const attempt = useUpdateAttemptTest(formData);

	useEffect(()=>{
		setQuestLoading(false)
		setOpt('')
	},[question])

	useEffect(()=>{
		let count = 0;
      	questions && questions.map((item,key) => {
			item.answer && count++
		})
		setCounts(count+1)
	},[questions])

	// useEffect(() => {
	// 	function toggleFullScreen() {
	// 		if (!document.fullscreenElement) {
	// 			document.documentElement.requestFullscreen();
	// 		} else {
	// 			if (document.exitFullscreen) {
	// 				// document.exitFullscreen();
	// 			}
	// 		}
	// 	}
	// 	toggleFullScreen()
	// });

	const saveAnswerAndNext = async () => {
		setLoading(true)
		setQuestLoading(true)
		let search = window.location.search;
		let query = new URLSearchParams(search);
		let foo = query.get('query');
		if(foo){
			history.push(`/student/student-attempt/${params.class_id}/${params.class_name}/${params.test_id}/${params.test_type}`);
		}
		
		if(formData.answer == undefined){
			addToast('select an answer', { appearance: 'error',autoDismiss: true });
			setLoading(false)
			return;
		}

		await attempt.mutate(formData,{
			onSuccess: (data, variables, context) => {
				if(data?.data){
					setAttemptId(data?.data?.attemptId)
					var ele = document.getElementsByName("option");
					setFormData({})
					for(var i=0;i<ele.length;i++)
						ele[i].checked = false;
				}
				setLoading(false)
				if(counts-1 == questions?.length-1){
					history.push(`/student/student-result/${params.class_id}/${params.class_name}/${params.test_id}/${data?.data?.attemptId}/${params.test_type}`);
				}
			},
		});
	}

	function timer() {
		const time = localStorage.getItem('COUNTER');
		var sec = time != 0 && time != undefined && time != null ? time : 0;
		async function tick() {
			var counter = document.getElementById("timer");
			sec++;
			
			localStorage.setItem('COUNTER', sec);
			const measuredTime = new Date(null);
			measuredTime.setSeconds(sec);
			let MHSTime = measuredTime.toISOString().substr(11, 8);
			const test_duration = localStorage.getItem('test_test_duration');
			if(sec > test_duration*60){ //*60 converts to seconds
				setFormData({...formData, ['completion_status'] : "timeover"});
					endTest()
			}
			if(counter){
				// counter.innerHTML = "0:" + (MHSTime < 10 ? "0" : "") + String(MHSTime);
				counter.innerHTML = String(MHSTime);
					setTimeout(tick, 1000);
			}
		}
		tick();
	}

	let optionsDocx = [{key: 0,value: " A", option: "option_a",},{key: 1,value: " B", option: "option_b",},{key: 3,value: " C", option: "option_c",},{key: 4,value: " D", option: "option_d",}];
    async function endTest(){
		await attempt.mutate(formData,{
			onSuccess: (data, variables, context) => {
				if(data?.data){
					setAttemptId(data?.data?.attemptId)
					var ele = document.getElementsByName("option");
					setFormData({})
					for(var i=0;i<ele.length;i++)
						ele[i].checked = false;
				}
				history.push(`/student/student-result/${params.class_id}/${params.class_name}/${params.test_id}/${data?.data?.attemptId}/${params.test_type}`);
			},
		});
	}

	const onBlur = () => {
		addToast('Tab Switching is not Allowed!\n if u do it once again ur test will be cancelled', { appearance: 'error',autoDismiss: true, });
		let tabSwitchCount = JSON.parse(localStorage.getItem('tabSwitchCount'))!= null ? JSON.parse(localStorage.getItem('tabSwitchCount')) : 0 
		tabSwitchCount = tabSwitchCount +1 ;
		localStorage.setItem('tabSwitchCount',tabSwitchCount);
		if(tabSwitchCount >= 2){
			// endTest()
		}
	};

	useEffect(() => {
		window.addEventListener('blur', onBlur);
		// Specify how to clean up after this effect:
		return () => {
		  window.removeEventListener('blur', onBlur);
		};
	});

	return(
        <>
            <Head/>
            <HeaderNav/>
			{params.test_type != "upload-test" ? 
			<>
				<div className="app-content content mt-5">
					<div className="content-overlay"></div>
						<div className="content-wrapper">
							<div className="content-body">
								<div className="row">
									<div className="col-xl-12 col-lg-12">
										<div className="card"> 
											<div className="card-content">
												<div className="card-body">
													<div className="container-fluid">
														<div className="row">
															<div className="col-xl-12 col-lg-12">
																<div className="timer-s" >
																	<span className="test-end">Total time taken:</span><span className="" id="timer"></span>
																</div>
																<div className="timer-s" style={{"float":"left"}}>
																	<span className="test-end">Total Allowed:</span><span className="">{duration} min</span>
																</div>
															</div>
															<div className="col-md-8">
																<div className="job-info job-widget">
																	<h3 className="job-title">{localStorage.getItem('test_test_name')}</h3>
																</div>
																<div className="job-content job-widget mcq-start">
																	<div className="container">
																		<div className="d-flex justify-content-center row">
																			<div className="col-md-12 col-lg-12">
																				<div className="border">
																					<div className="question bg-Not-select p-2 border-bottom">
																						<div className="d-flex flex-row justify-content-between align-items-center mcq">
																						<h4 className="mb-0">MCQ Quiz</h4>
																						<span>{counts + ' of ' +questions?.length}</span>
																						</div>
																					</div>
																						<div className="question bg-Not-select p-2 border-bottom">
																							<div className="flex-row question-title">
																								<span className="text-danger q_nsekected">Q.</span>
																								<h5 className="ml-3"><div style={{fontSize :"20px"}} dangerouslySetInnerHTML={{ __html: question?.question }}/></h5>
																							</div>
																							{question?.extension && question?.extension == "docx" ? 
																								<span>
																									{question.options.map((item,key)=>{
																										return(
																											<div className="ans ml-2">
																												<label className={"radio " + (opt == optionsDocx[key]['option'] ? 'active' :'')}> <input type="radio" name="option" value={item} onChange={(e)=>{set(e, optionsDocx[key]['option'], question?._id)}}/><span className="checkmark"></span> <span><div dangerouslySetInnerHTML={{ __html: item }}/></span> </label>
																											</div>
																										)
																									})}
																								</span> : 
																								<span>
																									<div className="ans ml-2">
																										<label className={"radio " + (opt == 'option_a' ? 'active' :'')}> <input type="radio" name="option" value={question?.option_a} onChange={(e)=>{set(e,"option_a",question?._id)}}/><span className="checkmark"></span> <span><div dangerouslySetInnerHTML={{ __html: question?.option_a }}/></span> </label>
																									</div>
																									<div className="ans ml-2">
																										<label className={"radio " + (opt == 'option_b' ? 'active' :'')}> <input type="radio" name="option" value={question?.option_b} onChange={(e)=>{set(e,"option_b",question?._id)}}/><span className="checkmark"></span> <span><div dangerouslySetInnerHTML={{ __html: question?.option_b }}/></span>
																										</label>
																									</div>
																									{params.test_type != "mock-test" ?  <><div className="ans ml-2">
																										<label className={"radio " + (opt == 'option_c' ? 'active' :'')}> <input type="radio" name="option" value={question?.option_c} onChange={(e)=>{set(e,"option_c",question?._id)}}/><span className="checkmark"></span> <span><div dangerouslySetInnerHTML={{ __html: question?.option_c }}/></span>
																										</label>
																									</div>
																									<div className="ans ml-2">
																										<label className={"radio " + (opt == 'option_d' ? 'active' :'')}> <input type="radio" name="option" value={question?.option_d} onChange={(e)=>{set(e,"option_d",question?._id)}}/><span className="checkmark"></span> <span><div dangerouslySetInnerHTML={{ __html: question?.option_d }}/></span>
																										</label>
																									</div></> : ""}
																								</span>}
																						</div>
																					<div className="p-2 bg-Not-select">
																						<div className="row"> 
																							<div className="col-md-12 text-right">
																								<button className={"btn nextqus_btn "} disabled={loading && questLoading} type="button" onClick={()=>{saveAnswerAndNext(question?._id)}}>{!loading ? counts-1 == questions?.length-1 ? "Submit" : "Next" : "please wait. .."}<i className="fa fa-angle-right ml-2"></i></button></div></div>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
												<div className="col-md-4 numer-list-atttemp">
													<div className="job-det-info">
															<a className="btn job-btn">All Attempt Question</a>
															<div className="col-md-12 Attendence_dv  msq-o">
																<ul>
																	{questions && questions.map((item, key)=>{
																		if(item.answer){
																			count++
																			return(
																				<li className="ques-attemp" key={key}>
																					<a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">{count}</a>
																				</li>
																			)
																		}
																	})}
																	{questions && questions.map((item, key)=>{
																		if(!item.answer){
																			count++
																			return(
																				<li className="" key={key}>
																					<a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">{count}</a>
																				</li>
																			)
																		}
																	})}
																	
																</ul>
															</div>
															<div className="Quiz_reviewLegend">
																<ol>
																	<li> <span className="Quiz_reviewColor" style={{backgroundColor: "#00ab54"}}></span> <span className="Quiz_reviewText">Answered</span></li>
																</ol>
																<div style={{clear: "both"}}></div>
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
			</>
	  	:
	  	<>
			<div className="app-content content mt-5">
				<div className="content-overlay"></div>
				<div className="content-wrapper">
					<div className="content-body">
						{/* <!-- Slaes & Purchase Order --> */}
						<div className="row">
							<div className="col-xl-12 col-lg-12">
							<div className="card">
								<div className="card-content">
									<div className="card-body">
										<div className="container-fluid">
										<div className="row">
										<div className="col-xl-12 col-lg-12">
											<div className="timer-s" >
												<span className="test-end">Total time taken:</span><span className="" id="timer"></span>
											</div>
											<div className="timer-s" style={{"float":"left"}}>
												<span className="test-end">Total Allowed:</span><span className="">{duration} min</span>
											</div>
										</div>
											<div className="upload-area__header col-md-12">
												<h3 className="job-title">{localStorage.getItem('test_test_name')}</h3>
											</div>
											<div className="col-md-6 online_answ_bg">
												<div className="online_answ">{console.log(questionPaper)}
													{questionPaper?.extension == "png" || questionPaper?.extension == "jpg" 
														? 
														questionPaper.questions?.map(( item, key ) => {
															return(
																<>{console.log("sadas",item)}
																	<img src={item} className="img-fluid" alt="question_paper"/>
																</>
															)
														}) 
														:
														
														questionPaper?.questions?.map(( item, key ) => {
															return(
																<>{console.log("sadfsfsdfsdas",item)}
																	<iframe src={item} />
																</>
															)
														})
													}
												</div>
											</div>
											<div className="col-md-6 ovr_flw_hedn">
												<div className="Qnd_anw">
													<div className="question bg-Not-select">
													{[...Array(questionPaper?.questionLength)].map((e, i) =>
														<div className="bh_answer1">
															<div className=" question-title">
																<h5 className=""><span>Q {i+1}.</span></h5>
															</div>
															<ul>
																<li><input type="radio" id={`check-a`} name={`ans${i+1}`}  value="a"/> <label htmlFor="check-a"> A</label></li>
																<li><input type="radio" id={`check-b`} name={`ans${i+1}`}  value="b"/> <label htmlFor="check-b"> B</label></li>
																<li><input type="radio" id={`check-c`} name={`ans${i+1}`}  value="c"/> <label htmlFor="check-c"> C</label></li>
																<li><input type="radio" id={`check-d`} name={`ans${i+1}`}  value="d"/> <label htmlFor="check-d"> D</label></li>
															</ul>
														</div>
													)}																										<div className="p-1 bg-Not-select bdr_to1">
														<div className="col-md-12 text-right"> 
															<button className="btn nextqus_btn" type="button">Next<i class="fa fa-angle-right ml-2"></i></button>
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
	  	</> }
            <Footer/>
            <Foot/>
        </>
    )
}