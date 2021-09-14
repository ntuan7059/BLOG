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

function App() {
	async function axiosTest() {
		const promise = await axios.get("http://localhost:5000/api/auth", {
			headers: {
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MDE2NDI2ODVjNTczZGRlZDJmNDQzIn0sImlhdCI6MTYzMTU4OTk1NX0.ngD2a0EixZ8m_475lJvuTmpjqTsY9pBSygQ4LfZfvjo",
			},
		});
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
