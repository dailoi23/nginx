'use strict';
const { ROLE } = require('../assets/ultity/myConstanst')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('userhasroles', [{

      userName: 'Doe',
      passWord: '202cb962ac59075b964b07152d234b70',
      email: 'example@example.com',
      role: ROLE.ADMIN
    }, {

      userName: 'tai',
      passWord: '202cb962ac59075b964b07152d234b70',
      email: 'tai@example.com',
      role: ROLE.BASIC
    }, {

      userName: 'tai',
      passWord: '202cb962ac59075b964b07152d234b70',
      email: 'tai@example.com',
      role: ROLE.BASIC
    }]);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('userhasroles', null, {});
  }
};
