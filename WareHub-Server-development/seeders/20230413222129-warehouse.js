"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Warehouses",
      [
        {
          user_id: 1,
          name: "Warehouse 1",
          city: "Depok",
          address: "Jl Penghasahan No 15",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Warehouse 2",
          city: "Depok",
          address: "Jl Penghasahan No 10",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          city: "Matsubara",
          name: "Warehouse 3",
          address: "9 Blackbird Place Matsubara",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          city: "Bergvliet",
          name: "Warehouse 4",
          address: "976 Eastlawn Terrace Bergvliet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          city: "Sison",
          name: "Warehouse 5",
          address: "2633 Huxley Center Sison",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Warehouses", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
