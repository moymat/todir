import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { ListsContext } from "../App";
import List from "../components/List";

const Lists = () => {
	const [listExpanded, setListExpanded] = useState(null);
	const { lists } = useContext(ListsContext);
	const { state } = useLocation();

	useEffect(() => {
		state?.expanded !== undefined && setListExpanded(state.expanded);
	}, [state]);

	return (
		<main className="main-container">
			<h1 className="page-title">Mes listes</h1>
			<section>
				{lists ? (
					lists.map(list => (
						<List
							key={list.id}
							list={list}
							setListExpanded={setListExpanded}
							listExpanded={listExpanded}
							extended
						/>
					))
				) : (
					<p>Pas de liste</p>
				)}
				<Link className="btn" to="/new-list">
					Ajouter une liste
				</Link>
			</section>
		</main>
	);
};

export default Lists;
