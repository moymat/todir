import { addDays, compareAsc, parseISO } from "date-fns";

export const isUrgent = date => {
	const oneWeekFromNow = addDays(Date.now(), 7);
	return compareAsc(parseISO(date), oneWeekFromNow) < 1;
};

export const sortTasks = (a, b) =>
	compareAsc(parseISO(a.dueDate), parseISO(b.dueDate));

export const countTasks = (tasks, list) =>
	tasks.reduce(
		(acc, task) => (task.list === list.id && !task.completed ? acc + 1 : acc),
		0
	);
