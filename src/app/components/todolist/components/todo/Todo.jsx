import React from "react";
import "./Todo.css";
import Location from "../../../../../utils/images/location.png";
import Added from "../../../../../utils/images/added.png";
import Moment from "react-moment";

const Todo = ({ todo, sendTodoToForm, deleteTodo, updateTodo }) => {
	return (
		<section className="todo">
			<article className="todo__content" onClick={() => updateTodo(todo.id)}>
				<p className="todo__title">{todo.title}</p>
				<section className="todo__content__info">
					<article>
						<img src={Location} alt="location" />
						<p>{todo.location}</p>
					</article>
					<article>
						<img src={Added} alt="added" />
						<p>
							<Moment format="YYYY/MM/DD">{todo.added}</Moment>
						</p>
					</article>
				</section>
				<p className="todo__description">{todo.description}</p>
			</article>
			<article className="todo__buttons">
				{todo.state ? (
					<button onClick={() => sendTodoToForm(todo.id)}>Update</button>
				) : (
					<button
						className="todo__buttons--remove"
						onClick={() => deleteTodo(todo.id)}
					>
						Remove
					</button>
				)}
			</article>
		</section>
	);
};

export default Todo;
