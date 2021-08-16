import { useState, useEffect } from 'react'
import {useHistory, useParams } from 'react-router-dom'

export default function Modal({...props}){
    const hide = () => {
        props.setShow('none')
    }

    return(
        <>
            <div className="modal" style={{display: props.show}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="app-content content bg_whitealt">
                                <div className="content-overlay"></div>
                                <div className="content-wrapper bg_whitealt">
                                    <div className="content-body">
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12">  
                                                <div className="card-content">
                                                <div className="card-body switching-tab-test">
                                                    <div className="container-fluid">
                                                        <div className="row">
                                                            <div className="col-xl-8 col-lg-8 m-auto text-center">
                                                                <div className="alrt_msg1">
                                                                    <div className="icontexto"><img src="/images/icontexto.ico" className="img-fluid" alt="error"/></div>
                                                                        <h2>{props.text}</h2>
                                                                        <a href="#" onClick={hide}>OK</a>
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
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" style={{display: props.show}}></div>
        </>
    )
}