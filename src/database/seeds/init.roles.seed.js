'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('roles', [
      {
        role_id: 1,
        description: "Admin"
      },
      {
        role_id: 2,
        description: "Boss"
      },
      {
        role_id: 3,
        description: "Regular"
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};