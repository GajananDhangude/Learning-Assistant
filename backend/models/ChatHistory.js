const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatHistorySchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
    },
    documentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Document',
        required:true,
        index:true
    },
    messages:[{
        role:{
            type:String,
            enum:['user' , 'assistant'],
            required:true
        },
        content:{
            type:String,
            required:true
        },
        timestamps:{
            type:Date,
            default:Date.now,
        },
        releventChunks:{
            type:[Number],
            default:[]
        }
    }]
} , {timestamps:true})

ChatHistorySchema.index({userId:1 , documentId:1});
const ChatHistoryModel = mongoose.model("ChatHistory" , ChatHistorySchema);

module.exports = ChatHistoryModel