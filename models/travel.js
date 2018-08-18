module.exports = function(sequelize, DataTypes) {
  var Travel = sequelize.define("Travel", {
    employee_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{ len:[1,255]}
    },
    startDate: {
      type:DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate:{
      type:DataTypes.DATEONLY,
      allowNull: false,
    },
    origin: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{len:[1,100]}
    },
    destination: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{len:[1,100]}
    },
    airfare:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    car:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hotel:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });
  return Travel;
};
