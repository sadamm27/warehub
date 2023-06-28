"use strict";
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          first_name: "John",
          last_name: "Doe",
          email: "JohnDoe@gmail.com",
          username: "admin",
          password: await bcrypt.hash("admin", 10),
          address: "Jln Raya kenangan no 27",
          company: "JohnDoe-Corp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          first_name: "Cherokee",
          last_name: "Cody",
          email: "cody_cherokee5658@outlook.com",
          username: "postgres",
          password: await bcrypt.hash("postgres", 10),
          address: "378-7923 Magna. Street",
          company: "Ante Vivamus Associates",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {restartIdentity: true ,truncate: true, cascade: true});
  },
};
