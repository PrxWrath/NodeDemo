import { Router } from "express";
import { type } from "os";
import { todo } from "../models/todo";

const router = Router();
let todos: todo[] = []
type RequestId= {
    id: string
}
type RequestText = {
    text: string
}
type RequestBody = {
    id: string,
    text: string
}

router.get('/', (req, res, next)=>{
    res.status(200).json({todos:todos})
})

router.post('/todo', (req,res,next)=>{
    const body = req.body as RequestText
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    }
    todos.push(newTodo);
    res.status(201).json({msg:'Created new todo!', todos});
})

router.post('/delete-todo', (req,res,next)=>{
    const body = req.body as RequestId
    todos = todos.filter(todo=>todo.id!==body.id);
    res.status(200).json({msg:'Deleted!', todos});
})

router.post('/edit-todo', (req,res,next)=>{
    const body = req.body as RequestBody
    const index = todos.findIndex(todo=>todo.id===body.id);
    if(index>=0){
        todos[index] = {
            id: body.id,
            text: body.text
        }
        res.status(200).json({msg:'updated!', todos});
    }else{
        res.status(404).json({err:'Todo not found!!'})
    }
})

export default router