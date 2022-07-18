function logOut(req,res){

    res.clearCookie('refreshToken')
    .json({
        status:'SUCCESSFUL',
        message:'successfully logged out'
    })
}

module.exports = logOut