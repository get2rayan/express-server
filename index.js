const express = require('express')
const app = express()
const path=require('path')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const TodoController = require('./controllers/TodoController')

const PORT = 4000
const mongoDbUrl="mongodb://localhost:27017"
const mongoDbName="TodoRepo"

//MongoDB connection
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
/*
mongoose.connect(mongoDbUrl + '/todoRepo', { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('Mongoose connection established.')
}).on('error', ()=>{
    console.log('MongoDb connection error')
})
*/
app.use(cors())
app.use(express.json())

// Mongo Test
app.get('/api/todos', TodoController.getTodos)
app.post('/api/todos', TodoController.createTodo)

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
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