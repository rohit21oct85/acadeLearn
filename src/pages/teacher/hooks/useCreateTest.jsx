import React, { useContext, useState } from 'react'
import {useLocation, useParams, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import {apiUrl} from '../../../config/config';
import {AuthContext} from '../../../context/AuthContext';

export default function useCreateTest(formData1) {
	const queryClient = useQueryClient()
	const {state} = useContext(AuthContext);
	const params = useParams();
	const location = useLocation();
	const path = location.pathname;
	const history = useHistory();
	
	const options = {
		headers: {
				'Content-Type': 'Application/json',
				// 'Content-Type': 'multipart/form-data',
				'Authorization':'Bearer '+state.access_token
		}
	}
	const class_id = params?.class_id;  
	const unit_id = params?.test_id;    //here test_id contains unit_id
	const teacher_id = localStorage.getItem('user_id');
	const school_id = localStorage.getItem('school_id');
	const chapter_id = params?.student_id; //here student_id contains chapter_id

	return useMutation(formData => {
            console.log(formData)
			return axios.post(`${apiUrl}v1/web/create-test/${class_id}/${unit_id}/${chapter_id}/${teacher_id}/${school_id}`, formData ,options)
		},{
		onSuccess: (data) => {
				//history.push('/admin/app-module');
				return data.data
		},
		onError: () => {
		},
	});
}
