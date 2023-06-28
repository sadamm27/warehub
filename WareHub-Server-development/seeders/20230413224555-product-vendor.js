"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ProductVendors",
      [
        {
          product_id: 1,
          vendor_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 2,
          vendor_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 3,
          vendor_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 4,
          vendor_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 5,
          vendor_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 6,
          vendor_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 7,
          vendor_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 8,
          vendor_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 9,
          vendor_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 10,
          vendor_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 11,
          vendor_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 12,
          vendor_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductVendors", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
