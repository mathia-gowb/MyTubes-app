const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyJWT = require('../controllers/verifyJWT');

Router.use(verifyJWT)
//controllers
const getAllRecipes = require('../controllers/get-all-recipes');
const handleLikes = require('../controllers/handleLikes');
const handleSaves = require('../controllers/handleSaves');

//routes for handling likes
Router.get('/',getAllRecipes)
//routes for likes
Router.post('/like',handleLikes.addLike);
Router.delete('/like',handleLikes.deleteLike);
//routes for handling saves
Router.post('/save',handleSaves.saveRecipe);
Router.delete('/save',handleSaves.deleteRecipe);

module.exports = Router;