export default function CumilativeStudent({score, heading}){
    let averageResult = 0;
    let totalMarks = 0;
    return(
        <>
            {/* <div className="col-md-6">
                <div className="card pull-up attempt_text">
                    <div className="card-header">
                        <div className="float-left">
                        <a href="#" className="">07 May, 2021</a>
                        </div>
                    </div>
                    <div className="card-content live_text">
                        <div className="card-body text_set_attemp container">
                        <div className="row">
                            <div className="col-md-6">
                                <ul>
                                    <li><a href="#">Previous Tests</a></li>
                                    <li><i className="fa fa-clock"></i> 45 MIN Mathematics</li>
                                </ul>
                            </div>
                            <div className="col-md-6 text-right">
                                <!-- <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> SYLLABUS</a>-->
                                <a href="#" className="btn btn-info"> Score: {score?.marksScored+"/"+score?.totalMarks} <i className="fa fa-angle-double-right"></i> { score?.cScorePercentage } %</a> 
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <div class="row">  */}
            {/* <div className="card pull-up attempt_text pt-1"> */}
                <div className="table-responsive col-md-12 pl-0 pr-0 mt-2">
                <h4 className="pb-1"><strong>{heading && heading}</strong></h4>
                    <table className="table table-striped table-bordered "> 
                        <thead>
                            <tr>
                                <th>Test Name </th>
                                <th>Attempted test date </th>
                                <th> Total Time Taken   </th>
                                <th> Obtained Marks </th>
                                <th>Total Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {score && score?.map((item,key)=>{
                                averageResult =  averageResult + item.marksScored
                                totalMarks = totalMarks + item.totalMarks
                                return(
                                    <tr key={key}>
                                        <th>{item.test_name}</th>
                                        <th>{item?.created_at?.substr(0,10)} </th>
                                        <td> 
                                            {item.time_taken && new Date(item?.time_taken * 1000)?.toISOString()?.substr(11, 8)} 
                                        </td>
                                        <td> {item?.marksScored}   </td>
                                        <td>{item?.totalMarks}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                            <th colSpan="3">Average score</th>  
                                <th> {(averageResult/score?.length)?.toFixed(2)} </th>
                                <th>{totalMarks}</th>
                            </tr>
                            <tr>
                            <th colSpan="3">Average in percentage</th>  
                                <th> {(averageResult/totalMarks * 100)?.toFixed(2)} %   </th>
                                <th>100 %</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            {/* </div> */}
            {/* </div> */}
        </>
    )
}