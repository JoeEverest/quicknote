import { Hono } from "hono";
import auth from "./auth";
import notes from "./notes";
import * as jwt from "hono/jwt";
import { env } from "hono/adapter";
import Note from "./notes/Note";

type Variables = {
	user: any;
};

const app = new Hono<{ Variables: Variables }>();

app.route("/auth", auth);

app.get("/note/:slug", async (c) => {
	try {
		const { slug } = c.req.param();
		if (!slug) {
			return c.json({ error: "Slug is required" }, 400);
		}

		const note = await Note.findOne({ slug });
		if (!note) {
			return c.json({ error: "Note not found" }, 404);
		}

		return c.json({ content: note.content }, 200);
	} catch (error) {
		console.error("Error fetching notes:", error);
		return c.json({ error: "Failed to fetch notes" }, 500);
	}
});

// Middleware to verify JWT token
app.use("*", async (c, next) => {
	try {
		const authHeader = c.req.header("Authorization");
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return c.json({ error: "Authorization token required" }, 401);
		}

		const token = authHeader.substring(7); // Remove "Bearer " prefix
		const { JWT_SECRET } = env(c, "bun");

		const payload = await jwt.verify(token, JWT_SECRET as string);
		c.set("user", payload);
		await next();
	} catch (error) {
		return c.json({ error: "Invalid token" }, 401);
	}
});

app.route("/notes", notes);

export default app;
