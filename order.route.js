const express = require('express');
const app = express();
const order_listController = require('../controllers/order.controller');
const { authorize } = require(`../controllers/auth.controller`)

// Mengatur middleware untuk mengizinkan express mengenali request body dalam bentuk JSON
app.use(express.json());

// Menangani permintaan POST untuk menambahkan pesanan
app.post('/', authorize, order_listController.addOrder_list);

// Menangani permintaan GET untuk mendapatkan daftar pesanan
app.get('/', order_listController.getOrder_list);

// Menangani permintaan DELETE untuk menghapus pesanan berdasarkan ID pesanan
// app.delete('/:id', order_listController.deleteOrder_list);

module.exports = app;
