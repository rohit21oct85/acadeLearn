import Head from '../../components/common/Head'
import HeaderNav from '../../components/common/HeaderNav'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import { useState, useEffect } from 'react'
import {useHistory, useParams } from 'react-router-dom'
// import useRandomQuestion from './hooks/useRandomQuestion'
import useQuestionList from './hooks/useQuestionList'
import useUpdateAttemptTest from './hooks/useUpdateAttemptTestOffline'
import useQuestionPaper from './hooks/useQuestionPaper'
import useCreateUploadTest from './hooks/useCreateUploadTest'
import { useToasts } from 'react-toast-notifications';
import { imageUrl } from '../../config/config'
import mammoth from 'mammoth';
import FileViewer from "react-file-viewer";
import Modal from '../../components/common/Modal'
import axios from 'axios'
import {apiUrl} from '../../../src/config/config';

export default function StudentAttemptOffline(){
    const history = useHistory();
    const params  = useParams();

	const { addToast } = useToasts();

	const [counts, setCounts] = useState(0);
	const [attemptId, setAttemptId] = useState();
	const [duration, setDuration] = useState();
	const [completion, setCompletion] = useState();
	const [formData, setFormData] = useState('');
	const [formDataOffline, setFormDataOffline] = useState(null);
	const [answers, setAnswers] = useState('');
	const [loading, setLoading] = useState(false);
	const [questLoading, setQuestLoading] = useState(false);
	const [opt, setOpt] = useState('');
	const [base64FilesArr, setBase64FilesArr] = useState([]);
	// const [docu, setDocu] = useState([]);
	const [modalShow, setModalShow] = useState('none');
	const [question, setQuestion] = useState('none');
	const [answered, setAnswered] = useState('false');
	const [questionPaper, setquestionPaper] = useState();

	let Data = {};
	const set = (e, option, id) => {
		setOpt(option)
		let answer = "";
			if(counts-1 == questions?.length-1){
				setCompletion('completed')
				setFormData({...formData,  ['answer'] : e.target.value, ['option']: option, ['question_id']:id,});
			}else{
				setFormData({...formData, ['answer'] : e.target.value, ['option']: option, ['question_id']:id,});
			}		
	}

	const changeOption = (e,key, option, id) => {
		setAnswers({...answers,  [`answer${key}`] : e.target.value, [`option${key}`]: option,});
		setFormData({...formData, ['answers']: answers});
	}

	// const {data: question, questionLoading} = useRandomQuestion();
	const {data: questions, questionsLoading} = useQuestionList();
	const {data: questionPapers, questionPaperLoading} = useQuestionPaper();
	const attempt = useUpdateAttemptTest(formDataOffline);
	const attemptUpload = useCreateUploadTest(formData);

	useEffect(()=>{
		setQuestLoading(false)
	},[question])

	useEffect(() => {
        const script = document.createElement("script");
        script.id = 'editor';
        script.src = "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image";
        script.async = true;
        document.body.appendChild(script);
    },[answered])

	useEffect(()=>{
		const current_time = new Date();
		const attemptTime = localStorage.getItem('test_test_attempt_time');
		const tWindow = localStorage.getItem('test_test_window')
		let tDuration = localStorage.getItem('test_test_duration')
		let allowedTime = new Date(localStorage.getItem('test_test_time'));
		allowedTime.setMinutes( allowedTime.getMinutes() + parseInt(tWindow));
		if(current_time > allowedTime){
				setCompletion('timeover')
				if(params.test_type == "upload-test"){
					endTestUpload();
				}else{
					endTest()
				}
		}else{
			const diffInSecs = (allowedTime - new Date(attemptTime))/ 1000;
			console.log(diffInSecs,"in seconds")
			const difference = (Math.abs(allowedTime  - new Date(attemptTime))/1000)/60
			console.log(difference,"in minutes")
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
	
	useEffect(()=>{
		// const fetchedQuestions = JSON.parse(localStorage.getItem('questions'));
		// if(fetchedQuestions == null){
			if(questions != undefined && localStorage.getItem('questions') == null){
				questions  && localStorage.setItem("questions", JSON.stringify(questions))
				if(params.test_type == "mock-test"){
					let filteredArray = questions?.filter(function(item){
						return !("answer" in item);
					});
					if(filteredArray?.length > 0){
						setQuestion(filteredArray[0])
					}
				}else{
					let filteredArray = questions?.filter(function(item){
						return !("answer" in item);
					});
					const question = filteredArray[Math?.floor(Math?.random() * filteredArray?.length)];
					setQuestion(question)
				}
			}
			if(questionPapers != undefined){
			// if(questionPapers != undefined && localStorage.getItem('questionPaper') == null){
				questionPapers  && localStorage.setItem("questionPaper", JSON.stringify(questionPapers))
				setquestionPaper((questionPaper) => questionPaper = questionPapers)
			}
		// }		
	},[questions, questionPapers])

	useEffect(()=>{
		function checkModifiedQuestion(){
			if(localStorage.getItem('questions') != "undefined"){
			//only for single test and mock test
				let count = 0;
				setOpt('')
				setAnswered(false);
				let filteredArray = JSON.parse(localStorage.getItem('questions'))!= null && JSON.parse(localStorage.getItem('questions')).filter(function(it){
					if(!("answer" in it)){
						return it
					}
				});
				JSON.parse(localStorage.getItem('questions'))?.map(item => {
					item.answer && count++
				})
				if(counts-1 < questions?.length-1){
					setCounts(count+1)
				}
				if(params.test_type == "mock-test"){
					if(filteredArray.length > 0){
						setQuestion(filteredArray[0])
					}
				}else{
					const question = filteredArray[Math?.floor(Math?.random() * filteredArray?.length)];
					setQuestion(question)
				}
			}
		}
		checkModifiedQuestion();
	},[answered])

	useEffect(()=>{
		const saveQuestion = async ()=>{
			await attempt.mutate(formDataOffline,{
				onSuccess: (data, variables, context) => {
					if(data?.data){
						// setAttemptId(data?.data?.attemptId)
						var ele = document.getElementsByName("option");
						setFormData({})
						setFormDataOffline({})
						for(var i=0;i<ele.length;i++)
							ele[i].checked = false;
					}
					setLoading(false)
					history.push(`/student/student-result/${params.class_id}/${params.class_name}/${params.test_id}/${localStorage.getItem('attemptIdUploadTest')}/${params.test_type}`);
				},
			});
		}
		if(formDataOffline != null || formDataOffline != undefined){
			if(navigator.onLine){
				setLoading(true)
				saveQuestion()
			}else{
				addToast('Connect to the Internet and Try Again.', { appearance: 'error',autoDismiss: true });
			}
		}
	},[formDataOffline])
	
	var count = 0 ;
	var docs = [];

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
						// console.log("Html for Docx",resultObject.value)
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
		// setFormData({...formData, ['completion_status'] : completion});
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
		if(counts-1 >= (JSON.parse(localStorage.getItem('questions'))).length-1){
			try{
				const check = await axios.get(`${apiUrl}v1/web/test-internet`);
			}catch(error) {
				if(error.response.status == 500){
					setLoading(false)
					addToast('Connect to the Internet and Try Again.', { appearance: 'error',autoDismiss: true });
					return;
				}
			}
		}
		const fetchedData = JSON.parse(localStorage.getItem('questions'))
		fetchedData.map((item,key) => {
			if(item._id == formData.question_id){
				item.answer = formData.answer;
				item.option = formData.option;
			}
		})

		localStorage.setItem("questions", JSON.stringify(fetchedData))
		setLoading(false)
		setQuestLoading(false)
		setAnswered(true);
		var ele = document.getElementsByName("option");
		setFormData({})
		for(var i=0;i<ele.length;i++)
			ele[i].checked = false;
		console.log(completion)
		if(counts-1 >= (JSON.parse(localStorage.getItem('questions'))).length-1){
			addToast('Please wait patiently while we save your records, dont reload or close the tab/window', { appearance: 'warning',autoDismiss: true });
			setFormDataOffline({...formDataOffline, ['completion_status'] : completion == undefined ? "completed" : completion, ['questions']:JSON.parse(localStorage.getItem('questions')), ['attemptId'] : localStorage.getItem('attemptIdUploadTest'), ['time_taken']:localStorage.getItem('COUNTER_INCRE')})
		}
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
			if(sec > test_duration * 60){ //*60 converts to seconds
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
				// console.log(String(MHSTime))
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
		// const data = JSON.parse(localStorage.getItem('questions'));
		// console.log(data)
		// setFormData(({formData}) => ({
		// 	formData: {...formData, ['completion_status'] : completion, ['questions']: data, ['attemptId'] : localStorage.getItem('attemptIdUploadTest'), ['time_taken']:localStorage.getItem('COUNTER')}
		// }));
		Data['completion_status'] = completion;
		Data['questions'] =  JSON.parse(localStorage.getItem('questions'));
		Data['time_taken'] = localStorage.getItem('COUNTER_INCRE');
		Data['attemptId'] = localStorage.getItem('attemptIdUploadTest');
		console.log(localStorage.getItem('COUNTER_INCRE'));
		console.log(Data);
		// this.setState(({ timeArray }) => ({
		// 	timeArray: [...timeArray, { hour: obj.hour, minutes: obj.minutes }]
		// }));
		await attempt.mutate(Data,{
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
		setFormData({...formData, ['answers']: myObject, ['completion_status'] : completion});
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
		// setModalShow('block')
		let tabSwitchCount = JSON.parse(localStorage.getItem('tabSwitchCount'))!= null ? JSON.parse(localStorage.getItem('tabSwitchCount')) : 0 
		tabSwitchCount = tabSwitchCount +1 ;
		localStorage.setItem('tabSwitchCount',tabSwitchCount);
		if(tabSwitchCount >= 2){
			setCompletion('cheating')
			// setFormData({...formData, ['completion_status'] : "cheating"});
			if(params.test_type == "upload-test"){
				endTestUpload();
			}else{
				// endTest();
			}
		}
	};
	
	const online = () => {
		addToast('Back Online', { appearance: 'success',autoDismiss: true });
	}
	
	const offline = () => {
		addToast('You are offline, Kindly connect to the internet', { appearance: 'error',autoDismiss: true });
		if(localStorage.getItem('questions') != "undefined"){
			let questions = JSON.parse(localStorage.getItem('questions'))
			if(params.test_type == "mock-test"){
				let filteredArray = questions?.filter(function(item){
					return !("answer" in item);
				});
				if(filteredArray?.length > 0){
					setQuestion(filteredArray[0])
				}
			}else{
				let filteredArray = questions?.filter(function(item){
					return !("answer" in item);
				});
				const question = filteredArray[Math?.floor(Math?.random() * filteredArray?.length)];
				setQuestion(question)
			}
		}
		if(localStorage.getItem('questionPaper') != "undefined"){
			let questionPaper = JSON.parse(localStorage.getItem('questionPaper'))
			setquestionPaper(questionPaper)
		}
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
		const newData = { }
		newData.answers = myObject;
		newData.completion_status = completion;
		localStorage.setItem("uploadData", JSON.stringify(newData))
		if(navigator.onLine){
			setLoading(true)
			await attemptUpload.mutate(newData, {
				onSuccess: (data, variables, context) => {
					if(data?.data){
						history.push(`/student/student-result/${params.class_id}/${params.class_name}/${params.test_id}/${data?.data?.attemptId}/${params.test_type}`);
					}
					setLoading(false)
				},
			});
		}else{
			addToast('Connect to the Internet and Try Again.', { appearance: 'error',autoDismiss: true });
			// history.push(`/student/student-result/${params.class_id}/${params.class_name}/${params.test_id}/${localStorage.getItem('attemptIdUploadTest')}/${params.test_type}`);
		}
		
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
																	<span className="test-end">Time Left:</span><span className="" id="timer2"></span><span className="" id="timer"></span>
																</div>
																<div className="timer-s" style={{"float":"left"}}>
																	<span className="test-end">Total Allowed:</span><span className="">{duration} min</span>
																</div>
															</div>
															<div className="col-md-12 col-lg-8">
																<div className="job-info job-widget">
																	<h3 className="job-title">{localStorage.getItem('test_test_name')}</h3>
																</div>
																<div className="job-content job-widget mcq-start">
																	{questions?.length>0 ?
																	<div className="container">
																		<div className="d-flex justify-content-center row">
																			<div className="col-md-12 col-lg-12">
																				<div className="border">
																					<div className="question bg-Not-select p-2 border-bottom">
																						<div className="d-flex flex-row justify-content-between align-items-center mcq">
																						<h4 className="mb-0">MCQ Quiz</h4>
																						<span>{counts + ' of ' + questions?.length}</span>
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
																						</div> 
																					<div className="p-2 bg-Not-select">
																						<div className="row"> 
																							<div className="col-md-12 text-right">
																								<button className={"btn nextqus_btn "} disabled={loading && questLoading} type="button" onClick={()=>{saveAnswerAndNext(question?._id)}}>{!loading ? counts-1 == questions?.length-1 ? "Submit" : "Next" : "please wait. .."}<i className="fa fa-angle-right ml-2"></i></button></div></div>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div> : <span>loading questions please wait. ..</span> }
																		</div>
																	</div>
												<div className="col-md-12 col-lg-4 numer-list-atttemp">
													<div className="job-det-info">
															<a className="btn job-btn">All Attempt Question</a>
															<div className="col-md-12 Attendence_dv  msq-o">
																<ul>
																	{localStorage.getItem('questions') != null && localStorage.getItem('questions') != "null" && localStorage.getItem('questions') != undefined && JSON.parse(localStorage.getItem('questions')).map((item, key)=>{
																		if(item.answer){
																			count++
																			return(
																				<li className="ques-attemp" key={key}>
																					<a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">{count}</a>
																				</li>
																			)
																		}
																	})}
																	{localStorage.getItem('questions') != null  && localStorage.getItem('questions') != "null" && localStorage.getItem('questions') != undefined && JSON.parse(localStorage.getItem('questions')).map((item, key)=>{
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
																<span key={key}>
																	<img src={`${imageUrl}uploads/${item}`} className="img-fluid" alt="question_paper"/>
																</span>
															)
														}) 
														:
														
														questionPaper?.questions?.map(( item, key ) => {
															return(
																<span key={key}>
																	<FileViewer fileType={questionPaper?.extension} filePath={`${imageUrl}uploads/${item}`} onError={"error"} />
																	{/* <iframe src={`${imageUrl}uploads/${item}`} /> */}
																</span>
															)
														})
													}
												</div>
											</div>
											<div className="col-md-5 ovr_flw_hedn">
												<div className="Qnd_anw">
													<div className="question bg-Not-select">
														{[...Array(questionPaper?.questionLength)].map((e, i) =>
															<div className="bh_answer1" key={i}>
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