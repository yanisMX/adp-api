import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authenticationRouter from "./endpoint/controller/authenticationRouter.js";
import {errorHandler} from "./endpoint/errorHandler.js";
import {budgetRouter} from "./endpoint/controller/budgetRouter.js";
import {authenticationProvider} from "./endpoint/authenticationProvider.js";
import meRouter from "./endpoint/controller/meRouter.js";

const app = express();
const port = 3001;
const swaggerSetup = require('./swagger');

swaggerSetup(app);

const corsOptions = {
	origin: "*",
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", authenticationRouter);
app.use("/me", meRouter);
app.use("/budget", budgetRouter);

app.use(errorHandler);
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});