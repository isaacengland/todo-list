export const assignCompleteFunctions = async (task) => {
	const completeButton = document.getElementById(`complete-${task._id}`);
	completeButton.onclick = async () => {
		try {
			//if task is not complete, complete it. If it is complete, uncomplete it.
			await fetch(`http://localhost:3000/tasks/${task._id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					complete: !task.complete,
				}),
			});
			task.complete = !task.complete;
			const taskDiv = document.getElementById(`task-${task._id}`);
			if (task.complete) {
				taskDiv.style.opacity = 0.5;
				taskDiv.animate([{ opacity: 1 }, { opacity: 0.5 }], 100);
				// completedTasksDaily++;
			} else {
				taskDiv.style.opacity = 1;
				taskDiv.animate([{ opacity: 0.5 }, { opacity: 1 }], 100);
				// completedTasksDaily--;
			}
		} catch (err) {
			console.error(err);
		}
	};
};
