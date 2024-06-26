import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// Définir les options de Swagger
const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "API Documentation",
			version: "1.0.0",
			description: "Documentation de notre API ADP",
		},
		servers: [
			{
				url: "http://localhost:3001",
				description: "Serveur de développement",
			},
		],
	},
	apis: ["./endpoint/controller/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default (app) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
