import {useHistory, useParams} from 'react-router-dom'
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import { Link } from 'react-router-dom'
import {useState, useContext, useEffect} from 'react'
import AssignmentCard  from "../../components/teacher/AssignmentCard";
import useClassList from '../../pages/teacher/hooks/useClassList'
// import useTeacherSubject from '../../pages/teacher/hooks/useTeacherSubject'
import useUnitTestList from '../../pages/teacher/hooks/useUnitTestList'
import useStudentWiseReport from '../../pages/teacher/hooks/useStudentWiseReport'
import {AuthContext} from '../../context/AuthContext'
import useUpdateUnitTestList from '../../pages/teacher/hooks/useUpdateUnitTestList'
import useAssignedTestReport from '../../pages/teacher/hooks/useAssignedTestReport'
import useSingleStudentTestReport from '../../pages/teacher/hooks/useSingleStudentTestReport'
import CumilativeStudent from '../../components/teacher/CumulativeStudent'
import useClassWiseList from './hooks/useClassWiseList'
import useClassAndSubjectWiseUnitList from './hooks/useClassAndSubjectWiseUnitList'
import useClassSubjectAndUnitWiseChapterList from './hooks/useClassSubjectAndUnitWiseChapterList'
import useCreateTest from './hooks/useCreateTest';
import { useToasts } from 'react-toast-notifications';

import DatePicker from "react-datepicker";
import mammoth from 'mammoth';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

import './css/style.css'
import './css/math.css'

