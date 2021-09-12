import React from "react";
import { useSelector } from "react-redux";

function Alert() {
	const alerts = useSelector((state) => state.alert);
	const message = alerts.map((x) => x.msg);
	const alertType = alerts.map((x) => x.alerType);
	const msg = message[message.length - 1];
	const type = alertType[alertType.length - 1];
	if (msg) return <div className={`alert alert-${type}`}>{msg}</div>;
	else return <div></div>;
}

export default Alert;
