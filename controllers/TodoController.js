const Todo=require('../models/Todo')

exports.getTodos=async(req, res)=>{
    const todos= await Todo.find()
    res.send({ todos })
}

exports.createTodo=async(req, res)=>{
    const todo=new Todo(req.body)
    await todo.save()    
    .then(()=> res.sendStatus(200))    
}

exports.deleteTodo=async(req, res)=>{ 
    
    if(!!req.query.itemStatus)
     {          
        await Todo.deleteMany(
                { complete: true }
            ).then(()=>res.sendStatus(200))
    }else{  
        await Todo.findOneAndDelete({"item": req.query.item})
        //await Todo.findByIdAndDelete(req.query.id)
        .then(()=> res.sendStatus(200))    
    }
}

exports.putTodo=async(req, res)=>{
    if(!!req.body.newItem){
        await Todo.findOneAndUpdate(
            {"item": req.body.item}, 
            { $set: {"item": req.body.newItem }})
        .then(()=> res.sendStatus(200))    
    } else {
        var doc=await Todo.findOne({"item": req.body.item})
        await Todo.findByIdAndUpdate(
            doc._id,
            { complete: !doc.complete }
            )
        .then(()=> res.sendStatus(200))
    }
}