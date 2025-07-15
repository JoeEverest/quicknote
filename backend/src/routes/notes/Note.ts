import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		content: { type: String, required: true },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);
const Note = mongoose.model("Note", NoteSchema);

export default Note;
