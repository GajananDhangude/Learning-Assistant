const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DocumentSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,

    },
    filename:{
        type:String,
        required:true,
    },
    originalname:{
        type:String,
        required:true
    },
    filesize:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['processing' , 'ready' , 'failed'],
        default:'processing'
    }
})


const DocumentModel = mongoose.model('Document' , DocumentSchema)


module.exports = DocumentModel;