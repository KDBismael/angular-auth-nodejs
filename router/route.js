const express= require('express');
const Router= express.Router();
const userConstrollers= require('../controllers/userController');
const middleware=require('../middleware/index')
const jsonwebtoken = require('jsonwebtoken');


Router
    .post('/register',userConstrollers.register)
    .post('/login',userConstrollers.login)
    .get('/protected',middleware.isAuthenticated,(req,res)=>{return res.json({message:"you have acces to protected"})})
    .get('/test',(req,res)=>{res.json({message:"you have test"})});

module.exports=Router;