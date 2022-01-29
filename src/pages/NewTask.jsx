import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ListsContext, TasksContext } from "../App";
import "../styles/new-task.css";

const NewTask = () => {
	const [task, setTask] = useState(null);
	const { lists } = useContext(ListsContext);
	const { addOrUpdateTask } = useContext(TasksContext);
	const [inputs, setInputs] = useState({
		title: "",
		date: "",
		list: "",
		desc: "",
	});
	const dateInput = useRef();
	const { state } = useLocation();
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();
		const newInputs = {
			title: inputs.title,
			dueDate: inputs.date,
			list: Number(inputs.list),
			description: inputs.desc,
			completed: false,
		};
		task
			? addOrUpdateTask({ ...newInputs, id: task.id })
			: addOrUpdateTask(newInputs);
	};

	const handleChange = e => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleCancel = () => {
		navigate("/tasks", { state: task ? { expanded: task.id } : {} });
	};

	useEffect(() => {
		dateInput.current.setAttribute("min", format(Date.now(), "yyyy-MM-dd"));
	}, [dateInput]);

	useEffect(() => {
		if (state?.task) {
			setInputs({
				title: state.task.title,
				date: state.task.dueDate,
				list: state.task.list,
				desc: state.task.description,
			});
			setTask(state.task);
		}
	}, [state]);

	return (
		<main className="main-container">
			<h1 className="page-title">{`${
				task ? "Modifier la " : "Ajouter une "
			}tâche`}</h1>
			<form className="task-form" onSubmit={handleSubmit}>
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
				<div className="input-container" id="date-group">
					<label htmlFor="date">Pour le</label>
					<input
						onChange={handleChange}
						ref={dateInput}
						type="date"
						name="date"
						value={inputs.date}
						id="date"
						required
					/>
				</div>
				<div className="input-container" id="list-group">
					<label htmlFor="list">Liste</label>
					<select
						onChange={handleChange}
						name="list"
						id="list"
						value={inputs.list}
						required>
						<option value="" hidden>
							Aucune liste
						</option>
						{lists.map(list => (
							<option className="list-option" key={list.id} value={list.id}>
								{list.title}
							</option>
						))}
					</select>
				</div>
				<div className="input-container" id="desc-group">
					<label htmlFor="desc">Détails</label>
					<textarea
						onChange={handleChange}
						name="desc"
						id="desc"
						value={inputs.desc}
						cols="30"
						rows="10"></textarea>
				</div>
				<div className="form-btns-container">
					<button className="btn add-btn" type="submit">
						{task ? "Modifier" : "Ajouter"}
					</button>
					<button className="btn cancel-btn" onClick={handleCancel}>
						Annuler
					</button>
				</div>
			</form>
		</main>
	);
};

export default NewTask;
