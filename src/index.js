
const express= require('express');
// const app=express.app()
const app = express()
const bodyParser = require("body-parser");

const port = 8080
app.use(express.urlencoded());
const studentArray=require("./InitialData.js");

let a=8
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
// console.log(studentArray);
app.get("/api/student",(req,res)=>{
    // console.log(studentArray);
    res.json({studentArray});
})
app.get('/api/student/:id', (req,res)=>{
    let result=studentArray.find(e=>e.id==req.params.id)//find in array particular element present or not
    if(result){
        res.json({...result})
    }
    else{
        res.status(404).json("Get Failed!! Id not found")
    }
})
app.post('/api/student', (req,res)=>{
    
    if(req.body.name&&req.body.currentClass&&req.body.division){
        studentArray.push({id:a,...req.body})
        res.json({id:a})
        a++
    }
    
    else{
        res.status(404).json("Get Failed!! Id not found")
    }
})


app.put('/api/student/:id', (req,res)=>{
    let target=studentArray.find(e=>e.id==req.params.id)
    if(req.body.name||req.body.currentClass||req.body.division&&target){
        let index=studentArray.findIndex(e=>e.id==req.params.id)
        studentArray[index]={...target,...req.body}
        
        res.json(studentArray[index])
    }
    else{
        res.status(404).json("Get Failed!! Id not found")
    }
})
app.delete('/api/student/:id', (req,res)=>{
    
    try{
        let target=studentArray.findIndex(e=>e.id==req.params.id)
        console.log(target)
        studentArray.splice(target,1)
        
        res.json("succesful delete")
    }
    catch(e){
        res.status(404).json("Get Failed!! Id not found")
    }
})



app.listen(port, () => console.log(`App listening on port ${port}!`))
// module.exports=app;

module.exports =app;   