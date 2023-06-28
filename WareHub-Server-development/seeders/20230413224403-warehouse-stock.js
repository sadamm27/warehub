"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "WarehouseStocks",
      [
        {
          product_id: 1,
          warehouse_id: 1,
          quantity: 400,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 2,
          warehouse_id: 2,
          quantity: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 3,
          warehouse_id: 3,
          quantity: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 4,
          warehouse_id: 4,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 5,
          warehouse_id: 1,
          quantity: 400,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 6,
          warehouse_id: 2,
          quantity: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 7,
          warehouse_id: 3,
          quantity: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 8,
          warehouse_id: 4,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 9,
          warehouse_id: 1,
          quantity: 400,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 10,
          warehouse_id: 2,
          quantity: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 11,
          warehouse_id: 3,
          quantity: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 12,
          warehouse_id: 4,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("WarehouseStocks", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
