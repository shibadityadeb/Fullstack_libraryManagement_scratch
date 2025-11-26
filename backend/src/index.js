const express=require('express')
const app=express()
require('dotenv').config()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
app.use(express.json())
app.get('/status',(req,res)=>{
    res.send({status:'ok'})
})

app.post('/genres',(req,res)=>{
    const name=req.query.name
    prisma.genre.create({
        data:{name}
    })
    return res.status(201).send({status:'genre created'})
})
app.get('/genres',async(req,res)=>{
    const genres=await prisma.genre.findMany()
    return res.status(200).send({status:'ok',data:genre})
})
app.delete('/genres:id',async(req,res)=>{
const id=parseInt(req.params.id)
await prisma.genre.delete({
    where:{id}
})
return res.status(200).send({status:'genre deleted'})
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})

