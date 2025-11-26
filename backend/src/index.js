const express=require('express')
const app=express()
require('dotenv').config()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
app.use(express.json())
app.get('/status',(req,res)=>{
    res.send({status:'ok'})
})
// Genre Endpoints
app.post("/genres", async (req, res) => {
  const body = req.body;
  let genre = await prisma.genre.create({
    data: {
      name: body.name
    }
  })
  res.status(201).json(genre);
})
app.get('/genres',async(req,res)=>{
    const genres=await prisma.genre.findMany()
    return res.status(200).send({data:genres})
})
app.delete('/genres:id',async(req,res)=>{
const id=parseInt(req.params.id)
await prisma.genre.delete({
    where:{id}
})
return res.status(200).send({status:'genre deleted'})
})

//Author Endpoints




app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})

