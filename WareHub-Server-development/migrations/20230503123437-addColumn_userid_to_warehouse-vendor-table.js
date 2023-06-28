'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Warehouses', 'user_id', {
      type: Sequelize.INTEGER
    }) 
    await queryInterface.addColumn('Vendors', 'user_id', {
      type: Sequelize.INTEGER
    }) 

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Warehouses', 'user_id', {}) 
    await queryInterface.removeColumn('Vendors', 'user_id', {})
  }
};
