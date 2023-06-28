"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          user_id: 1,
          name: "Potatoes",
          price: 100,
          weight: "1 Kg",
          size: "20 Cm",
          description: "Vine Ripe, Yellow a fresh products taken directly from suppliers",
          SKU: "KTC1",
          image: 'https://images.unsplash.com/photo-1552661397-4233881ea8c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=665&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Tomatoes ",
          price: 200,
          weight: "100 grams",
          size: "1 Pcs",
          description:
            "Tomatoes a fresh products taken directly from suppliers",
          SKU: "415202189595",
          image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Pork",
          price: 300,
          weight: "100 grams",
          size: "1 Pcs",
          description:
            "Pork - Hock And Feet Attached a fresh products taken directly from suppliers",
          SKU: "123339205190",
          image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Wine ",
          price: 400,
          weight: "50 grams",
          size: "1 Pcs",
          description:
            "Wine - White, Schroder And Schyl a fresh products taken directly from suppliers",
          SKU: "7317500988791",
          image:'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Potatoes",
          price: 100,
          weight: "1 Kg",
          size: "20 Cm",
          description: "Vine Ripe, Yellow a fresh products taken directly from suppliers",
          SKU: "KTC12",
          image: 'https://images.unsplash.com/photo-1552661397-4233881ea8c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=665&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Tomatoes ",
          price: 200,
          weight: "100 grams",
          size: "1 Pcs",
          description:
            "Tomatoes a fresh products taken directly from suppliers",
          SKU: "4152021895952",
          image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Pork",
          price: 300,
          weight: "100 grams",
          size: "1 Pcs",
          description:
            "Pork - Hock And Feet Attached a fresh products taken directly from suppliers",
          SKU: "1233392051902",
          image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Wine ",
          price: 400,
          weight: "50 grams",
          size: "1 Pcs",
          description:
            "Wine - White, Schroder And Schyl a fresh products taken directly from suppliers",
          SKU: "7317500398879",
          image:'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Potatoes",
          price: 100,
          weight: "1 Kg",
          size: "20 Cm",
          description: "Vine Ripe, Yellow a fresh products taken directly from suppliers",
          SKU: "KT4C1",
          image: 'https://images.unsplash.com/photo-1552661397-4233881ea8c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=665&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Tomatoes ",
          price: 200,
          weight: "100 grams",
          size: "1 Pcs",
          description:
            "Tomatoes a fresh products taken directly from suppliers",
          SKU: "4152s02189595",
          image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Pork",
          price: 300,
          weight: "100 grams",
          size: "1 Pcs",
          description:
            "Pork - Hock And Feet Attached a fresh products taken directly from suppliers",
          SKU: "123339d205190",
          image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          name: "Wine ",
          price: 400,
          weight: "50 grams",
          size: "1 Pcs",
          description:
            "Wine - White, Schroder And Schyl a fresh products taken directly from suppliers",
          SKU: "731750098f879",
          image:'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {restartIdentity: true ,truncate: true, cascade: true});
  },
};
