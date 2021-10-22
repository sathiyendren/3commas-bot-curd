import * as t from "../types";

export const setModalOpen = (isModalOpen) => {
	return {
		type: t.MODAL_OPEN,
		payload: isModalOpen,
	};
};

export const fetchBots = () => {
	return {
		type: t.BOT_FETCH_REQUESTED,
	};
};

export const addBot = (bot) => {
	return {
		type: t.BOT_ADD_REQUESTED,
		payload: bot,
	};
};

export const updateBot = (bot) => {
	return {
		type: t.BOT_UPDATE_REQUESTED,
		payload: bot,
	};
};

export const deleteBot = (id) => {
	return {
		type: t.BOT_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedBot = (id) => {
	return {
		type: t.BOT_SELECTED,
		payload: id,
	};
};
