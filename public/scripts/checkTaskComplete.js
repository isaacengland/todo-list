export const checkTaskComplete = (task) => {
	if (task.complete) {
		const taskDiv = document.getElementById(`task-${task._id}`);
		taskDiv.style.opacity = 0.5;
	}
};
