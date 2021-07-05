import { useParams, Link } from "react-router-dom";
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import useClassReportList from '../teacher/hooks/useClassReportList'

export default function ClassWiseReport(){
   const params = useParams();

   const {data:sections, sectionsLoading} = useClassReportList();
    return(
        <>
        <Head/>
        <HeaderNav/>
        <div className="app-content content mt-5">
         <div className="content-overlay"></div>
         <div className="content-wrapper">
            <div className="content-header row">
               <div className="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                  <h3 className="content-header-title mb-0 d-inline-block">Class {params.class_name}th </h3>
                  <div className="row breadcrumbs-top d-inline-block">
                     <div className="breadcrumb-wrapper col-12">
                        <ol className="breadcrumb">
                           <li className="breadcrumb-item"><a href="index.html">Home</a>
                           </li>
                           <li className="breadcrumb-item"><a href="#">Teacher</a>
                           </li>
                           <li className="breadcrumb-item">Class {params.class_name}th 
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
               <li><Link to={`/principal/principal-dashboard/${params.school_id}`}><img src="/images/left-arrow.png" className="img-fluid" alt="back-arrow"/> Back</Link></li>
               </ul>
               </div>
                        <div className="card-content">
                           <div className="card-body">
                              <div className="col-md-12">
                                 <div className="table-responsive first_lbl_show">
                                    <h4><strong>Section Wise Reports</strong></h4>
                                    <table className="table table-striped table-bordered lavel_select_sction">
                                       {/* <!--zero-configuration--> */}
                                       <thead>
                                          <tr>
                                             <th>Section   </th>
                                             <th>No of Students   </th>
                                             {/* <th>Last Test Attendance    </th> */}
                                             <th>No of Student Attempts    </th>
                                             <th>Cumulative Test Attendance</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          {sections && sections?.section?.map((item,key) => {
                                                return(
                                                    <tr key={key}>
                                                        <td><Link to={`/principal/principal-class-wise-section-report/${params.school_id}/${params.class_id}/${params.class_name}/${item}`} className="sbject_sw">{item} </Link></td>
                                                        <td>{sections[`${item+"-count"}`]} </td>
                                                        <td>{sections[`${item+"-attempted"}`]}/{sections[`${item+"-count"}`]}</td>
                                                        <td>{sections[`${item+"-percentage"}`] == null ? 0 :sections[`${item+"-percentage"}`]?.toFixed(2)} %</td>
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