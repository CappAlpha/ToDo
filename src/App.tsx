import { FC, useEffect } from 'react';
import s from './App.module.scss';
import { AddTaskForm } from './components/AddTaskForm';
import { TasksList } from './components/TasksList';
import { useActions } from './hooks/useActions';

const STORAGE_NAME = 'HELLO_TASK';
const TASK_TITLE = 'Привет!';
const TASK_DESCRIPTION = 'Ты можешь написать свою первую задачу и удалить меня!';

const App: FC = () => {
	const { addTask } = useActions();

	//Создаёт карточку при первом заходе на сайт
	useEffect(() => {
		const storageState = localStorage.getItem(STORAGE_NAME);
		if (!storageState) {
			addTask({ title: TASK_TITLE, description: TASK_DESCRIPTION });
			localStorage.setItem(STORAGE_NAME, 'true');
		}
	});

	return (
		<>
			<div className={s.top}>
				<h1 className={s.title}>To Do</h1>
				<p className={s.description}>Не откладывай на завтра то, что можно сделать сегодня!</p>
			</div>
			<div className={s.content}>
				<AddTaskForm addTask={addTask} />
				<TasksList />
			</div>
		</>
	);
};

export default App;
