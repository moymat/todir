import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ListsContext, TasksContext } from "../App";
import { sortTasks } from "../utils/functions";
import Task from "../components/Task";
import List from "../components/List";
import "../styles/home.css";

const Home = () => {
	const { tasks } = useContext(TasksContext);
	const { lists } = useContext(ListsContext);
	const navigate = useNavigate();

	const onTaskClick = id => {
		navigate("/tasks", { state: { expanded: id } });
	};

	const onListClick = id => {
		navigate("/lists", { state: { expanded: id } });
	};

	return (
		<main className="main-container">
			<section className="hero">
				<h1>Bienvenue sur ToDit</h1>
				<p>
					Occaecat aute dolor et laboris do. Amet nulla ipsum mollit commodo
					elit.
				</p>
			</section>
			<section>
				<h2 className="section-title">Mes tâches urgentes</h2>
				{tasks
					.filter(task => task.urgent)
					.sort(sortTasks)
					.map((task, i) => (
						<div
							className="task-container"
							key={task.id}
							onClick={() => onTaskClick(task.id)}>
							<Task task={task} />
						</div>
					))}
				<Link className="btn" to="/tasks">
					Toutes mes tâches
				</Link>
			</section>
			<section>
				<h2 className="section-title">Mes listes actives</h2>
				{lists
					.sort((a, b) => (a.amount - b.amount < 0 ? 1 : -1))
					.map(list =>
						list.amount ? (
							<div
								className="list-container"
								key={list.id}
								onClick={() => onListClick(list.id)}>
								<List list={list} />
							</div>
						) : null
					)}
				<Link className="btn" to="/lists">
					Toutes mes listes
				</Link>
			</section>
		</main>
	);
};

export default Home;
