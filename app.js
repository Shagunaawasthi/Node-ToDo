const express = require('express')
const db = require('./db/db')
const bodyParser = require('body-parser')
const router =require('./routes/index.js')



//setup app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use(router);
app.get('/todo', (req,res)=>{
    if (db.length != 0){
        return res.status(201).send(db);
    }else{
        return res.status(404).send({
            success: 'false',
            message: "kahli hai ilst bc"
        });
    }
});
app.get('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((todo) => {
      if (todo.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'todo retrieved successfully',
          todo,
        });
      } 
  });
   return res.status(404).send({
     success: 'false',
     message: 'todo does not exist',
    });
  });
  app.delete('/todo/delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
  
    db.map((todo, index) => {
      if (todo.id === id) {
         db.splice(index, 1);
         return res.status(200).send({
           success: 'true',
           message: 'Todo deleted successfuly',
         });
      }
    });
  
  
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
  
   
  });
   app.put('/todo/update/:id', (req,res)=>{
    const id= parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index)=>{
        if (todo.id=== id){
            todoFound = todo;
            itemIndex =  index;
        }
    });
  
   if(!todoFound){
       return res.status(404).send({
        success:'false',
        message:'Todo not Found',
       });
   }
   const updatedTodo= {
       id: todoFound.id,
       title: todoFound.title,
       description: todoFound.descriptionm
   };
   db.splice(itemIndex, 1, updatedTodo);
   return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    updatedTodo,
  });
});

  
app.listen(8000);
