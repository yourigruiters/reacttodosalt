import React, { Component } from "react";
import "./App.css";
import Todolist from "./components/todolist/Todolist";
import Form from "./components/form/Form";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
	constructor(props) {
		super(props);

		this.openForm = this.openForm.bind(this);
		this.sendTodoToForm = this.sendTodoToForm.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.updateTodo = this.updateTodo.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);

		this.state = {
			todos: [],
			isOpen: false,
			formData: {
				id: 0,
				title: "",
				description: "",
				location: "",
			},
			formErrors: {},
		};
	}

	openForm(value) {
		this.setState({
			formData: {
				id: 0,
				title: "",
				description: "",
				location: "",
			},
			formErrors: {},
			isOpen: value ? false : true,
		});
	}

	sendTodoToForm(todoId) {
		const todo = this.state.todos.find((todo) => todo.id === todoId);

		this.setState({
			formData: {
				id: todo.id,
				title: todo.title,
				description: todo.description,
				location: todo.location,
			},
			formErrors: {},
			isOpen: true,
		});
	}

	handleFormChange(event) {
		this.setState({
			formData: {
				...this.state.formData,
				[event.target.name]: event.target.value,
			},
		});
	}

	handleFormSubmit(todoId) {
		const result = this.validateData();

		if (Object.keys(result).length > 0) {
			this.setState({
				formErrors: result,
			});
			return false;
		}

		if (todoId !== 0) {
			const newTodos = this.state.todos.map((todo) => {
				if (todo.id === todoId) {
					todo.title = this.state.formData.title;
					todo.description = this.state.formData.description;
					todo.location = this.state.formData.location;
				}

				return todo;
			});

			this.setState({
				todos: newTodos,
			});
		} else {
			const newTodo = {
				id: uuidv4(),
				state: true,
				title: this.state.formData.title,
				description: this.state.formData.description,
				location: this.state.formData.location,
				added: new Date(),
			};

			this.setState({
				todos: [...this.state.todos, newTodo],
			});
		}

		this.openForm("reset");
	}

	validateData() {
		const fieldToCheck = ["title", "location"];
		const fieldToCheckErrors = {
			title: "Please enter a title..",
			location: "Please enter a location..",
		};

		const errors = {};

		fieldToCheck.forEach((field) => {
			if (
				!this.state.formData[field] ||
				this.state.formData[field].match(/^ *$/)
			) {
				errors[field] = fieldToCheckErrors[field];
			}
		});
		return errors;
	}

	updateTodo(todoId) {
		const newTodos = this.state.todos.map((todo) => {
			if (todo.id === todoId) {
				todo.state = !todo.state;
			}

			return todo;
		});

		this.setState({
			todos: newTodos,
		});
	}

	deleteTodo(todoId) {
		const newTodos = this.state.todos.filter((todo) => todo.id !== todoId);

		this.setState({
			todos: newTodos,
		});

		this.openForm("reset");
	}

	render() {
		return (
			<section className="application">
				<Todolist
					todos={this.state.todos}
					sendTodoToForm={this.sendTodoToForm}
					updateTodo={this.updateTodo}
					deleteTodo={this.deleteTodo}
				/>
				<Form
					isOpen={this.state.isOpen}
					formData={this.state.formData}
					formErrors={this.state.formErrors}
					openForm={this.openForm}
					handleChange={this.handleFormChange}
					handleSubmit={this.handleFormSubmit}
				/>
			</section>
		);
	}
}

export default App;
