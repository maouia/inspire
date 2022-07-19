const adminModule = require('../../modules/admin/admin.module');

module.exports.index = (req,res)=>{
    res.send('admin')
}

module.exports.register = (req,res,next)=>{
var admin = new adminModule(req.body.name,req.body.email,req.body.password);
admin.register(req,res);
}

module.exports.signup = async (req,res,next)=>{

        return await res.render('admin/auth/signup', {message:req.flash().error});

}

module.exports.login = async (req,res,next)=>{
    return await res.render('admin/auth/signin');
}