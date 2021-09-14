import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import { useDispatch } from "react-redux";
import { loadUser } from "./reducer/auth";
import { useEffect } from "react";
import axios from "axios";
import setAuthToken from "./utils/setAuthToken";

function App() {
	setAuthToken(localStorage.token);
	async function axiosTest() {
		const promise = await axios.get("http://localhost:5000/api/auth");
		return console.log(promise.data);
	}
	axiosTest();
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
