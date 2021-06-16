import Head from '../../components/common/Head'
import HeaderNav from '../../components/common/HeaderNav'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import { Link } from 'react-router-dom'
import {useHistory, useParams, useLocation} from 'react-router-dom'

export default function StudentAttempt(){
    const history = useHistory();
    const params  = useParams();
    const location = useLocation();

    return(
        <>
            <Head/>
            <HeaderNav/>
            <div className="app-content content mt-5">
         <div className="content-overlay"></div>
         <div className="content-wrapper">
            
            <div className="content-body">
               {/* <!-- Slaes & Purchase Order --> */}
               <div className="row">
                  <div className="col-xl-12 col-lg-12">
                     <div className="card"> 
                        <div className="card-content">
                           <div className="card-body">
                              <div className="container-fluid">
                                 <div className="row">
                        
            
              
                        <div className="col-xl-12 col-lg-12">
          <div className="timer-s">
            <span className="test-end">Test ends in </span><span className="">00:59</span>
         </div>
			</div>
                                    <div className="col-md-8">
                  <div className="job-info job-widget">
                     <h3 className="job-title">Research Associate - Assessment Mathematics - SME Mathematics</h3>
                  </div>
                  <div className="job-content job-widget mcq-start">
                     <div className="container">
                        <div className="d-flex justify-content-center row">
                           <div className="col-md-12 col-lg-12">
                              <div className="border">
                                 <div className="question bg-Not-select p-2 border-bottom">
                                    <div className="d-flex flex-row justify-content-between align-items-center mcq">
                                       <h4 className="mb-0">MCQ Quiz</h4>
                                       <span>(1 of 30)</span>
                                    </div>
                                 </div>
                                 <div className="question bg-Not-select p-2 border-bottom">
                                    <div className="d-flex flex-row question-title">
                                       <span className="text-danger q_nsekected">Q 1.</span>
                                       <h5 className="ml-3">Which of the following country has largest population?</h5>
                                    </div>
                                    <div className="ans ml-2">
                                       <label className="radio"> <input type="radio" name="option[]" value="brazil" checked/> <span>Brazil</span> </label>
                                    </div>
                                    <div className="ans ml-2">
                                       <label className="radio"> <input type="radio" name="option[]" value="Germany"/> <span>Germany</span>
                                       </label>
                                    </div>
                                    <div className="ans ml-2">
                                       <label className="radio"> <input type="radio" name="option[]" value="Indonesia"/> <span>Indonesia</span>
                                       </label>
                                    </div>
                                    <div className="ans ml-2">
                                       <label className="radio"> <input type="radio" name="option[]" value="Russia"/> <span>Russia</span>
                                       </label>
                                    </div>
                                 </div>
                                 <div className="p-2 bg-Not-select">
                                 <div className="row"> 
                                 <div className="col-md-12 text-right"> 
                                 <button className="btn nextqus_btn" type="button">Next<i className="fa fa-angle-right ml-2"></i></button></div>  </div>
                              </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="col-md-4 numer-list-atttemp">
                  <div className="job-det-info">
                     <a className="btn job-btn">All Attempt Question</a>
                     <div className="col-md-12 Attendence_dv  msq-o">
                        <ul>
                           <li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">1</a></li>
                           <li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">2</a></li>
                           <li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">3</a></li>
                           <li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">4</a></li>
                           <li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">5</a></li>
                           <li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">6</a></li>
                           <li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Absent">7</a></li>
                           <li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">8</a></li>
                           <li className="not-attem"><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">9</a></li>
                           <li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">10</a></li>
                           <li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">11</a></li>
                           <li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">12</a></li>
                           <li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">13</a></li>
                           <li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">14</a></li>
                           <li className="ques-attemp"><a href="#" data-toggle="tooltip" title="" data-original-title="Attempt">15</a></li>
                           <li className=""><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">16</a></li>
                           <li className=""><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">17</a></li>
                           <li className=""><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">18</a></li>
                           <li className=""><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">19</a></li>
                           <li className=""><a href="#" data-toggle="tooltip" title="" data-original-title="Not Attempt">20</a></li>
                          
                        </ul>
                     </div>
                     <div className="Quiz_reviewLegend">
                        <ol>
                           <li> <span className="Quiz_reviewColor" style={{backgroundColor: "#00ab54"}}></span> <span className="Quiz_reviewText">Answered</span></li>
                           <li> <span className="Quiz_reviewColor" style={{backgroundColor: "#f62d51"}}></span> <span className="Quiz_reviewText">Not Attempt</span></li>
                         
                        </ol>
                        <div style={{clear: "both"}}></div>
                     </div>
                    {/* <!-- <div className="info-list text-center">
                        <a className="app-ends" href="#">Application ends in 2d 7h 6m</a>
                     </div>--> */}
                     <div className="info-list text-center">
                        <a href="MCQ-question-submit.php"> <button className="btn btn-primary border-success align-items-center btn-success submit-sd" type="button">Submit</button></a>
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
            <Footer/>
            <Foot/>
        </>
    )
}