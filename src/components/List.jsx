import React from "react";
import "../styles/list.css";

const List = ({ extended = false, list }) => {
	return (
		<div className="list">
			<h6 className="list-title">{list.title}</h6>
			<div className="btn-container">
				<p className="list-amount">
					{list.amount} tâche{`${list.amount > 1 ? "s" : ""}`}
				</p>
				<span className="material-icons-outlined">chevron_right</span>
			</div>
		</div>
	);
};

export default List;
