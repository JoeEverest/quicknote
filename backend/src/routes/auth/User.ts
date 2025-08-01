import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		name: { type: String, required: true },
		verified: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);
const User = mongoose.model("User", UserSchema);

export { User };
