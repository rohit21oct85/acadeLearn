import Head from '../../components/common/Head'
import HeaderNav from '../../components/common/HeaderNav'
import Footer from '../../components/common/Footer'
import Foot from '../../components/common/Foot'

export default function StudentResult(){
    return(
        <>
        <Head/>
        <HeaderNav/>
            <div className="app-content content mt-5">
                <div className="content-overlay"></div>
                    <div className="content-wrapper">
                        <div className="content-body">
							<div className="row">
								<div className="card">
								    <div className="card-content">
                                        <div className="card-body">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <p>Result: </p>
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