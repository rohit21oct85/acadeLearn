import React from 'react';
import { Link } from 'react-router-dom'
export default function AttemptCard({test, key, fun}){
    return(<>
            <div className="col-md-6">
                <div className="card pull-up attempt_text">
                    <div className="card-header">
                        <div className="float-left">
                            <a href="#" className="btn"><b>Test Name: </b>{test?.test_name}</a>
                        </div>
                        <div className="float-right">
                            <a href="#" className="btn btn-info">{test?.test_date?.substring(10,0)}</a>
                        </div>
                        
                    </div>
                    <div className="card-content live_text">
                        <div className="card-body text_set_attemp container">
                            <div className="row">
                                <div className="col-md-6">
                                    <ul>
                                    <li><a href="#">live</a></li>
                                    <li><i className="fa fa-clock"></i>{test?.test_duration} MIN {test?.subject_name}</li>
                                    </ul>
                                </div>
                                <div className="col-md-6 text-right">
                                    {/* <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> SYLLABUS</a> */}
                                    <Link to="/student/student-attempt"></Link><a href="#" className="btn btn-info" onClick={()=>{fun()}}> ATTEMPT</a> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}