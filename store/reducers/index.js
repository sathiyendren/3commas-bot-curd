import { combineReducers } from "redux";
import botReducer from "./bot";

const rootReducer = combineReducers({
	bot: botReducer,
});

export default rootReducer;
