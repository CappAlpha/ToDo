import { FC } from 'react';
import { useForm } from 'react-hook-form';
import s from './addTaskForm.module.scss';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface TaskInput {
	taskTitle: string;
	taskDescription: string;
}

interface Props {
	addTask: ActionCreatorWithPayload<{
    title: string;
    description: string;
}, "tasks/addTask">;
}

export const AddTaskForm: FC<Props> = ({ addTask }) => {
	const { register, handleSubmit } = useForm<TaskInput>();

	const onSubmit = handleSubmit((data, e) => {
		addTask({ title: data.taskTitle, description: data.taskDescription });
		e?.target.reset()
	});

	return (
		<form onSubmit={onSubmit} className={s.form}>
			<input
				className={s.input}
				type="title"
				placeholder="Введите заголовок"
				{...register('taskTitle', { required: true })}
			/>
			<input
				className={s.input}
				type="description"
				placeholder="Введите описание"
				{...register('taskDescription', { required: true })}
			/>
			<Button htmlType='submit' ghost type='dashed' className={s.button} icon={<ArrowRightOutlined />}>
				<span>Добавить задачу</span>
			</Button>
		</form>
	);
};
