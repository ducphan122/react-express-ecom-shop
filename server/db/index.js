const { fetchProductsDb, fetchProductByIdDb, createProductDb, modifyProductDb, removeProductDb } = require('./products.db');
const {
  fetchUsersDb,
  fetchUserByIdDb,
  fetchUserByEmailDb,
  fetchUserByFacebookIdDb,
  fetchUserByGoogleIdDb,
  addGoogleIdUserDb,
  addFacebookIdUserDb,
  createUserDb,
  modifyUserDb,
  removeUserDb,
} = require('./users.db');
const { fetchOrdersDb, fetchOrderByIdDb, fetchOrdersByUserDb, createOrderDb, createProductInOrderDb } = require('./orders.db');
const { fetchCartsDb, fetchCartByIdDb, createCartDb, createProductInCartDb, modifyCartDb, removeCartProductDb, removeCartDb } = require('./carts.db');

module.exports = {
  fetchCartsDb,
  fetchCartByIdDb,
  createCartDb,
  createProductInCartDb,
  modifyCartDb,
  removeCartProductDb,
  removeCartDb,
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
  addGoogleIdUserDb,
  fetchUserByGoogleIdDb,
  fetchUserByFacebookIdDb,
  addFacebookIdUserDb,
  removeUserDb,
  fetchCartsDb,
  fetchCartByIdDb,
  createCartDb,
  removeCartDb,
  createProductInCartDb,
  modifyCartDb,
  removeCartProductDb,
  fetchOrdersDb,
  fetchOrderByIdDb,
  fetchOrdersByUserDb,
  createOrderDb,
  createProductInOrderDb,
};

// ,,
