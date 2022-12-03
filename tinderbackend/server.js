import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import cards from "./dbcards.js";


//app config
 const app=express();
 const port=process.env.PORT || 8001;
 const connection_url=`mongodb+srv://yash_3006:mummypapa0705@cluster0.lmu0kqq.mongodb.net/?retryWrites=true&w=majority`
//Middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url);


//Api endpoints

app.get('/',(req,res)=>
{
    res.status(200).send("Hello the program works")
});

app.post('/tinder/cards',(req,res)=>{
    const dbcard=req.body;

    cards.create(dbcard,(err,data)=>
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/cards',(req,res)=>
{
    cards.find((err,data)=>
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
})

//listener

app.listen(port,()=> console.log(`Listening on local host: ${port}`))