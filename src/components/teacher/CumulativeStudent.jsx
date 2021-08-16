export default function CumilativeStudent({score, heading}){
    let averageResult = 0;
    let totalMarks = 0;
    return(
        <>
                <div className="table-responsive col-md-12 pl-0 pr-0 mt-2">
                <h4 className="pb-1"><strong>{heading && heading}</strong></h4>
                    <table id="tableConvertCumulative" className="table table-striped table-bordered "> 
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
                                        <td>{item?.marksScored?.toFixed(2)}</td>
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
        </>
    )
}