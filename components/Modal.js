import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "@/icons";
import {
	addBot,
	setModalOpen,
	setSelectedBot,
	updateBot,
} from "@/store";

export function Modal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();

	const state = useSelector((state) => state.bot);

	const dispatch = useDispatch();

	const closeModal = () => {
		reset();
		dispatch(setModalOpen(false));
		dispatch(setSelectedBot(undefined));
	};

	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
		if (state.selectedBot) {
			dispatch(
				updateBot({
					_id: state.selectedBot._id,
					...data,
				})
			);
		} else {
			console.log(data);
			dispatch(addBot(data));
		}
	};

	useEffect(() => {
		if (state.selectedBot) {
			setValue("name", state.selectedBot.name);
			setValue("pair", state.selectedBot.pair);
			setValue("isReadyToBuy", state.selectedBot.isReadyToBuy);
		}
	}, [state.selectedBot, setValue]);

	return state.isModalOpen
		? ReactDOM.createPortal(
				<div className="modal">
					<div className="modal__content">
						<header className="header modal__header">
							<h1 className="header__h2">
								{state.selectedBot ? (
									<>
										Edit <span>Bot</span>
									</>
								) : (
									<>
										Add <span>Bot</span>
									</>
								)}
							</h1>
							<button
								className="btn btn__compact btn__close"
								onClick={closeModal}
							>
								<CloseSVG />
							</button>
						</header>

						<form
							className="form modal__form"
							onSubmit={handleSubmit(onSubmitHandler)}
							noValidate
						>
							<div className="form__element">
								<label
									htmlFor="nameInput"
									className={cx("label", errors.name && "label--error")}
								>
									{errors.name ? (
										"Full name is required!"
									) : (
										<>
											Bot name&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="text"
									id="nameInput"
									name="name"
									placeholder="Full name"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="pairInput"
									className={cx("label", errors.pair && "label--error")}
								>
									{errors.pair ? (
										`${errors.pair.message}`
									) : (
										<>
											Pair&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="text"
									id="pairInput"
									name="pair"
									placeholder="Pair"
									className={cx("input", errors.pair && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
							<label
								htmlFor="isReadyToBuyInput"
								className={cx("label", errors.isReadyToBuy && "label--error")}
							>
								{errors.isReadyToBuy ? (
									`${errors.isReadyToBuy.message}`
								) : (
									<>
									is Ready To Buy &nbsp;<span className="label__required">*</span>
									</>
								)}
							</label>
							<input
								type="checkbox"
								id="isReadyToBuyInput"
								name="isReadyToBuy"
								placeholder="Is Ready To Buy"
								className={cx("input", errors.isReadyToBuy && "input--error")}
								ref={register({ required: false })}

							/>
						</div>
							<div className="form__action">
								<button
									className="btn btn__icon btn__cancel"
									type="button"
									onClick={closeModal}
								>
									<CloseSVG /> Cancel
								</button>
								<button className="btn btn__primary btn__icon" type="submit">
									<CheckSVG /> {state.selectedBot ? "Update" : "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>,
				document.body
		  )
		: null;
}
