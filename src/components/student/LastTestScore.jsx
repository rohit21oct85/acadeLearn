export default function LastTestScore({score, fun}){
    return(
        <>
            <div className="col-md-6">
                <div className="card pull-up attempt_text">
                    <div className="card-header">
                        <div className="float-left">
                        <a href="#" className="">{score?.create_at?.substr(0,10)}</a>
                        </div>
                        <div className="float-right">
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="card-body py-0 text_set_attemp">
                        <div className="d-flex justify-content-between lh-condensed">
                            <div className="order-details">
                                <h4 className="my-0">Total Score </h4>
                                <p>{score?.correctAnswers}/{score?.totalQuestions}</p>
                            </div>
                            <div className="order-details">
                                <h4 className="my-0">Total Time Taken</h4>
                                <p className="text-muted">{new Date(score?.time_taken * 1000)?.toISOString()?.substr(11, 8)}</p>
                            </div>
                            <div className="order-details">
                                <a href="#" className="btn btn-outline-info mr-1" onClick={()=>fun(score._id)}><i className="fa fa-eye"></i> View full result</a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}