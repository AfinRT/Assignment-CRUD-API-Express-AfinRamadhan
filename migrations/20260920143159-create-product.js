"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      status: {
        allowNull: true,
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: null,
      },
      file_path: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      thumbnail: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      userId: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      productCategoryId: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
          model: "category",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
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
      "products",
      [
        {
          id: 11,
          name: "Wireless Bluetooth Headphone",
          price: 250000.0,
          description:
            "Headphone bluetooth dengan kualitas suara jernih dan desain modern.",
          rating: 9,
          status: "active",
          file_path: "uploads/products/headphone.zip",
          thumbnail: "https://unsplash.com",
          userId: 1,
          productCategoryId: 8,
        },
        {
          id: 12,
          name: "Rak Penyimpanan Minimalis",
          price: 175000.0,
          description:
            "Rak penyimpanan minimalis untuk membantu merapikan ruangan.",
          rating: 8,
          status: "active",
          file_path: "uploads/products/rak.zip",
          thumbnail: "https://unsplash.com",
          userId: 1,
          productCategoryId: 9,
        },
        {
          id: 13,
          name: "Sepatu Sneakers Pria",
          price: 350000.0,
          description:
            "Sepatu sneakers pria dengan desain kasual untuk aktivitas sehari-hari.",
          rating: 9,
          status: "active",
          file_path: "uploads/products/sneakers-pria.zip",
          thumbnail: "https://unsplash.com",
          userId: 2,
          productCategoryId: 10,
        },
        {
          id: 14,
          name: "Tas Wanita Casual",
          price: 185000.0,
          description:
            "Tas wanita bergaya casual dengan desain simpel dan elegan.",
          rating: 9,
          status: "active",
          file_path: "uploads/products/tas-wanita.zip",
          thumbnail: "https://unsplash.com",
          userId: 2,
          productCategoryId: 11,
        },
        {
          id: 15,
          name: "Skincare Facial Cleanser",
          price: 95000.0,
          description: "Pembersih wajah untuk perawatan kulit sehari-hari.",
          rating: 9,
          status: "active",
          file_path: "uploads/products/facial-cleanser.zip",
          thumbnail: "https://unsplash.com",
          userId: 3,
          productCategoryId: 12,
        },
        {
          id: 16,
          name: "Matras Yoga",
          price: 120000.0,
          description:
            "Matras yoga untuk olahraga dan latihan kebugaran di rumah.",
          rating: 9,
          status: "active",
          file_path: "uploads/products/matras-yoga.zip",
          thumbnail: "https://unsplash.com",
          userId: 3,
          productCategoryId: 13,
        },
        {
          id: 17,
          name: "Helm Motor Retro",
          price: 275000.0,
          description:
            "Helm motor bergaya retro untuk menunjang kebutuhan berkendara.",
          rating: 9,
          status: "active",
          file_path: "uploads/products/helm-retro.zip",
          thumbnail: "https://unsplash.com",
          userId: 1,
          productCategoryId: 14,
        },
        {
          id: 18,
          name: "Buku Belajar Pemrograman",
          price: 85000.0,
          description:
            "Buku panduan dasar pemrograman untuk pelajar dan pemula.",
          rating: 9,
          status: "active",
          file_path: "uploads/products/buku-pemrograman.pdf",
          thumbnail: "https://unsplash.com",
          userId: 2,
          productCategoryId: 15,
        },
        {
          id: 19,
          name: "Board Game Strategi",
          price: 150000.0,
          description:
            "Permainan papan strategi untuk dimainkan bersama teman dan keluarga.",
          rating: 8,
          status: "active",
          file_path: "uploads/products/board-game.zip",
          thumbnail: "https://unsplash.com",
          userId: 3,
          productCategoryId: 16,
        },
        {
          id: 20,
          name: "Paket Kopi Premium",
          price: 110000.0,
          description:
            "Paket kopi pilihan dengan aroma khas untuk dinikmati setiap hari.",
          rating: 9,
          status: "active",
          file_path: "uploads/products/kopi.zip",
          thumbnail: "https://unsplash.com",
          userId: 1,
          productCategoryId: 17,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
    await queryInterface.dropTable("products");
  },
};
