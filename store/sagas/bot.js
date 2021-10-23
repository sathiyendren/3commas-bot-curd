import { all, put, takeLatest } from "redux-saga/effects";
import * as t from "../types";

function* fetchBots() {
	try {
		const response = yield fetch("/api/bots");

		const botList = yield response.json();

		yield put({
			type: t.BOT_FETCH_SUCCEEDED,
			payload: botList.data,
		});
	} catch (error) {
		yield put({
			type: t.BOT_FETCH_FAILED,
			payload: error.message,
		});
	}
}

function* watchFetchBots() {
	yield takeLatest(t.BOT_FETCH_REQUESTED, fetchBots);
}

function* addBot(action) {
	try {
		const response = yield fetch("/api/bots", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const newBot = yield response.json();

		yield put({
			type: t.BOT_ADD_SUCCEEDED,
			payload: newBot.data,
		});
	} catch (error) {
		yield put({
			type: t.BOT_ADD_FAILED,
			payload: error.message,
		});
	}
}

function* watchAddBot() {
	yield takeLatest(t.BOT_ADD_REQUESTED, addBot);
}

function* deleteBot(action) {
	try {
		const response = yield fetch("/api/bots/" + action.payload, {
			method: "DELETE",
		});

		const deletedBot = yield response.json();

		yield put({
			type: t.BOT_DELETE_SUCCEEDED,
			payload: deletedBot.data.id,
		});
	} catch (error) {
		yield put({
			type: t.BOT_DELETE_FAILED,
			payload: error.message,
		});
	}
}

function* watchRemoveBot() {
	yield takeLatest(t.BOT_DELETE_REQUESTED, deleteBot);
}

function* updateBot(action) {
	try {
		const response = yield fetch("/api/bots/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedBot = yield response.json();

		yield put({
			type: t.BOT_UPDATE_SUCCEEDED,
			payload: updatedBot.data,
		});
	} catch (error) {
		yield put({
			type: t.BOT_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

function* watchUpdateBot() {
	yield takeLatest(t.BOT_UPDATE_REQUESTED, updateBot);
}

export default function* rootSaga() {
	yield all([
		watchFetchBots(),
		watchAddBot(),
		watchRemoveBot(),
		watchUpdateBot(),
	]);
}