export default function TeacherDashboard(){
	const [section, setSection] = useState();
	const [loading, setLoading] = useState(false);
	const [answers, setAnswers] = useState();
	const [docType, setDocType] = useState('png');
	const [anyFile, setAnyFile] = useState([]);
	const [base64FilesArr, setBase64FilesArr] = useState([]);
	const [startDate, setStartDate] = useState(new Date());
	const [error, setError] = useState();
	const [correctAnswers, setCorrectAnswers] = useState([]);
	const [allowMultiple, setAllowMultiple] = useState(true);
	const [loadingCreate, setLoadingCreate] = useState(false);
	const [formData1, setFormData1] = useState({});
	const formDataUpload = new FormData();

	const { state } = useContext(AuthContext);

	const { addToast } = useToasts();

    const changeSection = (value) => {
        setSection(value)
        history.push(`/teacher/teacher-dashboard/${value}`)
    }
    
    const params = useParams();
    const history = useHistory();

    const {data:classes, classLoading} = useClassList();
   //  const {data:teacherSubject, teacherSubjectLoading} = useTeacherSubject();
    const {data:unitTests, unitTestLoading} = useUnitTestList();
    const {data:studentWiseReport, studentWiseReportLoading} = useStudentWiseReport();
    const {data:assignedTests, assignedTestsLoading} = useAssignedTestReport();
    const {data:singleStudentTests, singleStudentTestsLoading} = useSingleStudentTestReport();
    const {data:classWise, classWiseLoading} = useClassWiseList();
    const {data:classAndSubjectWiseUnit, classAndSubjectWiseUnitLoading} = useClassAndSubjectWiseUnitList();
    const {data:classSubjectAndUnitWiseChapter, classSubjectAndUnitWiseChapterLoading} = useClassSubjectAndUnitWiseChapterList();
	const createTestMutation = useCreateTest(formDataUpload);
	
	useEffect(() => {
        const script = document.createElement("script");
        script.id = 'editor';
        script.src = "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image";
        script.async = true; 
        document.body.appendChild(script);
    },[anyFile]);

	const handleChange = (e) => {
		if(e.target.value != 999){
			history.push(`/teacher/teacher-dashboard/${params.window}/${e.target.value}`)
			setFormData1({...formData1,["class_id"]:e.target.value})
			// formDataUpload.append(['class_id'],e.target.value)
		}
	}

	const handleChangeTest = (e) => {
		if(e.target.value != 999){
			history.push(`/teacher/teacher-dashboard/${params.window}/${params.class_id}/${e.target.value}`)
		}
	}

	const handleChangeUnit = (e) => {
		if(e.target.value != 999){
			history.push(`/teacher/teacher-dashboard/${params.window}/${params.class_id}/${e.target.value}`)
			setFormData1({...formData1,['unit_id']:e.target.value})
			// formDataUpload.append(['unit_id'],e.target.value)
		}
	}

	const setName = (e) => {
		setFormData1({...formData1,['test_name']:e.target.value})
	}

	const handleChapter = (e) => {
		if(e.target.value != 999){//params.test_id contains unit_id
			history.push(`/teacher/teacher-dashboard/${params.window}/${params.class_id}/${params.test_id}/${e.target.value}`)
			setFormData1({...formData1,['chapter_id']:e.target.value})
			// formDataUpload.append(['chapter_id'],e.target.value)
		}
	}
	let totalStudents = 0;
	let formData = '';

	const updateMutation = useUpdateUnitTestList(formData);

	const updateAssignment = async (id, testduration, startDate, testWindow) => {
		if(!params.class_id){
			addToast("Please select a class first.", { appearance: 'error',autoDismiss: true });
			setLoading(false)
		}else{
			await updateMutation.mutate({id:id,testduration:testduration,startDate:startDate,testWindow:testWindow,teacher_id:localStorage.getItem('user_id'),school_id:localStorage.getItem('school_id')},{
				onError: (error) => {
				if(error.response.status == 405){
					alert('Test cant be assigned at this time\n Some test with the same timing already assigned.\n Change test timing and assign again')
					setLoading(false)
				}
				},
				onSuccess:(data)=>{
				setLoading(false)
				}
			});            
		}
	}

	const makePdf = () => {
		const doc = new jsPDF()
		doc.autoTable({ html: '#tableConvert'})
		// doc.autoTable({ html: '#tableConvert'},{columns: ColumnDef[{header: 'ID', dataKey: 'id'}] })
		doc.text("Student Wise Report", 80, 10);
		doc.save('table.pdf')
	}

	useEffect(()=>{
		setSection(params.window)
	},[section])

	const setNumber = (e) => {
		if(!isNaN(parseInt(e.target.value))){
			if(parseInt(e.target.value) > 30){
				addToast("Questions cant be greater than 30.", { appearance: 'error',autoDismiss: true });
				document.getElementById('qNumber').value=""
			}else{
				setAnswers(parseInt(e.target.value))
				setFormData1({...formData1,['total_question']:e.target.value, ['extension']: 'png', ['start_date']:startDate})
				// formDataUpload.append(['total_question'],e.target.value)
				// formDataUpload.append(['extension'],"png")
				// formDataUpload.append(['start_date'],startDate)
			}
		}
	}

	const chooseFiles = (e) => {
		const files = [...e.target.files];
		files.forEach((item, key) => {
			if(docType != item.name.split('.').pop()){
				addToast(`choose ${docType} files only and upload files again`, { appearance: 'error',autoDismiss: true });
				setError('Wrong file type selected');
			}
			setFormData1({...formData1,['files'] : e.target.files[key]})
		})
		setAnyFile(files)
		setBase64FilesArr([])
		files.forEach((item, key) => {
			convert(item,key)
		})
	}

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
						console.log("Html for Docx",resultObject.value)
						setBase64FilesArr(base64FilesArr => [...base64FilesArr, resultObject.value]);
					})
				}
				// alert('File converted to base64 successfuly!\nCheck in Textarea');
			};
		})(f);
		// Read in the image file as a data URL.
		reader.readAsBinaryString(f);
	}

	const selectUploadFileType = (e) => {
		if(e.target.value == "png" || e.target.value == "jpg"){
			setAllowMultiple(true);
		}else{
			setAllowMultiple(false);
		}
		setDocType(e.target.value)
		setFormData1({...formData1,['extension']:e.target.value})
	}
	
	const selectAnswer = (e,id) => {
		setCorrectAnswers([...correctAnswers,{[e.target.name]: e.target.value}])
		// setCorrectAnswers(correctAnswers => [...correctAnswers,{[e.target.name]: e.target.value}])
		// setFormData1({...formData1, ['correctAnswers']:correctAnswers})
	}

	const setWindow = (e) => {
		setFormData1({...formData1,['test_window']:e.target.value})
	}
	
	const setDuration = (e) => {
		setFormData1({...formData1,['test_duration']:e.target.value})
	}

	const createTest = async (e) => {
		e.preventDefault();
		// setFormData1({...formData1, ['correctAnswers']:correctAnswers})
		formDataUpload.append(['correctAnswers'], JSON.stringify(correctAnswers))
		formDataUpload.append(['extension'],formData1.extension)
		formDataUpload.append(['total_question'],formData1.total_question)
		formDataUpload.append(['start_date'],formData1.start_date)
		formDataUpload.append(['chapter_id'],formData1.chapter_id)
		formDataUpload.append(['unit_id'],formData1.unit_id)
		formDataUpload.append(['class_id'],formData1.class_id)
		formDataUpload.append(['test_name'],formData1.test_name)
		formDataUpload.append(['test_window'],formData1.test_window)
		formDataUpload.append(['test_duration'],formData1.test_duration)
		formDataUpload.append(['test_subjects'],JSON.stringify([{'subject_name':localStorage.getItem('subject_name'),subject_id:localStorage.getItem('subject_id')}]))
		// formDataUpload.append(['file'],file)
		for (let i = 0 ; i < anyFile.length ; i++) {
			formDataUpload.append('files', anyFile[i]);
		}
		setLoadingCreate(true)
		await createTestMutation.mutate(formDataUpload,{
			onSuccess: (data, variables, context) => {
				if(data?.data){
					addToast("Test Created Successfully.", { appearance: 'success',autoDismiss: true });
				}
				setLoadingCreate(false)
			},
			onError:(error)=>{
				console.log(error.response.status)
				if(error.response.status == 405){
					alert('Test cant be assigned!\nSome test is assigned for the same time')
				}
			}
		});
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
								<h4 className="card-title rpt1" style={{display: section == "tab0" ? "block" : 'none'}}>Create Tests </h4>
								<h4 className="card-title rpt1" style={{display: section == "tab1" ? "block" : 'none'}}>Assign Tests </h4>
								<h4 className="card-title rpt2" style={{display: section == "tab2" ? "block" : 'none'}}>Student-wise Reports</h4>
								<h4 className="card-title rpt3" style={{display: section == "tab3" ? "block" : 'none'}}>Subject-wise Reports</h4>
								<h4 className="card-title rpt4" style={{display: section == "tab4" ? "block" : 'none'}}>Class-wise Reports</h4>
							</div>
							<div className="card-content">
								<div className="card-body pt-0">
									<p className="rpt1" style={{display: section == "tab0" ? "block" : 'none'}}>Create a Test.</p>
									<p className="rpt1" style={{display: section == "tab1" ? "block" : 'none'}}>Select a class to assign a test to your students.</p>
									<p className="rpt2" style={{display: section == "tab2" ? "block" : 'none'}}>Select the class and test for which you wish to analyze the performance of the students.</p>
									<p className="rpt3" style={{display: section == "tab3" ? "block" : 'none'}}>Select a className and subject to view a detailed report of the subject-wise performance of your className.</p>
									<p className="rpt4" style={{display: section == "tab4" ? "block" : 'none'}}>It will show the overall performance of all the classes. By clicking on 'View', you can examine the detailed performace report of each class.</p>
									<ul className="nav nav-tabs nav-linetriangle no-hover-bg">
										<li className="nav-item">
										<a className={section == "tab0" ? "nav-link active" : 'nav-link'} id="base-tab1" data-toggle="tab" aria-controls="tab0" href="#tab0" aria-expanded="true" onClick={()=>{changeSection('tab0')}}> Create Test  </a>
										</li>
										<li className="nav-item">
										<a className={section == "tab1" ? "nav-link active" : 'nav-link'} id="base-tab1" data-toggle="tab" aria-controls="tab1" href="#tab1" aria-expanded="true" onClick={()=>{changeSection('tab1')}}> Assign Test  </a>
										</li>
										<li className="nav-item">
										<a className={section == "tab2" ? "nav-link active" : 'nav-link'} id="base-tab2" data-toggle="tab" aria-controls="tab2" href="#tab2" aria-expanded="false" onClick={()=>{changeSection('tab2')}}>Student-wise Reports  </a>
										</li>
										{/* <li className="nav-item">
										<a className={section == "tab3" ? "nav-link active" : 'nav-link'} id="base-tab3" data-toggle="tab" aria-controls="tab3" href="#tab3" aria-expanded="false" onClick={()=>{changeSection('tab3')}}>Subject-wise Reports  </a>
										</li> */}
										<li className="nav-item">
										<a className={section == "tab4" ? "nav-link active" : 'nav-link'} id="base-tab4" data-toggle="tab" aria-controls="tab4" href="#tab4" aria-expanded="false" onClick={()=>{changeSection('tab4')}}>Class-wise Reports  </a>
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
																			<option value="999">--Select Class-- </option>
																			{classes && classes.map((item,key)=>{
																			return(
																				<option value={item.class_id} data-class_name={item.class_name} key={key} >{item.class_name + ' th'} </option>
																			)
																			})}
																		</select>
																	</div>
																</div>
																</div>
															</form>
															</div>
															</div>
										<div className="row">
											{unitTests && unitTests.map(test =>{
												return(<>
													<AssignmentCard test={test} fun={(startDate, testWindow)=> {setLoading(true); updateAssignment(test.assign_table_id, test.test_duration, startDate, testWindow)}} loading={loading}/>
												</>)
											})}
										</div>
										</div>
										<div className={section == "tab0" ? "tab-pane container-fluid active" : 'tab-pane container-fluid'} id="tab0" aria-labelledby="base-tab0">
										<div className="row mb-5 pt-1">
											{/* <div className="col-md-6">
												<h4 className="card-title"><strong> Create Test </strong></h4>
											</div> */}
											<div className="col-md-12">
												<form className="form" encType='multipart/form-data' onSubmit={createTest}>
													<div className="form-body">
													<div className="row">
														<div className="col-md-3">
															<h4 className="card-title"><strong>Create Test</strong></h4>
															<div className="form-group col-md-12 mb-1">
																<input type="text" className="form-control" placeholder="Test name" onChange={setName}/> 
															</div>
															<div className="form-group col-md-12 mb-1">
																<select className="form-control" onChange={handleChange} value={params.class_id ? params.class_id : 9999}>
																<option value="999">--Select Class-- </option>
																{classes && classes.map((item,key)=>{
																	return(
																		<option value={item.class_id} data-class_name={item.class_name} key={key} >{item.class_name + ' th'} </option>
																	)
																})}
																</select>
															</div> 
															<div className="form-group col-md-12 mb-1">
																{/* test_id here contains unit_id */}
																<select className="form-control" onChange={handleChangeUnit} value={params.test_id ? params.test_id : 9999}>
																<option value="999">--Select Unit-- </option>
																{classAndSubjectWiseUnit && classAndSubjectWiseUnit.map((it,key)=>{
																	return(
																			<option value={it._id}  key={key} >{it.unit_name} </option>
																		)
																})}
																</select>
															</div>
														
															<div className="form-group col-md-12 mb-1">
																<select className="form-control" onChange={handleChapter}>
																<option value="">--Select Chapter-- </option>
																{classSubjectAndUnitWiseChapter && classSubjectAndUnitWiseChapter.map((it,key)=>{
																	return(
																			<option value={it._id}  key={key} >{it.chapter_name} </option>
																		)
																})}
																</select>
															</div>
														
															<div className="form-group col-md-12 mb-1"> 
																<input type="number" className="form-control" id="qNumber" placeholder="Number of Question" onChange={setNumber}/> 
															</div>
														
															<div className="form-group choose_file col-md-12 mb-1">
																<div className="input-group mb-0">
																	<div className="input-group-prepend">
																		<span className="input-group-text p-0" id="basic-addon1">
																			<select className="form-control" onChange={selectUploadFileType}>
																				<option value="png">.png</option>
																				<option value="jpg">.jpg</option>
																				<option value="pdf">.pdf</option>
																				<option value="docx">.docx</option>
																			</select>
																		</span>
																		
																	</div>
																	
																	<input type="file" name="files" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" multiple={allowMultiple}  onChange={chooseFiles}/>

																</div>   
																<small id="passwordHelp" className="text-danger">
																		{error && error}
																</small>
															</div>
															<div className="form-group col-md-12 mb-1"> 
																<input type="number" className="form-control" placeholder="Test Duration" onChange={setDuration}/> 
															</div>
															<div className="form-group col-md-12 mb-1"> 
																<select className="form-control" onChange={setWindow}>
																	<option value="30">30 minutes</option>
																	<option value="60">1 hour</option>
																	<option value="90">1 hour 30 min</option>
																	<option value="120">2 hour</option>
																	<option value="150">2 hours 30 min</option>
																</select>
															</div>
															<div className="form-group col-md-12 mb-1 date_bg1">
																<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} isClearable showTimeSelect dateFormat="MM/d/yyyy h:mm aa" />
															</div>
															<div className="form-group col-md-12 mb-1">
																<button className="btn btnsavetext1">{loadingCreate ? "loading" : "Save Test"}</button>
																{/* <button className="btn btnsavetext2 ml-1">{"Cancel"}</button> */}
															</div>
														</div>

														<div className="col-md-3">
															<h4 className="card-title"><strong>Choose Anwers</strong></h4>
															<div className="form-group col-md-12 mb-1">
																{[...Array(answers)].map((e, i) => <ul className="create_title1" key={i}>
																		<label>{i+1}.</label> 
																		<li><input type="radio" id={`check-a`} name={`ans${i+1}`} value="A" onChange={(e)=>{selectAnswer(e,`check-a`)}}/> <label htmlFor="check-a"> A</label></li>
																		<li><input type="radio" id={`check-b`} name={`ans${i+1}`} value="B" onChange={(e)=>{selectAnswer(e,`check-b`)}}/> <label htmlFor="check-b"> B</label></li>
																		<li><input type="radio" id={`check-c`} name={`ans${i+1}`} value="C" onChange={(e)=>{selectAnswer(e,`check-c`)}}/> <label htmlFor="check-c"> C</label></li>
																		<li><input type="radio" id={`check-d`} name={`ans${i+1}`} value="D" onChange={(e)=>{selectAnswer(e,`check-d`)}}/> <label htmlFor="check-d"> D</label></li>
																</ul>
																)}                                                              
															</div>
															{/* <div className="form-group col-md-12 mb-1">
															</div> */}
														</div>
														<div className="col-md-6">
															<h4 className="card-title"><strong>Uploaded Questions</strong></h4>
															
																{anyFile.map((item, key)=>{
																	return (docType == "png" || docType == "jpg" || docType == "pdf") ? 
																		<span key={key}>
																			<iframe src={base64FilesArr[key]} height="250" width="100%" className="fitscreen"/>
																		</span>
																		: (docType == "docx") ? 
																		<span key={key}>
																			<div style={{fontSize :"20px"}} dangerouslySetInnerHTML={{ __html: base64FilesArr[key] }}/>
																			<iframe src={`data:text/html;charset=utf-8,%3Chtml%3E%3Cbody%3E${base64FilesArr[key]}%3C/body%3E%3C/html%3E`} height="250" width="100%"></iframe>
																		</span>
																		:
																		<></>
																	})
																}
														</div>
													</div> 
													</div>
												</form>
											</div>
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
																		<select className="form-control"  onChange={handleChange} value={params.class_id ? params.class_id : 999}>
																			<option value="999">--Select ClassName-- </option>
																			{classes && classes.map((item,key)=>{
																			return(
																				<option value={item.class_id} data-class_name={item.class_name} key={key}>{item.class_name + ' th'} </option>
																			)
																			})}
																		</select>
																	</div>
																	<div className="form-group col-md-2 mb-2">
																		{/* <!-- <label className="">Select Section </label>--> */}
																		<select className="form-control" onChange={handleChangeTest} value={params.test_id ? params.test_id : 999}>
																			<option value="999">--Select Test-- </option>
																			{assignedTests && assignedTests.map((item,key)=>{
																			return(
																				<option value={item?.test_id} key={key}>{item?.test_name}</option>
																			)
																			})}
																		</select>
																	</div>
																</div>
																</div>
															</form>
														</div>
													</div>
													</div>
													<div className="table-responsive mt-2 thr_lbl_show">
													<table id="tableConvert" className="table table-striped table-bordered zero-configuration">
														<thead>
															<tr>
																<th>Student Name </th>
																<th>Time Taken</th>
																<th>Marks</th>
																<th>Percentage</th>
																<th>Action</th>
															</tr>
														</thead>
														<tbody>
															{studentWiseReport && studentWiseReport.map((item,key)=>{
																return(
																<tr key={key}>
																	<td className="text-truncate">
																		<span>{item.student_name}</span>
																	</td>
																	<td>{item && item.time_taken && new Date(item?.time_taken * 1000)?.toISOString()?.substr(11, 8)} </td>
																	<td>{item.correctAnswers}/{item.totalMarks} </td>
																	<td width="10%">{item.cScorePercentage?.toFixed(2)} %  </td>
																	<td><Link to={`/teacher/teacher-dashboard/${params.class_id}/${params.test_id}/${item.student_id}`}>View</Link></td>
																</tr>
																)
																})}
															</tbody>
													</table>
													</div>
													{singleStudentTests && <CumilativeStudent score={singleStudentTests} heading={singleStudentTests[0]?.student_name}/>}
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
																		<select className="form-control"  onChange={handleChange} value={params.class_id ? params.class_id : 999}>
																			<option value="999">--Select ClassName-- </option>
																			{classes && classes.map((item,key)=>{
																			return(
																				<option value={item.class_id} data-class_name={item.class_name} key={key}>{item.class_name + ' th'} </option>
																			)
																			})}
																		</select>
																	</div>
																
																</div>
																</div>
															</form>
														</div>
													</div>
													</div>
													<div className="table-responsive first_lbl_show" >
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
															
														</tbody>
													</table>
													</div>
													<div className="table-responsive mt-2 second_lbl_show" >
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
													<strong>Class-wise Reports</strong>
													</div>
													<div className="card-content collapse show">
													<div className="">
														<div className="table-responsive">
															<table className="table table-striped table-bordered ">
																<thead>
																<tr>
																	<th>S.No</th>
																	<th>ClassName	</th>
																	<th>No. of Students</th>
																	{/* <th>Section</th> */}
																	<th>Details</th>
																</tr>
																</thead>
																<tbody>
																{classWise && classWise.map((item,key)=>{
																	totalStudents = totalStudents + item.student_count;
																	return(
																		<tr key={key}>
																			<td>{key+1}</td>
																			<td>{item.class_name}</td>
																			<td>{item.student_count}</td>
																			{/* <td>{item.section + ' ,'}</td> */}
																			{/* <td>02/05/2021</td> */}
																			<td><Link to={`/teacher/teacher-class-report/${item.class_id}/${item.class_name}`}>View</Link></td>
																		</tr>
																	)
																})}
																
																</tbody>
																<tfoot>
																<tr>
																	<th>Total</th>
																	<th></th>
																	<th>{totalStudents} </th>
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