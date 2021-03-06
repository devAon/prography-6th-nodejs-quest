const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/:todoId/comments', require('./comments'));
router.use('/', require('./todos'));

module.exports = router;
