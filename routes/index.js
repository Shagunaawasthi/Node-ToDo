const express = require('express')
const db = require('../db/db')
const bodyParser = require('body-parser')
const todoController = require( './todosControllers/todos')
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.get('/todo', todoController.getAllTodos);
router.get('/todo/:id', todoController.getTodo);
router.post('/todo', todoController.createTodo);
router.put('/todo/update/:id', todoController.updateTodo);
router.delete('/todo/delete/:id', todoController.deleteTodo);


module.exports  = router;