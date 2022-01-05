import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TasksContext } from "../App";
import { sortTasks } from "../utils/functions";
import Task from "../components/Task";

const Tasks = () => {
	const [taskExpanded, setTaskExpanded] = useState(null);
	const { tasks } = useContext(TasksContext);
	const { state } = useLocation();

	useEffect(() => {
		state?.expanded !== undefined && setTaskExpanded(state.expanded);
	}, [state]);

	return (
		<main className="main-container">
			<h1 className="page-title">Mes tâches</h1>
			<section>
				<h2 className="secondary-title">En cours</h2>
				{tasks ? (
					tasks
						.filter(task => !task.completed)
						.sort(sortTasks)
						.map(task => (
							<Task
								key={task.id}
								task={task}
								taskExpanded={taskExpanded}
								setTaskExpanded={setTaskExpanded}
								extended
							/>
						))
				) : (
					<p>Pas de tâches en cours</p>
				)}
				<Link className="btn" to="/new-task">
					Ajouter une tâche
				</Link>
			</section>
			<section>
				<h2 className="secondary-title">Complétées</h2>
				{tasks
					.filter(task => task.completed)
					.sort(sortTasks)
					.map(task => (
						<Task
							key={task.id}
							task={task}
							taskExpanded={taskExpanded}
							setTaskExpanded={setTaskExpanded}
							extended
						/>
					))}
			</section>
		</main>
	);
};

export default Tasks;
