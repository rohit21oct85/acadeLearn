import Head from '../components/common/Head'
import Footer from '../components/common/Footer'
import Foot from '../components/common/Foot'
import HeaderNav from '../components/common/HeaderNav'
import { useState, useContext } from 'react'
import {AuthContext} from '../context/AuthContext';
import {apiUrl, authAxios} from '../config/config';
import {useLocation, useParams, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import { useToasts } from 'react-toast-notifications';

export default function Profile(){
    const queryClient = useQueryClient()
    const {state} = useContext(AuthContext);
    const params = useParams();
    const location = useLocation();
    const path = location.pathname;
    const history = useHistory();

    const { addToast } = useToasts();

    const [formData, setFormData] = useState();

    const getData = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const saveData = () => {
        mutation.mutate(formData);
    }

    const mutation = useMutation(formData => {
        const user_id = localStorage.getItem('user_id');
            return authAxios.patch(`${apiUrl}v1/web/update-student/${user_id}`,formData)
        },{
        onSuccess: (data) => {
            if(data.message){
                addToast('Profile Updated Successfully! Please Logout and Login again', { appearance: 'success',autoDismiss: true });
            }
        },
        onError: () => {
        },
    });

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
                                                        <h4 className="card-title">{localStorage.getItem('name')}</h4> 
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
                                                            <label>Name</label>
                                                            <input name="name" type="text" className="form-control" placeholder="Charlotte" defaultValue={localStorage.getItem('name')} onChange={getData}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-group">
                                                            <label>Email</label>
                                                            <input type="email" disabled className="form-control" placeholder="Deao" defaultValue={localStorage.getItem('email')}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-group">
                                                            <label>Class</label>
                                                            <select className="form-control" defaultValue={localStorage.getItem('class_name')} disabled>
                                                                <option value="">--Select ClassName-- </option>
                                                                <option value="6">ClassName 6th </option>
                                                                <option value="7">ClassName 7th </option>
                                                                <option value="8">ClassName 8th </option>
                                                                <option value="9">ClassName 9th </option>
                                                                <option value="10">ClassName 10th </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-group">
                                                            <label> Section  </label>
                                                            <select name="" required className="form-control" defaultValue={localStorage.getItem('section')} disabled>
                                                            <option value="">-Select Section-</option>
                                                                <option value="A">A </option>
                                                                <option value="B">B</option>
                                                                <option value="C">C</option>
                                                                <option value="D">D</option> 
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
                                                                <select required className="form-control" name="gender"  onChange={getData}>
                                                                    <option value="">-Select-</option>
                                                                    <option value="male">Male </option>
                                                                    <option value="female">Female</option> 
                                                                </select> 
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                    <div className="form-group">
                                                            <label>Address</label>
                                                            <textarea type="text" className="form-control" placeholder="Address" name="address" onChange={getData}></textarea>
                                                    </div>
                                                    </div>  
                                                    <div className="col-md-12">
                                                        <button className="btn btn-primary btn-round" onClick={saveData}>Save</button>
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