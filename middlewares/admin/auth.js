module.exports.userExist=(req,res,next)=>{
    if(req.cookies.user) res.redirect('/admin')
    else next()
}
module.exports.userNotExist=(req,res,next)=>{
    if(!req.cookies.user) res.redirect('/admin/signup')
    else next()
}