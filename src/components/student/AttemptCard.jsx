import React from 'react';
import { Link } from 'react-router-dom'
export default function AttemptCard({test, key, fun}){

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
                alert("Test is Live! you can't cancel the test now.")
                fun();
            }else{
                alert('Test has Expired');
            }
        }else{
            alert("Test hasn't started yet")
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
                            <a href="#" className="">{test?.start_date?.substring(10,0)}</a><br/>
                            Starts at:<a href="#" className=""> { d.getHours()+" : "+ d.getMinutes()+" : "+d.getSeconds()} </a>hrs<br/>
                            Test Window:<a href="#" className=""> {endsIN.getHours()+" : "+ endsIN.getMinutes()+" : "+endsIN.getSeconds()} </a>min
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
                                    <Link to="/student/student-attempt"></Link><a href="#" className="btn btn-info" onClick={()=>{attempt(test)}}> ATTEMPT</a> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}