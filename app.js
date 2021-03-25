const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const { middleWare } = require("./middleware");
const mongoose = require("mongoose");
const User = require("./models/User");
const dotenv = require("dotenv");
const cors = require("cors");
const initialData = require("./user.json");

//let user

dotenv.config();
const app = express();
app.use(bodyparser.json());

app.use(cors());

mongoose.connect(
  process.env.CONNECTION_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (error) => {
    if (error) {
      console.log("connection to database failed");
      console.log(error);
    } else {
      console.log("connection successful");
      User.find().then((data) => {
        if (data.length == 0) {
          User.insertMany(initialData)
            .then(() => {
              console.log("initial data is added successfully");
            })
            .catch((err) => {
              console.log("intial data adding failed");
            });
        }
        else{
            console.log("data is present")
        }
      })
      .catch((err)=>{
          console.log("error"+err)
      })
    }
  }
);

app.get("/userList", (req, res) => {
User.find().then((data)=>{
    res.status(200).json(data)
})
.catch((err)=>{
    res.status(404).json({error:err})
})
});

// app.post('/add',(req,res)=>{

//     let data={
//         id:req.body.id,
//         name:req.body.name
//     }
//     user.push(data)
//     fs.writeFile('./user.json',JSON.stringify(user),function(error){
//         if(error){
//             res.status(500).json({message:"something went wrong"})
//         }
//         else{
//             res.status(200).json({message:"saved sucessfully"})
//         }
//     })

// })

// app.delete('/delete/:id',(req,res)=>{
// console.log(req.params)
//     const index= user.findIndex(elem=>elem.id==req.params.id)
//     if(index>=0){
//         user.splice(index,1)
//         fs.writeFile('./user.json',JSON.stringify(user),function(error){
//             if(error){
//                 res.status(500).json({message:"something went wrong"})
//             }
//             else{
//                 res.status(200).json({message:"delete sucessfully"})
//                 return
//             }
//         })
//     }
//         else{
//             res.status(200).json({message:"no user found"})
//             return
//         }

// })

// app.patch('/update',(req,res)=>{
//     const index= user.findIndex(elem=>elem.id==req.body.id)
// console.log(req.body.id)

//     if(index>=0){
//         user[index].name = req.body.name
//         user[index].salary = req.body.salary
//         fs.writeFile('./user.json',JSON.stringify(user),function(error){
//             if(error){
//                 res.status(500).json({message:"something went wrong"})
//             }
//             else{
//                 res.status(200).json({message:"update sucessfully"})
//                 return
//             }
//         })
//     }
//         else{
//             res.status(200).json({message:"no user found"})
//             return
//         }
// })

app.listen(8080, () => {
  // fs.readFile('./user.json',function(error,data){
  //     if(error){
  //         console.log("data loading failed")
  //     }
  //     else{

  //         user=JSON.parse(data)
  //         console.log("data lloaded sucessful")
  //         console.log(user)
  //     }
  // })
  console.log("server is up and running...");
});
