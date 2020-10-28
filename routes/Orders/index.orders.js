const express = require('express');
const router = express.Router();
const auth = require('../../helper/auth');

const {
    getAllOrders,
    createOneOrder,
    getOneOrder,
    updateOneOrder,
    deleteOneOrder
} = require('./controller.orders');

router.get('/', auth, getAllOrders);

router.post('/', auth, createOneOrder);

router.get('/:orderId', auth, getOneOrder);

router.patch('/:orderId', auth, updateOneOrder);

router.delete('/:orderId', auth, deleteOneOrder);

module.exports = router;