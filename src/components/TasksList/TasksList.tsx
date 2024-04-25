import { FC } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector.ts';
import s from './TasksList.module.scss';
import { Task as TaskI } from '../../entities/task.ts';
import { Task } from './Task/Task.tsx';

export const TasksList: FC = () => {
	const tasks: TaskI[] = useAppSelector((state) => state.tasks.tasks);
	const activeTasksCount: number = tasks.reduce(
		(accumulator: number, currentTask: TaskI) =>
			currentTask.active ? accumulator + 1 : accumulator,
		0
	);

	const completedCount = tasks.length
		? `${tasks.length - activeTasksCount} из ${tasks.length}`
		: '0';

	const sortedTasks = [...tasks]
		.map((task) => (
			<Task
				task={task}
				key={task.id}
			/>
		))
		.reverse();

	return (
		<>
			<div className={s.info}>
				<div className={s.created}>
					<span className={s.createdText}>Создано задач</span>
					<span className={s.createdCount}>{tasks.length}</span>
				</div>
				<div className={s.completed}>
					<span className={s.completedText}>Сделано задач</span>
					<span className={s.completedCount}>
						{completedCount}
					</span>
				</div>
			</div>
			{tasks.length ? (
				<div className={s.tasksList}>
					{sortedTasks}
				</div>
			) : (
				<div className={s.noTasksContainer}>
					<img src={''} alt="" />
					<p>
						<span className={s.noTasksText}>
							Список ваших задач пуст
						</span>
					</p>
				</div>
			)}
		</>
	);
};