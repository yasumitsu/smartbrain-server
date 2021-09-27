module.exports = Signin = (knex, bcrypt) => (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).json('invalid input');
	knex
		.select('email', 'hash')
		.from('login')
		.where('email', '=', req.body.email)
		.then((data) => {
			return bcrypt.compareSync(password, data[0].hash)
				? knex.select('*').from('users').where('email', '=', email).then((user) => res.json(user[0]))
				: res.status(400).json('wrong credentials');
		})
		.catch((error) => {
			res.status(400).json('error getting user');
		});
};
