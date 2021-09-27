module.exports = Signin = (req, res, knex, bcrypt) => {
	knex
		.select('email', 'hash')
		.from('login')
		.where('email', '=', req.body.email)
		.then((data) => {
			return bcrypt.compareSync(req.body.password, data[0].hash)
				? knex.select('*').from('users').where('email', '=', req.body.email).then((user) => res.json(user[0]))
				: res.status(400).json('wrong credentials');
		})
		.catch((error) => {
			res.status(400).json('error getting user');
		});
};
