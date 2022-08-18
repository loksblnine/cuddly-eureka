'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('userToUser', [
      {
        bossId: 2,
        regularId: 3
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('role', null, {});
  }
};