import { createTaskDiv } from './createTaskDiv.js';
import { assignDeleteFunctions } from './deleteTask.js';
import { assignCompleteFunctions } from './completeTask.js';
import { checkTaskComplete } from './checkTaskComplete.js';
import { assignEditFunctions } from './editTask.js';

class Task {
	constructor(title, description, complete = false) {
		this.title = title;
		this.description = description;
		this.complete = complete;
	}
}

window.onload = () => {
	// Get all tasks from database
	fetch('http://localhost:3000/tasks', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		// Create a div for each task
		.then((data) => {
			console.table(data);
			data.forEach((taskData) => {
				createTaskDiv(
					taskData._id,
					taskData.title,
					taskData.description,
					taskData.complete
				);
				checkTaskComplete(taskData);
				assignDeleteFunctions(taskData);
				assignCompleteFunctions(taskData);
				assignEditFunctions(taskData);
			});
		});
};

const form = document.getElementById('task-form');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const title = document.getElementsByClassName('title-input')[0];
	const description = document.getElementsByClassName('description-input')[0];

	if (title.value.trim() != '') {
		try {
			// Send task to database
			fetch('http://localhost:3000/tasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(
					new Task(title.value, description.value, false)
				),
			})
				.then((response) => response.json())
				.then((data) => {
					// Create a div for the task
					createTaskDiv(
						data._id,
						data.title,
						data.description,
						data.complete
					);
					checkTaskComplete(data);
					assignDeleteFunctions(data);
					assignCompleteFunctions(data);
					assignEditFunctions(data);
				});
			form.reset();
		} catch (err) {
			console.error(err);
		}
	} else {
		title.classList.add('error');
		setTimeout(() => {
			title.classList.remove('error');
		}, 500);
	}
});
