
const todoController = require('../controllers/todo.controller');
const router = require('express').Router();

router.post('/add', todoController.createTodo);
router.get('/all', todoController.getTodo);
router.get('/single/:id', todoController.getTodoById);
router.put('/update/:id', todoController.updateTodo);
router.delete('/delete/:id', todoController.deleteTodo);


module.exports = router;

