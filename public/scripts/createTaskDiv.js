export const createTaskDiv = (id, title, description, complete) => {
	const taskDiv = document.createElement('div');
	taskDiv.id = `task-${id}`;
	taskDiv.classList.add('task');
	const information = document.createElement('div');
	information.classList.add('information');
	const titleSpan = document.createElement('span');
	titleSpan.classList.add('title');
	const descSpan = document.createElement('span');
	descSpan.classList.add('description');
	const buttons = document.createElement('div');
	buttons.classList.add('buttons');
	const editButton = document.createElement('button');
	editButton.id = `edit-${id}`;
	editButton.classList.add('edit-task');
	editButton.innerHTML = `<img class="edit-task-svg" src="./images/edit.svg">`;
	const completeButton = document.createElement('button');
	completeButton.id = `complete-${id}`;
	completeButton.classList.add('checkmark');
	completeButton.innerHTML = `<img class="complete-task-svg" src="./images/check.svg">`;
	const deleteButton = document.createElement('button');
	deleteButton.id = `delete-${id}`;
	deleteButton.classList.add('trashcan');
	deleteButton.innerHTML = `<img class="delete-task-svg" src="./images/trash.svg">`;

	// if (task.complete) {
	// 	taskDiv.style.opacity = 0.5;
	// }

	//! Can only complete once
	editButton.onclick = () => {
		const newTaskForm = document.createElement('form');
		const titleInput = document.createElement('input');
		const descInput = document.createElement('input');
		titleInput.classList.add('title-input');
		titleInput.value = titleSpan.innerHTML;
		descInput.classList.add('description-input');
		descInput.value = descSpan.innerHTML;
		newTaskForm.appendChild(titleInput);
		newTaskForm.appendChild(descInput);

		newTaskForm.onsubmit = async (e) => {
			e.preventDefault();
			let title = titleInput.value;
			let description = descInput.value;
			console.log(title, description);
			try {
				await fetch(`http://localhost:3000/tasks/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: id,
						title: title,
						description: description,
					}),
				});
			} catch (err) {
				console.error(err);
			}
		};

		//TODO: Disallow empty title

		const inputs = [titleInput, descInput];

		inputs.forEach((input) => {
			input.onkeydown = (e) => {
				if (e.key === 'Enter') {
					titleSpan.innerHTML = titleInput.value;
					titleInput.replaceWith(titleSpan);
					if (descInput.value.trim() === '') {
						descInput.remove();
						descSpan.remove();
						titleSpan.style.marginBottom = '0';
					} else {
						descSpan.innerHTML = descInput.value;
						descInput.replaceWith(descSpan);
						titleSpan.style.marginBottom = '1em';
						descSpan.style.padding = '0';
					}
					titleSpan.style.padding = '0';
					newTaskForm.onsubmit(e);
				}
			};
		});

		information.replaceWith(newTaskForm);
		newTaskForm.classList.add('information');
	};

	// completeButton.onclick = async () => {
	// 	let title = titleSpan.innerHTML;
	// 	let description = descSpan.innerHTML;
	// 	try {
	// 		await fetch(`http://localhost:3000/tasks/${id}`, {
	// 			method: 'PATCH',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({
	// 				title: title,
	// 				description: description,
	// 				complete: !task.complete,
	// 			}),
	// 		});
	// 		task.complete = !task.complete;
	// 		if (task.complete) {
	// 			taskDiv.style.opacity = 0.5;
	// 			taskDiv.animate([{ opacity: 1 }, { opacity: 0.5 }], 100);
	// 			completedTasksDaily++;
	// 		} else {
	// 			taskDiv.style.opacity = 1;
	// 			taskDiv.animate([{ opacity: 0.5 }, { opacity: 1 }], 100);
	// 			completedTasksDaily--;
	// 		}
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// 	try {
	// 		await fetch('http://localhost:3000/tasks', {
	// 			method: 'PUT',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		});
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	titleSpan.innerHTML = title;
	descSpan.innerHTML = description;

	if (descSpan.innerHTML.trim() == '') {
		descSpan.remove();
		titleSpan.style.marginBottom = 0;
	}

	information.appendChild(titleSpan);
	information.appendChild(descSpan);
	buttons.appendChild(editButton);
	buttons.appendChild(completeButton);
	buttons.appendChild(deleteButton);
	taskDiv.appendChild(information);
	taskDiv.appendChild(buttons);
	document.getElementById('taskList').appendChild(taskDiv);
};
