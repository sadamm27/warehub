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
    await queryInterface.addConstraint('OrderProducts', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'add_product_id_fkey',
      references: {
        table: "Products",
        field: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

    await queryInterface.addConstraint('OrderProducts', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'add_order_id_fkey',
      references: {
        table: "Orders",
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
    await queryInterface.removeConstraint('OrderProducts', 'add_product_id_fkey', {})
    await queryInterface.removeConstraint('OrderProducts', 'add_order_id_fkey', {})
  }
};
