const express = require('express');
const router = express.Router();

const { getTodo, updateTodo } = require('../controllers/todoControllers.js');
const { protect } = require('../middleware/authMiddleWare.js');

router.get('/todos', protect, getTodo);
router.post('/todos', protect, updateTodo);

module.exports = router;
