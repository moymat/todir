import { useContext } from "react";
import { ListsContext } from "../App";
import "../styles/small-task.css";

const SmallTask = ({ task, goToTask }) => {
	const { lists } = useContext(ListsContext);

	const handleTaskClick = () => {
		goToTask(task.id);
	};

	return (
		<div
			className={`small-task ${task.completed ? "completed" : ""}`}
			onClick={handleTaskClick}>
			<h6
				style={
					task.completed
						? {}
						: {
								color: lists.find(list => list.id === task.list).color,
						  }
				}>
				{task.title}
			</h6>
		</div>
	);
};

export default SmallTask;
