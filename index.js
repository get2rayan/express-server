const express = require('express')
const app = express()
const config=require('config')
//const router=express.Router
const path=require('path')
const cors = require('cors')
//const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const TodoController = require('./controllers/TodoController')

console.log('NODE_ENV is : ' + config.util.getEnv('NODE_ENV'))
const PORT = config.get('app.port')
const mongoDbUrl=config.get('db.url')
const mongoDbName=config.get('db.repoName')

//MongoDB connection
//#region MongoClient
/*
const mongoClient=new MongoClient(mongoDbUrl)
mongoClient.connect((err)=>{
    if(err){
        console.log(err)
        return 
    }

    console.log('MongoDb connected!')
    const db=mongoClient.db(mongoDbName)
    const todoList = db.collection('todos')
    todoList.createIndex({id: 1},{unique: 1})
})
*/
//#endregion
mongoose.connect(mongoDbUrl + '/todoRepo', { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('Mongoose connection established.')
}).on('error', ()=>{
    console.log('MongoDb connection error')
})

console.log('MongoDB Url : ' + mongoDbUrl)
app.use(cors())
app.use(express.json())

// Mongo API methods
/*app.get('/api/todos', TodoController.getTodos)
app.post('/api/todos', TodoController.createTodo)
app.delete('/api/todos', TodoController.deleteTodo)
*/
app.route('/api/todos')
    .get(TodoController.getTodos)
    .post(TodoController.createTodo)
    .delete(TodoController.deleteTodo)
    .put(TodoController.putTodo)

// An api endpoint that returns a short list of items
app.get('/api/list', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('/', (req,res) =>{
    res.send("Welcome to Rayans Express Server service");
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../my-react-app/build')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname,'../my-react-app/build/index.html'));
});

app.listen(process.env.PORT || PORT,(err)=>{
    if(err)
        return console.log(`some error happened : ${err}`)
    console.log(`Express server Listening on port ${PORT}`)
})