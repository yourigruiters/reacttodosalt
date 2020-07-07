import React from "react";
import "./Form.css";

const Form = ({
	isOpen,
	openForm,
	formData,
	formErrors,
	handleChange,
	handleSubmit,
}) => {
	return (
		<section className="form">
			<button onClick={() => openForm()}>Add new todo</button>
			{isOpen && (
				<section className="formarea">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(formData.id);
						}}
					>
						{formData.id !== 0 && (
							<article className="warning">
								<span>Note:</span> you are editing an excisting todo.
							</article>
						)}
						<article>
							<p>
								Todo title <span>*</span>
							</p>
							<input
								type="text"
								name="title"
								autoFocus
								maxLength="30"
								value={formData.title}
								onChange={(e) => handleChange(e)}
							/>
							{formErrors.title && (
								<span className="error">{formErrors.title}</span>
							)}
						</article>
						<article>
							<p>Todo description</p>
							<textarea
								name="description"
								value={formData.description}
								onChange={(e) => handleChange(e)}
							/>
						</article>
						<article>
							<p>
								Location <span>*</span>
							</p>
							<input
								type="text"
								name="location"
								maxLength="50"
								value={formData.location}
								onChange={(e) => handleChange(e)}
							/>
							{formErrors.location && (
								<span className="error">{formErrors.location}</span>
							)}
						</article>
						<section className="buttons">
							<input
								type="button"
								value="Close"
								onClick={() => {
									openForm("reset");
								}}
							/>
							<input
								type="submit"
								className={formData.id !== 0 && "buttons--edit"}
								value={formData.id !== 0 ? "Edit" : "Add"}
							/>
						</section>
					</form>
				</section>
			)}
		</section>
	);
};

export default Form;
