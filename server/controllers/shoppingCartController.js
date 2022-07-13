const shoppingCartItems = require("../models/shoppingCart");

exports.getShoppingCart = (req, res, next) => {
    res.status(200).json(shoppingCartItems.getShoppingCart());
};

exports.addToMyShoppingCart = (req, res, next) => {
  res.status(200).json(shoppingCartItems.addToMyShoppingCart(req.params.productId));
};

exports.deleteFromMyShoppingCart = (req, res, next) => {
  res.status(200).json(shoppingCartItems.deleteFromMyShoppingCart(req.params.productId));
};

exports.computeTotalPrice = (req, res, next) => {
  res.status(200).json(shoppingCartItems.computeTotalPrice());
};

exports.editQuantity = (req, res, next) => {
  res.status(200).json(shoppingCartItems.editQuantity(req.params.productId, req.params.sign));
};

exports.editStock = (req, res, next) => {
  res.status(200).json(shoppingCartItems.editStock());
};
