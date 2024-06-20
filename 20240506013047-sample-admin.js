// 'use strict';
// let md5 = require('md5')
// const now  = new Date()

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     await queryInterface.bulkInsert('admins', [
//       {
//         name: "Fian",
//         email: "fian@gmail.com",
//         password: md5("123"),
//         createdAt: now,
//         updatedAt: now
//       },
//       {
//         name: "Mackfia",
//         email: "mackfia@gmail.com",
//         password: md5("1234"),
//         createdAt: now,
//         updatedAt: now
//       },
//       {
//         name: "Estianty",
//         email: "estianty@gmail.com",
//         password: md5("12345"),
//         createdAt: now,
//         updatedAt: now
//       }
//     ])
//   },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('admins', null, {});
//   }
// };
