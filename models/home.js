module.exports = (sequelize, Sequelize) => {
	const Home = sequelize.define(
		'Home',
		{
			Country: Sequelize.DataTypes.STRING,
			City: Sequelize.DataTypes.STRING,
		},
		{
			timestamps: false,
		}
	);

	return Home;
};
