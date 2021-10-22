import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	botList: [],
	selectedBot: undefined,
	isModalOpen: false,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN:
			return {
				...state,
				isModalOpen: action.payload,
			};
		case t.BOT_FETCH_SUCCEEDED:
			return {
				...state,
				botList: action.payload,
			};
		case t.BOT_ADD_SUCCEEDED:
			return {
				...state,
				botList: [action.payload, ...state.botList],
			};
		case t.BOT_UPDATE_SUCCEEDED:
			const updatedBot = state.botList.map((bot) => {
				if (bot._id === action.payload._id) {
					return {
						...bot,
						name: action.payload.name,
						email: action.payload.email,
						address: action.payload.address,
						phone: action.payload.phone,
					};
				}
				return bot;
			});

			return { ...state, botList: updatedBot };
		case t.BOT_DELETE_SUCCEEDED:
			const newBotList = state.botList.filter(
				(bot) => bot._id !== action.payload
			);
			return {
				...state,
				botList: newBotList,
			};
		case t.BOT_SELECTED:
			const selectedBot = state.botList.find(
				(bot) => bot._id === action.payload
			);
			return {
				...state,
				selectedBot,
			};
		default:
			return state;
	}
};

export default mainReducer;
