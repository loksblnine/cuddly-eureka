'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        user_id: 1,
        email: "admin@example.com",
        password: "$2b$05$NWSowlSt.ZHfnk8kngyoZeokQHYTRjLRexcDdq/wm1IFP/yN9t4zS", //passwordsecret
        role: 1,
      },
      {
        user_id: 2,
        email: "illya200457@gmail.com",
        password: "$2b$05$NWSowlSt.ZHfnk8kngyoZeokQHYTRjLRexcDdq/wm1IFP/yN9t4zS", //passwordsecret
        role: 2,
      },
      {
        user_id: 3,
        email: "illya01@ukr.net",
        password: "$2b$05$NWSowlSt.ZHfnk8kngyoZeokQHYTRjLRexcDdq/wm1IFP/yN9t4zS", //passwordsecret
        role: 3,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('role', null, {});
  }
};