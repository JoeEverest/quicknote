import { Hono } from "hono";
import * as z from "zod";
import { env } from "hono/adapter";
import Note from "./Note";
import { slugify } from "../../utils/helpers";

type Variables = {
	user: any;
};

const NoteObject = z.object({
	title: z.string().min(1).max(200),
	content: z.string().min(1),
});
const app = new Hono<{ Variables: Variables }>();

// Get all notes for the authenticated user
app.get("/", async (c) => {
	try {
		const user = c.get("user");
		const notes = await Note.find({ owner: user.id }).sort({
			createdAt: -1,
		});

		return c.json(notes, 200);
	} catch (error) {
		console.error("Error fetching notes:", error);
		return c.json({ error: "Failed to fetch notes" }, 500);
	}
});

app.post("/", async (c) => {
	try {
		const user = c.get("user");
		const body = await c.req.json();

		const parsed = NoteObject.safeParse(body);
		if (!parsed.success) {
			return c.json({ error: parsed.error.flatten() }, 400);
		}

		let slug = slugify(parsed.data.title);
		const existingNoteCount = await Note.findOne({ slug }).countDocuments();

		if (existingNoteCount) {
			slug += `-${existingNoteCount}`;
		}

		const note = new Note({
			...parsed.data,
			slug: slug,
			owner: user.id,
		});
		await note.save();

		return c.json({ note }, 201);
	} catch (error) {
		console.error("Error creating note:", error);
		return c.json({ error: "Failed to create note" }, 500);
	}
});

// Get a specific note by ID
app.get("/:id", async (c) => {
	try {
		const user = c.get("user");
		const noteId = c.req.param("id");

		const note = await Note.findOne({ _id: noteId, owner: user.id });
		if (!note) {
			return c.json({ error: "Note not found" }, 404);
		}

		return c.json({ note }, 200);
	} catch (error) {
		console.error("Error fetching note:", error);
		return c.json({ error: "Failed to fetch note" }, 500);
	}
});

// Update a note
app.put("/:id", async (c) => {
	try {
		const user = c.get("user");
		const noteId = c.req.param("id");
		const body = await c.req.json();

		const parsed = NoteObject.partial().safeParse(body);
		if (!parsed.success) {
			return c.json({ error: parsed.error.flatten() }, 400);
		}

		const note = await Note.findOneAndUpdate(
			{ _id: noteId, owner: user.id },
			parsed.data,
			{ new: true }
		);

		if (!note) {
			return c.json({ error: "Note not found" }, 404);
		}

		return c.json({ note }, 200);
	} catch (error) {
		console.error("Error updating note:", error);
		return c.json({ error: "Failed to update note" }, 500);
	}
});

// Delete a note
app.delete("/:id", async (c) => {
	try {
		const user = c.get("user");
		const noteId = c.req.param("id");

		const note = await Note.findOneAndDelete({
			_id: noteId,
			owner: user.id,
		});
		if (!note) {
			return c.json({ error: "Note not found" }, 404);
		}

		return c.json({ message: "Note deleted successfully" }, 200);
	} catch (error) {
		console.error("Error deleting note:", error);
		return c.json({ error: "Failed to delete note" }, 500);
	}
});

export default app;
