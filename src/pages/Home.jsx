import React, { useEffect } from "react";
import { format, addDays, compareAsc, parseISO } from "date-fns";
import axios from "axios";
import { useState } from "react/cjs/react.development";
import Task from "../components/Task";
import List from "../components/List";

const Home = () => {
	const [urgentTasks, setUrgentTasks] = useState([]);
	const [lists, setLists] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const { data: tasksData } = await axios.get(
				"http://localhost:3004/tasks"
			);

			const oneWeekFromNow = format(addDays(Date.now(), 7), "yyyy-MM-dd");
			setUrgentTasks(
				tasksData.filter(
					task =>
						compareAsc(parseISO(task.dueDate), parseISO(oneWeekFromNow)) < 1
				)
			);

			const { data: listData } = await axios.get("http://localhost:3004/lists");
			const formatedLists = listData.map(list => ({
				...list,
				amount: tasksData.reduce(
					(acc, task) => (task.list === list.id ? acc + 1 : acc),
					0
				),
			}));
			setLists(formatedLists);
		};
		fetchData();
	}, []);

	return (
		<main className="main-container">
			<section></section>
			<section>
				<h2 className="section-title">Mes tâches urgentes</h2>
				{urgentTasks.map(task => (
					<Task task={task} key={task.id} />
				))}
			</section>
			<section>
				<h2 className="section-title">Mes listes</h2>
				{lists
					.sort((a, b) => (a.amount - b.amount < 0 ? 1 : -1))
					.map(list =>
						list.amount ? <List list={list} key={list.id} /> : null
					)}
			</section>
		</main>
	);
};

export default Home;
