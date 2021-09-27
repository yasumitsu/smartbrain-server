module.exports = Register = (knex, bcrypt) => (req, res) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password) return res.status(400).json('invalid input');
	const hash = bcrypt.hashSync(password);
	knex
		.transaction((trx) => {
			trx('login')
				.transacting(trx)
				.returning('email')
				.insert({
					hash,
					email
				})
				.then((loginEmail) => {
					return trx('users')
						.returning('*')
						.insert({
							name,
							email: loginEmail[0],
							joined: new Date()
						})
						.then((user) => res.json(user[0]));
				})
				.then(trx.commit)
				.catch(trx.rollback);
		})
		.catch((err) => res.status(400).json(err, 'unable to register'));
};
