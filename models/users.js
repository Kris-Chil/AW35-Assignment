module.exports = (sequelize, Sequelize) => {
	const Users = sequelize.define('Users', {
			Username: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false,
					unique: true
			},
			EncryptedPassword: {
					type: Sequelize.DataTypes.BLOB,
					allowNull: false
			},
			Salt: {
					type: Sequelize.DataTypes.BLOB,
					allowNull: false
			},
	},{
	},{
			timestamps: false
	});
	
return Users
}