const mongoose = require('mongoose');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

module.exports = {
    getAllOrders : (req, res, next) => {
        Order
            .find()
            .select('_id product quantity')
            .populate('product', '_id name price')
            .exec()
            .then(orders => {
                res.status(200).json({
                    count: orders.length,
                    orders: orders
                });
            })
            .catch(error => {
                next(error);
            })
    },
    
    createOneOrder : (req, res, next) => {
    
        Product
            .findById(req.body.productId)
            .exec()
            .then(product => {
                if (!product) {
                    return res.status(404).json({
                        message: 'Product Not Found!'
                    });
                }
                return createOrder(req);
            })
            .then(order => {
                return order.save();
            })
            .then(order => {
                return res.status(201).json({
                    message: 'Order was created',
                    order: {
                        _id: order._id,
                        product: order.product,
                        quantity: order.quantity
                    }
                });
            })
            .catch(error => {
                next(error);
            });
    },
    
    getOneOrder : (req, res, next) => {
        const orderId = req.params.orderId;
        Order
            .findById(orderId)
            .select('_id product quantity')
            .populate('product', '_id name price')
            .exec()
            .then(order => {
                return res.status(201).json(order);
            })
            .catch(error => {
                next(error);
            });
    },
    
    updateOneOrder : (req, res, next) => {
        const orderId = req.params.orderId;
        Order
            .update({ _id: orderId }, { $set: req.body })
            .exec()
            .then(result => {
                return res.status(200).json({
                    message: 'Updated Order Successfully!',
                    result: result
                });
            })
            .catch(error => {
                next(error);
            });
    },
    
    deleteOneOrder : (req, res, next) => {
        const orderId = req.params.orderId;
        Order
            .remove({ _id: orderId })
            .exec()
            .then(result => {
                return res.status(200).json({
                    message: 'Deleted order!',
                    result: result
                });
            })
            .catch(error => {
                next(error);
            });
    },
    
    
}

const createOrder = (req) => {
    return new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });
}