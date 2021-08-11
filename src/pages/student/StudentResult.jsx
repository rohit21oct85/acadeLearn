import Head from '../../components/common/Head'
import HeaderNav from '../../components/common/HeaderNav'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import {useParams, Link, useHistory} from 'react-router-dom'
import useFetchResult from './hooks/useFetchResults'
import { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications';
import useUpdateAttemptTest from './hooks/useUpdateAttemptTestOffline'
import useCreateUploadTest from './hooks/useCreateUploadTest'

export default function StudentResult(){
    const params  = useParams();
    const history = useHistory();
    const [time,  setTime] = useState();
    // const [formDataOffline, setFormDataOffline] = useState(null);
    let formDataOffline = {};
    let formData
    const { addToast } = useToasts();

    const {data: result, resultLoading} = useFetchResult();
    const attempt = useUpdateAttemptTest(formDataOffline);
    const attemptUpload = useCreateUploadTest(formData);

    useEffect(()=>{
        localStorage.removeItem('test_test_duration');
        localStorage.removeItem('test_test_window');
        localStorage.removeItem('test_test_time');
        localStorage.removeItem('test_test_attempt_time');
        localStorage.removeItem('tabSwitchCount');
        // const questions = JSON.parse(localStorage.getItem('questions'));
        // const questionPaper = JSON.parse(localStorage.getItem('questionPaper'));
        // const time_taken = JSON.parse(localStorage.getItem('COUNTER'));
        // // setFormDataOffline((formDataOffline) => ({...formDataOffline,['completion_status'] : "completed", ['questions']:questions, ['attemptId'] : localStorage.getItem('attemptIdUploadTest'), ['time_taken']:time_taken}))
        // if(params.test_type == "upload-test"){
        //     formData = JSON.parse(localStorage.getItem('uploadData'));
        //     saveQuestionPaper()

        //     const saveQuestionPaper = async () => {
        //         await attemptUpload.mutate(formData, {
        //             onSuccess: (data, variables, context) => {
        //                 if(data?.data){
        //                     localStorage.removeItem("questionPaper");
        //                     localStorage.removeItem("uploadData");
        //                     localStorage.removeItem('COUNTER');
        //                 }
        //             },
        //         });
        //     }
        // }else{
        //     formDataOffline.completion_status = "completed";
        //     formDataOffline.questions = questions;
        //     formDataOffline.time_taken = time_taken;
        //     formDataOffline.attemptId = localStorage.getItem('attemptIdUploadTest');    
            
        //     const saveQuestion = async ()=>{
        //         await attempt.mutate(formDataOffline,{
        //             onSuccess: (data, variables, context) => {
        //                 if(data?.data){
        //                     localStorage.removeItem("questions");
        //                     localStorage.removeItem('COUNTER');
        //                 }
        //             },
        //         });
        //     }
        //     if(navigator.onLine){
        //         if(result && result.end_time){
        //             setTime(new Date(result.end_time))
        //         }
        //         if(localStorage.getItem('questions') != null){
        //             saveQuestion()
        //         }
        //     }else{
        //         addToast('Kindly Connect to the internet to view your result', { appearance: 'error',autoDismiss: true });
        //     }
        // }       
        if(result && result.end_time){
            setTime(new Date(result.end_time))
        } 
    },[result])
    
    useEffect(() => {
		function toggleFullScreen() {
			if (!document.fullscreenElement) {
				// document.documentElement.requestFullscreen();
			} else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
			}
		}
		toggleFullScreen()
	});
    
    const viewDetails = (time) => {
        const currentTime = new Date();
        const endTime = new Date(time);
        if(currentTime > endTime){
            history.push(`/student/student-last-report/${params.class_id}/${params.class_name}/${params.attempt_id}/${params.test_type}`)
        }else{
            addToast('Test Results Can only be Viewed after the test time has Expired', { appearance: 'error',autoDismiss: true });
        }
    }

    // useEffect(()=>{
        
    // },[result])

    return(
        <>
        <Head/>
        <HeaderNav/>
        {/* {navigator.onLine == false ? <span>Connect to the internet</span> :  */}
        <>
        <div className="app-content content mt-5">
            <div className="content-overlay"></div>
            <div className="content-wrapper"> 
                <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-xl-12 col-lg-12 mt-2">
                        <div className="card">
                        <div className="card-header">
                            <h4 className="card-title Scores">Score </h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body pt-0"> 
                            <div className="row">
                                <div className="col-md-6 ml-auto mr-auto">
                                <div className="card pull-up attempt_text">
                                    <div className="table-responsive">
                                    <table className="table table-striped table-bordered ">
                                        <tbody>
                                        {result == undefined ? "Loading ..." :
                                        <>
                                        <tr>
                                            <th colSpan="2" className="head-result">Result</th>
                                        </tr>
                                        
                                        <tr>
                                                <th>Total Questions </th>
                                                <td>{result?.totalQuestions}</td>
                                            </tr>
                                            <tr>
                                                <th>Attempted Questions </th>
                                                <td>{result?.attemptedQuestions}</td>
                                            </tr>
                                            <tr>
                                                <th>Score </th>
                                                <td> {result?.correctAnswers * result?.marksPerQuestion}/{result?.total_marks}</td>
                                            </tr>
                                            <tr>
                                                <th className="head-result">Result can be viewed after :</th>
                                                <td>{time && time.toLocaleTimeString()}</td>
                                            </tr>
                                            <tr>
                                                <th className="percent">Percentage </th>
                                                <th className="percent"> {((result?.correctAnswers/result?.totalQuestions)*100).toFixed(2)} %</th>
                                            </tr>
                                            </>
                                            }
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                </div>
                                <div className="col-md-12 text-center"> 
                                    <Link to={`/student/student-dashboard/${params.class_id}/${params.class_name}`} className="btn btn-info"> Go To Dashboard</Link>
                                    <button className="btn btn-info ml-1" onClick={()=>{viewDetails(result?.end_time)}}> View Details</button>
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
        {/* } */}
        <Footer/>
        <Foot/>
        </>
    )
}