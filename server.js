const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const { dirname } = require("path");
const app = express();
connectDB();

//init middleware
app.use(express.json({ extended: false }));
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

//define router
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server start on ${PORT}`));
