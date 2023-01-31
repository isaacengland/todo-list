export const assignEditFunctions = async (task) => {
	const editButton = document.getElementById(`edit-${task._id}`);
	const title = document.getElementById(`title-${task._id}`);
	const description = document.getElementById(`description-${task._id}`);

	const titleInput = document.createElement('input');
	titleInput.id = `title-input-${task._id}`;
	titleInput.classList.add('title-input');
	titleInput.value = title.innerHTML;

	const descriptionInput = document.createElement('input');
	descriptionInput.id = `description-input-${task._id}`;
	descriptionInput.classList.add('description-input');
	descriptionInput.value = description.innerHTML;

	editButton.onclick = async () => {
		// swap title and description for form inputs
		title.replaceWith(titleInput);
		description.replaceWith(descriptionInput);

		// submit form
		const inputs = [titleInput, descriptionInput];
		inputs.forEach((input) => {
			input.onkeydown = async (e) => {
				if (e.key === 'Escape') {
					titleInput.replaceWith(title);
					descriptionInput.replaceWith(description);
				} else if (e.key === 'Enter') {
					if (titleInput.value.trim() === '') {
						titleInput.classList.add('error');
						setTimeout(() => {
							titleInput.classList.remove('error');
						}, 500);
						return;
					}

					// swap form inputs for title and description

					titleInput.replaceWith(title);
					descriptionInput.replaceWith(description);
					if (descriptionInput.value.trim() === '') {
						descriptionInput.value.trim();
						title.style.marginBottom = '0';
					} else {
						title.style.marginBottom = '1em';
					}

					// update title and description
					title.innerHTML = titleInput.value;
					description.innerHTML = descriptionInput.value;

					// update task
					try {
						await fetch(`http://localhost:3000/tasks/${task._id}`, {
							method: 'PATCH',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								id: task._id,
								title: titleInput.value,
								description: descriptionInput.value,
							}),
						});
					} catch (err) {
						console.error(err);
					}
				}
			};
		});
	};
};
