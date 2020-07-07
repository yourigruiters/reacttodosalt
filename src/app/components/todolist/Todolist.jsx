import React, { Component } from "react";
import "./Todolist.css";
import List from "../../../utils/images/list.png";
import Todo from "./components/todo/Todo";

class Todolist extends Component {
	constructor(props) {
		super(props);

		this.handleHeaderClick = this.handleHeaderClick.bind(this);

		this.state = {
			activeOpen: true,
			doneOpen: true,
		};
	}

	handleHeaderClick(value) {
		this.setState({
			[value]: !this.state[value],
		});
	}

	render() {
		const { todos, sendTodoToForm, deleteTodo, updateTodo } = this.props;
		const { activeOpen, doneOpen } = this.state;

		const activeTodos = todos.filter((todo) => todo.state);
		const doneTodos = todos.filter((todo) => !todo.state);

		activeTodos.sort(function (a, b) {
			a = new Date(a.dateModified);
			b = new Date(b.dateModified);
			return a > b ? -1 : a < b ? 1 : 0;
		});

		doneTodos.sort(function (a, b) {
			a = new Date(a.dateModified);
			b = new Date(b.dateModified);
			return a > b ? -1 : a < b ? 1 : 0;
		});

		return (
			<section className="todolist">
				<article className="header">
					<section className="logo">
						<img src={List} alt="logo" />
					</section>
					<section className="title">
						<h1>Personal Todo's</h1>
					</section>
				</article>
				<section className="todolist__items">
					<article
						className="todolist__title todolist__title--first"
						onClick={() => this.handleHeaderClick("activeOpen")}
					>
						<h3>Active ({activeTodos.length})</h3>
					</article>
					{activeOpen &&
						(activeTodos.length > 0 ? (
							<article className="todolist__todos">
								{activeTodos.map((todo, index) => (
									<Todo
										todo={todo}
										key={index}
										sendTodoToForm={sendTodoToForm}
										deleteTodo={deleteTodo}
										updateTodo={updateTodo}
									/>
								))}
							</article>
						) : (
							<article className="todolist__todos">
								<p className="todolist__desc">You have no active todo's...</p>
							</article>
						))}

					<article
						className="todolist__title"
						onClick={() => this.handleHeaderClick("doneOpen")}
					>
						<h3>Completed ({doneTodos.length})</h3>
					</article>
					{doneOpen &&
						(doneTodos.length > 0 ? (
							<article className="todolist__todos">
								{doneTodos.map((todo, index) => (
									<Todo
										todo={todo}
										key={index}
										sendTodoToForm={sendTodoToForm}
										deleteTodo={deleteTodo}
										updateTodo={updateTodo}
									/>
								))}
							</article>
						) : (
							<article className="todolist__todos">
								<p className="todolist__desc">
									You have no completed todo's...
								</p>
							</article>
						))}
				</section>
			</section>
		);
	}
}

export default Todolist;
