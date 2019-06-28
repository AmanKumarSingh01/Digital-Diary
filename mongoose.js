const mongoose = require("mongoose");
const validator = require('validator')
const Schema = mongoose.Schema;



mongoose.connect('mongodb://127.0.0.1:27017/DigitalDiary',{
    useNewUrlParser:true,
    useCreateIndex: true
});



// const me = new User({
//     name: "Aman",
//     username:"aman",
//     age : "20",
//     mobile: 8757641020,
//     email: "momkid33@gmail.com",
//     password:"qwerty"
// })
// me.save()
// .then((me) =>{
//     console.log(me)
// }).catch((e=>{
//     console.log("Error")
// }))

const StorySchema = new Schema({
    username:{
        type:String
    },
    date:{
        type : Date,
        required:true
    },
    story:{
        type:String,
        required: true
    },
    image:{
        type: Buffer
    }
});

const Story = mongoose.model('Stroy', StorySchema)

const me = new Story({
    username:"aman",
    date: new Date,
    story:"My digital Diary"
})
me.save()
.then((me) =>{
    console.log(me)
}).catch((e=>{
    console.log("Error")
}))