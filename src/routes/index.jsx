import Home from '../pages/Home'
import SearchSchool from '../pages/SearchSchool'
import SelectLogin from '../pages/SelectLogin'
import Login from '../pages/Login'
import PrincipalLogin from '../pages/principal/PrincipalLogin'
import TeacherLogin from '../pages/teacher/TeacherLogin'
import StudentDashboard from '../pages/student/StudentDashboard'
import TeacherDashboard from '../pages/teacher/TeacherDashboard'
import PrincipalDashboard from '../pages/principal/PrincipalDashboard'

export const operRoutes =  [
    { 
        path:'/',
        component: Home
    },
    {
        path:'/search-school',
        component: SearchSchool
    },
];

export const openRoutesOnSubDomain = [
    { 
        path:'/',
        component: SelectLogin
    },
    {
        path:'/:user_type?/login',
        component: Login
    },
]

export const studentRoutes = [
    {
        path:'/:user_type?/student-dashboard',
        component: StudentDashboard
    },
]

export const teacherRoutes = [
    {
        path:'/:user_type?/teacher-dashboard',
        component: TeacherDashboard
    },
]

export const principalRoutes = [
    {
        path:'/:user_type?/principal-dashboard',
        component: PrincipalDashboard
    },
]