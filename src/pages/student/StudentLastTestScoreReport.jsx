import { useParams, Link} from 'react-router-dom'
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import useLastTestScore from '../student/hooks/useLastTestScore'

export default function StudentLastTestScoreReport(){
    const params = useParams();

    const options = [
        {key: 'option_a', value: 'A'},
        {key: 'option_b', value: 'B'},
        {key: 'option_c', value: 'C'},
        {key: 'option_d', value: 'D'},
    ]

    const {data:lastScore, lastScoreLoading} = useLastTestScore();
    return(
        <>
        <Head/>
        <HeaderNav/>
        <div className="app-content content mt-5">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <div className="content-header row">
                <div className="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                    <h3 className="content-header-title mb-0 d-inline-block">Student</h3>
                    <div className="row breadcrumbs-top d-inline-block">
                    <div className="breadcrumb-wrapper col-12">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/student/student-dashboard/${params.class_id}/${params.class_name}`}>Home</Link> </li>
                        <li className="breadcrumb-item"><a href="#">Last Report</a> </li>
                        </ol>
                    </div>
                    </div>
                </div>
                </div>
                <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-xl-12 col-lg-12 mt-2">
                        <div className="card">
                        <div className="card-header">
                            <h4 className="card-title rpt1">Full Score</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body pt-0">
                            {/* <p>Here, select a subject to find out your average performance.</p> */}
                            <div className="row">
                                <div className="col-md-12">
                                {lastScore && lastScore.questions.map((item,key)=>{
                                    return (
                                        <div className="card qnans_bdr" key={key}>
                                            <div className="bg_color_qnans">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                    <h3 className="card-title">Question: {key+1}</h3>
                                                    </div>
                                                    <div className="col-md-4">
                                                    {/* <h3 className="card-title">Unit: {item?.unit_no} - {item?.unit_name}</h3> */}
                                                    </div>
                                                    <div className="col-md-4">
                                                    {/* <h3 className="card-title">Chapter: {item?.chapter_no} - {item?.chapter_name}</h3> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg_qus_ans1">
                                                <h4 className="card-title"><span dangerouslySetInnerHTML={{__html: item?.question}}></span></h4>
                                                <div className="options_ans">
                                                    <h4>Options</h4>
                                                    <ul>
                                                    {options && options.map((it,key)=>{
                                                        return(
                                                            <li key={key}><span className="crchater">{it.value}:</span> <span dangerouslySetInnerHTML={{__html: item[it?.key]}} className="crchater-text" ></span>{item.option == it?.key && item.correct_option != item.option ? <i className="fa fa-times"></i> : ""}{item.correct_option == item.option && item.option == it?.key ? <i className="fa fa-check"></i> : ""} </li>
                                                        )
                                                    })}
                                                    {/* <li>B: <span dangerouslySetInnerHTML={{__html: item?.option_b}}></span></li>
                                                    <li>C: <span dangerouslySetInnerHTML={{__html: item?.option_c}}></span></li>
                                                    <li>D: <span dangerouslySetInnerHTML={{__html: item?.option_d}}></span></li> */}
                                                    </ul>
                                                    <p>User Answer: <span dangerouslySetInnerHTML={{__html: item?.answer}}></span></p>
                                                    <p className="border-0">Correct Answer: <span dangerouslySetInnerHTML={{__html: item?.correct_answer}}></span> <i className="fa fa-check"></i></p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                </div>
                                <div className="col-md-12 text-center"> <Link to={`/student/student-dashboard/${params.class_id}/${params.class_name}`} className="btn btn-info"> Go To Dashboard</Link></div>
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