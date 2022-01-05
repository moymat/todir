import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ListsContext } from "../App";
import "../styles/newList.css";

const NewList = () => {
	const [list, setList] = useState(null);
	const { addOrUpdateList } = useContext(ListsContext);
	const [inputs, setInputs] = useState({
		title: "",
		color: "#000000",
	});
	const colorCircle = useRef();
	const { state } = useLocation();
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();
		list
			? addOrUpdateList({ ...inputs, id: list.id })
			: addOrUpdateList(inputs);
	};

	const handleChange = e => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleCancel = () => {
		navigate("/lists", { state: list ? { expanded: list.id } : {} });
	};

	useEffect(() => {
		if (state?.list) {
			setInputs({
				title: state.list.title,
				color: state.list.color,
			});
			setList(state.list);
		}
	}, [state]);

	useEffect(() => {
		colorCircle.current.style.backgroundColor = inputs.color;
	}, [inputs.color]);

	return (
		<main className="main-container">
			<h1 className="page-title">{`${
				list ? "Modifier la " : "Ajouter une "
			}liste`}</h1>
			<form className="list-form" onSubmit={handleSubmit}>
				<div className="input-container" id="title-group">
					<label htmlFor="title">Titre</label>
					<input
						onChange={handleChange}
						type="text"
						id="title"
						name="title"
						value={inputs.title}
						required
					/>
				</div>
				<div className="input-container" id="color-group">
					<label htmlFor="color">Couleur</label>
					<div className="color-picker">
						<div className="color-circle" ref={colorCircle}></div>
						<input
							onChange={handleChange}
							type="color"
							name="color"
							value={inputs.color}
							id="color"
							required
						/>
						<span className="material-icons">colorize</span>
					</div>
				</div>
				<div className="form-btns-container">
					<button className="btn add-btn" type="submit">
						{list ? "Modifier" : "Ajouter"}
					</button>
					<button className="btn cancel-btn" onClick={handleCancel}>
						Annuler
					</button>
				</div>
			</form>
		</main>
	);
};

export default NewList;
