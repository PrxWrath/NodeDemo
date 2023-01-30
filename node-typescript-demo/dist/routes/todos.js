"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ msg: 'Created new todo!', todos });
});
router.post('/delete-todo', (req, res, next) => {
    const body = req.body;
    todos = todos.filter(todo => todo.id !== body.id);
    res.status(200).json({ msg: 'Deleted!', todos });
});
router.post('/edit-todo', (req, res, next) => {
    const body = req.body;
    const index = todos.findIndex(todo => todo.id === body.id);
    if (index >= 0) {
        todos[index] = {
            id: body.id,
            text: body.text
        };
        res.status(200).json({ msg: 'updated!', todos });
    }
    else {
        res.status(404).json({ err: 'Todo not found!!' });
    }
});
exports.default = router;
