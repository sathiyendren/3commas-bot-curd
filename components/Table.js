import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/icons";
import {
	deleteBot,
	fetchBots,
	setModalOpen,
	setSelectedBot,
} from "@/store";
import { useEffect } from "react";

export function Table() {
	const state = useSelector((state) => state.bot);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBots());
	}, [dispatch]);

	return (
		<table className="table">
			<thead className="table__head">
				<tr>
					<th>Bot Name</th>
					<th>Trade Pair</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody className="table__body">
				{state.botList.map(({ _id, name, pair}) => (
					<tr key={_id}>
						<td>{name}</td>
						<td>{pair}</td>
						<td>
							<button
								className="btn btn__compact btn__edit"
								onClick={() => {
									dispatch(setSelectedBot(_id));
									dispatch(setModalOpen(true));
								}}
							>
								<PencilSVG />
							</button>
							<button
								className="btn btn__compact btn__delete"
								onClick={() => {
									dispatch(deleteBot(_id));
								}}
							>
								<TrashSVG />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
