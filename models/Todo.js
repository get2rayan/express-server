const mongoose=require('mongoose')

const schema= new mongoose.Schema({
    item: String,
    complete: Boolean
})

module.exports=mongoose.model('Todo', schema)