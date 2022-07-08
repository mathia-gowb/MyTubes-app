const Router = require('express').Router();
const handleLikes = require('../controllers/handleLikes')
//routes for handling likes
Router.get('/like',(req,res)=>{
    console.log(console.log(req))
})
Router.post('/like',handleLikes.addLike)

module.exports = Router;