import React, {ReactFragment} from 'react';

export default function AssignmentCard({test, key}){
    return(<>
            <div className="col-md-6 text1_w_dfine">
                <div className="card pull-up attempt_text">
                    <div className="card-header">
                    <div className="float-left">
                        <a href="#" className="btn btn-info">{test.test_date.substring(10,0)}</a>
                    </div>
                    </div>
                    <div className="card-content live_text">
                    <div className="card-body text_set_attemp container">
                        <div className="row">
                            <div className="col-md-6">
                                <ul>
                                <li><a href="#">live</a></li>
                                <li><i className="fa fa-clock"></i> {test.test_duration} MIN {test.subject_name}</li>
                                </ul>
                            </div>
                            <div className="col-md-6 text-right">
                                <a href="#" className="btn btn-outline-info mr-1" data-toggle="modal" data-target="#syllabus_modal"><i className="fa fa-eye"></i> SYLLABUS</a>
                                <a href="#" className="btn btn-info"> ASSIGN</a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            {/* <div className="col-md-6 text1_w_dfine">
                <div className="card pull-up attempt_text curser_not_allow">
                    <div className="card-header">
                        <div className="float-left">
                            <a href="#" className="btn btn-info">07 May, 2021</a>
                            <h4><span className="hding_text1">Full Test -2-SCI</span> <i className="fa fa-lock lock_icon"></i></h4>
                        </div>
                        <div className="float-right">
                            <div className="countdown"></div>
                        </div>
                    </div>
                    <div className="card-content live_text">
                        <div className="card-body text_set_attemp container">
                            <div className="row">
                                <div className="col-md-8">
                                <ul>
                                    <li><a href="#">Upcoming</a></li>
                                    <li className="one_linetext"><i className="fa fa-clock"></i> 120 MIN NTSE & Fundamentals of Engineering and Medical-2022</li>
                                </ul>
                                </div>
                                <div className="col-md-4 text-right">
                                <a href="#" className="btn btn-info attepts_text"> ASSIGN</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}