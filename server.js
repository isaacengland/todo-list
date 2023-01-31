require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const serveStatic = require('serve-static');

//Database config
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to database'));

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//Routes
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
