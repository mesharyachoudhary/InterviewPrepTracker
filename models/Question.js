const mongoose = require('mongoose');
const Topic = require('./Topic');
const QuestionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    linkto:{
        type:String,
        required: true

    },
    topics:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Topic',
        required: true
    },
    approved:{
        type:Boolean,
        required:true,
        default:false

    },
    difficulty:{
        type:Number,
        required:true
    },
    date: {
      type: Date,
      default: Date.now
    }
});
const Question = mongoose.model('Question',QuestionSchema);
module.exports = Question;