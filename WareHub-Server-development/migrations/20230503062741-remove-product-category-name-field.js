'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ProductCategories', 'name');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('ProductCategories', 'name', {
      type: Sequelize.STRING
    });
  }
};
