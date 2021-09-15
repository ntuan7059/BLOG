import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function Privateroute({ component: Component, ...rest }) {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	);
}

export default Privateroute;
