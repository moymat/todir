import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ListsContext, TasksContext } from "../App";
import { countTasks, sortTasks } from "../utils/functions";
import Task from "../components/Task";
import List from "../components/List";
import "../styles/home.css";
import { useState } from "react/cjs/react.development";

const Home = () => {
	const { tasks } = useContext(TasksContext);
	const { lists } = useContext(ListsContext);
	const [activeLists, setActiveLists] = useState([]);
	const navigate = useNavigate();

	const onTaskClick = id => {
		navigate("/tasks", { state: { expanded: id } });
	};

	const onListClick = id => {
		navigate("/lists", { state: { expanded: id } });
	};

	useEffect(() => {
		setActiveLists(
			lists
				.map(list => ({ ...list, amount: countTasks(tasks, list) }))
				.filter(list => list.amount > 0)
		);
	}, [lists, tasks]);

	return (
		<main className="main-container">
			<section className="hero">
				<h1>Bienvenue sur ToDit</h1>
				<p>Bienvenue sur votre application de gestion de tâches.</p>
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
				{activeLists
					.sort((a, b) => (a.amount - b.amount < 0 ? 1 : -1))
					.map(list => (
						<div
							className="list-container"
							key={list.id}
							onClick={() => onListClick(list.id)}>
							<List list={list} />
						</div>
					))}
				<Link className="btn" to="/lists">
					Toutes mes listes
				</Link>
			</section>
		</main>
	);
};

export default Home;
