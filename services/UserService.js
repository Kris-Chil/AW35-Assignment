const { Op } = require('sequelize');

class UserService {
	constructor(db) {
		this.client = db.sequelize;
		this.Users = db.Users;
	}

	async create(username, salt, encryptedPassword) {
		return await this.Users.create({
			Username: username,
			Salt: salt,
            EncryptedPassword: encryptedPassword,
		});
	}

	async getOne(username) {
		return await this.Users.findOne({
			where: { Username: username },
		});
	}
}
module.exports = UserService;

