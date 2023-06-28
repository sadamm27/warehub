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
    await queryInterface.addConstraint('Warehouses', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'add_warehouse_id_fkey',
      references: {
        table: "Users",
        field: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

    await queryInterface.addConstraint('Vendors', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'add_vendor_id_fkey',
      references: {
        table: "Users",
        field: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Warehouses', 'add_warehouse_id_fkey', {})
    await queryInterface.removeConstraint('Vendors', 'add_vendor_id_fkey', {})
  }
};
