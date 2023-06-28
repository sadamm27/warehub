"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Customers",
      [
        {
          user_id: 1,
          first_name: "Jonantan",
          last_name: "Fredrein",
          email: "Jonfed36@gmail.com",
          address: "Jl Singapur no 55",
          company: "PT Suka Bakso",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          first_name: "Johnnie",
          last_name: "Grealish",
          email: "jgrealish0@constantcontact.com",
          address: "287 5th Crossing",
          company: "Bartoletti Group",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          first_name: "Berti",
          last_name: "Sutworth",
          email: "bsutworth1@twitpic.com",
          address: "30 Blaine Pass",
          company: "Halvorson-Schoen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          first_name: "Bancroft",
          last_name: "Ashman",
          email: "bashman2@rediff.com",
          address: "729 Scofield Road",
          company: "Klein-Kassulke",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          first_name: "Lynea",
          last_name: "De la Yglesia",
          email: "ldelayglesia3@sun.com",
          address: "041 Starling Parkway",
          company: "Rogahn-Ratke",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          first_name: "Herminia",
          last_name: "Bowness",
          email: "hbowness4@ted.com",
          address: "0832 Briar Crest Lane",
          company: "Ryan, Marks and Zieme",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
