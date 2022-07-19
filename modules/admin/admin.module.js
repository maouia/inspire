const db = require('../../database/config');
var SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');
require('dotenv').config();
class admin {
    constructor(name,email,password) {
        this.valid = false;
        this._name = name;
        this._email = email;
        this._password = SHA256(password).toString();
    }


     register(req,res) {
        var sql = `INSERT INTO admin (name, email, password, valid) VALUES ("${this._name}", "${this._email}", "${this._password}", "${this.valid}")`;
        db.query(sql, async  function (err,result) {
            if (err) {
                if(err.sqlState == '23000')
                    req.flash('error','email alorady exist');
                res.redirect('/admin/signup');
            }
            else {
                db.query(`SELECT name,email,valid FROM admin WHERE id = ${result.insertId}`,async function (err, result, fields) {
                    if (err) {
                        req.flash('error','cant open your account');
                        res.redirect('/admin/signup');
                    }
                    else {
                        var user = {
                            name:result[0].name,
                            email:result[0].email,
                            valid:result[0].valid
                        }
                       const token=await jwt.sign(user,process.env.TOKEN);
                        const cookieOptions = {
                            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000)
                        }
                        res.cookie('user', token, cookieOptions);
                        //res.json({accessToken :token})
                        return await res.redirect('/admin');

                    }

                });
            }
        });

    }
}

module.exports = admin;