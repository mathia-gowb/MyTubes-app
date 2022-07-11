const Router = require('express').Router();
const getAllRecipes = require('../controllers/get-all-recipes');
const handleLikes = require('../controllers/handleLikes');
//routes for handling likes
Router.get('/',getAllRecipes)
Router.get('/like',(req,res)=>{
    console.log(console.log(req))
})
Router.post('/like',handleLikes.addLike)

module.exports = Router;