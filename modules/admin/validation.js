const yup = require('yup')
const userSchema= yup.object({
    name : yup.string().required(),
    email : yup.string().required().email(),
    password: yup.string().required().min(8)
})
module.exports = userSchema;