const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    documentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Document',
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    questions:[{
        type:{
            type:String,
            enum:['mcq' , 'short_answer' , 'true_false'],
            required:true,
        },
        question:{
            type:STring,
            required:true
        },
        options:{
            type:[String],
            required:true,
            validate:[array => array.length === 4, 'Must have exactly 4 options']
        },
        difficulty:{
            type:String,
            enum:['easy' , 'medium' , 'hard'],
            default:'medium'
        },
        correct: mongoose.Schema.Types.Mixed,
        explanation:String,
        pageReference:Number,
    }],
    timeLimit:Number,
    completed:{
        type:Boolean,
        default:false,
    },
    score:Number,
    results:[{
        questionIndex:Number,
        userAnswer:mongoose.Schema.Types.Mixed,
        isCorrect:Boolean
    }],

    completedAt:Date
}, {timestamps:true});


const QuizModel = mongoose.model("Quiz" , quizSchema);

module.exports = QuizModel;