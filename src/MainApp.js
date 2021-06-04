import {BrowserRouter ,Switch, Route,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { operRoutes } from './routes/index.jsx';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				{operRoutes && operRoutes.map((route => (
					<Route exact={true} key={route.path} path={route.path} component={route.component} />
				)))}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
