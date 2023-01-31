export const assignEditFunctions = async (task) => {
	const editButton = document.getElementById(`edit-${task._id}`);
	editButton.onclick = async () => {
		// swap title and description for input fields
		const taskDiv = document.getElementById(`task-${task._id}`);
		const oldTitle = taskDiv.querySelector('.title');
		const oldDescription = taskDiv.querySelector('.description');
		const titleInput = document.createElement('input');
		const descriptionInput = document.createElement('input');
		titleInput.classList.add('title-input');
		titleInput.value = oldTitle.innerHTML;
		oldTitle.replaceWith(titleInput);
		oldDescription.replaceWith(descriptionInput);
		descriptionInput.classList.add('description-input');
		descriptionInput.value = oldDescription.innerHTML;
	};
	document.addEventListener('keydown', async (e) => {
		if (e.key === 'Enter') {
			try {
				const taskDiv = document.getElementById(`task-${task._id}`);
				const titleInput = taskDiv.querySelector('.title-input');
				const descriptionInput =
					taskDiv.querySelector('.description-input');
				if (titleInput.value.trim() == '') {
					document
						.getElementsByClassName('title-input')[0]
						.classList.add('error');
					setTimeout(() => {
						document
							.getElementsByClassName('title-input')[0]
							.classList.remove('error');
					}, 500);
				}

				let newTitle = document.createElement('span');
				newTitle.classList.add('title');
				newTitle.innerHTML = titleInput.value;
				titleInput.replaceWith(newTitle);
				let newDescription = document.createElement('span');
				newDescription.classList.add('description');
				try {
					newDescription.innerHTML = descriptionInput.value;
				} catch (err) {
					newDescription.innerHTML = '';
				}
				descriptionInput.replaceWith(newDescription);
				if (newDescription.innerHTML.trim() == '') {
					newTitle.style.marginBottom = '0';
				}
				const response = await fetch(
					`http://localhost:3000/tasks/${task._id}`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							title: newTitle.innerHTML,
							description: newDescription.innerHTML,
						}),
					}
				);
			} catch (err) {
				console.log(err);
			}
		} else if (e.key === 'Escape') {
			const taskDiv = document.getElementById(`task-${task._id}`);
			const titleInput = taskDiv.querySelector('.title-input');
			const descriptionInput =
				taskDiv.querySelector('.description-input');
			let newTitle = document.createElement('span');
			newTitle.classList.add('title');
			newTitle.innerHTML = task.title;
			titleInput.replaceWith(newTitle);
			let newDescription = document.createElement('span');
			newDescription.classList.add('description');
			newDescription.innerHTML = task.description;
			descriptionInput.replaceWith(newDescription);
			if (newDescription.innerHTML.trim() == '') {
				newTitle.style.marginBottom = '0';
			}
		}
	});
};
