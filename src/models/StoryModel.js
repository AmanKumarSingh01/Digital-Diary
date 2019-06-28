const mongoose = require("mongoose");
const validator = require('validator')
const Schema = mongoose.Schema;

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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Story = mongoose.model('Stroy', StorySchema)

module.exports =Story;