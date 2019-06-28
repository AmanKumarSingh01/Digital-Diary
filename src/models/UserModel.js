const mongoose = require("mongoose");
const validator = require('validator')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')

const UserSechema = new Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type: Number,
        required: true,
        validate(value){
            if (value<0)
            {
                console.log("Age cant be negative")
            }
        }
    },
    mobile:{
        type: Number,
        required :true,
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            // required: true
        }
    }]
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})


UserSechema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}


UserSechema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}


UserSechema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

UserSechema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password'))
    {
        user.password= await bcrypt.hash(user.password,8);
    }
    next();
})
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})



const User = mongoose.model('User' , UserSechema );

module.exports =User;