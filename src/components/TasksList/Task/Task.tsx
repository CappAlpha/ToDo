import { FC, useEffect, useState } from 'react';
import s from './Task.module.scss';
import { useActions } from '../../../hooks/useActions.ts';
import { Task as TaskI } from '../../../entities/task.ts';
import { CheckCircleFilled, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import cn from 'classnames';

interface Props {
	task: TaskI;
}

const TIME_ANIMATION_MS = 300;

export const Task: FC<Props> = ({ task }) => {
	const { active: activeTask, title, description, id } = task;
	const [active, setLocalActive] = useState(activeTask);
	const [deleteAnim, setDeleteAnim] = useState(false);
	const { removeTask, setActive } = useActions();

	const turnActive = () => setLocalActive((prev) => !prev);
	const deleteTask = () => {
		setDeleteAnim(true);
		setTimeout(() => {
			removeTask(task)
		}, TIME_ANIMATION_MS);
	};

	useEffect(() => {
		setActive({ id: id, active: active })
	}, [active]);

	return (
		<div className={cn(s.task, deleteAnim && s.anim, !active && s.checked)}>
			<div>
				{!active ?
					<CheckCircleFilled className={s.radio} onClick={turnActive} /> :
					<CheckCircleOutlined className={s.radio} onClick={turnActive} />
				}
			</div>
			<p className={cn(s.title, !active && s.checked)}>
				{title}
			</p>
			<p className={cn(s.description, !active && s.checked)}>
				{description}
			</p>
			<button
				className={s.button}
				onClick={deleteTask}
			>
				<DeleteOutlined />
			</button>
		</div>
	);
};
