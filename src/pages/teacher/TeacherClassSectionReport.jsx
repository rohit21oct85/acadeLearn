import { useParams, Link} from 'react-router-dom'
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import useClassSectionReportList from './hooks/useClassSectionReportList'
import { makePdf } from '../../../src/utils/utils'

export default function TeacherClassSectionReport(){
   const params = useParams();

   const {data:datas, datasLoading} = useClassSectionReportList();

   

    return(
        <>
        <Head/>
        <HeaderNav/>
        <div className="app-content content mt-5">
         <div className="content-overlay"></div>
         <div className="content-wrapper">
            <div className="content-header row">
               <div className="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                  <h3 className="content-header-title mb-0 d-inline-block">Class {params?.class_name}th {params?.section}</h3>
                  <div className="row breadcrumbs-top d-inline-block">
                     <div className="breadcrumb-wrapper col-12">
                        <ol className="breadcrumb">
                           <li className="breadcrumb-item"><a href="index.html">Home</a>
                           </li>
                           <li className="breadcrumb-item"><a href="#">Teacher</a>
                           </li>
                           <li className="breadcrumb-item">Class {params?.class_name}th {params?.section}
                           </li>
                        </ol>
                     </div>
                  </div>
               </div>
            </div>
            <div className="content-body">
               {/* <!-- Slaes & Purchase Order --> */}
               <div className="row">
                  <div className="col-xl-12 col-lg-12">
                     <div className="card">
                     <div className="col-xl-12 col-lg-12 left-arrow1">
               <ul> 
               <li><Link to={`/teacher/teacher-class-report/${params.class_id}/${params.class_name}`}><img src="/images/left-arrow.png" className="img-fluid" alt="back-arrow"/> Back</Link></li>
               </ul>
               </div>
                        <div className="card-content">
                           <div className="card-body">
                              <div className="col-md-12">
                                 <div className="table-responsive mt-2 second_lbl_show">
                                    <div className="form-group col-md-12 mb-2">
                                       <h4 className="pb-2"><strong>Student Wise Report</strong></h4>
                                       <button className="btn btn-primary" onClick={(e)=>makePdf(e, "#tableCumulative", "Cumulative Student wise Report")}>Make Pdf</button>
                                    </div>
                                    <table id="tableCumulative" className="table table-striped table-bordered zero-configuration">
                                       <thead>
                                          <tr>
                                             <th>Student Name </th>
                                             <th>Average </th>
                                             <th>Cumulative Performance</th>
                                             {/* <th>Cumulative Test Performance</th> */}
                                          </tr>
                                       </thead>
                                       <tbody>
                                          {datas && datas.map((item,key)=>{
                                             return(
                                                <tr key={key}>
                                                   <td className="text-truncate">
                                                      {/* <span className="avatar avatar-xs">
                                                      <img className="box-shadow-2" src="./images/portrait/small/avatar-s-9.png" alt="avatar"/> 
                                                      </span>  */}
                                                      <span>{item.name}</span>
                                                   </td>
                                                   <td> {item?.average}       </td>
                                                   <td> {item?.percentage ? item.percentage +" %": "no results"}       </td>
                                                   {/* <td>70%   </td> */}
                                                </tr>
                                             )
                                          })}
                                          </tbody>
                                    </table>
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