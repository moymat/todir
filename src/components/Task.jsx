import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { isUrgent, formatDate } from "../utils/functions";
import { ListsContext, TasksContext } from "../App";
import "../styles/task.css";

const Task = ({ extended = false, task, taskExpanded, setTaskExpanded }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [relatedList, setRelatedList] = useState(null);
	const { setTaskCompleted, deleteTask } = useContext(TasksContext);
	const { lists } = useContext(ListsContext);
	const navigate = useNavigate();

	const toggleExpand = () => {
		isExpanded ? setTaskExpanded(null) : setTaskExpanded(task.id);
	};

	const handleCompleteClick = () => {
		setTaskCompleted(task.id);
	};

	const handleDeleteClick = () => {
		deleteTask(task.id);
	};

	const handleEditClick = () => {
		navigate("/new-task", { state: { task } });
	};

	useEffect(() => {
		setIsExpanded(taskExpanded === task.id);
		setRelatedList(lists.find(list => list.id === task.list));
	}, [taskExpanded, task, lists]);

	return (
		<div
			className={`task ${task.completed ? "completed" : ""}`}
			style={{
				backgroundColor: task.completed ? "" : `${relatedList?.color}7F`,
			}}>
			<div className={`main-bar ${isExpanded ? "expanded" : ""}`}>
				<div className={`title-container ${extended ? "extended" : ""}`}>
					{extended && (
						<span onClick={toggleExpand} className="expand material-icons">
							expand_{isExpanded ? "less" : "more"}
						</span>
					)}
					<h6
						className="task-title"
						style={{ color: task.completed ? relatedList?.color : "" }}>
						{task.title}
					</h6>
					{isUrgent(task.dueDate) && extended && (
						<span className="alert material-icons">warning</span>
					)}
				</div>
				<div className="task-info">
					<p className="task-list">
						Liste : {relatedList ? relatedList.title : "chargement..."}
					</p>
					{
						<p className="task-date">
							{task.completed
								? `Complétée le ${formatDate(task.completed)}`
								: `Pour le ${formatDate(task.dueDate)}`}
						</p>
					}
				</div>
				<div className="btns-container">
					<span
						className="task-btn validate-btn material-icons"
						onClick={handleCompleteClick}>
						check_circle
					</span>
					<span
						className="task-btn cancel-btn material-icons"
						onClick={handleDeleteClick}>
						cancel
					</span>
				</div>
			</div>
			{extended && (
				<div className={`details-bar ${isExpanded ? "" : "hidden"}`}>
					<p className="description">{task.description || "Pas de détails"}</p>
					{!task.completed && (
						<button className="btn" onClick={handleEditClick}>
							<span className="icon material-icons">edit</span>Editer
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Task;
