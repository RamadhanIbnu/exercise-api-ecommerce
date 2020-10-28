const express = require('express');
const router = express.Router();
const auth = require('../../helper/auth');

const {
    signUp,
    logIn,
    deleteUser,
    getAllUser
} = require('./controller.user');

router.post('/signup', signUp);

router.post('/login', logIn);

router.delete('/:userId', auth, deleteUser)

router.get('/', getAllUser);

module.exports = router;