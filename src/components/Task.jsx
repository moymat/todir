import React from "react";
import "../styles/task.css";

const Task = ({ extended = false, task }) => {
	return (
		<div className="task">
			<h6 className="task-title">{task.title}</h6>
			<div className="btns-container">
				<span className="task-btn material-icons-outlined">done</span>
				<span className="task-btn material-icons-outlined">close</span>
			</div>
		</div>
	);
};

export default Task;
