import { useParams, Link} from 'react-router-dom'
import { useEffect} from 'react'
import Head from '../../components/common/Head'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'
import HeaderNav from '../../components/common/HeaderNav'
import useLastTestScore from '../student/hooks/useLastTestScore'
import FileViewer from "react-file-viewer";
import { imageUrl } from '../../config/config'

export default function StudentLastTestScoreReport(){
    const params = useParams();

    const options = [
        {key: 'option_a', value: 'A'},
        {key: 'option_b', value: 'B'},
        {key: 'option_c', value: 'C'},
        {key: 'option_d', value: 'D'},
    ]
    
    const options1 = { 'option_a':' A','option_b':' B','option_c':' C','option_d':' D' }
    const options_mock = [
        {key: 'a', value: 'yes'},
        {key: 'b', value: 'no'},
    ]

    const {data:lastScore, lastScoreLoading} = useLastTestScore();
    
    useEffect(() => {
        const script = document.createElement("script");
        script.id = 'editor';
        script.src = "https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image";
        script.async = true;
        document.body.appendChild(script);
    },[lastScore])

    
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
                        <li className="breadcrumb-item"><Link to={`/student/student-dashboard/tab1/${params.class_id}/${params.class_name}`}>Home</Link> </li>
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
                        {params.test_type == "upload-test" 
                        ? 
                        lastScore?.questions[0]?.questions?.map(( item, key ) => {
                                return(
                                    <>
                                        <div className="less-height">
                                            <FileViewer fileType={lastScore.extension} filePath={`${imageUrl}uploads/${item}`} onError={"error"}/>
                                        </div>
                                    </>
                                )
                            })
                        : 
                        " "
                        }
                        <div className="card-content" style={{marginTop:"20px"}}>
                            <div className="card-body pt-0">
                            {/* <p>Here, select a subject to find out your average performance.</p> */}
                            <div className="row">
                                {lastScore == undefined ? "Loading. .." :
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
                                                    {params.test_type != "mock-test" 
                                                    ? 
                                                    options && options.map((it,key)=>{
                                                        return(
                                                            <li key={key}><span className="crchater">{it.value}:</span> <span dangerouslySetInnerHTML={{__html: item[it?.key]}} className="crchater-text" ></span>{item.option == it?.key && item.correct_option != item.option ? <i className="fa fa-times"></i> : ""}{item.correct_option == item.option && item.option == it?.key ? <i className="fa fa-check"></i> : ""} </li>
                                                        )
                                                    })
                                                    :
                                                    options_mock && options_mock.map((it,key)=>{
                                                        return(
                                                            <li key={key}>
                                                                <span className="crchater">{it.key +  " : " + it.value}</span> 
                                                                <span dangerouslySetInnerHTML={{__html: item[it?.value]}} className="crchater-text" ></span>
                                                            </li>
                                                        )
                                                    })}
                                                    {/* <li>B: <span dangerouslySetInnerHTML={{__html: item?.option_b}}></span></li>
                                                    <li>C: <span dangerouslySetInnerHTML={{__html: item?.option_c}}></span></li>
                                                    <li>D: <span dangerouslySetInnerHTML={{__html: item?.option_d}}></span></li> */}
                                                    </ul>
                                                    
                                                    {params.test_type != "mock-test" 
                                                    ? 
                                                    <>
                                                        <p>User Answer: { options1[`${item?.option}`]+ " : " }<span dangerouslySetInnerHTML={{__html: item?.answer}}></span></p>
                                                        <p className="border-0">Correct Answer: { options1[`${item?.correct_option}`] + " : " }<span dangerouslySetInnerHTML={{__html: item?.correct_answer}}></span> <i className="fa fa-check"></i></p>
                                                    </>
                                                    : 
                                                    <>
                                                        <p>User Answer: { item?.answer === 'yes' ? 'a : ' : 'b : '}<span dangerouslySetInnerHTML={{__html: item?.answer}}></span></p>
                                                        <p className="border-0">Correct Answer: <span dangerouslySetInnerHTML={{__html: item?.correct_answer + " : "}}></span> <span dangerouslySetInnerHTML={{__html: item?.correct_answer === 'a' ? 'yes' : 'no'}}></span> <i className="fa fa-check"></i></p>
                                                    </>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                </div>
                                }
                                <div className="col-md-12 text-center"> <Link to={`/student/student-dashboard/tab1/${params.class_id}/${params.class_name}`} className="btn btn-info"> Go To Dashboard</Link></div>
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