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
    question:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true
    }
})


const ChatHistoryModel = mongoose.model("ChatHistory" , ChatHistorySchema);

module.exports = ChatHistoryModel