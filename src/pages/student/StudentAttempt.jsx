import Head from '../../components/common/Head'
import HeaderNav from '../../components/common/HeaderNav'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import { useState, useEffect } from 'react'
import {useHistory, useParams } from 'react-router-dom'
import useRandomQuestion from './hooks/useRandomQuestion'
import useQuestionList from './hooks/useQuestionList'
import useUpdateAttemptTest from './hooks/useUpdateAttemptTest'
import useQuestionPaper from './hooks/useQuestionPaper'
import useCreateUploadTest from './hooks/useCreateUploadTest'
import { useToasts } from 'react-toast-notifications';
import { imageUrl } from '../../config/config'
import mammoth from 'mammoth';
import FileViewer from "react-file-viewer";
import Modal from '../../components/common/Modal'

export default function StudentAttempt(){
    const history = useHistory();
    const params  = useParams();

	const { addToast } = useToasts();

	const [counts, setCounts] = useState(0);
	const [attemptId, setAttemptId] = useState();
	const [duration, setDuration] = useState();
	const [completion, setCompletion] = useState();
	const [formData, setFormData] = useState('');
	const [answers, setAnswers] = useState('');
	const [loading, setLoading] = useState(false);
	const [questLoading, setQuestLoading] = useState(false);
	const [close, setClose] = useState(false);
	const [opt, setOpt] = useState('');
	const [base64FilesArr, setBase64FilesArr] = useState([]);
	const [docu, setDocu] = useState([]);
	const [modalShow, setModalShow] = useState('none');

	const set = (e, option, id) => {
		setOpt(option)
		let answer = "";
			if(counts-1 == questions?.length-1){
				setCompletion('completed')
				setFormData({...formData,  ['answer'] : e.target.value, ['option']: option, ['question_id']:id,['time_taken']:localStorage.getItem('COUNTER_INCRE')});
			}else{
				setFormData({...formData, ['answer'] : e.target.value, ['option']: option, ['question_id']:id,['time_taken']:localStorage.getItem('COUNTER_INCRE')});
			}		
	}

	const changeOption = (e,key, option, id) => {
		setAnswers({...answers,  [`answer${key}`] : e.target.value, [`option${key}`]: option,});
		setFormData({...formData, ['answers']: answers});
	}

	useEffect(()=>{
		const current_time = new Date();
		// const sTime = new Date(localStorage.getItem('test_test_time'));
		const attemptTime = localStorage.getItem('test_test_attempt_time');
		const tWindow = localStorage.getItem('test_test_window')
		let tDuration = localStorage.getItem('test_test_duration')
		let allowedTime = new Date(localStorage.getItem('test_test_time'));
		allowedTime.setMinutes( allowedTime.getMinutes() + parseInt(tWindow));
		if(current_time > allowedTime){
				setCompletion('timeover')
				// setFormData({...formData, ['completion_status'] : "timeover"});
				if(params.test_type == "upload-test"){
					endTestUpload();
				}else{
					endTest()
				}
		}else{
			const diffInSecs = (allowedTime - new Date(attemptTime))/ 1000;
			const difference = (Math.abs(allowedTime  - new Date(attemptTime))/1000)/60
			if(difference < tDuration){
				tDuration = difference;
				localStorage.setItem('test_test_duration', diffInSecs)
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
		startTimer(localStorage.getItem('test_test_duration') * 60);
	},[attemptId])

	var count = 0 ;
	var docs = [];
	const {data: question, questionLoading} = useRandomQuestion();
	const {data: questions, questionsLoading} = useQuestionList();
	const {data: questionPaper, questionPaperLoading} = useQuestionPaper();
	const attempt = useUpdateAttemptTest(formData);
	const attemptUpload = useCreateUploadTest(formData);

	useEffect(()=>{
		setQuestLoading(false)
		setOpt('')
	},[question])
	
	useEffect(() => {
        const script = document.createElement("script");
        script.id = 'editor';
        script.src = "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image";
        script.async = true;
        document.body.appendChild(script);
    },[question])

	useEffect(()=>{
		let count = 0;
      	questions && questions.map((item,key) => {
			item.answer && count++
		})
		if(counts-1 < questions?.length-1){
			setCounts(count+1)
		}
	},[questions])


	useEffect(() => {
		window.addEventListener('blur', onBlur);
		window.addEventListener("online", online);
		window.addEventListener("offline", offline);

		// Specify how to clean up after this effect:
		return () => {
			window.removeEventListener('blur', onBlur);
			window.removeEventListener("online", online);
			window.removeEventListener("offline", offline);
		};
	});

	const convert = (f, k) => {
		var reader = new FileReader();
		// Closure to capture the file information.
		reader.onload = (function(theFile){
			return function(e) {
				let type = "";
				var arrayBuffer = reader.result;
				var binaryData = e.target.result;
				//Converting Binary Data to base 64
				var base64String = window.btoa(binaryData);
				//showing file converted to base64
				if (f.name.split('.').pop() == "pdf"){
					type = "data:application/pdf;base64,"
					setBase64FilesArr(base64FilesArr => [...base64FilesArr, type + base64String]);
				}else if(f.name.split('.').pop() == "png" || f.name.split('.').pop() == "jpg"){
					type = "data:image/png;base64,"
					setBase64FilesArr(base64FilesArr => [...base64FilesArr, type + base64String]);
				}else if(f.name.split('.').pop()== "docx"){
					mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then(function (resultObject) {
						// result1.innerHTML = resultObject.value
						setBase64FilesArr(base64FilesArr => [...base64FilesArr, resultObject.value]);
					})
				}
				// alert('File converted to base64 successfuly!\nCheck in Textarea');
			};
		})(f);
		// Read in the image file as a data URL.
		reader.readAsBinaryString(f);
	}

	const saveAnswerAndNext = async () => {
		setFormData({...formData, ['completion_status'] : completion, ['time_taken']:localStorage.getItem('COUNTER_INCRE')});
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
		const time = localStorage.getItem('COUNTER_INCRE');
		var sec = time != 0 && time != undefined && time != null ? time : 0;
		async function tick() {
			var counter = document.getElementById("timer");
			sec++;
			localStorage.setItem('COUNTER_INCRE', sec);
			const measuredTime = new Date(null);
			measuredTime.setSeconds(sec);
			let MHSTime = measuredTime.toISOString().substr(11, 8);
			const test_duration = localStorage.getItem('test_test_duration');
			if(sec > test_duration * 60){ // *60 converts to seconds
				setCompletion('timeover')
				// setFormData({...formData, ['completion_status'] : "timeover"});
				if(params.test_type == "upload-test"){
					endTestUpload();
				}else{
					endTest()
				}
			}
			if(counter){
				// counter.innerHTML = "0:" + (MHSTime < 10 ? "0" : "") + String(MHSTime);
				// counter.innerHTML = String(MHSTime);
					setTimeout(tick, 1000);
			}
		}
		tick();
	}

	function startTimer(t) {
		// var testTime = 60 * 5;
		const time = localStorage.getItem('COUNTER') != null ? parseInt(localStorage.getItem('COUNTER')) : t ;
		var timer = time, hours, minutes, seconds;
		async function tick() {
			var display = document.querySelector('#timer2');
			// hours = parseInt ((timer/60)/60, 10);
			minutes = parseInt(timer / 60, 10)
			seconds = parseInt(timer % 60, 10);
			
			// hours = hours < 10 ? "0" + hours : hours;
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			
			--timer
			localStorage.setItem('COUNTER', timer);
			if (timer <= 0) {
				// timer = duration;
				setCompletion('timeover')
				if(params.test_type == "upload-test"){
					endTestUpload();
				}else{
					endTest()
				}
			}
			if(display){
				display.textContent = String(minutes + ":" + seconds);
				setTimeout(tick , 1000);
			}
		}
		tick();
	}
	
	let optionsDocx = [{key: 0,value: " A", option: "option_a",},{key: 1,value: " B", option: "option_b",},{key: 3,value: " C", option: "option_c",},{key: 4,value: " D", option: "option_d",}];
    async function endTest(){
		setClose(true)
		setFormData({...formData, ['completion_status'] : completion, ['time_taken'] : localStorage.getItem('COUNTER_INCRE')});
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

    async function endTestUpload(){
		const radios = document.getElementsByClassName('rAnswer')
		const myObject = {}
		for(let i = 0; i < radios.length; i++){
			if(radios[i].checked){
				myObject[radios[i].name] = radios[i].value;
				const index = radios[i].name.slice(radios[i].name.length - 1)
				myObject[`option${index}`] = "option_" + radios[i].value;
			}
		}
		setFormData({...formData, ['answers']: myObject, ['completion_status'] : completion, ['time_taken']:localStorage.getItem('COUNTER_INCRE')});
		await attemptUpload.mutate(formData, {
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
		setModalShow('block')
		let tabSwitchCount = JSON.parse(localStorage.getItem('tabSwitchCount'))!= null ? JSON.parse(localStorage.getItem('tabSwitchCount')) : 0 
		tabSwitchCount = tabSwitchCount +1 ;
		localStorage.setItem('tabSwitchCount',tabSwitchCount);
		if(tabSwitchCount >= 2 && close === false){
			setCompletion('cheating')
			if(params.test_type == "upload-test"){
				endTestUpload();
			}else{
				endTest();
			}
		}
	};
	
	const online = () => {
		addToast('Back Online', { appearance: 'success',autoDismiss: true });
	}
	
	const offline = () => {
		addToast('You are offline, Kindly connect to the internet', { appearance: 'error',autoDismiss: true });
	}


	const submitUploadTest = async() => {
		const radios = document.getElementsByClassName('rAnswer')
		const myObject = {}
		for(let i = 0; i < radios.length; i++){
			if(radios[i].checked){
				myObject[radios[i].name] = radios[i].value;
				const index = radios[i].name.slice(radios[i].name.length - 1)
				myObject[`option${index}`] = "option_" + radios[i].value;
			}
		}
		// setFormData({...formData, ['answers']: myObject, ['completion_status']: "completed"});
		const newData = { }
		newData.answers = myObject;
		newData.completion_status = completion;
		await attemptUpload.mutate(newData, {
			onSuccess: (data, variables, context) => {
				if(data?.data){
					history.push(`/student/student-result/${params.class_id}/${params.class_name}/${params.test_id}/${data?.data?.attemptId}/${params.test_type}`);
				}
				setLoading(false)
			},
		});
	}

	return(
        <>
            <Head/>
            <HeaderNav/>
			<Modal show={modalShow} setShow={setModalShow} text="Switching tabs between a test is prohibited. If you try this again, your test will be cancelled automatically."/>
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
												<div className="card-body attempt-new">
													<div className="container-fluid">
														<div className="row">
															<div className="col-xl-12 col-lg-12">
																<div className="timer-s" >
																	<span className="test-end">Total Left:</span><span className="" id="timer"></span><span className="" id="timer2"></span>
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
																					{questions?.length>0 ? <div className="question bg-Not-select p-2 border-bottom">
																							<div className="flex-row question-title">
																								<span className="text-danger q_nsekected">Q.</span>
																								<h5 className="ml-3"><div style={{fontSize :"20px"}} dangerouslySetInnerHTML={{ __html: question?.question }}/></h5>
																							</div>
																							{question?.extension && question?.extension == "docx" ? 
																								<span>
																									{question.options.map((item,key)=>{
																										return(
																											<div className="ans ml-2" key={key}>
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
																						</div>: "loading. .." } 
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
									<div className="card-body attempt-new">
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
											<div className="col-md-7 online_answ_bg">
												<div className="online_answ">
													{questionPaper?.extension == "png" || questionPaper?.extension == "jpg" 
														? 
														questionPaper.questions?.map(( item, key ) => {
															return(
																<>
																	<img src={`${imageUrl}uploads/${item}`} key={key} className="img-fluid" alt="question_paper"/>
																</>
															)
														}) 
														:
														
														questionPaper?.questions?.map(( item, key ) => {
															return(
																<>
																	<FileViewer fileType={questionPaper?.extension} filePath={`${imageUrl}uploads/${item}`} onError={"error"} />
																	{/* <iframe src={`${imageUrl}uploads/${item}`} /> */}
																</>
															)
														})
													}
												</div>
											</div>
											<div className="col-md-5 ovr_flw_hedn">
												<div className="Qnd_anw">
													<div className="question bg-Not-select">
														{[...Array(questionPaper?.questionLength)].map((e, i) =>
															<div className="bh_answer1">
																<div className=" question-title">
																	<h5 className=""><span>Question {i+1}.</span></h5>
																</div>
																<ul>
																	<li><input className="rAnswer" type="radio" id={`check-a${i}`} name={`answer${i+1}`}  value="a" onChange={(e)=>{changeOption(e, i+1, "option_a",question?._id)}}/> <label htmlFor={`check-a${i}`}>Option A</label></li>
																	<li><input className="rAnswer" type="radio" id={`check-b${i}`} name={`answer${i+1}`}  value="b" onChange={(e)=>{changeOption(e, i+1, "option_b",question?._id)}}/> <label htmlFor={`check-b${i}`}>Option B</label></li>
																	<li><input className="rAnswer" type="radio" id={`check-c${i}`} name={`answer${i+1}`}  value="c" onChange={(e)=>{changeOption(e, i+1, "option_c",question?._id)}}/> <label htmlFor={`check-c${i}`}>Option C</label></li>
																	<li><input className="rAnswer" type="radio" id={`check-d${i}`} name={`answer${i+1}`}  value="d" onChange={(e)=>{changeOption(e, i+1, "option_d",question?._id)}}/> <label htmlFor={`check-d${i}`}>Option D</label></li>
																</ul>
															</div>
														)}
														<div className="p-1 bg-Not-select bdr_to1">
															<div className="col-md-12 text-right"> 
																<button className="btn nextqus_btn" type="button" onClick={submitUploadTest}>Submit<i className="fa fa-angle-right ml-2"></i></button>
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