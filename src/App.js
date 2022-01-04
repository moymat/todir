import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Tasks from "./pages/Tasks";
import Lists from "./pages/Lists";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/tasks" element={<Tasks />} />
				<Route exact path="/lists" element={<Lists />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
