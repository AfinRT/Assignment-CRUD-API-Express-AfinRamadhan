"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("category", {
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
      description: {
        allowNull: false,
        type: Sequelize.STRING(255),
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
      "category",
      [
        {
          id: 8,
          name: "Elektronik",
          description:
            "Kategori untuk barang-barang elektronik dan gadget terbaru",
        },
        {
          id: 9,
          name: "Peralatan Rumah Tangga",
          description: "Perabotan dan alat penunjang kebutuhan rumah tangga",
        },
        {
          id: 10,
          name: "Fashion Pria",
          description: "Pakaian, sepatu, dan aksesoris modis khusus pria",
        },
        {
          id: 11,
          name: "Fashion Wanita",
          description: "Pakaian, tas, perhiasan, dan tren modis wanita",
        },
        {
          id: 12,
          name: "Kesehatan & Kecantikan",
          description:
            "Produk perawatan tubuh, kosmetik, dan suplemen kesehatan",
        },
        {
          id: 13,
          name: "Olahraga & Outdoor",
          description:
            "Alat olahraga, perlengkapan kemping, dan aktivitas luar ruangan",
        },
        {
          id: 14,
          name: "Otomotif",
          description: "Suku cadang, aksesoris motor, dan perawatan kendaraan",
        },
        {
          id: 15,
          name: "Buku & Alat Tulis",
          description:
            "Buku bacaan, novel, komik, dan perlengkapan sekolah or kantor",
        },
        {
          id: 16,
          name: "Mainan & Hobi",
          description:
            "Mainan anak-anak, action figure, board game, dan koleksi hobi",
        },
        {
          id: 17,
          name: "Makanan & Minuman",
          description: "Bahan makanan pokok, camilan, dan minuman instan",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("category", null, {});
    await queryInterface.dropTable("category");
  },
};
