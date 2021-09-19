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
import Privateroute from "./components/routing/Privateroute";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExp from "./components/profile-form/AddEx";
import AddEdu from "./components/profile-form/AddEdu";
import Profiles from "./components/Profiles/Profiles";

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
						<Route exact path='/user' component={Profiles} />
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<Privateroute exact path='/dashboard' component={Dashboard} />
						<Privateroute
							exact
							path='/create-profile'
							component={CreateProfile}
						/>
						<Privateroute exact path='/edit-profile' component={EditProfile} />
						<Privateroute exact path='/add-experience' component={AddExp} />
						<Privateroute exact path='/add-education' component={AddEdu} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
