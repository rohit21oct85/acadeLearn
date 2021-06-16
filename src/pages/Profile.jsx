import Head from '../components/common/Head'
import Footer from '../components/common/Footer'
import Foot from '../components/common/Foot'
import HeaderNav from '../components/common/HeaderNav'

export default function Profile(){
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
                                        <li className="breadcrumb-item"><a href="index.html">Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="#">Dashboard</a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">
                        <section className="users-edit"> 
                            <div className="card-content">
                                <div className="card-body">  
                                    <div className="row">
                                        <div className="col-xl-4 col-md-6 col-12">
                                            <div className="card profile-card-with-cover border-teal border-lighten-2"> 
                                                <div className="card-img-top img-fluid bg-cover profile-card-image-cover-2"></div>
                                                    <div className="card-profile-image text-center">
                                                        <div className="small-12 medium-2 large-2 columns">
                                                            <div className="circle"> 
                                                                <img className="profile-pic" src="/images/portrait/small/avatar-s-9.png"/> 
                                                            </div>
                                                            <div className="p-image">
                                                                <i className="fa fa-camera upload-button"></i>
                                                                <input className="file-upload" type="file" accept="image/*"/>
                                                            </div>
                                                        </div> 
                                                    <div className="card-body">
                                                        <h4 className="card-title">Philip Garrett</h4> 
                                                        <h6 className="card-subtitle text-muted">Student</h6> 
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card pt-2 pb-2 pl-4 pr-4">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-group">
                                                            <label>First Name</label>
                                                            <input type="text" className="form-control" placeholder="Charlotte"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-group">
                                                            <label>Last Name</label>
                                                            <input type="text" className="form-control" placeholder="Deao"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-group">
                                                            <label>DOB</label>
                                                            <input type="date" className="form-control" name="dob"  placeholder="Enter Your Date of Birth"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-group">
                                                            <label>ClassName</label>
                                                            <select className="form-control">
                                                            <option value="">--Select ClassName-- </option>
                                                            <option value="">ClassName 6th </option>
                                                                <option value="">ClassName 7th </option>
                                                                <option value="">ClassName 8th </option>
                                                                <option value="">ClassName 9th </option>
                                                                <option value="">ClassName 10th </option>
                                                                <option value="">ClassName 11th </option>
                                                                <option value="">ClassName 12th </option>
                                                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-group">
                                                            <label> Section  </label>
                                                            <select name="" required className="form-control">
                                                            <option value="">-Select Section-</option>
                                                                <option value="1">A </option>
                                                                <option value="2">B</option>
                                                                <option value="2">C</option>
                                                                <option value="2">D</option> 
                                                            </select> 
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-group m_p_0">
                                                            <label> School Name  </label>
                                                            <input type="text" className="form-control" placeholder="Acade School" readOnly/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-group m_p_0">
                                                                <label>Select Gender</label>
                                                                <select name="" required className="form-control">
                                                                    <option value="">-Select-</option>
                                                                    <option value="1">Male </option>
                                                                    <option value="2">Female</option> 
                                                                </select> 
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                    <div className="form-group">
                                                            <label>Address</label>
                                                            <textarea type="text" className="form-control" placeholder="Address"></textarea>
                                                    </div>
                                                    </div>  
                                                    <div className="col-md-12">
                                                        <button className="btn btn-primary btn-round" >Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        <Footer/>
        <Foot/>
        </>
    )
}