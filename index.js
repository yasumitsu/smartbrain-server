const express = require('express');
const bodyParser = require('body-parser');

const database = {
	users: [
		{
			id: '123',
			name: 'teste',
			email: 'teste@teste.com',
			password: '123',
			entries: 0,
			joined: new Date()
		}
	]
};

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('it works');
});

app.post('/signin', (req, res) => {
	req.body.email === database.users[0].email && req.body.password === database.users[0].password
		? res.json('success')
		: res.status(400).json('error logging in');
});

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	database.users.push({
		id: '124',
		name,
		email,
		password,
		entries: 0,
		joined: new Date()
	});

	res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	database.users.filter((user) => {
		return Number(id) === Number(user.id) ? res.json(user) : res.status(404).json('not found');
	});
});

app.post('/image', (req, res) => {
	const { id } = req.body;
	database.users.filter((user) => {
		return Number(id) === Number(user.id) ? res.json(user.entries++) : res.status(404).json('not found');
	});
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});
