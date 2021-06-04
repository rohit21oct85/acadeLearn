import {BrowserRouter ,Switch, Route,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentRoutes from './helper/StudentRoutes'
import PrincipalRoutes from './helper/PrincipalRoutes'
import TeacherRoutes from './helper/TeacherRoutes'
import { studentRoutes, principalRoutes, teacherRoutes, openRoutesOnSubDomain } from './routes/index.jsx';

export default function SubDomainApp({subDomain}){
    console.log("in subdomain app",subDomain)
    return(
        <BrowserRouter>
			<Switch>
				{	
					openRoutesOnSubDomain && openRoutesOnSubDomain.map((route => (
						<Route exact={true} key={route.path} path={route.path} component={route.component} />
					)))
				}
				{ 
					studentRoutes && studentRoutes.map((route => (
					 	<StudentRoutes exact={true} key={route.path} path={route.path} component={route.component} />
					)))
				}
				{		
					teacherRoutes && teacherRoutes.map((route => (
						<TeacherRoutes exact={true} key={route.path} path={route.path} component={route.component} />
					)))
				}
				{		
					principalRoutes && principalRoutes.map((route => (
						<PrincipalRoutes exact={true} key={route.path} path={route.path} component={route.component} />
					)))
				}
			</Switch>
		</BrowserRouter>
    )
}