import {BrowserRouter as Router,Switch, Route,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { operRoutes } from './routes/index.jsx';

function App() {
	return (
		<Router>
				<Switch>
					{operRoutes && operRoutes.map((route => (
						<Route exact={true} key={route.path} path={route.path} component={route.component} />
					)))}
				</Switch>
		</Router>
	);
}

export default App;
