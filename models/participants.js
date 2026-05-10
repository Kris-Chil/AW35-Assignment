module.exports = (sequelize, Sequelize) => {
	const Participant = sequelize.define('Participant', {
			FirstName: Sequelize.DataTypes.STRING,
			LastName: Sequelize.DataTypes.STRING,
			Email: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false,
					unique: true,
                    validate: {
                        isEmail: true
                    }
			},
			Dob: {
					type: Sequelize.DataTypes.DATEONLY,
					allowNull: false
			},
	},{
			timestamps: false
	});
	Participant.associate = function(models) {
		Participant.hasOne(models.Work);
		Participant.hasOne(models.Home);
};
return Participant
}