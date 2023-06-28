"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ProductCategories",
      [
        {
          product_id: 1,
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 2,
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 3,
          category_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 4,
          category_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 5,
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 6,
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 7,
          category_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 8,
          category_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 9,
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 10,
          category_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 11,
          category_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          product_id: 12,
          category_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductCategories", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
