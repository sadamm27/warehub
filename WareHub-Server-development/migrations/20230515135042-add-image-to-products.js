'use strict';
/** @type {import('sequelize').Sequelize} */
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'image', {
      type: DataTypes.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'image');
  }
};
