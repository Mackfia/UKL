// const adminModel = require(`../models/index`).admin;
// const order_listModel = require(`../models/index`).order_list;
// const order_detailModel = require(`../models/index`).order_detail;
// const foodModel = require(`../models/index`).food; // Menggunakan model produk
// const { fn, col, literal } = require('sequelize');
// const { Op } = require("sequelize");

// exports.getOrder_list = async (request, response) => {
//     try {
//       const order_lists = await order_listModel.findAll({
//         include: [
//           {
//             model: order_detailModel,
//             as: 'order_detail',
//             include: [{ model: order_listModel, as: 'order_list' }],
//           },
//         ],
//         order_list: [['order_list_id', 'ASC']],
//       });
  
//       const order_listsData = order_lists.map((order_list) => ({
//         order_list_id: order_list.order_list_id,
//         customer_name: order_list.customer_name,
//         table_number: order_list.table_number,
//         order_date: order_list.order_date,
//         createdAt: order_list.createdAt,
//         updatedAt: order_list.updatedAt,
//         order_detail: order_list.order_detail.map((order_detail) => ({
//           order_detail_id: order_detail.order_detail_id,
//           order_list_id: order_detail.order_list_id,
//           food_id: order_detail.food_id,
//           quantity: order_detail.quantity,
//           price: order_detail.price,
//           createdAt: order_detail.createdAt,
//           updatedAt: order_detail.updatedAt,
//         })),
//       }));
  
//       return response.json({
//         status: true,
//         data: order_listsData,
//       });
//     } catch (error) {
//       console.error(error);
//       return response.status(500).json({
//         status: false,
//         message: 'Internal Server Error',
//       });
//     }
//   };

// exports.addOrder_list = async (request, response) => {
//     try {
//       const { customer_name, table_number, order_date, order_detail } = request.body;
  
//       // Membuat pesanan utama
//       const newOrder_list = await order_listModel.create({
//         customer_name: customer_name,
//         table_number: table_number,
//         order_date: order_date
//       });
  
//       // Memasukkan detail pesanan
//       await Promise.all(order_detail.map(async (order_detail) => {
//         const { food_id, price, quantity } = order_detail;
        
//         // Mengecek apakah makanan tersedia
//         const food = await foodModel.findByPk(food_id);
//         if (!food) {
//           throw new Error(`Food with id ${food_id} is not available.`);
//         }
  
//         // Menambahkan detail pesanan ke database
//         await order_detailModel.create({
//           order_list_id: newOrder_list.order_list_id,
//           food_id: food_id,
//           price: price,
//           quantity: quantity
//         });
//       }));
  
//       return response.json({
//         status: true,
//         message: "Data Order berhasil ditambahkan",
//       });
//     } catch (error) {
//       return response.json({
//         status: false,
//         message: error.message,
//       });
//     }
//   };
  
// // Fungsi hapus transaksi
// exports.deleteOrder_list = async (request, response) => {
//   try {
//     let order_list_id = request.params.order_list_id;
//     let order_list = await order_listModel.findOne({
//       where: { order_list_id },
//     });
//     await order_detailModel.destroy({ where: { order_list_id } });
//     await order_listModel.destroy({ where: { order_list_id } });

//     return response.json({
//       status: true,
//       message: `Order Data Has Been Deleted`,
//     });
//   } catch (error) {
//     return response.json({
//       status: false,
//       message: error.message,
//     });
//   }
// };



const adminModel = require('../models/index').admin;
const order_listModel = require('../models/index').order_list;
const order_detailModel = require('../models/index').order_detail;
const foodModel = require('../models/index').food; // Menggunakan model produk
const { fn, col, literal } = require('sequelize');
const { Op } = require('sequelize');

exports.getOrder_list = async (request, response) => {
  try {
    let result = await order_listModel.findAll({
      include: [
        {
          model: order_detailModel,
          as: "order_detail",
          include: [{ model: foodModel, as: "food" }],
        },
      ],
      order_list: [["createdAt", "DESC"]],
    });

    return response.json({
      status: true,
      data: result,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};


exports.addOrder_list = async (request, response) => {
  try {
    const { customer_name, table_number, order_date, order_detail: orderDetails } = request.body;

    // Pastikan semua data yang diperlukan tersedia
    if (!customer_name || !table_number || !order_date || !orderDetails) {
      throw new Error('Incomplete data. Please provide customer_name, table_number, order_date, and order_detail.');
    }

    const newOrder_list = await order_listModel.create({
      customer_name,
      table_number,
      order_date,
    });

    await Promise.all(orderDetails.map(async (order_detail) => {
      const { food_id, price, quantity } = order_detail;
      const food = await foodModel.findByPk(food_id);
      if (!food) {
        throw new Error(`Food with id ${food_id} is not available.`);
      }
      await order_detailModel.create({
        order_list_id: newOrder_list.order_list_id,
        food_id,
        price,
        quantity,
      });
    }));

    return response.json({
      status: true,
      message: 'Data Order berhasil ditambahkan',
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// exports.deleteOrder_list = async (request, response) => {
//   try {
//     const { order_list_id } = request.params;
//     await order_detailModel.destroy({ where: { order_list_id } });
//     await order_listModel.destroy({ where: { order_list_id } });

//     return response.json({
//       status: true,
//       message: 'Order Data Has Been Deleted',
//     });
//   } catch (error) {
//     console.error(error);
//     return response.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };
