import React, { useEffect, useState} from 'react';
import DatePicker from "react-datepicker";

export default function AssignmentCard({test, key, fun, loading}){
    const [startDate, setStartDate] = useState(new Date());
    const [testWindow, setTestWindow] = useState();
    
    const enterTestWindow = (e) => {
            setTestWindow(e.target.value);
    }
    
    useEffect(()=>{
        setStartDate(new Date(test?.start_date))
    },[test])
    
    return(<>
            <div className="col-md-6 text1_w_dfine">
                <div className="card pull-up attempt_text att_border">
                    <div className="card-header">
                        <div className="float-right">
                        <a href="#" className="btn"><b>Test Name: </b>{test?.test_name}</a>
                        </div>
                        <div className="float-left date_one1">
                            <a href="#" className="">{test?.start_date?.substring(10,0)}</a>
                            <div className="mb-0 pt-2 live_text">
                                <ul>
                                    <li>
                                        {/* <a href="#">live</a> */}
                                        </li><li><i className="fa fa-clock">
                                            </i> {test?.test_duration} MIN</li></ul></div>
                        </div>
                    </div>
                    <div className="card-content live_text">
                    <div className="pb-1 card-body text_set_attemp container">
                        <div className="row">
                            {/* <div className="col-md-6 mb-3">
                                <ul>
                                <li><a href="#">live</a></li>
                                <li><i className="fa fa-clock"></i> {test?.test_duration} MIN {test?.subject_name}</li>
                                </ul>
                            </div> */}
                            <div className="col-md-10 datetime">
                            <ul>
                                <li className="pl-0">
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} isClearable showTimeSelect dateFormat="MM/d/yyyy h:mm aa"/></li>
                                <li><input type="text" name="test-window" defaultValue={test?.test_window} id="test-window" placeholder="test-window enter in min" onChange={enterTestWindow}/>
                               <label className="small">Test window should be greater than test duration</label>
                                </li>
                            </ul>
                            
                            </div>
                            
                           

                            <div className="col-md-2 text-right">
                                {/* <a href="#" className="btn btn-outline-info mr-1" data-toggle="modal" data-target="#syllabus_modal"><i className="fa fa-eye"></i> SYLLABUS</a> */}
                                <button href="#" className="btn btn-info" disabled={loading}  onClick={()=>{fun(startDate, testWindow)}}> 
                                    {loading ? "Assigning" :"Assign"}
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
          
        </>
    )
}