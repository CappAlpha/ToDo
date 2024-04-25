import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../entities/task.ts';

const LS_KEY_TASKS = 'tasks';
const LS_KEY_LAST_ID = 'lastId';

interface Props {
	tasks: Task[];
}

const initialState: Props = {
	tasks: JSON.parse(localStorage.getItem(LS_KEY_TASKS) ?? '[]')
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Pick<Task, 'title' | 'description'>>) => {
			const task: Task = {
				id: Number(localStorage.getItem(LS_KEY_LAST_ID)) + 1,
				title: action.payload.title,
				description: action.payload.description,
				active: true
			};
			state.tasks.push(task);
			localStorage.setItem(LS_KEY_TASKS, JSON.stringify(state.tasks));
			localStorage.setItem(LS_KEY_LAST_ID, JSON.stringify(task.id));
		},
		removeTask: (state, action: PayloadAction<Task>) => {
			state.tasks = state.tasks.filter(
				({ id }) => id !== action.payload.id
			);
			localStorage.setItem(LS_KEY_TASKS, JSON.stringify(state.tasks));
		},
		changeTask: (state, action: PayloadAction<Pick<Task, 'id' | 'title' | 'description'>>) => {
			state.tasks = state.tasks.map(
				(task) => task.id === action.payload.id ?
					{ ...task, title: action.payload.title, description: action.payload.description } :
					task
			);
			localStorage.setItem(LS_KEY_TASKS, JSON.stringify(state.tasks));
		},
		setActive: (
			state,
			action: PayloadAction<Pick<Task, 'id' | 'active'>>
		) => {
			state.tasks.filter(
				({ id }) => id === action.payload.id
			)[0].active = action.payload.active;
			localStorage.setItem(LS_KEY_TASKS, JSON.stringify(state.tasks));
		}
	}
});

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
