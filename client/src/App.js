import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import { useDispatch } from "react-redux";
import { loadUser } from "./reducer/loadUser";
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";

function App() {
	const dispatch = useDispatch();
	setAuthToken(localStorage.token);
	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	return (
		<div className='App'>
			<Router>
				<Navbar />
				<Route exact path='/' component={Landing} />
				<div className='container'>
					<Alert />
					<Switch>
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
