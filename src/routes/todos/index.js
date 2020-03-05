const express = require('express');
const router = express.Router();

router.use('/:todoId/comments', require('./comments'));
router.use('/', require('./todos'));

module.exports = router;
