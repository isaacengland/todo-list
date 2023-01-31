// Given an array of tasks, assign a delete function to each delete button in the DOM.

export const assignDeleteFunctions = async (task) => {
	const deleteButton = document.getElementById(`delete-${task._id}`);
	deleteButton.addEventListener('click', async () => {
		try {
			await fetch(`http://localhost:3000/tasks/${task._id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const taskDiv = document.getElementById(`task-${task._id}`);
			taskDiv.remove();
		} catch (err) {
			console.log(err);
		}
	});
};
