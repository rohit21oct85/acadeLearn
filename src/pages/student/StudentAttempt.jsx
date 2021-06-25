import Head from '../../components/common/Head'
import HeaderNav from '../../components/common/HeaderNav'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useHistory, useParams, useLocation} from 'react-router-dom'
import useRandomQuestion from '../../pages/student/hooks/useRandomQuestion'
import useQuestionList from '../../pages/student/hooks/useQuestionList'
import useUpdateAttemptTest from '../../pages/student/hooks/useUpdateAttemptTest'

export default function StudentAttempt(){
    const history = useHistory();
    const params  = useParams();
    const location = useLocation();

	const [checked, setChecked] = useState('');
	const [counts, setCounts] = useState(0);
	const [attemptId, setAttemptId] = useState();

	const [formData, setFormData] = useState('');
	let question_id = "";
	const set = (e, option,id) => {
		setFormData({...formData, ['answer'] : e.target.value, ['option']: option, question_id:id});		
	}

	useEffect(() => {
        const script = document.createElement("script");
        script.id = 'editor';
        script.src = "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image";
        script.async = true;
        document.body.appendChild(script);
    },[attemptId])

	useEffect(()=>{
		let search = window.location.search;
		let query = new URLSearchParams(search);
		let foo = query.get('query');
		if(foo){
			localStorage.removeItem('COUNTER');
			history.push(`/student/student-attempt/${params.class_id}/${params.class_name}/${params.subject_id}/${params.test_id}`);
		}
		timer()
	},[attemptId])

	var count = 0 ;
	const {data: question, questionLoading} = useRandomQuestion();
	const {data: questions, questionsLoading} = useQuestionList();
	const attempt = useUpdateAttemptTest(formData);
	// const updateMutation = useUpdateAttemptTest(formData);

	useEffect(()=>{
		// countdown();
		let count = 0;

      	questions && questions.map((item,key) => {
			item.answer && count++
		})
		setCounts(count)
	},[questions])

	const saveAnswerAndNext = async () => {
		let search = window.location.search;
		let query = new URLSearchParams(search);
		let foo = query.get('query');
		if(foo){
			history.push(`/student/student-attempt/${params.class_id}/${params.class_name}/${params.subject_id}/${params.test_id}`);
		}
		
		if(formData.answer == undefined){
			alert('select an answer')
			return;
		}
		await attempt.mutate(formData,{
			onSuccess: (data, variables, context) => {
				if(data?.data){
					setAttemptId(data?.data?.attemptId)
				}
			},
		});

		var ele = document.getElementsByName("option");
		setFormData({})
		for(var i=0;i<ele.length;i++)
			ele[i].checked = false;
		if(counts == questions?.length-1){
			history.push(`/student/student-result/${params.class_id}/${params.class_name}/${params.subject_id}/${params.test_id}/${attemptId}`);
      	}
	}

	// function countdown() {
	// 	var seconds = 60;
	// 	function tick() {
	// 		var counter = document.getElementById("timer");
	// 		seconds--;
	// 		if(counter){
	// 			counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
	// 			if( seconds > 0 ) {
	// 				setTimeout(tick, 1000);
	// 			} else {
	// 				alert("Game over");
	// 			}
	// 		}
	// 	}
	// 	tick();
	// }

	function timer() {
		const time = localStorage.getItem('COUNTER');
		var sec = time != 0 && time != undefined && time != null ? time : 0;
		function tick() {
			var counter = document.getElementById("timer");
			sec++;
			localStorage.setItem('COUNTER', sec);
			if(counter){
				counter.innerHTML = "0:" + (sec < 10 ? "0" : "") + String(sec);
				// if( sec > 0 ) {
					setTimeout(tick, 1000);
				// } else {
					// alert("Game over");
				// }
			}
		}
		tick();
	}
	
    return(
        <>
            <Head/>
            <HeaderNav/>
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
                                       <div className="timer-s">
                                       <span className="test-end">Ends in </span><span className="" id="timer">1:00</span>
                                    </div>
                                    </div>
                                    <div className="col-md-8">
                  <div className="job-info job-widget">
                     <h3 className="job-title">Research Associate - Assessment Mathematics - SME Mathematics</h3>
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
                                 {questionLoading ? <span>loading. ..</span> : <div className="question bg-Not-select p-2 border-bottom">
                                    <div className="d-flex flex-row question-title">
                                       <span className="text-danger q_nsekected">Q.</span>
                                       <h5 className="ml-3"><div dangerouslySetInnerHTML={{ __html: question?.question }}/></h5>
                                    </div>
                                    <div className="ans ml-2">
                                       <label className="radio"> <input type="radio" name="option" value={question?.option_a} onChange={(e)=>{set(e,"option_a",question?._id)}}/> <span><div dangerouslySetInnerHTML={{ __html: question?.option_a }}/></span> </label>
                                    </div>
                                    <div className="ans ml-2">
                                       <label className="radio"> <input type="radio" name="option" value={question?.option_b} onChange={(e)=>{set(e,"option_b",question?._id)}}/> <span><div dangerouslySetInnerHTML={{ __html: question?.option_b }}/></span>
                                       </label>
                                    </div>
                                    <div className="ans ml-2">
                                       <label className="radio"> <input type="radio" name="option" value={question?.option_c} onChange={(e)=>{set(e,"option_c",question?._id)}}/> <span><div dangerouslySetInnerHTML={{ __html: question?.option_c }}/></span>
                                       </label>
                                    </div>
                                    <div className="ans ml-2">
                                       <label className="radio"> <input type="radio" name="option" value={question?.option_d} onChange={(e)=>{set(e,"option_d",question?._id)}}/> <span><div dangerouslySetInnerHTML={{ __html: question?.option_d }}/></span>
                                       </label>
                                    </div>
                                 </div>}
                                 <div className="p-2 bg-Not-select">
                                 <div className="row"> 
                                 <div className="col-md-12 text-right">
                                 <button className="btn nextqus_btn" type="button" onClick={()=>{saveAnswerAndNext(question?._id)}}>{!questionLoading ? counts == questions?.length-1 ? "Submit" : "Next" : "loading. .."}<i className="fa fa-angle-right ml-2"></i></button></div></div>
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
							{/* if(!item.answer){
									return(
										<li className="not-attem" key={key}>
											<a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">{key + 1}</a>
										</li>
									)
								} */}
							{/* <li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">2</a></li>
							<li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">3</a></li>
							<li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">4</a></li>
							<li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">5</a></li>
							<li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">6</a></li>
							<li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Absent">7</a></li>
							<li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">8</a></li>
							<li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">9</a></li>
							<li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">10</a></li>
							<li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">11</a></li>
							<li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">12</a></li>
							<li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">13</a></li>
							<li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">14</a></li>
							<li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">15</a></li>
							<li className=""><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">16</a></li>
							<li className=""><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">17</a></li>
							<li className=""><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">18</a></li>
							<li className=""><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">19</a></li>
							<li className=""><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">20</a></li> */}
                        </ul>
                     </div>
                     <div className="Quiz_reviewLegend">
                        <ol>
							<li> <span className="Quiz_reviewColor" style={{backgroundColor: "#00ab54"}}></span> <span className="Quiz_reviewText">Answered</span></li>
							<li> <span className="Quiz_reviewColor" style={{backgroundColor: "#f62d51"}}></span> <span className="Quiz_reviewText">Not Attempt</span></li>
                        </ol>
                        <div style={{clear: "both"}}></div>
                     </div>
                    {/* <!-- <div className="info-list text-center">
                        <a className="app-ends" href="#">Application ends in 2d 7h 6m</a>
                     </div>--> */}
                     {/* <div className="info-list text-center">
                        <a href="MCQ-question-submit.php"> <button className="btn btn-primary border-success align-items-center btn-success submit-sd" type="button">Submit</button></a>
                     </div> */}
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