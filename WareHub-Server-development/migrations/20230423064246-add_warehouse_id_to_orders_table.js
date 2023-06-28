'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.addColumn('Orders', 'warehouse_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Warehouses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn('Orders', 'warehouse_id');
    }
  };
