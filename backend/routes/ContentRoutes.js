const Router = require('express').Router();

Router.get('/',(req,res)=>{
    console.log(req)
})

module.exports = Router;