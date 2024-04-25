import { FC, useEffect, useRef, useState } from 'react';
import s from './Task.module.scss';
import { useActions } from '../../../hooks/useActions.ts';
import { Task as TaskI } from '../../../entities/task.ts';
import { CheckCircleFilled, CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import cn from 'classnames';

interface Props {
	task: TaskI;
}

const TIME_ANIMATION_MS = 300;

export const Task: FC<Props> = ({ task }) => {
	const { active: activeInit, title: titleInit, description: descriptionInit, id } = task;

	const { removeTask, setActive, changeTask } = useActions();
	const inputTitle = useRef<HTMLInputElement>(null);
	const inputDescription = useRef<HTMLInputElement>(null);
	const [active, setLocalActive] = useState(activeInit);
	const [change, setChange] = useState(false);
	const [deleteAnim, setDeleteAnim] = useState(false);
	const [title, setTitle] = useState(titleInit);
	const [description, setDescription] = useState(descriptionInit)

	const turnActive = () => setLocalActive((prev) => !prev);
	const turnChange = () => setChange((prev) => !prev);

	const deleteTask = () => {
		setDeleteAnim(true);
		setTimeout(() => {
			removeTask(task)
		}, TIME_ANIMATION_MS);
	};

	useEffect(() => {
		setActive({ id: id, active: active });
		changeTask({ id: id, title: title, description: description })
	}, [active, title, setTitle, description, setDescription]);

	return (
		<div className={cn(s.task, deleteAnim && s.anim, !active && s.checked)}>
			<div className={s.top}>
				<div>
					{!active ?
						<CheckCircleFilled className={s.radio} onClick={turnActive} /> :
						<CheckCircleOutlined className={s.radio} onClick={turnActive} />
					}
				</div>
				<button
					className={s.button}
					onClick={turnChange}
					disabled={!active}
				>
					<EditOutlined className={s.icon} />
				</button>
			</div>
			<input
				ref={inputTitle}
				className={cn(s.title, !active && s.checked, change && s.change)}
				type="title"
				placeholder={title}
				value={title}
				onKeyDown={(e) => {
					setTitle(inputTitle.current?.value ?? title);
					e.key === 'Enter' && turnChange();
				}}
				onChange={() => setTitle(inputTitle.current?.value ?? title)}
				disabled={!change}
			/>
			<input
				ref={inputDescription}
				className={cn(s.description, !active && s.checked, change && s.change)}
				type="description"
				placeholder={description}
				value={description}
				onKeyDown={(e) => {
					setDescription(inputDescription.current?.value ?? description)
					e.key === 'Enter' && turnChange();
				}}
				onChange={() => setDescription(inputDescription.current?.value ?? description)}
				disabled={!change}
			/>
			<button
				className={s.button}
				onClick={deleteTask}
			>
				<DeleteOutlined className={s.icon} />
			</button>
		</div>
	);
};
