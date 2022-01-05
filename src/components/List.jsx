import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListsContext, TasksContext } from "../App";
import { sortTasks } from "../utils/functions";
import "../styles/list.css";
import SmallTask from "./SmallTask";

const List = ({ extended = false, list, listExpanded, setListExpanded }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [relatedTasks, setRelatedTasks] = useState([]);
	const { tasks } = useContext(TasksContext);
	const { deleteList } = useContext(ListsContext);
	const navigate = useNavigate();

	const toggleExpand = () => {
		isExpanded ? setListExpanded(null) : setListExpanded(list.id);
	};

	const handleEditClick = () => {
		navigate("/new-list", { state: { list } });
	};

	const handleDeleteClick = () => {
		deleteList(list.id);
	};

	const goToTask = id => {
		navigate("/tasks", { state: { expanded: id } });
	};

	useEffect(() => {
		setIsExpanded(listExpanded === list.id);
	}, [listExpanded, list]);

	useEffect(() => {
		setRelatedTasks(
			tasks
				.filter(task => task.list === list.id)
				.sort((a, b) =>
					a.completed && !b.completed
						? 1
						: !a.completed && b.completed
						? -1
						: sortTasks(a, b)
				)
		);
	}, [tasks, list]);

	return (
		<div
			className="list"
			style={{
				backgroundColor: `${list.color}7F`,
				borderColor: list.color,
			}}>
			<div className="main-bar">
				<div className={`title-container ${extended ? "extended" : ""}`}>
					{extended &&
						(relatedTasks.length ? (
							<span onClick={toggleExpand} className="expand material-icons">
								expand_{isExpanded ? "less" : "more"}
							</span>
						) : (
							<span
								onClick={handleDeleteClick}
								className="delete-list material-icons">
								cancel
							</span>
						))}
					<h6 className="list-title">{list.title}</h6>
				</div>
				<div className="btn-container">
					<p className="list-amount">
						{list.amount} tâche{`${list.amount > 1 ? "s" : ""}`}
					</p>
				</div>
			</div>
			{extended && (
				<div className={`tasks-bar ${isExpanded ? "" : "hidden"}`}>
					<div className="tasks-container">
						{relatedTasks.map(task => (
							<SmallTask goToTask={goToTask} task={task} key={task.id} />
						))}
					</div>
					<button className="btn" onClick={handleEditClick}>
						<span className="icon material-icons">edit</span>Editer
					</button>
				</div>
			)}
		</div>
	);
};

export default List;
