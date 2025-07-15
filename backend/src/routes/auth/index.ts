import { Hono } from "hono";
import * as z from "zod";
import * as jwt from "hono/jwt";
import dayjs from "dayjs";
import { User } from "./User";
import { env } from "hono/adapter";

const UserObject = z.object({
	name: z.string().min(1).max(100),
	email: z.email().max(100),
	password: z.string().min(6).max(100),
});

const app = new Hono();

app.post("/register", async (c) => {
	try {
		const body = await c.req.json();

		const parsed = UserObject.safeParse(body);
		if (!parsed.success) {
			return c.json({ error: parsed.error.flatten() }, 400);
		}

		const res = await User.findOne({ email: parsed.data.email });
		if (res) {
			return c.json({ error: "User already exists" }, 400);
		}

		const user = new User(parsed.data);
		await user.save();

		//TODO: Send verification email

		return c.json({ message: "User registered successfully" }, 201);
	} catch (error) {
		console.log(error);
	}
});

app.post("/login", async (c) => {
	try {
		const body = await c.req.json();

		const parsed = UserObject.pick({
			email: true,
			password: true,
		}).safeParse(body);
		if (!parsed.success) {
			return c.json({ error: parsed.error.flatten() }, 400);
		}

		const user = await User.findOne({ email: parsed.data.email });
		if (!user) {
			return c.json({ error: "Invalid email or password" }, 400);
		}

		if (user.password !== parsed.data.password) {
			return c.json({ error: "Invalid email or password" }, 400);
		}

		const { JWT_SECRET } = env(c, "bun");

		const token = await jwt.sign(
			{
				id: user._id,
				email: user.email,
				name: user.name,
				exp: dayjs().add(90, "day").unix(),
			},
			JWT_SECRET as string
		);

		return c.json({ token }, 200);
	} catch (error) {
		console.log(error);
	}
});

export default app;
