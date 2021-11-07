import mongoose from "mongoose";

const BotSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Bot Id is required!"],
		trim: true,
	},
	pair: {
		type: String,
		required: [true, "Trade Pair is required!"],
		trim: true,
	},
	isReadyToBuy: {
		type: Boolean,
		default: false,
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bot || mongoose.model("Bot", BotSchema);
