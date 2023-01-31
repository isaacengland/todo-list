const mongoose = require('mongoose');

const completedTasksSchema = new mongoose.Schema({
	count: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('CompletedTasks', completedTasksSchema);
