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

export const ListsContext = createContext([]);
export const TasksContext = createContext([]);

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [lists, setLists] = useState([]);
	const navigate = useNavigate();

	const setTaskCompleted = async id => {
		await axios.patch(`/tasks/${id}`, {
			completed: true,
		});
		setTasks(
			tasks.map(task =>
				task.id === id ? { ...task, completed: true } : { ...task }
			)
		);
	};

	const deleteTask = async id => {
		await axios.delete(`/tasks/${id}`);
		setTasks(tasks.filter(task => task.id !== id));
	};

	const addOrUpdateTask = async (inputs, id) => {
		if (id !== undefined) {
			const task = tasks.find(task => task.id === id);
			const newTask = { ...task, ...inputs };
			setTasks(
				tasks.map(task => (task.id === id ? { ...newTask } : { ...task }))
			);
			delete newTask.urgent;
			await axios.patch(`/tasks/${id}`, newTask);
			navigate("/tasks", { state: { expanded: id } });
		} else {
			const nextId = Math.max(...tasks.map(task => task.id)) + 1;
			const newTask = { id: nextId, ...inputs };
			setTasks([...tasks, newTask]);
			await axios.post(`/tasks`, newTask);
			navigate("/tasks", { state: { expanded: nextId } });
		}
	};

	const deleteList = async id => {
		await axios.delete(`/lists/${id}`);
		setLists(lists.filter(list => list.id !== id));
	};

	const addOrUpdateList = async (inputs, id) => {
		if (id !== undefined) {
			const list = lists.find(list => list.id === id);
			const newList = { ...list, ...inputs };
			setLists(
				lists.map(list => (list.id === id ? { ...newList } : { ...list }))
			);
			delete list.amount;
			await axios.patch(`/lists/${id}`, newList);
			navigate("/lists", { state: { expanded: id } });
		} else {
			const nextId = Math.max(...lists.map(list => list.id)) + 1;
			const newList = { id: nextId, amount: 0, ...inputs };
			setLists([...lists, newList]);
			await axios.post(`/lists`, newList);
			navigate("/lists", { state: { expanded: nextId } });
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
