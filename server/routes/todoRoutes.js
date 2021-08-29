const express = require('express');
const router = express.Router();

const { getTodo, updateTodo } = require('../controllers/todoControllers.js');

router.get('/todos', getTodo);
router.post('/todos', updateTodo);

module.exports = router;
