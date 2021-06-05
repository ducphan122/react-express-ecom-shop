const {
  fetchProductsDb,
  fetchProductByIdDb,
  createProductDb,
  modifyProductDb,
  removeProductDb,
} = require("./products.db");
const {
  fetchUsersDb,
  fetchUserByIdDb,
  fetchUserByEmailDb,
  createUserDb,
  modifyUserDb,
  removeUserDb,
} = require("./users.db");
// const { fetchOrdersDb, fetchOrderByIdDb, fetchOrdersByUserDb, createOrderDb, createProductInOrderDb } = require('./orders.db')
const {
  fetchCartsDb,
  createCartDb,
  fetchCartByIdDb,
  removeCartDb,
} = require("./carts.db");

module.exports = {
  fetchProductsDb,
  fetchProductByIdDb,
  createProductDb,
  modifyProductDb,
  removeProductDb,
  fetchUsersDb,
  fetchUserByIdDb,
  fetchUserByEmailDb,
  createUserDb,
  modifyUserDb,
  removeUserDb,
  fetchCartsDb,
  fetchCartByIdDb,
  createCartDb,
  removeCartDb,
};

// , addGoogleIdUserDb,
//   fetchOrdersDb, fetchOrderByIdDb, fetchOrdersByUserDb, createOrderDb, createProductInOrderDb,
//   fetchCartsDb, fetchCartByIdDb, createCartDb, createProductInCartDb, modifyCartDb, removeCartProductDb, removeCartDb