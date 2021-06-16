export default function LastTestScore(){
    return(
        <>
            <div className="col-md-6">
                <div className="card pull-up attempt_text">
                    <div className="card-header">
                        <div className="float-left">
                        <a href="#" className="btn btn-info">07 May, 2021</a>
                        </div>
                        <div className="float-right">
                        </div>
                    </div>
                    <div className="card-content">
                        <div className="card-body py-0 text_set_attemp">
                        <div className="d-flex justify-content-between lh-condensed">
                            <div className="order-details">
                                <h4 className="my-0">Total Score </h4>
                                <p>0/72</p>
                            </div>
                            <div className="order-details">
                                <h4 className="my-0">Total Time Taken</h4>
                                <p className="text-muted">1 hr 30 min </p>
                            </div>
                            <div className="order-details">
                                <a href="#" className="btn btn-outline-info mr-1"><i className="fa fa-eye"></i> View full result</a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}