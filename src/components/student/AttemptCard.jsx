import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import {formatAMPM} from '../../utils/utils'
import { useToasts } from 'react-toast-notifications';

export default function AttemptCard({test, isLoading, key, fun}){
    const [disabled, setDisabled] = useState();
    const { addToast } = useToasts(false);

    useEffect(()=>{
        if(isLoading){
            setDisabled(true)
        }else{
            setDisabled(false)
        }
    },[isLoading])

    let d = new Date(test?.start_date)
    let endsIN = new Date(test?.start_date)
    endsIN.setMinutes( endsIN.getMinutes() + test.test_window );
    
    const attempt = (data) => {
        var current_time = new Date();
        var allowed_time = new Date(data.start_date);
        var start_time = new Date(data.start_date);
        allowed_time.setMinutes( allowed_time.getMinutes() + data.test_window );
        if(current_time > start_time){
            if(current_time < allowed_time){
                addToast("Please wait while your test is being  prepared. you will redirected automatically", { appearance: 'info',autoDismiss: true });
                fun();
            }else{
                addToast("Test has Expired.", { appearance: 'error',autoDismiss: true });
            }
        }else{
            addToast("Test hasn't started yet.", { appearance: 'error',autoDismiss: true });
        }
        
    }
    return(<>
            <div className="col-md-6">
                <div className="card pull-up attempt_text">
                    <div className="card-header">
                        <div className="float-left">
                            <a href="#" className="btn"><b>Test Name: </b>{test?.test_name}</a>
                        </div>
                        <div className="float-right">
                            Date: <a href="#" className="">{test?.start_date?.substring(10,0)}</a><br/>
                            Starts at:<a href="#" className=""> { d.getHours()+" : "+ d.getMinutes()+" : "+d.getSeconds()} </a>hrs<br/>
                            Ends at:<a href="#" className=""> {endsIN.getHours()+" : "+ endsIN.getMinutes()+" : "+endsIN.getSeconds()} </a>hrs
                        </div>
                    </div>
                    <div className="card-content live_text">
                        <div className="card-body text_set_attemp container">
                            <div className="row">
                                <div className="col-md-6">
                                    <ul>
                                    {/* <li><a href="#">live</a></li> */}
                                    <li><i className="fa fa-clock"></i> { test?.test_duration} MIN {test?.subject_name}</li>
                                    </ul>
                                </div>
                                <div className="col-md-6 text-right">
                                    {/* <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> SYLLABUS</a> */}
                                    <Link to="/student/student-attempt"></Link><button href="#" className="btn btn-info" style={{color:"white"}} disabled={disabled} onClick={()=>{attempt(test)}}>{isLoading ? "Loading..." :"ATTEMPT"} </button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}