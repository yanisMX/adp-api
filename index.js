import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authenticationRouter from "./controller/authenticationRouter.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", authenticationRouter);


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});