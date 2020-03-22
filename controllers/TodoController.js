const Todo=require('../models/Todo')

exports.getTodos=async(req, res)=>{
    const todos=await Todo.find()
    res.send({ todos })
}

exports.createTodo=async(req, res)=>{
    const todo=new Todo(req.body)
    await todo.save()    
    res.send({ todo })
}

exports.deleteTodo=async(req, res)=>{    
    await Todo.findByIdAndDelete(req.query.id)
    res.sendStatus(200)
}