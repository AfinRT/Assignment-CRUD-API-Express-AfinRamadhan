"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });

    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          name: "Ahmad Fauzi",
          email: "ahmad.fauzi@mail.com",
        },
        {
          id: 2,
          name: "Siti Aminah",
          email: "siti.aminah@mail.com",
        },
        {
          id: 3,
          name: "Budi Santoso",
          email: "budi.santoso@mail.com",
        },
        {
          id: 4,
          name: "Dewi Lestari",
          email: "dewi.lestari@mail.com",
        },
        {
          id: 5,
          name: "Rian Hidayat",
          email: "rian.hidayat@mail.com",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
