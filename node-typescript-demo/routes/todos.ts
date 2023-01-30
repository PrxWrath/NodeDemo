import { Router } from "express";
import { todo } from "../models/todo";

const router = Router();
let todos: todo[] = []

router.get('/', (req, res, next)=>{
    res.status(200).json({todos:todos})
})

router.post('/todo', (req,res,next)=>{
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    }
    todos.push(newTodo);
    res.status(201).json({msg:'Created new todo!', todos});
})

router.post('/delete-todo', (req,res,next)=>{
    todos = todos.filter(todo=>todo.id!==req.body.id);
    res.status(200).json({msg:'Deleted!', todos});
})

router.post('/edit-todo', (req,res,next)=>{
    const index = todos.findIndex(todo=>todo.id===req.body.id);
    if(index>=0){
        todos[index] = {
            id: req.body.id,
            text: req.body.text
        }
        res.status(200).json({msg:'updated!', todos});
    }else{
        res.status(404).json({err:'Todo not found!!'})
    }
})

export default router