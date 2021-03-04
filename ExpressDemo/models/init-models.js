var DataTypes = require("sequelize").DataTypes;
var _userhasrole = require("./userhasrole");

function initModels(sequelize) {
  var userhasrole = _userhasrole(sequelize, DataTypes);


  return {
    userhasrole,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
