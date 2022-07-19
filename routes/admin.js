var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admin/auth');
const adminDto = require("../middlewares/admin/dto");
const adminSchema = require("../modules/admin/validation");
const {userNotExist, userExist} = require("../middlewares/admin/auth");

/* GET users listing. */



router.get('/',userNotExist,adminController.index)
router.get('/signup',userExist,adminController.signup);
router.get('/login',userExist,adminController.login);
router.post('/register',userExist,adminDto(adminSchema),adminController.register);

module.exports = router;