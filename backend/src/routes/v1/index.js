const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const messagesRoute = require('./messages.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/messages', messagesRoute);

module.exports = router;
