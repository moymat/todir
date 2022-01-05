import { useState, useEffect, createContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { countTasks, isUrgent } from "./utils/functions";
import axios from "./utils/axios";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Tasks from "./pages/Tasks";
import Lists from "./pages/Lists";
import NewTask from "./pages/NewTask";
import NewList from "./pages/NewList";
import "./App.css";
import { format } from "date-fns";

export const ListsContext = createContext([]);
export const TasksContext = createContext([]);

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [lists, setLists] = useState([]);
	const navigate = useNavigate();

	const setTaskCompleted = async id => {
		const now = format(Date.now(), "yyyy-MM-dd");
		await axios.patch(`/tasks/${id}`, {
			completed: now,
		});
		setTasks(
			tasks.map(task =>
				task.id === id ? { ...task, completed: now } : { ...task }
			)
		);
	};

	const deleteTask = async id => {
		await axios.delete(`/tasks/${id}`);
		setTasks(tasks.filter(task => task.id !== id));
	};

	const addOrUpdateTask = async newTask => {
		const { dueDate, id } = newTask;
		if (id !== undefined) {
			setTasks(
				tasks.map(task => (task.id === id ? { ...task, ...newTask } : task))
			);
			await axios.patch(`/tasks/${id}`, newTask);
			navigate("/tasks", { state: { expanded: id } });
		} else {
			newTask.id = Math.max(...tasks.map(task => task.id)) + 1;
			setTasks([...tasks, { ...newTask, urgent: isUrgent(dueDate) }]);
			await axios.post(`/tasks`, newTask);
			navigate("/tasks", { state: { expanded: newTask.id } });
		}
	};

	const deleteList = async id => {
		await axios.delete(`/lists/${id}`);
		setLists(lists.filter(list => list.id !== id));
	};

	const addOrUpdateList = async newList => {
		const { id } = newList;
		if (id !== undefined) {
			await axios.patch(`/lists/${id}`, newList);
			setLists(lists.map(list => (list.id === id ? newList : list)));
			navigate("/lists", { state: { expanded: id } });
		} else {
			newList.id = Math.max(...lists.map(list => list.id)) + 1;
			await axios.post(`/lists`, newList);
			setLists([...lists, { ...newList, amount: 0 }]);
			navigate("/lists", { state: { expanded: newList.id } });
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const [{ data: tasksData }, { data: listData }] = await Promise.all([
				axios.get("/tasks"),
				axios.get("/lists"),
			]);

			const formatedTasks = tasksData.map(task => ({
				...task,
				urgent: isUrgent(task.dueDate),
			}));
			setTasks(formatedTasks);

			const formatedLists = listData.map(list => ({
				...list,
				amount: countTasks(tasksData, list),
			}));
			setLists(formatedLists);
		};

		fetchData();
	}, []);

	return (
		<TasksContext.Provider
			value={{ tasks, setTaskCompleted, deleteTask, addOrUpdateTask }}>
			<ListsContext.Provider value={{ lists, deleteList, addOrUpdateList }}>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/tasks" element={<Tasks />} />
					<Route exact path="/new-task" element={<NewTask />} />
					<Route exact path="/lists" element={<Lists />} />
					<Route exact path="/new-list" element={<NewList />} />
				</Routes>
			</ListsContext.Provider>
		</TasksContext.Provider>
	);
};

export default App;
