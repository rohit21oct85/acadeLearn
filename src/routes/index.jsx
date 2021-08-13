import Home from '../pages/Home'
import SearchSchool from '../pages/SearchSchool'
import SelectLogin from '../pages/SelectLogin'
import Login from '../pages/Login'
import StudentDashboard from '../pages/student/StudentDashboard'
import TeacherDashboard from '../pages/teacher/TeacherDashboard'
import TeacherClassReport from '../pages/teacher/TeacherClassReport'
import TeacherClassSectionReport from '../pages/teacher/TeacherClassSectionReport'
import PrincipalDashboard from '../pages/principal/PrincipalDashboard'
import TeacherWiseSectionReport from '../pages/principal/TeacherWiseSectionReport'
import TeacherWiseReport from '../pages/principal/TeacherWiseReport'
import ClassWiseReport from '../pages/principal/ClassWiseReport'
import ClassWiseSectionReport from '../pages/principal/ClassWiseSectionReport'
import StudentAttempt from '../pages/student/StudentAttempt'
import StudentAttemptOffline from '../pages/student/StudentAttemptOffline'
import StudentAgreement from '../pages/student/StudentAgreement'
import StudentResult from '../pages/student/StudentResult'
import StudentLastTestScoreReport from '../pages/student/StudentLastTestScoreReport'
import Profile from '../pages/Profile'

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
        path:'/:user_type?/student-dashboard/:window/:class_id?/:class_name?/:subject_id?',
        component: StudentDashboard
    },
    {
        path:'/:user_type?/student-agreement/:class_id?/:class_name?/:test_id?/:test_type?',
        component: StudentAgreement
    },
    {
        path:'/:user_type?/student-attempt/:class_id?/:class_name?/:test_id?/:test_type?',
        component: StudentAttemptOffline
    },
    {
        path:'/:user_type?/student-result/:class_id?/:class_name?/:test_id?/:attempt_id?/:test_type?',
        component: StudentResult
    },
    {
        path:'/:user_type?/student-last-report/:class_id?/:class_name?/:attempt_id?/:test_type?',
        component: StudentLastTestScoreReport
    },
    {
        path:'/:user_type?/profile',
        component: Profile
    },
]

export const teacherRoutes = [
    {
        path:'/:user_type?/teacher-dashboard/:window?/:class_id?/:test_id?/:student_id?/:chapter_id?',
        component: TeacherDashboard
    },
    {
        path:'/:user_type?/teacher-class-report/:class_id?/:class_name?',
        component: TeacherClassReport
    },
    {
        path:'/:user_type?/teacher-class-section-report/:class_id?/:class_name?/:section?',
        component: TeacherClassSectionReport
    },
    {
        path:'/:user_type?/profile',
        component: Profile
    },
]

export const principalRoutes = [
    {
        path:'/:user_type?/principal-dashboard/:school_id?/:subject_id?',
        component: PrincipalDashboard
    },
    {
        path:'/:user_type?/principal-class-wise-report/:school_id?/:class_id?/:class_name?',
        component: ClassWiseReport
    },
    {
        path:'/:user_type?/principal-class-wise-section-report/:school_id?/:class_id?/:class_name?/:section?',
        component: ClassWiseSectionReport
    },
    {
        path:'/:user_type?/principal-teacher-wise-report/:school_id?/:teacher_id?',
        component: TeacherWiseReport
    },
    {
        path:'/:user_type?/principal-teacher-wise-section-report/:school_id?/:teacher_id?/:class_id?/:test_id?',
        component: TeacherWiseSectionReport
    },
]