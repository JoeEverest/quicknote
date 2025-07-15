import { Hono } from "hono";
import mongoose from "mongoose";
import routes from "./routes";
import { env } from "hono/adapter";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.route("/app", routes);

async function main() {
	const { MONGO_URI } = env(app, "bun");
	if (!MONGO_URI) {
		throw new Error("MONGO_URI environment variable is not defined");
	}
	await mongoose.connect(MONGO_URI);
}

main()
	.catch((err) => console.log(err))
	.then(() => {
		console.log("Connected to MongoDB");
	});

export default app;
