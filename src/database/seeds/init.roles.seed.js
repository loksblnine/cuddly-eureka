'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        description: "Admin"
      },
      {
        id: 2,
        description: "Boss"
      },
      {
        id: 3,
        description: "Regular"
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};